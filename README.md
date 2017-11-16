# Model Airbnb: Inventory Service

This project models an Airbnb inventory service for host listings and availability. The inventory service is a stand-alone service integrated in a service-oriented architecture that designates Amazon SQS to create a decoupled and high-throughput processing pipeline. Information about host listings and availability is received via HTTP from the app server, and stored in the database. The inventory service consumes information about booked listings from the user behavior service and publishes additional listing information to the recommendations service. All updates to host listings regarding availability are published to the search service. 

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

# Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [System Design](#system-design)

# Usage

> Usage instructions

# Requirements

- Node 8.2.0
- Express 4.16.2
- MySQL 2.15.0
- Amazon SQS
- Elasticsearch
- Logstash
- Kibana

# System Design
- [Server Architecture](./docs/Architecture.md)

