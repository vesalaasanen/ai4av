---
spec_id: admin/atlona-at-hdr-h2h-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-HDR-H2H Series Control Spec"
manufacturer: Atlona
model_family: AT-HDR-H2H-88MA
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-HDR-H2H-88MA
    - AT-HDR-H2H-44MA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-HDR-H2H-44MA_API.pdf
  - https://atlona.com/pdf/AT-HDR-H2H-88MA_API.pdf
  - https://atlona.com/downloads/drivers/C4IPRS_AT-HDR-H2H-44MA.zip
  - https://atlona.com/downloads/drivers/C4IPRS_AT-HDR-H2H-88MA.zip
  - https://atlona.com/downloads/drivers/Crestron_AT-UHD-H2H-44M.zip
retrieved_at: 2026-04-29T10:51:10.877Z
last_checked_at: 2026-07-12T08:45:03.403Z
generated_at: 2026-07-12T08:45:03.403Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Safety warnings and interlock procedures not present in source."
  - "not stated in source"
  - "no unsolicited event notifications described in source"
  - "no explicit multi-step sequences documented"
  - "no safety warnings or interlock procedures in source"
  - "flow_control not stated in source."
  - "Telnet/HTTP selection mechanism not documented."
  - "HDCP compliance level / version not stated."
  - "CEC command storage mechanism not documented (TrigCEC triggers \"stored CEC command\" but how to store is not in source)."
verification:
  verdict: verified
  checked_at: 2026-07-12T08:45:03.403Z
  matched_actions: 38
  action_count: 38
  confidence: medium
  summary: "All 38 spec actions matched verbatim in source; transport parameters (port 23, serial 115200 8N1) supported; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-12
---

# Atlona AT-HDR-H2H Series Control Spec

## Summary
HDMI matrix switcher supporting 4K HDR video routing. Control via TCP/IP (Telnet daemon on port 23, HTTP on port 80) and RS-232 (configurable via CSpara command). Commands are case-sensitive, terminated with CR (0x0d); feedback terminated with CR+LF (0x0a). Login mode disabled by default; no password required unless IPLogin is enabled.

<!-- UNRESOLVED: Safety warnings and interlock procedures not present in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # Telnet port stated in IPCFG feedback ("IP Port: 23") and System feedback ("Telnet Port: 23"); HTTP Port: 80 stated in System feedback
serial:
  baud_rate: 115200  # from CSpara[sta] status-query feedback example "CSpara [115200,8,0,1]"
  data_bits: 8  # from CSpara[sta] feedback example
  parity: none  # from CSpara[sta] feedback example (numeric 0 = None); configurable via CSpara
  stop_bits: 1  # from CSpara[sta] feedback example
  flow_control: null  # UNRESOLVED: not stated in source
auth:
  type: none  # inferred: IPLogin disabled by default, no auth required to operate
```

## Traits
```yaml
- powerable  # PWON, PWOFF, PWSTA present
- routable  # x?AVx& routing commands present
- queryable  # Status, PWSTA, IRSTA, IPCFG, etc. present
- levelable  # VOUTMute, TrigCEC (vol+/vol-/mute) present
```

## Actions
```yaml
- id: all_reset
  label: Reset All Inputs to Corresponding Outputs
  kind: action
  command: "All#"
  params: []

- id: blink
  label: Set Power Button LED Blink
  kind: action
  command: "Blink {value}"
  params:
    - name: value
      type: string
      description: LED blink state
      values:
        - on
        - off
        - sta

- id: broadcast
  label: Set Broadcast Mode
  kind: action
  command: "Broadcast {value}"
  params:
    - name: value
      type: string
      description: Broadcast state
      values:
        - on
        - off
        - sta

- id: clear_preset
  label: Clear Saved I/O Route Preset
  kind: action
  command: "Clear{preset}"
  params:
    - name: preset
      type: integer
      description: Preset number
      range: 1-8

- id: cspara
  label: Set RS-232 Parameters
  kind: action
  command: "CSpara[{baud_rate},{data_bits},{parity},{stop_bits}]"  # use "CSpara[sta]" to query; parity passed as numeric (0=None,1=Odd,2=Even) per source example CSpara[115200,8,0,1]
  params:
    - name: baud_rate
      type: integer
      description: Baud rate
      values:
        - 2400
        - 4800
        - 9600
        - 19200
        - 38400
        - 57600
        - 115200
    - name: data_bits
      type: integer
      description: Data bits
      values:
        - 7
        - 8
    - name: parity
      type: string
      description: Parity bit
      values:
        - None
        - Odd
        - Even
    - name: stop_bits
      type: integer
      description: Stop bits
      values:
        - 1
        - 2

