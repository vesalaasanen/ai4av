---
spec_id: admin/datasat-ap25
schema_version: ai4av-public-spec-v1
revision: 1
title: "Datasat AP25 Control Spec"
manufacturer: Datasat
model_family: AP25
aliases: []
compatible_with:
  manufacturers:
    - Datasat
  models:
    - AP25
    - AP20
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - datasatdigital.com
source_urls:
  - https://www.datasatdigital.com/download/55/ap25/2762/tn-h413_rev-d_ap20-ap25-remote-command-api.pdf
retrieved_at: 2026-07-01T15:20:23.130Z
last_checked_at: 2026-07-07T11:32:12.552Z
generated_at: 2026-07-07T11:32:12.552Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source documents no power on/off command, no input/output routing commands, no input-select command. Baud rate is user-selectable in menu (System > Automation > Serial) but no default or supported range stated."
  - "user-selectable via System > Automation > Serial menu; no value stated in source"
  - "not stated in source"
  - "no unsolicited notification events documented in source. All responses are solicited (command → response)."
  - "source documents no specific macro contents; only the RUNMACRO invocation command."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "serial port line parameters (baud, data bits, parity, stop bits, flow control) are configurable on-device but not stated in this document. Power on/off, input selection, and routing commands are not present in TN-H413 — may exist in the full User Guide (TM-H795) which is out of scope for this source. Firmware version compatibility range not stated."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:32:12.552Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions matched literally to source commands; every transport parameter verified; spec fully represents all documented protocol commands. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Datasat AP25 Control Spec

## Summary
Datasat AP25 (and AP20) audio processor controllable via RS-232 ("Control" connector) and Ethernet TCP/IP (port 14500). This spec covers the ASCII Remote Command API documented in TN-H413 rev. D: system inquiry, health/board telemetry, format selection, macro execution, and master/monitor level & mute control. Commands begin with `@`, arguments space-separated, terminated by `<CR>` (0x0D).

<!-- UNRESOLVED: source documents no power on/off command, no input/output routing commands, no input-select command. Baud rate is user-selectable in menu (System > Automation > Serial) but no default or supported range stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 14500
serial:
  baud_rate: null  # UNRESOLVED: user-selectable via System > Automation > Serial menu; no value stated in source
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
# Serial Command Mode must be set to "AP20" in menu (source: System > Automation > Serial)
auth:
  type: password  # source describes AUTH command; AP20/AP25 "may be protected" by NetCmd Password (network) and/or Setup Password (setup commands). Auth optional - only required if a password is configured. AUTH valid only for duration of TCP/IP connection. NetCmd Password does NOT protect serial; Setup Password protects setup commands over all transports.
```

## Traits
```yaml
- queryable  # inferred: SYSTEM, IDENTIFY, HEALTH, BOARDINFO, SERIALNO, MAC, FADER/MUTED/MONITORLEVEL/MONITORMUTE reads, FORMAT read
- levelable  # inferred: FADER, MONITORLEVEL settable levels
```

## Actions
```yaml
# Command format: @COMMAND [ARG1] [ARG2]<CR>  (CR = 0x0D)
# All commands shown below include the leading '@' prefix and trailing <CR> per source.
# "Read/Write" commands: omit final value argument to read instead of write.

- id: system_info
  label: System Information
  kind: query
  command: "@SYSTEM<CR>"
  params: []
  response: "VER [Version]<LF> VERDATE [Date]<LF> MAC [Mac Address]<CR><\\0>"
  notes: "Returns software version, software date/time, and MAC address."

- id: identify
  label: Identify
  kind: query
  command: "@IDENTIFY<cr>"
  params: []
  response: "AP20 [IP] [Circuit] [Theater] [Screen]<cr>"
  notes: "Discovery protocol. Returns AP20, IP address, Circuit/Theater/Screen info."

- id: health_temperature
  label: Health Temperature
  kind: query
  command: "@HEALTH TEMPERATURE<cr>"
  params: []
  response: "HEALTH TEMPERATURE t1,t2,t3"
  notes: "t1=H331 board temp, t2=H332 board temp, t3=H335 board temp (Celsius)."

- id: health_h331volts
  label: Health H331 Voltages
  kind: query
  command: "@HEALTH H331VOLTS<cr>"
  params: []
  response: "HEALTH H331VOLTS <vok>,<ref>,<5v>,<+15v>,<-15v>,<-5V>"
  notes: "<vok>=1 if all voltages within limits, else 0. Example: HEALTH H331VOLTS 1,3.18,4.99,15.0,-15.0,-5.0"

- id: health_h332volts
  label: Health H332 Voltages
  kind: query
  command: "@HEALTH H332VOLTS<cr>"
  params: []
  response: "HEALTH H332VOLTS <vok>,<ref>,<5v>,<+15v>,<-15v>,<-5V>"
  notes: "If H332 board absent, response: HEALTH H332VOLTS NA. Example: HEALTH H332VOLTS 1,3.18,4.99,15.0,-15.0,-5.0"

