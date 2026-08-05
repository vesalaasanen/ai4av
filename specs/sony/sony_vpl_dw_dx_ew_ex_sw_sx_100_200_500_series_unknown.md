---
spec_id: admin/sony-vpl-dw-dx-ew-ex-sw-sx-100-200-500-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony VPL DW DX EW EX SW SX 100 200 500 Series Control Spec"
manufacturer: Sony
model_family: VPL-DW100
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - VPL-DW100
    - VPL-DW200
    - VPL-DW500
    - VPL-DX100
    - VPL-DX200
    - VPL-DX500
    - VPL-EW100
    - VPL-EW200
    - VPL-EW500
    - VPL-EX100
    - VPL-EX200
    - VPL-EX500
    - VPL-SW100
    - VPL-SW200
    - VPL-SW500
    - VPL-SX100
    - VPL-SX200
    - VPL-SX500
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sony.com
  - pro.sony
  - store.controlworks.com
source_urls:
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
  - https://pro.sony/s3/2018/07/05125823/Sony_Protocol-Manual_1st-Edition.pdf
  - https://pro.sony/s3/2018/07/19110602/Sony_Protocol-Manual_Supported-Command-List_1st-Edition-Revised-1.pdf
  - "https://store.controlworks.com/product_resources/documentation/ControlWorks%20Sony%20P2%20Protocol%20Module%20Help%20v1.pdf"
  - https://www.sony.com/electronics/support/res/manuals/W001/W0015153M.pdf
retrieved_at: 2026-06-18T09:05:02.121Z
last_checked_at: 2026-08-05T08:47:27.378Z
generated_at: 2026-08-05T08:47:27.378Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model list inferred from family token; source does not enumerate exact members. Verify against per-model Supported Command List."
  - "per-model command support matrix lives in separate \"Supported Command List\" doc, not in this source."
  - "firmware version compatibility not stated in source"
  - "ADCP unsolicited feedback events not documented in this source"
  - "populate from Supported Command List if obtained"
  - "no other unsolicited event notifications documented in this source"
  - "no multi-step sequences documented in this source"
  - "no high-voltage interlock or lamp-cooling lockout procedure stated in this source"
  - "exact model list in series not enumerated in source (family token inferred)"
  - "ADCP-specific command mnemonics not in this source (separate Supported Command List)"
  - "full PJ Control API method catalogue not in this source (separate Supported Command List)"
  - "SNMP OIDs / community strings not specified in this source"
  - "Crestron RoomView / DDDP / SDDP payload formats not specified (refer to vendor)"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:47:27.378Z
  matched_actions: 22
  action_count: 22
  confidence: medium
  summary: "All 22 spec actions match literal source tokens; transport params (port 53595, baud 38400, /sony base path) verified; every source-documented control command is represented. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-18
---

# Sony VPL DW DX EW EX SW SX 100 200 500 Series Control Spec

## Summary
Sony data/video projector series controllable via multiple protocols: ADCP (Advanced Display Control Protocol) text commands over RS-232C or TCP, PJLink class 1 over TCP, and PJ Control API (HTTP/JSON). Discovery via SDAP (UDP broadcast), DDDP (AMX), SDDP (Control4), plus Crestron Control and SNMP. This spec covers the protocol family described in the Sony "Protocol Manual (COMMON) 1st Edition (Revised 2)".

<!-- UNRESOLVED: model list inferred from family token; source does not enumerate exact members. Verify against per-model Supported Command List. -->
<!-- UNRESOLVED: per-model command support matrix lives in separate "Supported Command List" doc, not in this source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
# Source documents 4 transports: serial (RS-232C, ADCP), tcp (ADCP, PJLink),
# http (PJ Control API), udp (SDAP advertisement).
protocols:
  - serial
  - tcp
  - http
  - udp
serial:
  baud_rate: 38400
  data_bits: 8
  parity: even
  stop_bits: 1
  flow_control: none  # inferred: "No flow control" stated for serial channel