- id: edid_mset
  label: Set Input EDID
  kind: action
  command: "EDIDMSet{input} {edid_type}"  # for save/int types append slot number, e.g. EDIDMSet2 save2, EDIDMSet3 int3; default takes no number
  params:
    - name: input
      type: integer
      description: Input number
      range: 1-4
    - name: edid_type
      type: string
      description: EDID type
      values:
        - default
        - save
        - int
    - name: value
      type: integer
      description: Memory slot (save 1-4, int 1-14)

- id: edid_out
  label: Save Output EDID to Memory
  kind: action
  command: "EDIDOut{output} mem{memory}"
  params:
    - name: output
      type: integer
      description: Output number
      range: 1-4
    - name: memory
      type: integer
      description: Memory slot
      range: 1-4

- id: hdcpset
  label: Set HDCP Mode
  kind: action
  command: "HDCPSet{input} {value}"
  params:
    - name: input
      type: integer
      description: Input number
      range: 1-4
    - name: value
      type: string
      description: HDCP state
      values:
        - on
        - off
        - sta

- id: ip_add_user
  label: Add TCP/IP User
  kind: action
  command: "IPAddUser {username} {password}"
  params:
    - name: username
      type: string
      description: User name (max 20 chars)
    - name: password
      type: string
      description: Password (max 20 chars)

- id: ipcfg
  label: Display IP Configuration
  kind: action
  command: "IPCFG"
  params: []

- id: ip_del_user
  label: Delete TCP/IP User
  kind: action
  command: "IPDelUser {username}"
  params:
    - name: username
      type: string
      description: User name

- id: ipdhcp
  label: Set DHCP Mode
  kind: action
  command: "IPDHCP {value}"
  params:
    - name: value
      type: string
      description: DHCP state
      values:
        - on
        - off
        - sta

- id: iplogin
  label: Enable/Disable IP Login Mode
  kind: action
  command: "IPLogin {value}"
  params:
    - name: value
      type: string
      description: Login mode state
      values:
        - on
        - off
        - sta

- id: ipport
  label: Set TCP/IP Port
  kind: action
  command: "IPPort {port}"
  params:
    - name: port
      type: integer
      description: TCP/IP port number
      range: 1-65535

- id: ipquit
  label: Log Out of TCP/IP
  kind: action
  command: "IPQuit"
  params: []

- id: ipstatic
  label: Set Static IP Address
  kind: action
  command: "IPStatic {ip_address} {subnet_mask} {gateway}"
  params:
    - name: ip_address
      type: string
      description: Static IP address
    - name: subnet_mask
      type: string
      description: Subnet mask
    - name: gateway
      type: string
      description: Gateway/router address

- id: iptimeout
  label: Set TCP/IP Inactivity Timeout
  kind: action
  command: "IPTimeout {seconds}"
  params:
    - name: seconds
      type: integer
      description: Timeout in seconds
      range: 1-600

- id: ir_off
  label: Disable Front Panel IR Receiver
  kind: action
  command: "IROFF"
  params: []

- id: ir_on
  label: Enable Front Panel IR Receiver
  kind: action
  command: "IRON"
  params: []

- id: irsta
  label: Display IR Status
  kind: action
  command: "IRSTA"
  params: []

- id: lock
  label: Lock Front Panel
  kind: action
  command: "Lock"
  params: []

- id: mreset
  label: Reset Matrix to Default Settings
  kind: action
  command: "Mreset"
  params: []

- id: pw_off
  label: Power Off
  kind: action
  command: "PWOFF"
  params: []

- id: pw_on
  label: Power On
  kind: action
  command: "PWON"
  params: []

- id: pwsta
  label: Display Power Status
  kind: action
  command: "PWSTA"
  params: []

- id: recall
  label: Recall I/O Route Preset
  kind: action
  command: "Recall{preset}"
  params:
    - name: preset
      type: integer
      description: Preset number
      range: 1-8

- id: save
  label: Save I/O Route Settings
  kind: action
  command: "Save{preset}"
  params:
    - name: preset
      type: integer
      description: Preset number
      range: 1-8

- id: status
  label: Display I/O Routing Status
  kind: action
  command: "Status"
  params: []

- id: system
  label: Display System Information
  kind: action
  command: "System {value}"
  params:
    - name: value
      type: string
      description: Must be sta

