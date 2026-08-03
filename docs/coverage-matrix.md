# Coverage Matrix v0.1.0

This matrix describes the implemented capability coverage in `@sertxito/mcpee-cloud` for Azure and AWS.

## Summary

- Total capabilities: 34
- Cross-cloud: 4
- Azure: 14
- AWS: 16

## Domain Matrix

| Domain | Cross | Azure | AWS | Status |
| --- | --- | --- | --- | --- |
| Architecture | `cloud.architecture.well-architected` | `azure.iac.generate` | `aws.architecture.review` | Covered |
| Security | `cloud.security.threat-modeling` | `azure.security.posture` | `aws.security.posture` | Covered |
| Reliability / DR | `cloud.reliability.disaster-recovery` | `azure.kubernetes.aks-operations` | `aws.reliability.disaster-recovery` | Covered |
| DevOps / CI-CD | `cloud.devops.cicd` | `azure.cost.optimization` (ops context) | `aws.devops.cicd` | Covered |
| Governance | - | `azure.governance.policy-review` | `aws.governance.multi-account` | Covered |
| Identity | - | `azure.identity.rbac-entra` | `aws.identity.iam` | Covered |
| Networking | - | `azure.networking.vnet-connectivity` | `aws.networking.vpc-connectivity` | Covered |
| Compute | - | `azure.compute.vm-vmss` | `aws.compute.ec2-autoscaling` | Covered |
| Kubernetes | - | `azure.kubernetes.aks-operations` | `aws.kubernetes.eks-operations` | Covered |
| Serverless | - | `azure.serverless.functions-logicapps` | `aws.serverless.architecture` | Covered |
| Data | - | `azure.data.platform` | `aws.data.rds-dynamodb` | Covered |
| Storage | - | `azure.storage.design` | `aws.storage.s3-efs` | Covered |
| Messaging / Integration | - | `azure.messaging.integration` | `aws.messaging.event-driven` | Covered |
| Observability | - | `azure.observability.monitoring` | `aws.observability.cloudwatch-xray` | Covered |
| Cost / FinOps | - | `azure.cost.optimization` | `aws.cost.optimization` | Covered |
| API Management / Gateway | - | `azure.api-management.design` | - | Covered (Azure-only) |
| Incident Triage | - | - | `aws.operations.incident-triage` | Covered (AWS-only) |

## Capability Inventory

### Cross-Cloud

1. `cloud.architecture.well-architected`
2. `cloud.security.threat-modeling`
3. `cloud.reliability.disaster-recovery`
4. `cloud.devops.cicd`

### Azure

1. `azure.iac.generate`
2. `azure.governance.policy-review`
3. `azure.identity.rbac-entra`
4. `azure.networking.vnet-connectivity`
5. `azure.security.posture`
6. `azure.compute.vm-vmss`
7. `azure.kubernetes.aks-operations`
8. `azure.serverless.functions-logicapps`
9. `azure.data.platform`
10. `azure.storage.design`
11. `azure.messaging.integration`
12. `azure.observability.monitoring`
13. `azure.cost.optimization`
14. `azure.api-management.design`

### AWS

1. `aws.architecture.review`
2. `aws.governance.multi-account`
3. `aws.identity.iam`
4. `aws.networking.vpc-connectivity`
5. `aws.security.posture`
6. `aws.compute.ec2-autoscaling`
7. `aws.kubernetes.eks-operations`
8. `aws.serverless.architecture`
9. `aws.data.rds-dynamodb`
10. `aws.storage.s3-efs`
11. `aws.messaging.event-driven`
12. `aws.observability.cloudwatch-xray`
13. `aws.cost.optimization`
14. `aws.operations.incident-triage`
15. `aws.reliability.disaster-recovery`
16. `aws.devops.cicd`

## Notes

- All capabilities in `mcpee.json` are wired with matching `specs`, `prompts`, `evals`, and `examples` files.
- Validation command: `npm run validate`.
- Manifest reference integrity command: `npm run validate:manifest`.
