pipeline {

  agent any

  parameters {
    gitParameter branchFilter: 'origin.*/(.*)', defaultValue: 'main', name: 'branch', type: 'PT_BRANCH', useRepository: 'git@bitbucket.org:liciousadmin/nextjs-web.git'
    choice name: 'environment', choices: "dev_v2\nqa1", description: 'environment'
    
	// string name: 'TAG', defaultValue: 'latest'
  }

  stages {

    stage('Checkout') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: "${params.branch}"]], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'licous-devops-jenkins-key', url: 'git@bitbucket.org:liciousadmin/nextjs-web.git']]])
        script {
            env.commit_id = "${sh(script:'git rev-parse --short HEAD', returnStdout: true).trim()}"
            env.tag = "${params.branch}-${env.commit_id}-${BUILD_NUMBER}"
        }
      }
    }

    stage('Dev-v2 Configuration-update') {
      when {
        expression { params.environment == 'dev_v2' }
      }
      steps {
        //   This is just to update the configuration in the server, however there is no use of this as we build from jenkins server itself but this is just for reference
        sh 'ansible-playbook -i /opt/infra-devops-codebase/automation-with-ansible/ansible-inventory/dev_v2_aws_ec2.yaml -u ubuntu -e "evn_name=dev_v2 app_name=nextjs-web bucket_name=licious-non-prod-configurations-secrets inv_tag=tag_nextjsweb file_name=.env file_path=/var/www/html/nextjs-web service_name=nextjs-web" /opt/infra-devops-codebase/automation-with-ansible/application-cd-with-ansible/config-management/config_pull_and_update_s3.yml'
		
        // This is to download configuration from s3 into the current workspace and will build a docker image in docker build stage
        sh 'ansible-playbook -i /opt/infra-devops-codebase/automation-with-ansible/ansible-inventory/dev_v2_aws_ec2.yaml -u ubuntu -e "evn_name=dev_v2 app_name=nextjs-web bucket_name=licious-non-prod-configurations-secrets file_name=.env file_path=${WORKSPACE}" /opt/infra-devops-codebase/automation-with-ansible/application-cd-with-ansible/config-management/config_pull_and_update_s3_localhost.yml'
      }
    }

    stage('QA1 Configuration-update') {
      when {
        expression { params.environment == 'qa1' }
      }
      steps {
        //   This is just to update the configuration in the server, however there is no use of this as we build from jenkins server itself but this is just for reference
        sh 'ansible-playbook -i /opt/infra-devops-codebase/automation-with-ansible/ansible-inventory/qa1_aws_ec2.yml -u ubuntu -e "evn_name=qa1 app_name=nextjs-web bucket_name=licious-non-prod-configurations-secrets inv_tag=tag_nextjsweb file_name=.env file_path=/var/www/html/nextjs-web service_name=nextjs-web" /opt/infra-devops-codebase/automation-with-ansible/application-cd-with-ansible/config-management/config_pull_and_update_s3.yml'
		
        // This is to download configuration from s3 into the current workspace and will build a docker image in docker build stage
        sh 'ansible-playbook -i /opt/infra-devops-codebase/automation-with-ansible/ansible-inventory/qa1_aws_ec2.yaml -u ubuntu -e "evn_name=qa1 app_name=nextjs-web bucket_name=licious-non-prod-configurations-secrets file_name=.env file_path=${WORKSPACE}" /opt/infra-devops-codebase/automation-with-ansible/application-cd-with-ansible/config-management/config_pull_and_update_s3_localhost.yml'

  }

}

    stage('Docker build and ECR push') {
      steps {
        sh "docker build -t 028686181435.dkr.ecr.ap-south-1.amazonaws.com/nextjs-web:${env.tag} ."
        sh "docker push 028686181435.dkr.ecr.ap-south-1.amazonaws.com/nextjs-web:${env.tag}"
      }
    }
    

	stage('Dev-v2 Deployment') {
      when {
        expression { params.environment == 'dev_v2' }
      }
      steps {
        // This is to download ecr image into the server, remove old container and run container with latest code changes
		sh "ansible-playbook -i /opt/infra-devops-codebase/automation-with-ansible/ansible-inventory/dev_v2_aws_ec2.yaml -u ubuntu -e 'inv_tag=tag_nextjsweb serial_value=1 projectdir=/var/www/html/nextjs-web TAG=${env.tag} branch=${params.branch}' /opt/infra-devops-codebase/automation-with-ansible/application-cd-with-ansible/deploy/php/main-nextjs.yaml"
       
      }
    }
	
	stage('QA1 Deployment') {
      when {
        expression { params.environment == 'qa1' }
      }
      steps {
        // This is to download ecr image into the server, remove old container and run container with latest code changes
		sh "ansible-playbook -i /opt/infra-devops-codebase/automation-with-ansible/ansible-inventory/qa1_aws_ec2.yml -u ubuntu -e 'inv_tag=tag_nextjsweb serial_value=1 projectdir=/var/www/html/nextjs-web TAG=${env.tag} branch=${params.branch}' /opt/infra-devops-codebase/automation-with-ansible/application-cd-with-ansible/deploy/php/main-nextjs.yaml"

  }

}
}
}
