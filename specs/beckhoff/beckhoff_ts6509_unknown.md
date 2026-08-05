---
spec_id: admin/beckhoff-ts6509
schema_version: ai4av-public-spec-v1
revision: 1
title: "Beckhoff TS6509 Control Spec"
manufacturer: Beckhoff
model_family: TS6509
aliases: []
compatible_with:
  manufacturers:
    - Beckhoff
  models:
    - TS6509
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - download.beckhoff.com
  - infosys.beckhoff.com
source_urls:
  - https://download.beckhoff.com/download/Document/automation/twincat2/TS6509_TcPlcLibIEC61400_25Server_en.pdf
  - https://infosys.beckhoff.com/content/1033/tcplclibiec61400_25server/11681610507.html
retrieved_at: 2026-08-04T18:08:13.196Z
last_checked_at: 2026-08-05T08:07:27.749Z
generated_at: 2026-08-05T08:07:27.749Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "hardware voltage/current/power specs not stated in source. Exact PDU/session negotiation values are defaults configurable at deployment; only library defaults are documented."
  - "source does not document unsolicited notification payloads."
  - "source documents no multi-step command sequences as macros."
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware/hardware revision compatibility not stated (source references TwinCAT v2.10.0 Build >= 1340 as the PLC library build, not device firmware)."
  - "literal ASN.1 BER hex encodings for each MMS/ACSI service not provided in this source."
  - "hardware power/voltage/current specifications not present in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:07:27.749Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions map to ACSE/MMS services marked Y in the source conformance tables, plus the two PLC FB actions A_INIT and A_OPERATE. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-04
---

# Beckhoff TS6509 Control Spec

## Summary
The Beckhoff TS6509 is an Industrial/Embedded PC running the TwinCAT IEC 61850/IEC 61400-25 Server, providing a Server-Client communication interface over MMS (Manufacturing Message Specification) mapped onto TCP/IP (COTP, ISO 8073, port 102). This spec covers the implemented IEC 61850-7-2 ACSI services, supported MMS services, and the PLC function-block actions exposed by the TcIEC61850Server library.

<!-- UNRESOLVED: hardware voltage/current/power specs not stated in source. Exact PDU/session negotiation values are defaults configurable at deployment; only library defaults are documented. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 102  # COTP (ISO 8073), stated in ST_MMS_ProtocolPara.nPort default and firewall table
auth:
  type: optional  # source: bAccessCtrl default FALSE (disabled), configurable per-user password auth via ST_MMS_AccessControl
  notes: |
    Authentication is configurable. When bAccessCtrl=TRUE the server validates each
    association against ST_MMS_AccessControl entries (authentMechanism '2.2.3.1' =
    joint-isoccitt.2.3.1 = 52 03 01 hex; default password 'PASSWORD',
    MAX_MMS_PASSWORD_LENGTH=10). When FALSE, no authentication is performed.
```

## Traits
```yaml
# - queryable  # inferred: GetDataValues / GetAllDataValues / read query commands present
traits:
  - queryable
```

## Actions
```yaml
# IEC 61850-7-2 ACSI services marked Implemented = Y in the interoperability checklist.
# Each is a distinct row in the source "Client/server services supported" table.

- id: get_server_directory
  label: GetServerDirectory
  kind: query
  command: "GetServerDirectory"
  params: []

- id: associate
  label: Associate
  kind: action
  command: "Associate"
  params: []

- id: abort
  label: Abort
  kind: action
  command: "Abort"
  params: []

- id: release
  label: Release
  kind: action
  command: "Release"
  params: []

- id: get_logical_device_directory
  label: GetLogicalDeviceDirectory
  kind: query
  command: "GetLogicalDeviceDirectory"
  params: []

- id: get_logical_node_directory
  label: GetLogicalNodeDirectory
  kind: query
  command: "GetLogicalNodeDirectory"
  params: []

- id: get_all_data_values
  label: GetAllDataValues
  kind: query
  command: "GetAllDataValues"
  params: []

- id: get_data_values
  label: GetDataValues
  kind: query
  command: "GetDataValues"
  params: []

- id: set_data_values
  label: SetDataValues
  kind: action
  command: "SetDataValues"
  params: []

- id: get_data_directory
  label: GetDataDirectory
  kind: query
  command: "GetDataDirectory"
  params: []

