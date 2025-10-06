# Deploying Fullstack Web App to AWS & integrating Dynatrace

## Dynatrace Integration Guide 🛠️

Key Dynatrace components we'll connect & use:
- **OneAgent** + **Hosts Classic app** - EC2 backend monitoring
- **Agentless Real User Monitoring (RUM)** - detailed user experience monitoring & analytics
- **Session Segmentation** - User experience *Aggregated* analytics
- **Digital experience -> Web** + **Frontend app** - real user monitoring (RUM)
- **Distributed Traces Classic** + **Distributed Tracing** - tracing endpoint calls & backend performance
- **Dashboards** - putting together customised reports & data views

### 1. Pre-requisites ✅
1. Dynatrace account : Trial/Regular
2. Completed AWS Web App deployment
3. Basic understanding of "Inspect" functionality in modern browsers

### 2. Server-side monitoring & Observability (EC2) 🤖
1. Dynatrace -> Apps -> "Deploy OneAgent" -> Follow the guide (don't forget to save the token) on your EC2 instance as root (```sudo su -```) -> Show deployment status (new record should pop up there). 
Dynatrace app you'll be taken to by default (after deploying OneAgent) is "Infrastructure & Operations": a newer development forked from "Hosts classic"
2. EC2: restart Node process with:
   ```shell
   pm2 delete all
   kill -9 NODE_PID # get NODE_PID from Dynatrace -> Hosts App -> Process Analysis
   pm2 start ecosystem.config.js
   ```
This way OneAgent will get access to the insides of your Web App's performance

3. Apps -> Hosts Classic -> Explore our EC2 instance's performance metrics
4. Apps -> Hosts Classic -> Process Analysis -> Node.js (server)
    Enable "Disk analytics" extension (Add to environment) + "Net Tracer Traffic monitoring" in Hosts Classic
5. Check out updated server monitoring experience with "Infrastructure & Monitoring" app

### 3. Real User Monitoring (RUM) 👫
1. Dynatrace -> Apps -> "Agentless Real User Monitoring" -> "inventorymanagement" Add web application
2. Copy JavaScript tag -> Modify Dynatrace's javascript contents: 
   * "crossorigin" ->> "crossOrigin" 
   * add "strategy="afterInteractive"" before "src=..."
   * "<script...>" & "</script>" ->> "<Script...>" & "</Script>"
   * 
3. Add modified javascript to client/src/app/layout.tsx
   
The code snippet should go between: "<head>HERE</head>" after "<html lang="en">" and before "<body
        className=..."

4. Commit & push changes to Github
```shell
git add client/src/app/.
git commit -m"integrated Dynatrace agentless rum"
git push origin master
```
5. Make sure that the new Deployment goes through in AWS Amplify & Web App keeps working normally.
Open your Web App's URL in different browsers, from your phone, share with friends & family: we want to collect different user sessions to explore later!

6. Checkout out Dynatrace: Agentless real user monitoring -> Monitored web applications -> View application (a tiny button)
7. Your Web App's performance analysis now lives under "Dynatrace -> Apps -> Web"
   
### 4. Backend performance Analysis (Tracing API calls) 🛜
1. Apps -> Distributed Traces Classic & Distributed Tracing

### 5. Dashboards: a comprehensive performance overview 📊
We'll be using a preconfigured set of Dynatrace Dashboards to cover all major areas of interest related to our Web App's & OneAgent's performance
1. Apps -> Dashboards Classic ->
   * Real User Monitoring
   * OneAgent Traces

2. Apps -> Dashboards