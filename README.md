# @sertxito/mcpee-cloud

Boost cloud para MCPEE centrado en Azure y AWS.

## Overview

Este paquete agrupa agentes, skills, instrucciones y artefactos de calidad para acelerar diseño, revisión y troubleshooting cloud enterprise en dos proveedores:

- Azure
- AWS

El objetivo de la versión `0.1.0` es dejar una base sólida y coherente de capacidades cloud reales, conectadas por `mcpee.json`.

## Features

- Capacidades cloud iniciales en arquitectura, IaC, gobernanza, integración, incident response y DevOps.
- Especialistas por proveedor (Azure y AWS) reutilizando agentes ya curados del repositorio.
- Soporte para workflows de calidad mediante prompts, specs, evals y ejemplos por capability.
- Validación automática de referencias para evitar rutas rotas en el manifiesto.

## Quick Start

```bash
npm install @mcpee/core
npm install @sertxito/mcpee-cloud
npx mcpee doctor
```

Validar el contenido del boost localmente:

```bash
npm run validate
```

## Structure

```text
agents/        -> especialistas por dominio
skills/        -> procedimientos operativos
instructions/  -> guías y buenas prácticas
prompts/       -> plantillas de interacción por capability
specs/         -> criterios técnicos y checklists
evals/         -> criterios de evaluación
examples/      -> ejemplos de salida esperada
mcpee.json     -> manifiesto de capacidades
```

## Local Customization

No modificar contenido directamente en `node_modules/@sertxito/mcpee-cloud`.

Usar carpetas de customización en tu proyecto:

```text
.mcpee/generated-skills/cloud/
.mcpee/overrides/cloud/
.mcpee/knowledge/
.mcpee/memory/
```