- id: get_data_definition
  label: GetDataDefinition
  kind: query
  command: "GetDataDefinition"
  params: []

- id: create_data_set
  label: CreateDataSet
  kind: action
  command: "CreateDataSet"
  params: []

- id: delete_data_set
  label: DeleteDataSet
  kind: action
  command: "DeleteDataSet"
  params: []

- id: get_data_set_directory
  label: GetDataSetDirectory
  kind: query
  command: "GetDataSetDirectory"
  params: []

# MMS services marked Server-CR = Y in the "MMS conformance" table.
# Distinct rows in source; not collapsed with ACSI equivalents.

- id: mms_get_name_list
  label: MMS getNameList
  kind: query
  command: "getNameList"
  params: []

- id: mms_identify
  label: MMS identify
  kind: query
  command: "identify"
  params: []

- id: mms_read
  label: MMS read
  kind: query
  command: "read"
  params: []

- id: mms_write
  label: MMS write
  kind: action
  command: "write"
  params: []

- id: mms_get_variable_access_attributes
  label: MMS getVariableAccessAttributes
  kind: query
  command: "getVariableAccessAttributes"
  params: []

- id: mms_define_named_variable_list
  label: MMS defineNamedVariableList
  kind: action
  command: "defineNamedVariableList"
  params: []

- id: mms_get_named_variable_list_attributes
  label: MMS getNamedVariableListAttributes
  kind: query
  command: "getNamedVariableListAttributes"
  params: []

- id: mms_delete_named_variable_list
  label: MMS deleteNamedVariableList
  kind: action
  command: "deleteNamedVariableList"
  params: []

- id: mms_conclude
  label: MMS conclude
  kind: action
  command: "conclude"
  params: []

# PLC function-block (FB_IEC61850Server) actions. These are TwinCAT PLC-side
# state transitions, not wire commands, but the source documents them as the
# two discrete actions of the server block.

- id: plc_a_init
  label: FB_IEC61850Server A_INIT
  kind: action
  command: "A_INIT"
  params: []
  notes: "Transitions server IDLE -> INITIALIZING -> PREOP; initializes internal IEC 61850 object database."

- id: plc_a_operate
  label: FB_IEC61850Server A_OPERATE
  kind: action
  command: "A_OPERATE"
  params: []
  notes: "Transitions server PREOP -> OPERATIONAL; enables client connections and active data exchange."

# NOTE on UNRESOLVED payloads: The source is an IEC 61850/MMS server library
# manual. ACSI/MMS services are protocol service primitives whose on-wire
# encoding is ASN.1 BER (TcASN1.Lib) and is NOT given verbatim in this source.
# The literal hex byte payloads for each service are therefore UNRESOLVED;
# only the service/primitive names are documented here.
```

## Feedbacks
```yaml
- id: ied_state
  type: enum
  description: "Server operating state (E_IED_State output of FB_IEC61850Server.eState)"
  values:
    - eIED_STATE_IDLE  # 0
    - eIED_STATE_INITIALIZING
    - eIED_STATE_PREOP
    - eIED_STATE_OPERATIONAL
    - eIED_STATE_STOPPING

- id: mms_environment
  type: enum
  description: "MMS runtime environment status (E_MMS_Environment)"
  values:
    - eMMS_Environment_None  # 0, inactive
    - eMMS_Environment_Establishing
    - eMMS_Environment_Running
    - eMMS_Environment_Relinquishing

- id: authenticated_user
  type: boolean
  description: "ST_MMS_ApplicationAssociation.bAuthentUser - TRUE if association used an authentication password."
```

## Variables
```yaml
- id: max_pdu_size
  type: integer
  description: "ST_MMS_ApplicationPara.maxPDUsize - max byte length of the PDU (default 65000)."

- id: max_serv_out_calling
  type: integer
  description: "maxServOutCalling - max authorised unconfirmed MMS services at the calling system (default 10)."

- id: max_serv_out_called
  type: integer
  description: "maxServOutCalled - max authorised unconfirmed MMS services at the called system (default 10)."

- id: nesting_level
  type: integer
  description: "max interlacing depth of MMS object data (default 5)."