addressing:
  # ADCP TCP default port (source: section 4-2 ADCP protocol table)
  port: 53595
  # PJLink uses port 4352 (source: section 4-3 PJLink Specifications)
  # PJ Control API uses port 80, fixed (source: section 4-8-2)
  # SDAP advertisement uses UDP port 53862 (source: section 4-1)
  base_url: "http://<IP>/sony/"  # PJ Control API base path (source: section 4-8-2)
auth:
  # Mixed auth per protocol:
  # - ADCP: ON by default, password "Projector" default, SHA256(random+password)
  # - PJLink: optional, set via web screen, MD5(random+password) per PJLink std
  # - PJ Control API: pre-shared key in X-Auth-PSK header when enabled; level varies per method
  type: mixed  # source: sections 4-2, 4-3, 4-8-2
  notes: "ADCP default password 'Projector'. PJ Control API uses X-Auth-PSK header when enabled; auth levels (source 4-8-2): private=auth required (device-id class info), generic=auth required (control/status-change APIs), none=no auth. PJLink auth optional via web screen."
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWR / setPowerStatus / power on-off commands present
  - routable     # inferred: INPT input-switch commands present
  - queryable    # inferred: POWR? INPT? AVMT? ERST? LAMP? etc. query commands present
  - levelable    # inferred: ADCP numeric-value set/get syntax documented (relative --rel supported)
```

## Actions
```yaml
# Coverage note: source (Protocol Manual COMMON) documents protocol mechanics + PJLink
# command set + 2 PJ Control API methods. ADCP-specific command mnemonics live in the
# separate "Supported Command List" - UNRESOLVED here.

# === ADCP text-command format (no specific mnemonics in this source) ===
# Format templates - payload syntax documented but specific ADCP commands not listed here.

- id: adcp_set_string_value
  label: ADCP Set Selected Value (string)
  kind: action
  command: 'command "txt_param1"'
  params:
    - name: command
      type: string
      description: ADCP command mnemonic (see Supported Command List)
    - name: txt_param1
      type: string
      description: String value to set, enclosed in double quotes
  notes: "Return: ok. Source: section 4-2 ADCP command."

- id: adcp_set_numeric_value
  label: ADCP Set Numeric Value
  kind: action
  command: "command 88"
  params:
    - name: command
      type: string
      description: ADCP command mnemonic
    - name: value
      type: integer
      description: Numeric value (typed directly, no quotes)
  notes: "Return: ok. Source: section 4-2 ADCP command."

- id: adcp_set_numeric_relative
  label: ADCP Set Numeric Value (relative)
  kind: action
  command: "command --rel {delta}"
  params:
    - name: command
      type: string
      description: ADCP command mnemonic
    - name: delta
      type: integer
      description: Relative delta (negative for decrement)
  notes: "Return: ok. Source: section 4-2 ADCP command."

- id: adcp_get_value
  label: ADCP Get Value
  kind: query
  command: "command?"
  params:
    - name: command
      type: string
      description: ADCP command mnemonic
  notes: "Return: configured value (string in quotes, or numeric). Source: 4-2."

- id: adcp_get_range
  label: ADCP Get Settable Choice/Range
  kind: query
  command: "command? --range"
  params:
    - name: command
      type: string
      description: ADCP command mnemonic
  notes: "Return: [\"txt1\",\"txt2\"] for enum, or {\"min\":0,\"max\":100,\"step\":1} for numeric. Source: 4-2."

- id: adcp_get_info
  label: ADCP Get Command Info
  kind: query
  command: "command? --info"
  params:
    - name: command
      type: string
      description: ADCP command mnemonic
  notes: 'Return: {"type":"cmd_type","version":"1.0","range":[...]}. Source: 4-2.'

# === PJLink class 1 commands (source: section 4-3) ===
# Wire format: PJLink class1 standard prepends "%1" prefix and uses CR terminator.
# Source shows bare mnemonic + parameter; verbatim from source tables below.

