import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const capabilities = [
  {
    id: "cloud.architecture.well-architected",
    title: "Multi-Cloud Well-Architected Review",
    agent: "agents/arch.agent.md",
    skills: ["skills/cloud-design-patterns", "skills/azure-well-architected-review", "skills/aws-well-architected-review"],
    instructions: ["instructions/devops-core-principles.instructions.md", "instructions/security-and-owasp.instructions.md"],
    providerNeeds: ["code-navigation", "document-search", "knowledge-graph"],
  },
  {
    id: "cloud.security.threat-modeling",
    title: "Multi-Cloud Threat Modeling and Security Review",
    agent: "agents/principal-software-engineer.agent.md",
    skills: ["skills/cloud-design-patterns", "skills/github-actions-hardening"],
    instructions: ["instructions/security-and-owasp.instructions.md", "instructions/devops-core-principles.instructions.md"],
    providerNeeds: ["threat-modeling", "security-review", "document-search"],
  },
  {
    id: "cloud.reliability.disaster-recovery",
    title: "Multi-Cloud Reliability and Disaster Recovery",
    agent: "agents/project-architecture-planner.agent.md",
    skills: ["skills/cloud-design-patterns", "skills/azure-resource-health-diagnose", "skills/aws-resource-health-diagnose"],
    instructions: ["instructions/devops-core-principles.instructions.md", "instructions/kubernetes-manifests.instructions.md"],
    providerNeeds: ["reliability-analysis", "disaster-recovery-planning", "telemetry"],
  },
  {
    id: "cloud.devops.cicd",
    title: "Cloud DevOps and CI/CD Review",
    agent: "agents/devops-expert.agent.md",
    skills: ["skills/github-actions-hardening", "skills/github-actions-efficiency", "skills/azure-devops-cli"],
    instructions: ["instructions/github-actions-ci-cd-best-practices.instructions.md", "instructions/azure-devops-pipelines.instructions.md"],
    providerNeeds: ["repository-analysis", "pipeline-analysis", "security-review"],
  },

  {
    id: "azure.iac.generate",
    title: "Azure Infrastructure as Code Generation",
    agent: "agents/azure-iac-generator.agent.md",
    skills: ["skills/import-infrastructure-as-code", "skills/azure-deployment-preflight"],
    instructions: ["instructions/azure-verified-modules-bicep.instructions.md", "instructions/azure-verified-modules-terraform.instructions.md", "instructions/terraform-azure.instructions.md"],
    providerNeeds: ["infrastructure-as-code", "dependency-analysis", "document-search"],
  },
  {
    id: "azure.governance.policy-review",
    title: "Azure Governance and Policy Review",
    agent: "agents/azure-policy-analyzer.agent.md",
    skills: ["skills/audit-integrity", "skills/azure-resource-health-diagnose"],
    instructions: ["instructions/azure-naming.instructions.md", "instructions/security-and-owasp.instructions.md"],
    providerNeeds: ["resource-inventory", "policy-analysis", "document-search"],
  },
  {
    id: "azure.identity.rbac-entra",
    title: "Azure Identity, RBAC and Entra Design",
    agent: "agents/azure-principal-architect.agent.md",
    skills: ["skills/azure-role-selector", "skills/cloud-design-patterns"],
    instructions: ["instructions/azure-naming.instructions.md", "instructions/security-and-owasp.instructions.md"],
    providerNeeds: ["identity-design", "rbac-analysis", "security-review"],
  },
  {
    id: "azure.networking.vnet-connectivity",
    title: "Azure Networking, VNet and Connectivity",
    agent: "agents/azure-principal-architect.agent.md",
    skills: ["skills/azure-architecture-autopilot", "skills/azure-resource-visualizer"],
    instructions: ["instructions/kubernetes-manifests.instructions.md", "instructions/security-and-owasp.instructions.md"],
    providerNeeds: ["network-topology", "private-connectivity", "traffic-analysis"],
  },
  {
    id: "azure.security.posture",
    title: "Azure Security Posture and Hardening",
    agent: "agents/azure-policy-analyzer.agent.md",
    skills: ["skills/azure-well-architected-review", "skills/audit-integrity"],
    instructions: ["instructions/security-and-owasp.instructions.md", "instructions/azure-naming.instructions.md"],
    providerNeeds: ["security-review", "compliance-check", "remediation-plan"],
  },
  {
    id: "azure.compute.vm-vmss",
    title: "Azure Compute VM and VMSS Architecture",
    agent: "agents/azure-principal-architect.agent.md",
    skills: ["skills/azure-architecture-autopilot", "skills/azure-resource-health-diagnose"],
    instructions: ["instructions/containerization-docker-best-practices.instructions.md", "instructions/devops-core-principles.instructions.md"],
    providerNeeds: ["compute-sizing", "availability-design", "cost-review"],
  },
  {
    id: "azure.kubernetes.aks-operations",
    title: "Azure Kubernetes Service Operations",
    agent: "agents/azure-principal-architect.agent.md",
    skills: ["skills/azure-resource-health-diagnose", "skills/cloud-design-patterns"],
    instructions: ["instructions/kubernetes-manifests.instructions.md", "instructions/devops-core-principles.instructions.md"],
    providerNeeds: ["kubernetes-operations", "cluster-security", "autoscaling-analysis"],
  },
  {
    id: "azure.serverless.functions-logicapps",
    title: "Azure Serverless Functions and Logic Apps",
    agent: "agents/azure-logic-apps-expert.agent.md",
    skills: ["skills/azure-architecture-autopilot", "skills/cloud-design-patterns"],
    instructions: ["instructions/azure-functions-csharp.instructions.md", "instructions/azure-functions-typescript.instructions.md", "instructions/azure-logic-apps-power-automate.instructions.md"],
    providerNeeds: ["serverless-design", "workflow-analysis", "resilience-patterns"],
  },
  {
    id: "azure.data.platform",
    title: "Azure Data Platform Architecture",
    agent: "agents/azure-principal-architect.agent.md",
    skills: ["skills/cloud-design-patterns", "skills/azure-architecture-autopilot"],
    instructions: ["instructions/terraform-azure.instructions.md", "instructions/security-and-owasp.instructions.md"],
    providerNeeds: ["data-architecture", "consistency-modeling", "security-review"],
  },
  {
    id: "azure.storage.design",
    title: "Azure Storage Architecture and Lifecycle",
    agent: "agents/azure-principal-architect.agent.md",
    skills: ["skills/azure-architecture-autopilot", "skills/azure-pricing"],
    instructions: ["instructions/terraform-azure.instructions.md", "instructions/security-and-owasp.instructions.md"],
    providerNeeds: ["storage-tiering", "lifecycle-design", "cost-optimization"],
  },
  {
    id: "azure.messaging.integration",
    title: "Azure Messaging and Integration Patterns",
    agent: "agents/azure-logic-apps-expert.agent.md",
    skills: ["skills/cloud-design-patterns", "skills/azure-architecture-autopilot"],
    instructions: ["instructions/azure-logic-apps-power-automate.instructions.md", "instructions/devops-core-principles.instructions.md"],
    providerNeeds: ["messaging-patterns", "event-driven-design", "integration-reliability"],
  },
  {
    id: "azure.observability.monitoring",
    title: "Azure Observability and Monitoring",
    agent: "agents/azure-principal-architect.agent.md",
    skills: ["skills/appinsights-instrumentation", "skills/azure-resource-health-diagnose"],
    instructions: ["instructions/devops-core-principles.instructions.md", "instructions/security-and-owasp.instructions.md"],
    providerNeeds: ["telemetry-design", "alerting-strategy", "incident-readiness"],
  },
  {
    id: "azure.cost.optimization",
    title: "Azure Cost Optimization and FinOps",
    agent: "agents/azure-principal-architect.agent.md",
    skills: ["skills/az-cost-optimize", "skills/azure-pricing"],
    instructions: ["instructions/devops-core-principles.instructions.md", "instructions/terraform-azure.instructions.md"],
    providerNeeds: ["cost-analysis", "rightsizing", "finops-governance"],
  },
  {
    id: "azure.api-management.design",
    title: "Azure API Management and Gateway Design",
    agent: "agents/azure-principal-architect.agent.md",
    skills: ["skills/cloud-design-patterns", "skills/azure-architecture-autopilot"],
    instructions: ["instructions/security-and-owasp.instructions.md", "instructions/devops-core-principles.instructions.md"],
    providerNeeds: ["api-governance", "security-policy-design", "integration-patterns"],
  },

  {
    id: "aws.architecture.review",
    title: "AWS Enterprise Architecture Review",
    agent: "agents/aws-principal-architect.agent.md",
    skills: ["skills/aws-well-architected-review", "skills/aws-resource-query"],
    instructions: ["instructions/terraform.instructions.md", "instructions/security-and-owasp.instructions.md"],
    providerNeeds: ["resource-inventory", "dependency-analysis", "document-search"],
  },
  {
    id: "aws.governance.multi-account",
    title: "AWS Multi-Account Governance and Control",
    agent: "agents/aws-principal-architect.agent.md",
    skills: ["skills/aws-resource-query", "skills/aws-well-architected-review"],
    instructions: ["instructions/devops-core-principles.instructions.md", "instructions/security-and-owasp.instructions.md"],
    providerNeeds: ["governance-design", "organizational-controls", "compliance-review"],
  },
  {
    id: "aws.identity.iam",
    title: "AWS IAM and Identity Architecture",
    agent: "agents/aws-principal-architect.agent.md",
    skills: ["skills/aws-resource-query", "skills/cloud-design-patterns"],
    instructions: ["instructions/security-and-owasp.instructions.md", "instructions/devops-core-principles.instructions.md"],
    providerNeeds: ["identity-design", "least-privilege", "security-review"],
  },
  {
    id: "aws.networking.vpc-connectivity",
    title: "AWS VPC and Connectivity Architecture",
    agent: "agents/aws-principal-architect.agent.md",
    skills: ["skills/cloud-design-patterns", "skills/aws-resource-query"],
    instructions: ["instructions/kubernetes-manifests.instructions.md", "instructions/security-and-owasp.instructions.md"],
    providerNeeds: ["network-topology", "private-connectivity", "traffic-analysis"],
  },
  {
    id: "aws.security.posture",
    title: "AWS Security Posture and Hardening",
    agent: "agents/aws-principal-architect.agent.md",
    skills: ["skills/aws-well-architected-review", "skills/aws-resource-health-diagnose"],
    instructions: ["instructions/security-and-owasp.instructions.md", "instructions/devops-core-principles.instructions.md"],
    providerNeeds: ["security-review", "compliance-check", "remediation-plan"],
  },
  {
    id: "aws.compute.ec2-autoscaling",
    title: "AWS Compute and Auto Scaling",
    agent: "agents/aws-cloud-expert.agent.md",
    skills: ["skills/aws-resource-query", "skills/aws-cost-optimize"],
    instructions: ["instructions/containerization-docker-best-practices.instructions.md", "instructions/devops-core-principles.instructions.md"],
    providerNeeds: ["compute-sizing", "availability-design", "cost-review"],
  },
  {
    id: "aws.kubernetes.eks-operations",
    title: "AWS EKS Operations and Governance",
    agent: "agents/aws-principal-architect.agent.md",
    skills: ["skills/aws-resource-health-diagnose", "skills/cloud-design-patterns"],
    instructions: ["instructions/kubernetes-manifests.instructions.md", "instructions/devops-core-principles.instructions.md"],
    providerNeeds: ["kubernetes-operations", "cluster-security", "autoscaling-analysis"],
  },
  {
    id: "aws.serverless.architecture",
    title: "AWS Serverless Architecture and Delivery",
    agent: "agents/aws-serverless-architect.agent.md",
    skills: ["skills/aws-cdk-python-setup", "skills/aws-resource-health-diagnose"],
    instructions: ["instructions/aws-appsync.instructions.md", "instructions/devops-core-principles.instructions.md"],
    providerNeeds: ["infrastructure-as-code", "serverless-patterns", "document-search"],
  },
  {
    id: "aws.data.rds-dynamodb",
    title: "AWS Data Architecture for RDS and DynamoDB",
    agent: "agents/aws-cloud-expert.agent.md",
    skills: ["skills/cloud-design-patterns", "skills/aws-resource-query"],
    instructions: ["instructions/terraform.instructions.md", "instructions/security-and-owasp.instructions.md"],
    providerNeeds: ["data-architecture", "consistency-modeling", "security-review"],
  },
  {
    id: "aws.storage.s3-efs",
    title: "AWS Storage Architecture for S3 and EFS",
    agent: "agents/aws-cloud-expert.agent.md",
    skills: ["skills/aws-cost-optimize", "skills/aws-resource-query"],
    instructions: ["instructions/terraform.instructions.md", "instructions/security-and-owasp.instructions.md"],
    providerNeeds: ["storage-tiering", "lifecycle-design", "cost-optimization"],
  },
  {
    id: "aws.messaging.event-driven",
    title: "AWS Messaging and Event-Driven Integration",
    agent: "agents/aws-serverless-architect.agent.md",
    skills: ["skills/cloud-design-patterns", "skills/aws-resource-query"],
    instructions: ["instructions/aws-appsync.instructions.md", "instructions/devops-core-principles.instructions.md"],
    providerNeeds: ["messaging-patterns", "event-driven-design", "integration-reliability"],
  },
  {
    id: "aws.observability.cloudwatch-xray",
    title: "AWS Observability with CloudWatch and Tracing",
    agent: "agents/aws-incident-triage.agent.md",
    skills: ["skills/aws-cloudwatch-investigation", "skills/aws-resource-health-diagnose"],
    instructions: ["instructions/devops-core-principles.instructions.md", "instructions/security-and-owasp.instructions.md"],
    providerNeeds: ["telemetry-design", "alerting-strategy", "incident-readiness"],
  },
  {
    id: "aws.cost.optimization",
    title: "AWS Cost Optimization and FinOps",
    agent: "agents/aws-cloud-expert.agent.md",
    skills: ["skills/aws-cost-optimize", "skills/aws-resource-query"],
    instructions: ["instructions/devops-core-principles.instructions.md", "instructions/terraform.instructions.md"],
    providerNeeds: ["cost-analysis", "rightsizing", "finops-governance"],
  },
  {
    id: "aws.operations.incident-triage",
    title: "AWS Incident Triage and Recovery",
    agent: "agents/aws-incident-triage.agent.md",
    skills: ["skills/aws-cloudwatch-investigation", "skills/aws-resource-health-diagnose"],
    instructions: ["instructions/devops-core-principles.instructions.md", "instructions/security-and-owasp.instructions.md"],
    providerNeeds: ["logs-analysis", "incident-response", "telemetry"],
  },
  {
    id: "aws.reliability.disaster-recovery",
    title: "AWS Reliability and Disaster Recovery",
    agent: "agents/aws-principal-architect.agent.md",
    skills: ["skills/aws-resource-health-diagnose", "skills/aws-well-architected-review"],
    instructions: ["instructions/devops-core-principles.instructions.md", "instructions/terraform.instructions.md"],
    providerNeeds: ["reliability-analysis", "disaster-recovery-planning", "resilience-testing"],
  },
  {
    id: "aws.devops.cicd",
    title: "AWS DevOps and CI/CD",
    agent: "agents/devops-expert.agent.md",
    skills: ["skills/github-actions-hardening", "skills/github-actions-efficiency"],
    instructions: ["instructions/github-actions-ci-cd-best-practices.instructions.md", "instructions/devops-core-principles.instructions.md"],
    providerNeeds: ["repository-analysis", "pipeline-analysis", "security-review"],
  },
];

