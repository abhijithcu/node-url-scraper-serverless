# Install dependency
npm install

# To run Locally
serverless offline

# To configure AWS Credentials
serverless config credentials --provider aws --key {ACCESS_KEY} --secret {SECRET_KEY} -o

# To deploy on server
serverless deploy --stage dev