- id: telnet
  label: Enable/Disable Telnet Daemon
  kind: action
  command: "Telnet {value}"
  params:
    - name: value
      type: string
      description: Telnet daemon state
      values:
        - on
        - off
        - sta

- id: trig_cec
  label: Trigger CEC Command
  kind: action
  command: "TrigCEC {value}"
  params:
    - name: value
      type: string
      description: CEC command
      values:
        - on
        - off
        - vol+
        - vol-
        - mute

- id: type
  label: Display Model Information
  kind: action
  command: "Type"
  params: []

- id: unlock
  label: Unlock Front Panel
  kind: action
  command: "Unlock"
  params: []

- id: version
  label: Display Firmware Version
  kind: action
  command: "Version{component}"
  params:
    - name: component
      type: string
      description: Component (MCU)

- id: vout_mute
  label: Mute/Unmute Audio Output
  kind: action
  command: "VOUTMute{channel} {value}"
  params:
    - name: channel
      type: integer
      description: Audio output channel
      range: 1-4
    - name: value
      type: string
      description: Mute state
      values:
        - on
        - off
        - sta

- id: input_to_all_outputs
  label: Route Input to All Outputs
  kind: action
  command: "x{input}All"
  params:
    - name: input
      type: integer
      description: Input number
      range: 1-4

- id: output_status
  label: Get Output Channel Status
  kind: action
  command: "x{output}$ {value}"
  params:
    - name: output
      type: integer
      description: Output number
      range: 1-4
    - name: value
      type: string
      description: Request type
      values:
        - on
        - of
        - sta

- id: route_input_to_output
  label: Route Input to Output
  kind: action
  command: "x{input}AVx{output}"
  params:
    - name: input
      type: integer
      description: Input number
      range: 1-4
    - name: output
      type: integer
      description: Output number
      range: 1-4
```

## Feedbacks
```yaml
- id: all_reset_feedback
  type: string
  description: Returns routing map x1AVx1,...x8AVx8

- id: blink_feedback
  type: enum
  values:
    - Blink of
    - Blink on

- id: broadcast_feedback
  type: enum
  values:
    - Broadcast on
    - Broadcast of

- id: clear_feedback
  type: string
  description: Echoes Clear command with preset number

- id: cspara_feedback
  type: string
  description: Echoes CSpara command with current parameters

- id: edid_mset_feedback
  type: string
  description: Echoes EDIDMSet command with parameters

- id: edid_out_feedback
  type: string
  description: Echoes EDIDOut command with parameters

- id: hdcpset_feedback
  type: enum
  values:
    - HDCPSet1 on
    - HDCPSet1 of

- id: ipcfg_feedback
  type: string
  description: IP Addr, Netmask, Gateway, IP Port

- id: iplogin_feedback
  type: enum
  values:
    - IPLogin of
    - IPLogin on

- id: ipport_feedback
  type: string
  description: Echoes port number

- id: ipdhcp_feedback
  type: enum
  values:
    - IPDHCP on
    - IPDHCP of

- id: ipstatic_feedback
  type: string
  description: Echoes IPStatic command with parameters

- id: iptimeout_feedback
  type: string
  description: Echoes timeout value

- id: ir_off_feedback
  type: string
  description: IROFF

- id: ir_on_feedback
  type: string
  description: IRON

- id: irsta_feedback
  type: enum
  values:
    - IRON
    - IROFF

- id: lock_feedback
  type: string
  description: Lock

- id: mreset_feedback
  type: string
  description: Mreset

- id: pw_off_feedback
  type: string
  description: PWOFF

- id: pw_on_feedback
  type: string
  description: PWON

- id: pwsta_feedback
  type: enum
  values:
    - PWON
    - PWOFF

- id: recall_feedback
  type: string
  description: Echoes Recall command with preset number

- id: save_feedback
  type: string
  description: Echoes Save command with preset number

- id: status_feedback
  type: string
  description: Routing map e.g. x1AVx2, x2AVx3,...

- id: system_feedback
  type: string
  description: Full system info including Model, MAC Addr, IP Addr, Netmask, Gateway, HTTP Port, Telnet Port, Firmware, On/Up Time

- id: telnet_feedback
  type: enum
  values:
    - Telnet on
    - Telnet of

- id: trig_cec_feedback
  type: string
  description: Echoes TrigCEC command

- id: type_feedback
  type: string
  description: Model name e.g. AT-HDR-H2H-44MA

- id: unlock_feedback
  type: string
  description: Unlock

- id: version_feedback
  type: string
  description: Firmware version e.g. V1.0.00

- id: vout_mute_feedback
  type: enum
  values:
    - VOUTMuteN on
    - VOUTMuteN of