- id: tpdu_size
  type: enum
  description: "E_COTP_DUsize - max byte length of transport layer data segment (default eCOTP_DUsize_1024 = 1024 byte)."
  values: [128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768]

- id: local_host
  type: string
  description: "ST_MMS_ProtocolPara.sHost - local IPv4 server host address (default '127.0.0.1')."

- id: keepalive_time_ms
  type: integer
  description: "OS-level TCP KeepAliveTime (default 2 hours = 7200000 ms). OS registry setting, not a TwinCAT setting."

- id: keepalive_interval_ms
  type: integer
  description: "OS-level TCP KeepAliveInterval (default 1 second = 1000 ms). OS registry setting, not a TwinCAT setting."
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notification payloads.
# Report Control Block (Report / GetBRCBValues / GetURCBValues) and GOOSE publish
# services are marked N* (in development) / N in the interoperability checklist,
# so no unsolicited event emission is fully specified by this source.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences as macros.
# The example program in section 5.1.1.1 shows an init->operate PLC sequence but
# is application code, not a device-defined macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. IEC 61850 Control services (Select,
# SelectWithValue, Operate, Cancel, CommandTermination, TimeActivatedOperate)
# are all marked NOT implemented (N) in the interoperability checklist, so no
# control-command interlock semantics are specified by this source.
```

## Notes
- The TS6509 here functions as an IEC 61850/61400-25 server (publisher of a data model), not a conventional AV switcher/display. "Commands" are MMS/ACSI service primitives plus two TwinCAT PLC function-block actions (`A_INIT`, `A_OPERATE`).
- Transport stack (top to bottom): ACSI (TcACSI.Lib) -> MMS (TcMMS.Lib) -> ASN.1 BER (TcASN1.Lib) -> TwinCAT TCP/IP Connection Server -> COTP (ISO 8073) -> TCP port 102.
- MMS conformance: only the Server role is realized (Client-CR column is entirely N). Supported CBB params: STR1, STR2, VNAM, VALT, TPY, VLIS. Not supported: VADR, VSCA, REAL, CEI.
- GOOSE is partially supported (receive side, "Only GOOSE, not GSE Management") but all GOOSE conformance rows are marked N in the statement, so GOOSE control-block access is not exposed.
- Maximum coexistent Application-Associations = 1 (`MAX_MMS_APPLICATION_ASSOCIATIONS`); maximum user accounts = 4 (`MAX_MMS_ACCESS_CONTROL_USERS`).
- ACSI service errors are enumerated in `E_ACSI_ServiceError` (0x0000 success through 0x850B).
- TCP keep-alive values are OS-level registry settings (Windows W2K/XP/Embedded Standard and Windows CE paths given in Appendix 7.1), not TwinCAT configuration.

<!-- UNRESOLVED: firmware/hardware revision compatibility not stated (source references TwinCAT v2.10.0 Build >= 1340 as the PLC library build, not device firmware). -->
<!-- UNRESOLVED: literal ASN.1 BER hex encodings for each MMS/ACSI service not provided in this source. -->
<!-- UNRESOLVED: hardware power/voltage/current specifications not present in source. -->

## Provenance

```yaml
source_domains:
  - download.beckhoff.com
  - infosys.beckhoff.com
source_urls:
  - https://download.beckhoff.com/download/Document/automation/twincat2/TS6509_TcPlcLibIEC61400_25Server_en.pdf
  - https://infosys.beckhoff.com/content/1033/tcplclibiec61400_25server/11681610507.html
retrieved_at: 2026-08-04T18:08:13.196Z
last_checked_at: 2026-08-05T08:07:27.749Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:07:27.749Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions map to ACSE/MMS services marked Y in the source conformance tables, plus the two PLC FB actions A_INIT and A_OPERATE. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "hardware voltage/current/power specs not stated in source. Exact PDU/session negotiation values are defaults configurable at deployment; only library defaults are documented."
- "source does not document unsolicited notification payloads."
- "source documents no multi-step command sequences as macros."
- "source contains no safety warnings, interlock procedures, or"
- "firmware/hardware revision compatibility not stated (source references TwinCAT v2.10.0 Build >= 1340 as the PLC library build, not device firmware)."
- "literal ASN.1 BER hex encodings for each MMS/ACSI service not provided in this source."
- "hardware power/voltage/current specifications not present in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