- id: pjlink_powr_set
  label: PJLink Power Set
  kind: action
  command: "POWR {value}"
  params:
    - name: value
      type: integer
      description: "0 = Standby, 1 = Lamp ON"
      enum: [0, 1]
  notes: "Return: OK / ERR2 (out of range) / ERR3 (unacceptable period) / ERR4 (projector error). Source: 4-3 (1)."

- id: pjlink_powr_query
  label: PJLink Power Status Query
  kind: query
  command: "POWR ?"
  params: []
  notes: "Return: 0=Standby, 1=Lamp ON, 2=Cooling, 3=Warm-up, 4=Unacceptable, 5=Defect, or ERR4. Source: 4-3 (2)."

- id: pjlink_inpt_set
  label: PJLink Input Switch
  kind: action
  command: "INPT {value}"
  params:
    - name: value
      type: integer
      description: "1=RGB, 2=VIDEO, 3=DIGITAL, 4=STORAGE, 5=NETWORK (assignment model-dependent)"
      enum: [1, 2, 3, 4, 5, 11, 12, 21, 22, 31, 32, 41, 51]
  notes: "Extended params 11/12/21/22/31/32/41/51 documented in 4-3 (3). Returns OK/ERR2/ERR3/ERR4."

- id: pjlink_inpt_query
  label: PJLink Input Status Query
  kind: query
  command: "INPT ?"
  params: []
  notes: "Return: current input source No. or ERR3/ERR4. Source: 4-3 (4)."

- id: pjlink_avmt_set
  label: PJLink AV Mute Set
  kind: action
  command: "AVMT {value}"
  params:
    - name: value
      type: integer
      description: "10=video off, 11=video on, 20=audio off, 21=audio on, 30=both off, 31=both on"
      enum: [10, 11, 20, 21, 30, 31]
  notes: "Returns OK/ERR2/ERR3/ERR4. Source: 4-3 (5)."

- id: pjlink_avmt_query
  label: PJLink AV Mute Status Query
  kind: query
  command: "AVMT ?"
  params: []
  notes: "Return: 11/21/30/31 or ERR3/ERR4. Source: 4-3 (6)."

- id: pjlink_erst_query
  label: PJLink Error Status Query
  kind: query
  command: "ERST ?"
  params: []
  notes: "Return: 6-digit ABCDEF; each digit 0/1/2. Position: fan/lamp/temp/cover/filter/other. Source: 4-3 (7)."

- id: pjlink_lamp_query
  label: PJLink Lamp Count/Time Query
  kind: query
  command: "LAMP ?"
  params: []
  notes: "Return: lamp accumulative time + illuminated state per lamp (e.g. '40 1' or '40 1 20 0'). Source: 4-3 (8)."

- id: pjlink_inst_query
  label: PJLink Input Switch List Query
  kind: query
  command: "INST ?"
  params: []
  notes: "Return: space-separated source No. list (e.g. '21 22 31 32 33'). Source: 4-3 (9)."

- id: pjlink_name_query
  label: PJLink Projector Name Query
  kind: query
  command: "NAME ?"
  params: []
  notes: "Return: projector name string (max 64 chars) or space. Source: 4-3 (10)."

- id: pjlink_inf1_query
  label: PJLink Manufacturer Name Query
  kind: query
  command: "INF1 ?"
  params: []
  notes: "Return: manufacturer name (SONY). Source: 4-3 (11)."

- id: pjlink_inf2_query
  label: PJLink Model Name Query
  kind: query
  command: "INF2 ?"
  params: []
  notes: "Return: model name (max 32 chars). Source: 4-3 (12)."

- id: pjlink_info_query
  label: PJLink Other Information Query
  kind: query
  command: "INFO ?"
  params: []
  notes: "Return: desired information (max 32 chars) or space. Source: 4-3 (13)."