- id: health_h335volts
  label: Health H335 Voltages
  kind: query
  command: "@HEALTH H335VOLTS<cr>"
  params: []
  response: "HEALTH H335VOLTS <vok>,<ref>,<1.3v>"
  notes: "<vok>=1 if within limits else 0. Example: HEALTH H335VOLTS 1,3.13,1.32"

- id: health_h336volts
  label: Health H336 Voltages
  kind: query
  command: "@HEALTH H336VOLTS<cr>"
  params: []
  response: "HEALTH H336VOLTS <vok>,<ref>,<+5V>,<+15V>,<-15V>,<48V>,<vcpu>"
  notes: "<48V> is mic phantom power (0 if off). <vcpu>=1 if CPU power in limits else 0. Example: HEALTH H336VOLTS 1,3.39,5.10,15.0,-14.4,0.0,1"

- id: health_h338volts
  label: Health H338 Voltages
  kind: query
  command: "@HEALTH H338VOLTS<cr>"
  params: []
  response: "HEALTH H338VOLTS <vok>,<ref>,<5v>,<+10V>,<-10V>"
  notes: "If H338 board absent, response: HEALTH H338VOLTS NA. Example: HEALTH H338VOLTS 0,3.18,5.02,10.56,-10.48"

- id: boardinfo
  label: Board Information
  kind: query
  command: "@BOARDINFO<cr>"
  params: []
  response: |
    H331,[ID],[AD],[R],[V],[CS],[FW],[FCS],
    H332,[ID],[AD],[R],[V],[CS],[FW],[FCS],
    H335,[ID],[AD],[R],[V],[CS],[FW],[FCS],
    H337In,[ID],[AD],[R],[V],[CS],[FW],[FCS],
    H337In,[ID],[AD],[R],[V],[CS],[FW],[FCS],
    H338,[ID],[AD],[R],[V],[CS],[FW],[FCS],
    HDMI,[ID],[AD],[R],[V],[CS],[FW],[FCS],
  notes: "Lists present boards (H331, H332, H335, H337In, H337Out, H338, HDMI) with hardware/firmware versions. [ID]=Board ID, [AD]=Slot Address, [R]=HW revision, [V]=Loader version, [CS]=Loader Checksum, [FW]=Firmware version, [FCS]=Firmware Checksum."

- id: auth
  label: Authorization
  kind: query
  command: "@AUTH [Password]<cr>"
  params:
    - name: Password
      type: string
      description: "Operator-level (NetCmd) or Setup-level password. Matched against Setup password first, then Operator password."
  response: "AUTH [SETUP|OP|SECERR]<cr>"
  notes: "Must be issued before any password-protected command or that command results in no action and the AP20/AP25 returns 'SECERR'. Valid only for duration of TCP/IP connection. SETUP=Setup Level granted, OP=Operator Level granted, SECERR=neither granted."

- id: serialno
  label: Serial Number
  kind: query
  command: "@SERIALNO<CR>"
  params: []
  response: "SERIALNO [SN]<CR>"
  notes: "Reads unit serial number programmed at manufacturing."

- id: mac
  label: MAC Address
  kind: query
  command: "@MAC<CR>"
  params: []
  response: "MAC [Mac adr]<CR>"
  notes: "Reads 12-digit network interface MAC address. Example: send MAC, receive MAC 080077124578."

- id: format
  label: Format Selection
  kind: action
  command: "@FORMAT [New Format]<CR>"
  params:
    - name: New Format
      type: string
      description: "Format name to select; must match exactly the format name on AP20/AP25. Spaces may be used within the name. Omit to read current format."
  response: "FORMAT [Format]<CR>"
  notes: "Read/Write. Example: send 'FORMAT Digital Cinema', receive 'FORMAT Digital Cinema'."

- id: runmacro
  label: Execute Macro
  kind: action
  command: "@RUNMACRO [Macro]<CR>"
  params:
    - name: Macro
      type: string
      description: "Macro name to execute; must match exactly the macro name on AP20/AP25. Spaces may be used within the name."
  response: "[OK or ERR no macro]<CR>"
  notes: "Write. OK=macro found and executed. ERR no macro=macro does not exist. Example: send 'RUNMACRO Auto1', receive 'OK'."

- id: fader
  label: Master Fader Level
  kind: action
  command: "@FADER [New Level]<CR>"
  params:
    - name: New Level
      type: integer
      description: "Fader level in tenths (e.g. 70 = 7.0). Omit to read current value."
  response: "FADER [Level]<CR>"
  notes: "Read/Write. Example: send 'FADER 70', receive 'FADER 70'."

