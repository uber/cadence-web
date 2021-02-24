---
date: 2021-02-25T07:00:02
feed:
  enable: true
---

## Cadence Server & CLI v0.18.0
### Notes
- **Allow using Kafka TLS without cert ca and key (#3862)**
`EnableHostVerification` started to be used for Kafka TLS, by default it’s false and which means `InSecureSkipVerify` is true for Kafka TLS. But previously `InSecureSkipVerify` is false. If you want to keep the same behavior, please update your config to set `EnableHostVerification` to be true. It won’t break anything if not doing so, but may be risky to not verify it. This option is basically the inverse of InSecureSkipVerify. See http://golang.org/pkg/crypto/tls/ for more info.

- **Support visibility query with close status represented in string (#3865)**
Advanced workflow visibility record query syntax now supports using string as workflow close status. Accepted values are: `COMPLETED`, `FAILED`, `CANCELED`, `TERMINATED`, `CONTINUED_AS_NEW` and `TIMED_OUT`, case insensitive.

### New Features & Improvements
- GRPC
- Task Processing
- Replication
- Scanner
- Workflow Reset
- ElasticSearch
- Kafka
- SQL
- Others
- Misc.

<release-notes-link
  owner="uber"
  repo="cadence"
  tag="v0.18.0"
/>

## Cadence Server & CLI v0.17.0
### Release note: Upgrade Cadence server to the latest 0.16.x release prior to deploying this release.

0.17 has a change that is not compatible with releases before 0.15. Upgrading from <=0.15 releases directly to 0.17 would cause StartWorkflowExecution and SignalWithStartWorkflowExecution APIs to return errors with workflow ID re-use scenario during the server upgrade. Please consider upgrade the Cadence server to the latest 0.16.x release before deploying this release.

### New Features & Improvements
- ElasticSearch
- Multi-tenant Task Processing Improvements
- Graceful Domain Failover and Replication related improvements
- Scanner
- GRPC
- Activity Local Dispatch
- Others
- Misc.

<release-notes-link
  owner="uber"
  repo="cadence"
  tag="v0.17.0"
/>

## Cadence Server & CLI v0.16.0
### Breaking Change
This release contains a breaking change in workflow metadata. This change has been enabled since 0.14 release. If your workflow could be open for 6+ months or you upgrade to this release from 0.13 or below, please follow the [migration instruction](https://github.com/uber/cadence/blob/master/RELEASES.md).

### Breaking Change on config for MySQL/Postgres
It's required to add
```
        encodingType: "thriftrw"
        decodingTypes: [ "thriftrw" ]
````
to persistence configuration like in this [example](https://github.com/uber/cadence/commit/b2464b709fc91c453b2e21c7092e658f6112b76f#diff-019c991260a37dc5f2cc86170b07b43284cc2f66ea636cfeb00cd0a92f9639d1R17)

Note that this requirement is removed in later in 0.18.

### Schema Change
- Cassandra `cadence` keyspace update from v0.29 to **v0.30**

### New Features
- Add task token to activityDispatchInfo for worker (#3672)
- Populate activityDispatchInfo with timestamps needed for local activity dispatch by worker (#3669)
- Update idls to use ActivityLocalDispatchInfo (#3668)
- Other improvements & bugfixes

<release-notes-link
  owner="uber"
  repo="cadence"
  tag="v0.16.0"
/>

## Cadence Server & CLI v0.15.0
### Schema Change
- Cassandra `cadence` keyspace update from v0.28 to **v0.29**

### New Features
- Multi-tenant Task Processing Improvements
- Graceful Domain Failover and Replication related improvements
- Managed Failover
- Scanner
- GRPC
- Bug Fix & Improvements
- Misc.

<release-notes-link
  owner="uber"
  repo="cadence"
  tag="v0.15.0"
/>

## Cadence Server & CLI v0.14.0
### Schema Change
- Cassandra `cadence` keyspace update from v0.27 to **v0.28**

### New features
- Multi-tenant Task Processing Improvements
- DB Scanner
- Replication
- Domain tag
- Bug Fix & Improvements

<release-notes-link
  owner="uber"
  repo="cadence"
  tag="v0.14.0"
/>
