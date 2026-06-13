---
spec_id: admin/sony-kdxd8599-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDXD8599 Series Control Spec"
manufacturer: Sony
model_family: "KDXD8599 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDXD8599 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro.sony
  - pro-bravia.sony.net
source_urls:
  - https://pro.sony/s3/2018/07/05125823/Sony_Protocol-Manual_1st-Edition.pdf
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
retrieved_at: 2026-05-27T14:23:38.003Z
last_checked_at: 2026-06-12T19:52:54.082Z
generated_at: 2026-06-12T19:52:54.082Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source is Sony DATA PROJECTOR protocol manual used as fallback reference for KDXD8599. Full ADCP command catalogue not enumerated — only `power` example shown. Actual device command set may differ. ADCP system/menu/remote-key command lists absent from source."
  - "multiple services - ADCP=53595, PJLink=4352, SDAP=53862; no single port"
  - "ADCP supports SHA256 challenge-response (factory password \"Projector\"); PJLink supports digest auth (factory password \"JBMIAProjectorLink\"). Both configurable ON/OFF. Single auth.type cannot represent multi-protocol auth."
  - "ADCP unsolicited notifications / event push not documented in source"
  - "ADCP numeric parameter ranges described in format but specific settable"
  - "ADCP unsolicited events not documented in source"
  - "no multi-step sequences described in source"
  - "no power-on sequencing or interlock procedures documented beyond standby mode requirement"
  - "full ADCP command catalogue — system commands, menu commands, remote controller key commands not enumerated"
  - "SNMP MIB/OID details not documented"
  - "AMX DDDP, Control4 SDDP, Crestron Control details not documented beyond discovery mention"
  - "firmware version compatibility not stated"
  - "specific input names/mapping for INPT numeric values beyond category (1*=RGB, 2*=VIDEO, etc.)"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:52:54.082Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions match verbatim in source with correct transport parameters verified. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Sony KDXD8599 Series Control Spec

## Summary
Sony display supporting IP and RS-232C control via ADCP (Advanced Display Control Protocol) and PJLink Class 1, with SDAP (Simple Display Advertisement Protocol) for network discovery. ADCP provides system, menu, and remote-controller-emulation commands over TCP (port 53595) or serial (38400 bps). PJLink provides standardized projector control over TCP (port 4352). SDAP broadcasts device information over UDP (port 53862).

<!-- UNRESOLVED: Source is Sony DATA PROJECTOR protocol manual used as fallback reference for KDXD8599. Full ADCP command catalogue not enumerated — only `power` example shown. Actual device command set may differ. ADCP system/menu/remote-key command lists absent from source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - udp
addressing:
  port: null  # UNRESOLVED: multiple services - ADCP=53595, PJLink=4352, SDAP=53862; no single port
serial:
  baud_rate: 38400
  data_bits: 8
  parity: even
  stop_bits: 1
  flow_control: none
auth:
  type: none  # UNRESOLVED: ADCP supports SHA256 challenge-response (factory password "Projector"); PJLink supports digest auth (factory password "JBMIAProjectorLink"). Both configurable ON/OFF. Single auth.type cannot represent multi-protocol auth.
```

## Traits
```yaml
traits:
  - powerable  # inferred: POWR and power commands present
  - queryable  # inferred: multiple query commands (POWR?, INPT?, AVMT?, ERST?, LAMP?, etc.)
  - routable  # inferred: INPT input switching commands present
  - levelable  # inferred: ADCP numeric range setting format documented