- id: muted
  label: Master Fader Mute
  kind: action
  command: "@MUTED [New Value]<CR>"
  params:
    - name: New Value
      type: integer
      description: "1 to mute, 0 to unmute. Omit to read current value."
  response: "MUTED [Value]<CR>"
  notes: "Read/Write. Example: send 'MUTED 1', receive 'MUTED 1'."

- id: monitorlevel
  label: Monitor Level
  kind: action
  command: "@MONITORLEVEL [New Value]<CR>"
  params:
    - name: New Value
      type: integer
      description: "0 (minimum) to 100 (maximum). Omit to read current value."
  response: "MONITORLEVEL [Value]<CR>"
  notes: "Read/Write. Example: send 'MONITORLEVEL 70', receive 'MONITORLEVEL 70'."

- id: monitormute
  label: Monitor Mute
  kind: action
  command: "@MONITORMUTE [New Value]<CR>"
  params:
    - name: New Value
      type: integer
      description: "0 (unmute) or 1 (mute). Omit to read current value."
  response: "MONITORMUTE [Value]<CR>"
  notes: "Read/Write. Example: send 'MONITORMUTE 1', receive 'MONITORMUTE 1'."
```

## Feedbacks
```yaml
- id: system_version
  type: string
  source: SYSTEM response field VER [Version]
- id: system_mac_address
  type: string
  source: SYSTEM / MAC response field
- id: board_present_h332
  type: enum
  values: [present, absent]
  notes: Derived from HEALTH H332VOLTS response - "NA" indicates absent.
- id: board_present_h338
  type: enum
  values: [present, absent]
  notes: Derived from HEALTH H338VOLTS response - "NA" indicates absent.
- id: auth_level
  type: enum
  values: [SETUP, OP, SECERR]
  source: AUTH response
```

## Variables
```yaml
- id: fader_level
  type: integer
  unit: tenths
  access: read_write
- id: monitor_level
  type: integer
  range: [0, 100]
  access: read_write
- id: master_mute
  type: enum
  values: [muted, unmuted]
  access: read_write
- id: monitor_mute
  type: enum
  values: [muted, unmuted]
  access: read_write
- id: current_format
  type: string
  access: read_write
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source. All responses are solicited (command → response).
```

## Macros
```yaml
# Device-side macros: invoke via RUNMACRO action. Macro definitions themselves are stored on the AP20/AP25 (out of band of this API).
# UNRESOLVED: source documents no specific macro contents; only the RUNMACRO invocation command.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- Source document TN-H413 rev. D is a dual-device spec covering AP20 **and** AP25 with a shared command set; commands are identical for both models.
- Every command MUST begin with `@` and terminate with `<CR>` (ASCII 0x0D). The source explicitly flags this as a common failure point when simple commands do not execute.
- Responses are ASCII text terminated by `<CR>`.
- Serial Command Mode on the device must be set to **AP20** (System > Automation > Serial menu) for these commands to be accepted over RS-232.
- Two password tiers exist: **NetCmd Password** (network operator-level, does not protect serial) and **Setup Password** (setup/config commands over all transports — front panel, serial, Ethernet). Inquiry commands (SYSTEM, IDENTIFY) operate without any password.
- The included sample C program (`Ap20NetCmd.cpp`) connects via TCP to port 14500, optionally sends `AUTH <password>`, then sends the user command prefixed with `@` and suffixed with `\r`, reading the response byte-by-byte until `\r`.

<!-- UNRESOLVED: serial port line parameters (baud, data bits, parity, stop bits, flow control) are configurable on-device but not stated in this document. Power on/off, input selection, and routing commands are not present in TN-H413 — may exist in the full User Guide (TM-H795) which is out of scope for this source. Firmware version compatibility range not stated. -->

## Provenance

```yaml
source_domains:
  - datasatdigital.com
source_urls:
  - https://www.datasatdigital.com/download/55/ap25/2762/tn-h413_rev-d_ap20-ap25-remote-command-api.pdf
retrieved_at: 2026-07-01T15:20:23.130Z
last_checked_at: 2026-07-07T11:32:12.552Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:32:12.552Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions matched literally to source commands; every transport parameter verified; spec fully represents all documented protocol commands. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents no power on/off command, no input/output routing commands, no input-select command. Baud rate is user-selectable in menu (System > Automation > Serial) but no default or supported range stated."
- "user-selectable via System > Automation > Serial menu; no value stated in source"
- "not stated in source"
- "no unsolicited notification events documented in source. All responses are solicited (command → response)."
- "source documents no specific macro contents; only the RUNMACRO invocation command."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "serial port line parameters (baud, data bits, parity, stop bits, flow control) are configurable on-device but not stated in this document. Power on/off, input selection, and routing commands are not present in TN-H413 — may exist in the full User Guide (TM-H795) which is out of scope for this source. Firmware version compatibility range not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
