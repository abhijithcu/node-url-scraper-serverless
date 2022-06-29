# Install dependency
npm install

# Install serverless globally
npm install -g serverless

# To run Locally
serverless offline

# {domain}/dev/scarp - POST method
# Input JSON- Example
{
  "URL": "https://nodejs.org/en/"
}
#Output 
{
    "title": "Node.js",
    "description": "Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
    "images": [
        "https://nodejs.org/static/images/logo-hexagon-card.png",
        "/static/images/logo.svg",
        "/static/images/openjs_foundation-logo.svg"
    ]
}

# To configure AWS Credentials
serverless config credentials --provider aws --key {ACCESS_KEY} --secret {SECRET_KEY} -o

# To deploy on server
serverless deploy --stage {ENV}