```

## Actions
```yaml
actions:
  # === ADCP Commands ===
  # Source only shows `power "on"` as example. Full ADCP command catalogue not in source.
  - id: adcp_power_set
    label: ADCP Power Set
    kind: action
    protocol: adcp
    command: 'power "{state}"'
    params:
      - name: state
        type: string
        description: "Power state - e.g. \"on\", \"off\""
    response: ok
    notes: Only explicit ADCP command example in source. System, menu, and remote-key command catalogues not enumerated.

  - id: adcp_query_value
    label: ADCP Query Selected Value
    kind: query
    protocol: adcp
    command: "command?"
    params:
      - name: command
        type: string
        description: ADCP command name to query
    response: '"txt_param1"'
    notes: Generic ADCP query format - returns current value of named command.

  - id: adcp_query_range
    label: ADCP Query Settable Range
    kind: query
    protocol: adcp
    command: "command? --range"
    params:
      - name: command
        type: string
        description: ADCP command name to query range for
    response: '["txt_param1","txt_param2"] or {"min":0,"max":100,"step":1}'
    notes: Returns settable choices (text) or numeric range.

  - id: adcp_query_info
    label: ADCP Query Command Info
    kind: query
    protocol: adcp
    command: "command? --info"
    params:
      - name: command
        type: string
        description: ADCP command name to query info for
    response: '{"type":"cmd_type","version":"1.0","range":[...]}'

  # === PJLink Commands ===
  - id: pjlink_power_set
    label: PJLink Power Control
    kind: action
    protocol: pjlink
    command: "%1POWR {param}"
    params:
      - name: param
        type: integer
        enum: [0, 1]
        description: "0 = Standby, 1 = Lamp ON"
    response: "OK / ERR2 / ERR3 / ERR4"

  - id: pjlink_power_query
    label: PJLink Power Status Query
    kind: query
    protocol: pjlink
    command: "%1POWR ?"
    params: []
    response: "0=Standby, 1=Power ON, 2=Cooling, 3=Startup, ERR4=error"

  - id: pjlink_input_set
    label: PJLink Input Switch
    kind: action
    protocol: pjlink
    command: "%1INPT {param}"
    params:
      - name: param
        type: integer
        description: "Input number - 1*=RGB, 2*=VIDEO, 3*=DIGITAL, 4*=STORAGE, 5*=NETWORK. Second digit selects sub-input."
    response: "OK / ERR2 / ERR3 / ERR4"

  - id: pjlink_input_query
    label: PJLink Current Input Query
    kind: query
    protocol: pjlink
    command: "%1INPT ?"
    params: []
    response: "Current input number"

  - id: pjlink_avmt_set
    label: PJLink AV Mute Control
    kind: action
    protocol: pjlink
    command: "%1AVMT {param}"
    params:
      - name: param
        type: integer
        enum: [10, 11, 20, 21, 30, 31]
        description: "1X=video, 2X=audio, 3X=both. X0=off, X1=on"
    response: "OK / ERR2 / ERR3 / ERR4"

  - id: pjlink_avmt_query
    label: PJLink AV Mute Status Query
    kind: query
    protocol: pjlink
    command: "%1AVMT ?"
    params: []
    response: "11=video mute ON, 21=audio mute ON, 30=both OFF, 31=both ON"

  - id: pjlink_error_query
    label: PJLink Error Status Query
    kind: query
    protocol: pjlink
    command: "%1ERST ?"
    params: []
    response: "6-digit: fan/lamp/temperature/cover/filter/other. 0=no error, 1=warning, 2=error"

  - id: pjlink_lamp_query
    label: PJLink Lamp Status Query
    kind: query
    protocol: pjlink
    command: "%1LAMP ?"
    params: []
    response: "Lamp hours (0-65535) and illuminated state (1=lit, 0=unlit) per lamp"

  - id: pjlink_input_list_query
    label: PJLink Available Inputs Query
    kind: query
    protocol: pjlink
    command: "%1INST ?"
    params: []
    response: "Source numbers of switchable inputs"

  - id: pjlink_name_query
    label: PJLink Projector Name Query
    kind: query
    protocol: pjlink
    command: "%1NAME ?"
    params: []
    response: "Projector name (max 64 characters)"

  - id: pjlink_manufacturer_query
    label: PJLink Manufacturer Name Query
    kind: query
    protocol: pjlink
    command: "%1INF1 ?"
    params: []
    response: "Manufacturer name (e.g. SONY)"

  - id: pjlink_model_query
    label: PJLink Model Name Query
    kind: query
    protocol: pjlink
    command: "%1INF2 ?"
    params: []
    response: "Model name (max 32 characters)"

  - id: pjlink_info_query
    label: PJLink Other Info Query
    kind: query
    protocol: pjlink
    command: "%1INFO ?"
    params: []
    response: "Returns a space"

  - id: pjlink_class_query
    label: PJLink Class Query
    kind: query
    protocol: pjlink
    command: "%1CLSS ?"
    params: []
    response: "1 (PJLink Class 1)"

  # === SDAP ===
  # SDAP is broadcast-only discovery - no actionable commands. Device sends
  # category, name, serial, location, community, power status via UDP port 53862
  # every 30 seconds. No controller-initiated commands documented.