- id: pjlink_clss_query
  label: PJLink Class Information Query
  kind: query
  command: "CLSS ?"
  params: []
  notes: 'Return: "1" (class 1). Source: 4-3 (14).'

# === PJ Control API (HTTP/JSON) - methods documented in source 4-8 ===

- id: pjctrl_setPowerStatus
  label: PJ Control API Set Power Status
  kind: action
  command: 'POST http://<IP>/sony/system  body: {"method":"setPowerStatus","params":[{"status":{status}}],"version":"1.0","id":1}'
  params:
    - name: status
      type: boolean
      description: "true = power on, false = standby"
  notes: "Requires auth header X-Auth-PSK when enabled (auth level 'generic'). Returns {\"result\":[],\"id\":1}. Source: 4-8."

- id: pjctrl_getPowerStatus
  label: PJ Control API Get Power Status
  kind: query
  command: 'POST http://<IP>/sony/system  body: {"method":"getPowerStatus","params":[],"version":"1.0","id":1}'
  params: []
  notes: "Auth level 'none' - pre-shared key not required. Returns {\"result\":[{\"status\":\"active\"}],\"id\":1}. Source: 4-8."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, lamp_on, cooling, warm_up, unacceptable, defect]
  source: PJLink POWR? response (section 4-3)
- id: input_source
  type: enum
  values: [RGB, VIDEO, DIGITAL, STORAGE, NETWORK]
  source: PJLink INPT? response (section 4-3)
- id: av_mute_state
  type: enum
  values: [video_on, video_off, audio_on, audio_off, both_on, both_off]
  source: PJLink AVMT? response (section 4-3)
- id: lamp_time
  type: object
  description: "Lamp accumulative time (0-65535) + illuminated state per lamp"
  source: PJLink LAMP? response (section 4-3)
- id: error_status
  type: string
  description: "6-digit error code: fan/lamp/temp/cover/filter/other, each 0/1/2"
  source: PJLink ERST? response (section 4-3)
# UNRESOLVED: ADCP unsolicited feedback events not documented in this source
```

## Variables
```yaml
# Source documents ADCP generic parameter set/get mechanics but no specific
# settable variables (lamp hours, brightness, etc. live in Supported Command List).
# UNRESOLVED: populate from Supported Command List if obtained
```

## Events
```yaml
# SDAP advertisement broadcast (UDP 53862, every 30s) carries:
#   category (projector = 0Ah), equipment name (max 12 chars), serial number,
#   install location (max 24 chars), community (4 bytes), power status (FFFFh on comm error)
# Packet layout (source 4-1-1): HEADER(4) + COMMUNITY(4) + PRODUCT NAME(12) +
#   SERIAL NO.(4) + POWER STATUS(2) + LOCATION(24). HEADER = ID(2, fixed 4441h) + VERSION(1, 01h) + CATEGORY(1, 0Ah).
# Treated as discovery beacon, not a command-channel event.
# UNRESOLVED: no other unsolicited event notifications documented in this source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in this source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Command entry cancelled if 60s elapse without newline (source: 4-2-2 Prescription)"
  - "Must wait for response before sending next command; multi-controller concurrent control prohibited (source: 4-2-2)"
  - "When Standby Mode=Low or Network Mgmt=Off, first command after standby returns err_cmd; resend. VPL-GTZ/VW/HW series: wait up to 10s then resend (source: 4-2-2)"
  - "Values not reflected if input signal unstable (source: 4-2-2)"
  - "PJLink: max 1 controller connected simultaneously; concurrent connections not supported (source: 4-3 Specifications)"
  - "PJ Control API request body max 1024 bytes; non-JSON body returns 'JSON Format Error' (source: 4-8-2)"
timing:
  command_response_wait_ms: "30-1000 typical (source: 4-2-2)"
  adcp_tcp_timeout_s: 60
  pjctrl_request_timeout_s: 30
  pjctrl_max_body_bytes: 1024