- id: input_to_all_outputs_feedback
  type: string
  description: Echoes xNAll

- id: output_status_feedback
  type: enum
  values:
    - xN$ on
    - xN$ of

- id: route_input_to_output_feedback
  type: string
  description: Echoes xNAVxM

- id: command_failed
  type: string
  description: Command FAILED
```

## Variables
```yaml
# Serial parameters (set via CSpara) - configurable; defaults shown come from CSpara[sta] feedback example:
- id: serial_baud_rate
  type: integer
  values:
    - 2400
    - 4800
    - 9600
    - 19200
    - 38400
    - 57600
    - 115200

- id: serial_data_bits
  type: integer
  values:
    - 7
    - 8

- id: serial_parity
  type: string
  values:
    - None
    - Odd
    - Even

- id: serial_stop_bits
  type: integer
  values:
    - 1
    - 2

# IP parameters:
- id: ip_dhcp_state
  type: enum
  values:
    - on
    - off
  comment: configured via IPDHCP

- id: ip_static_address
  type: string
  comment: configured via IPStatic

- id: ip_port
  type: integer
  range: 1-65535
  comment: configured via IPPort

- id: ip_timeout
  type: integer
  range: 1-600
  comment: inactivity timeout in seconds, configured via ITimeout

- id: telnet_daemon
  type: enum
  values:
    - on
    - off
  comment: configured via Telnet command

- id: login_mode
  type: enum
  values:
    - on
    - off
  comment: configured via IPLogin
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Commands are case-sensitive and must be entered as documented.
- Each command terminated with CR (0x0d); feedback terminated with CR+LF (0x0a).
- If command fails or entered incorrectly, feedback is "Command FAILED".
- Telnet daemon enabled/disabled via `Telnet` command; HTTP daemon always available on port 80 (per System feedback).
- IPLogin disabled by default — no username/password required to control over TCP/IP unless explicitly enabled.
- Internal EDID slots 1-14 described in EDIDMSet command documentation.
- Broadcast mode allows concurrent routing of one input to multiple outputs.
- Save/Recall presets 1-8 for I/O route settings.
- Firmware version retrievable via `VersionMCU`; model name via `Type`; system info via `System sta`.
- Port 23 (Telnet) and port 80 (HTTP) observed in System feedback; IPPort command can change TCP control port.
- CSpara status query `CSpara[sta]` returns current serial config; source example echoes `CSpara [115200,8,0,1]`, taken as the default serial configuration (115200 8N1).
<!-- UNRESOLVED: flow_control not stated in source. -->
<!-- UNRESOLVED: Telnet/HTTP selection mechanism not documented. -->
<!-- UNRESOLVED: HDCP compliance level / version not stated. -->
<!-- UNRESOLVED: CEC command storage mechanism not documented (TrigCEC triggers "stored CEC command" but how to store is not in source). -->
````

Upgrade done. Changes vs on-disk:
- Added `command:` payload (verbatim) to all 38 actions — main fix (implementability rule).
- Populated serial defaults (115200 / 8 / none / 1) from `CSpara[sta]` feedback example; flow_control stays UNRESOLVED.
- Fixed `output_status` enum `[sta]` → `[on, of, sta]` (was incomplete; source line 504).
- Bumped `created_at` to today; all IDs/shapes preserved.

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-HDR-H2H-44MA_API.pdf
  - https://atlona.com/pdf/AT-HDR-H2H-88MA_API.pdf
  - https://atlona.com/downloads/drivers/C4IPRS_AT-HDR-H2H-44MA.zip
  - https://atlona.com/downloads/drivers/C4IPRS_AT-HDR-H2H-88MA.zip
  - https://atlona.com/downloads/drivers/Crestron_AT-UHD-H2H-44M.zip
retrieved_at: 2026-04-29T10:51:10.877Z
last_checked_at: 2026-07-12T08:45:03.403Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-12T08:45:03.403Z
matched_actions: 38
action_count: 38
confidence: medium
summary: "All 38 spec actions matched verbatim in source; transport parameters (port 23, serial 115200 8N1) supported; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Safety warnings and interlock procedures not present in source."
- "not stated in source"
- "no unsolicited event notifications described in source"
- "no explicit multi-step sequences documented"
- "no safety warnings or interlock procedures in source"
- "flow_control not stated in source."
- "Telnet/HTTP selection mechanism not documented."
- "HDCP compliance level / version not stated."
- "CEC command storage mechanism not documented (TrigCEC triggers \"stored CEC command\" but how to store is not in source)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