```

## Feedbacks
```yaml
feedbacks:
  - id: adcp_response_ok
    type: enum
    values: [ok]
    description: ADCP normal command completion

  - id: adcp_response_error
    type: enum
    values: [err_cmd, err_option, err_inactive, err_val, err_auth, err_internal1, err_internal2]
    description: "ADCP error responses - command format error, option error, temporarily invalidated, value out of range, auth failure, internal comm error 1/2"

  - id: pjlink_power_state
    type: enum
    values: ["0", "1", "2", "3", "ERR4"]
    description: "PJLink POWR? response - 0=Standby, 1=Power ON, 2=Cooling, 3=Startup, ERR4=error"

  - id: pjlink_avmt_state
    type: enum
    values: ["11", "21", "30", "31"]
    description: "PJLink AVMT? response - video/audio muting state"

  - id: pjlink_error_status
    type: string
    description: "6-digit error status from ERST? - fan/lamp/temp/cover/filter/other"

  - id: pjlink_lamp_status
    type: string
    description: "Lamp hours and illuminated state per lamp"

  - id: sdap_broadcast
    type: object
    description: "SDAP periodic UDP broadcast - category, equipment name, serial number, installation info, community, power status"
    notes: Sent every 30 seconds on UDP port 53862. No subscription needed.

  # UNRESOLVED: ADCP unsolicited notifications / event push not documented in source
```

## Variables
```yaml
# UNRESOLVED: ADCP numeric parameter ranges described in format but specific settable
# variables not enumerated in source beyond the generic command/format description.
```

## Events
```yaml
events:
  - id: sdap_advertisement
    description: "SDAP broadcast packet sent every 30 seconds (factory default) on UDP 53862. Contains category, equipment name, serial number, location, community, power status."
    trigger: periodic

  # UNRESOLVED: ADCP unsolicited events not documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Standby mode must be set to \"Standard\" or \"Network management\" set to \"ON\" for serial/network control during standby. Low standby mode or network management OFF returns err_cmd."
  - description: "ADCP: must receive response before sending next command. Sending without waiting causes reception failure."
  - description: "ADCP: command entry timeout of 60 seconds - incomplete commands are discarded."
# UNRESOLVED: no power-on sequencing or interlock procedures documented beyond standby mode requirement
```

## Notes
- Source document is Sony DATA PROJECTOR protocol manual — may not fully cover KDXD8599 Series consumer TV.
- ADCP max command size: 512 bytes including newline. Command/parameter delimited by space (0x20). Newline: CR+LF (0x0D+0x0A). Character code: US-ASCII.
- ADCP command response wait: approximately 30–1000 ms.
- ADCP supports serial and network connections. Network auth uses SHA256 hash of (random number + password).
- PJLink Class 1 only. Max 1 simultaneous controller connection. Port 4352.
- SDAP category byte for projector: 0x0A. Power status FFFFh on communication error.
- IPv6 not supported for AMX DDDP, Control4 SDDP, Crestron, or SNMP.

<!-- UNRESOLVED: full ADCP command catalogue — system commands, menu commands, remote controller key commands not enumerated -->
<!-- UNRESOLVED: SNMP MIB/OID details not documented -->
<!-- UNRESOLVED: AMX DDDP, Control4 SDDP, Crestron Control details not documented beyond discovery mention -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: specific input names/mapping for INPT numeric values beyond category (1*=RGB, 2*=VIDEO, etc.) -->

## Provenance

```yaml
source_domains:
  - pro.sony
  - pro-bravia.sony.net
source_urls:
  - https://pro.sony/s3/2018/07/05125823/Sony_Protocol-Manual_1st-Edition.pdf
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
retrieved_at: 2026-05-27T14:23:38.003Z
last_checked_at: 2026-06-12T19:52:54.082Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:52:54.082Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions match verbatim in source with correct transport parameters verified. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source is Sony DATA PROJECTOR protocol manual used as fallback reference for KDXD8599. Full ADCP command catalogue not enumerated — only `power` example shown. Actual device command set may differ. ADCP system/menu/remote-key command lists absent from source."
- "multiple services - ADCP=53595, PJLink=4352, SDAP=53862; no single port"
- "ADCP supports SHA256 challenge-response (factory password \"Projector\"); PJLink supports digest auth (factory password \"JBMIAProjectorLink\"). Both configurable ON/OFF. Single auth.type cannot represent multi-protocol auth."
- "ADCP unsolicited notifications / event push not documented in source"
- "ADCP numeric parameter ranges described in format but specific settable"
- "ADCP unsolicited events not documented in source"
- "no multi-step sequences described in source"
- "no power-on sequencing or interlock procedures documented beyond standby mode requirement"
- "full ADCP command catalogue — system commands, menu commands, remote controller key commands not enumerated"
- "SNMP MIB/OID details not documented"
- "AMX DDDP, Control4 SDDP, Crestron Control details not documented beyond discovery mention"
- "firmware version compatibility not stated"
- "specific input names/mapping for INPT numeric values beyond category (1*=RGB, 2*=VIDEO, etc.)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