const manifest = {
  schemaVersion: "1.0",
  name: "mcpee-cloud",
  version: "0.1.0",
  type: "boost",
  domain: "cloud",
  description:
    "MCPEE Cloud Boost for Azure and AWS with enterprise architecture, IaC, identity, networking, security, data, operations, resilience and DevOps capabilities.",
  capabilities: capabilities.map((cap) => ({
    ...cap,
    specs: [`specs/${cap.id}.md`],
    prompts: [`prompts/${cap.id}.prompt.md`],
    evals: [`evals/${cap.id}.eval.json`],
    examples: [`examples/${cap.id}.example.md`],
  })),
};

const writeJson = (targetPath, obj) => {
  fs.writeFileSync(path.join(root, targetPath), `${JSON.stringify(obj, null, 2)}\n`, "utf8");
};

for (const dir of ["specs", "prompts", "evals", "examples"]) {
  fs.mkdirSync(path.join(root, dir), { recursive: true });
}

writeJson("mcpee.json", manifest);

for (const cap of capabilities) {
  const spec = `# Spec: ${cap.id}\n\n## Scope\n${cap.title}\n\n## Non-negotiables\n- Findings must be evidence-based.\n- Recommendations must be actionable and prioritized.\n- Output must include security, reliability and operational guidance.\n`;
  fs.writeFileSync(path.join(root, `specs/${cap.id}.md`), spec, "utf8");

  const prompt = `# Capability Prompt: ${cap.id}\n\nAct as an enterprise cloud specialist for this capability.\n\n## Required output\n- Current-state assessment\n- Key risks and trade-offs\n- Prioritized remediation plan\n- Practical implementation steps\n`;
  fs.writeFileSync(path.join(root, `prompts/${cap.id}.prompt.md`), prompt, "utf8");

  const evalJson = {
    capability: cap.id,
    version: "0.1.0",
    checks: [
      "Assessment is evidence-based",
      "Risks are prioritized by impact",
      "Recommendations are implementation-ready",
    ],
  };
  writeJson(`evals/${cap.id}.eval.json`, evalJson);

  const example = `# Example: ${cap.id}\n\n## Scenario\nRepresentative enterprise scenario for ${cap.title}.\n\n## Expected output shape\n- Context and assumptions\n- Risks and constraints\n- Action plan with priority\n`;
  fs.writeFileSync(path.join(root, `examples/${cap.id}.example.md`), example, "utf8");
}

console.log(`Generated ${capabilities.length} capabilities and support artifacts.`);