# UNRESOLVED: no high-voltage interlock or lamp-cooling lockout procedure stated in this source
```

## Notes
- Source: Sony "DATA PROJECTOR VIDEO PROJECTOR PROTOCOL MANUAL (COMMON) 1st Edition (Revised 2)". Path: `docs/pdfs/sony_vpl_dw_dx_ew_ex_sw_sx_100_200_500_series_unknown.refined.md`
- Source covers protocol family generically. Per-model command support lives in separate "Protocol Manual (SUPPORTED COMMAND LIST)" — not ingested here.
- ADCP character code US-ASCII; newline CR+LF (0x0D 0x0A); max command size 512 bytes incl. newline.
- ADCP errors: `ok`, `err_cmd`, `err_option`, `err_inactive`, `err_val`, `err_auth`, `err_internal1`, `err_internal2`.
- PJLink errors: `OK`, `ERR2` (param), `ERR3` (unacceptable period), `ERR4` (projector error); auth fail returns `PJLINK ERRA`.
- PJ Control API errors: HTTP 400/403/404/413/414/501/503; JSON `error: [code, msg]` codes 1/2/3/5/7/12/14/15.
- Serial cable: D-Sub 9-pin cross (reverse), pins 2=RxD, 3=TxD, 5=GND, FG=GND; max 15m.
- Standby mode "Standard" or Network Mgmt "ON" required for comms during standby.
- Discovery protocols (not command channels): SDAP (UDP 53862, Sony), DDDP (AMX), SDDP (Control4), Crestron RoomView, SNMP. IPv6 not supported on DDDP/SDDP/Crestron/SNMP.

<!-- UNRESOLVED: exact model list in series not enumerated in source (family token inferred) -->
<!-- UNRESOLVED: ADCP-specific command mnemonics not in this source (separate Supported Command List) -->
<!-- UNRESOLVED: full PJ Control API method catalogue not in this source (separate Supported Command List) -->
<!-- UNRESOLVED: SNMP OIDs / community strings not specified in this source -->
<!-- UNRESOLVED: Crestron RoomView / DDDP / SDDP payload formats not specified (refer to vendor) -->

## Provenance

```yaml
source_domains:
  - sony.com
  - pro.sony
  - store.controlworks.com
source_urls:
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
  - https://pro.sony/s3/2018/07/05125823/Sony_Protocol-Manual_1st-Edition.pdf
  - https://pro.sony/s3/2018/07/19110602/Sony_Protocol-Manual_Supported-Command-List_1st-Edition-Revised-1.pdf
  - "https://store.controlworks.com/product_resources/documentation/ControlWorks%20Sony%20P2%20Protocol%20Module%20Help%20v1.pdf"
  - https://www.sony.com/electronics/support/res/manuals/W001/W0015153M.pdf
retrieved_at: 2026-06-18T09:05:02.121Z
last_checked_at: 2026-08-05T08:47:27.378Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:47:27.378Z
matched_actions: 22
action_count: 22
confidence: medium
summary: "All 22 spec actions match literal source tokens; transport params (port 53595, baud 38400, /sony base path) verified; every source-documented control command is represented. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model list inferred from family token; source does not enumerate exact members. Verify against per-model Supported Command List."
- "per-model command support matrix lives in separate \"Supported Command List\" doc, not in this source."
- "firmware version compatibility not stated in source"
- "ADCP unsolicited feedback events not documented in this source"
- "populate from Supported Command List if obtained"
- "no other unsolicited event notifications documented in this source"
- "no multi-step sequences documented in this source"
- "no high-voltage interlock or lamp-cooling lockout procedure stated in this source"
- "exact model list in series not enumerated in source (family token inferred)"
- "ADCP-specific command mnemonics not in this source (separate Supported Command List)"
- "full PJ Control API method catalogue not in this source (separate Supported Command List)"
- "SNMP OIDs / community strings not specified in this source"
- "Crestron RoomView / DDDP / SDDP payload formats not specified (refer to vendor)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
