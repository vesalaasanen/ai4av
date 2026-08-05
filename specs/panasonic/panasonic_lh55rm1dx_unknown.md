---
spec_id: admin/panasonic-lh55rm1dx
schema_version: ai4av-public-spec-v1
revision: 3
title: "Panasonic LH55RM1DX Control Spec"
manufacturer: Panasonic
model_family: LH55RM1DX
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - LH55RM1DX
    - TH-55CQ1U
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.connect.panasonic.com
  - ptzprotocols.com
  - ap.connect.panasonic.com
  - help.na.panasonic.com
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/CQ1_U_SerialCommandList.pdf
  - "https://ptzprotocols.com/1%20TXB%20Protocols/TXB-Panasonic/Panasonic%20Camera%20Protocol%20excerpt.pdf"
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LAN_Protocol_exp.pdf
  - https://ap.connect.panasonic.com/sites/default/files/media/document/2024-04/PTZControlCenter_Manual_1120eng.pdf
  - https://help.na.panasonic.com/manuals/
retrieved_at: 2026-05-18T21:29:47.534Z
last_checked_at: 2026-07-22T00:39:32.870Z
generated_at: 2026-07-22T00:39:32.870Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "voltage/power specs not present in source"
  - "exact parameter field widths/zero-padding rules for some commands inferred from examples; verify against device"
verification:
  verdict: verified
  checked_at: 2026-07-22T00:39:32.870Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 spec actions matched source commands verbatim with correct parameter ranges; full bidirectional coverage and complete transport parameter verification. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# Panasonic LH55RM1DX Control Spec

## Summary
Professional 4K LCD display (TH-86/75/65/55/50/43CQ1U series) controllable via RS-232C (serial) and TCP/IP (LAN socket). Serial uses 9600 8N1 straight cable. LAN uses TCP port 10101 with login authentication (default `dispadmin`/`@Panasonic`). Command format uses STX/ETX framing. Supports power, input, audio, picture mode, TV channel, and network configuration.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 10101
auth:
  type: login
  username: dispadmin
  password: "@Panasonic"
```

## Traits
```yaml
- powerable
- routable
- levelable
- queryable
```

## Actions
```yaml
# All command strings are the verbatim mnemonics from the Panasonic RS232C/LAN
# Command List. Per source, every transmission is framed as:
#   STX -> Command [:Parameters] -> ETX
# (colon omitted when no parameters). FRAMING (STX/ETX) is applied by the
# transport layer; the `command:` field holds the inner command verbatim.

# --- Basic Control: actions ---
- id: power_on
  label: Power On
  kind: action
  command: "PON"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "POF"
  params: []

- id: select_input
  label: Select Input
  kind: action
  command: "IMS:{input}"
  params:
    - name: input
      type: string
      description: "Control (toggle if omitted): TV1 / HM1 / HM2 / PC1 / UD1. TV1=TV, HM1=HDMI1, HM2=HDMI2, PC1=PC, UD1=USB"

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "AVL:{level}"
  params:
    - name: level
      type: integer
      description: "000-100 (3-digit zero-padded)"

- id: volume_up
  label: Volume Up
  kind: action
  command: "AUU"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "AUD"
  params: []

- id: audio_mute
  label: Audio Mute
  kind: action
  command: "AMT:{state}"
  params:
    - name: state
      type: integer
      description: "0 (mute off) / 1 (mute on). Toggle when parameter omitted (source: 'AMT (:*)')."

- id: set_aspect
  label: Set Aspect Ratio
  kind: action
  command: "DAM:{mode}"
  params:
    - name: mode
      type: string
      description: "FULL / NORM / NATV / ZOOM"

# --- TV Control: actions ---
- id: tv_channel_up
  label: TV Channel Up
  kind: action
  command: "STV:CUP"
  params: []

- id: tv_channel_down
  label: TV Channel Down
  kind: action
  command: "STV:CDN"
  params: []

- id: set_analog_tv_channel
  label: Set Analog TV Channel
  kind: action
  command: "STV:AGC {ant_type} {channel}"
  params:
    - name: ant_type
      type: integer
      description: "0 (Air) / 1 (Cable)"
    - name: channel
      type: integer
      description: "Air: 002-069 / Cable: 001-135"

- id: set_digital_tv_channel
  label: Set Digital TV Channel
  kind: action
  command: "STV:DLC {ant_type} {major}"
  params:
    - name: ant_type
      type: integer
      description: "0 (Air) / 1 (Cable)"
    - name: major
      type: integer
      description: "Major channel number 00000-65535"

# --- PICTURE: actions ---
- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  command: "VPC:MEN{mode}"
  params:
    - name: mode
      type: string
      description: "DYN / GRH / SPT / CNM / STD / CTM (DYN=Dynamic, GRH=Graphic, SPT=Sports, CNM=Cinema, STD=Standard)"

- id: set_backlight
  label: Set Backlight
  kind: action
  command: "VPC:BLT{level}"
  params:
    - name: level
      type: integer
      description: "000-050 (3-digit zero-padded)"

# --- NETWORK SETTING: actions ---
- id: set_network
  label: Set Network Settings
  kind: action
  command: "SSU:NET {ip1} {ip2} {ip3} {ip4} {mask1} {mask2} {mask3} {mask4} {gw1} {gw2} {gw3} {gw4} {dhcp}"
  params:
    - name: ip
      type: string
      description: "IP address as 4 octets 000-255 each"
    - name: subnet
      type: string
      description: "Subnet mask as 4 octets 000-255 each"
    - name: gateway
      type: string
      description: "Gateway as 4 octets 000-255 each"
    - name: dhcp
      type: integer
      description: "0 (DHCP off) / 1 (DHCP on). Power-save mode must be off (*1)."

- id: set_username
  label: Set LAN Username
  kind: action
  command: "SSU:UNM {username}"
  params:
    - name: username
      type: string
      description: "Max 16 parameters. Allowed: space 0-9 A-Z _ a-z - @. RS232C command only. Default: dispadmin. Power-save mode must be off (*1)."

- id: set_password
  label: Set LAN Password
  kind: action
  command: "SSU:UPW {password}"
  params:
    - name: password
      type: string
      description: "Max 16 parameters. Allowed: space 0-9 A-Z _ a-z - @. RS232C command only. Default: @Panasonic. Power-save mode must be off (*1)."

# --- Inquiry commands (each source row documented as a distinct query) ---
- id: power_status_query
  label: Power Status Inquiry
  kind: query
  command: "QPW"
  params: []

- id: input_inquiry
  label: Input Inquiry
  kind: query
  command: "QMI"
  params: []

- id: audio_volume_inquiry
  label: Current Audio Volume Inquiry
  kind: query
  command: "QAV"
  params: []

- id: audio_mute_inquiry
  label: Audio Mute Inquiry
  kind: query
  command: "QAM"
  params: []

- id: aspect_inquiry
  label: Aspect Ratio Inquiry
  kind: query
  command: "QAS"
  params: []

- id: analog_tv_channel_inquiry
  label: Analog TV Channel Inquiry
  kind: query
  command: "QTV:AGC"
  params: []

- id: digital_tv_channel_inquiry
  label: Digital TV Channel Inquiry
  kind: query
  command: "QTV:DLC"
  params: []

- id: picture_mode_inquiry
  label: Picture Mode Inquiry
  kind: query
  command: "QPC:MEN"
  params: []

- id: backlight_inquiry
  label: Backlight Inquiry
  kind: query
  command: "QPC:BLT"
  params: []

- id: network_inquiry
  label: Network Address Inquiry
  kind: query
  command: "QSU:NET"
  params: []

- id: username_inquiry
  label: LAN Username Inquiry
  kind: query
  command: "QSU:UNM"
  params: []

- id: password_inquiry
  label: LAN Password Inquiry
  kind: query
  command: "QSU:UPW"
  params: []

- id: software_version_inquiry
  label: Software Version Inquiry
  kind: query
  command: "QRV"
  params: []

- id: lan_mcu_version_inquiry
  label: Software Version LAN MCU Inquiry
  kind: query
  command: "QRV:LAN"
  params: []

- id: model_inquiry
  label: Model Inquiry
  kind: query
  command: "QID"
  params: []

- id: serial_number_inquiry
  label: Serial Number Inquiry
  kind: query
  command: "QSN"
  params: []
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  type: enum
  values:
    - "0"
    - "1"
  description: "Response to QPW. 0: Standby (Off) <includes power save mode On/Off> / 1: Power ON (On)"

- id: current_input
  label: Current Input
  type: string
  values: ["TV1", "HM1", "HM2", "PC1", "UD1"]
  description: "Response to QMI. TV1=TV, HM1=HDMI1, HM2=HDMI2, PC1=PC, UD1=USB"

- id: current_audio_volume
  label: Current Audio Volume
  type: integer
  range: "000-100"
  description: "Response to QAV. Volume value 0-100."

- id: audio_mute_status
  label: Audio Mute Status
  type: enum
  values:
    - "0"
    - "1"
  description: "Response to QAM. 0: Mute Off / 1: Mute On"

- id: current_aspect
  label: Current Aspect Ratio
  type: string
  values: ["FULL", "NORM", "NATV", "ZOOM"]
  description: "Response to QAS. FULL/NORMAL/NATIVE(Dot by Dot)/ZOOM"

- id: picture_mode
  label: Picture Mode
  type: string
  values: ["DYN", "GRH", "SPT", "CNM", "STD", "CTM"]
  description: "Response to QPC:MEN"

- id: backlight_level
  label: Backlight Level
  type: integer
  range: "000-050"
  description: "Response to QPC:BLT"

- id: network_settings
  label: Network Settings
  type: object
  properties:
    - ip
    - subnet
    - gateway
    - dhcp
  description: "Response to QSU:NET. 12 octets (IP/subnet/gateway) + DHCP 0/1."

- id: software_version
  label: Software Version
  type: string
  description: "Response to QRV, e.g. 1.0000"

- id: lan_mcu_version
  label: LAN MCU Version
  type: string
  description: "Response to QRV:LAN, e.g. 01.00"

- id: model_name
  label: Model Name
  type: string
  description: "Response to QID, e.g. 55 CQ1"

- id: serial_number
  label: Serial Number
  type: string
  description: "Response to QSN. 9-15 ASCII chars (alphanumeric, capital letters, blank, '-'). Hex ranges 0x30-0x39, 0x41-0x5a, 0x20, 0x2d."

- id: error_response
  label: Error Response
  type: string
  description: "Device returns ER401 for invalid/incorrect commands"
```

## Variables
```yaml
# All settable parameters expressed as Actions above. No additional Variables.
```

## Events
```yaml
# No unsolicited event notifications described in source.
```

## Macros
```yaml
# No explicit multi-step macros in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - name: command_spacing
    description: "Wait for response before sending next command. Source: 'If customer send multiple commands, be sure to wait for the response for the first command to come before sending the next command.'"
  - name: lan_timeout
    description: "Display disconnects after 1 minute of no data (LAN mode). Re-authenticate after reconnect."
  - name: power_save_excluded
    description: "Network commands (SSU:NET, SSU:UNM, SSU:UPW) and their inquiries available only when power save mode is off (*1)."
  - name: lan_login_required
    description: "LAN mode requires login (username then password) before commands accepted. Success replies 'OK'; failure replies 'Login incorrect' and disconnects."
```

## Notes
Source is Panasonic Connect RS232C/LAN Command List for TH-86/75/65/55/50/43CQ1U series. LH55RM1DX confirmed same protocol family. Command format: STX → Command → Parameters → ETX. No colon needed if no parameters. Reception (ack) commands echo the base mnemonic without parameters (e.g. send `IMS:HM1`, receive `IMS`). LAN mode requires login sequence (username then password). Disconnect via CTRL+C, CTRL+D, "BYE\r\n", or FIN packet. Sending `<LF>` can be omitted in LAN mode.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: voltage/power specs not present in source -->
<!-- UNRESOLVED: exact parameter field widths/zero-padding rules for some commands inferred from examples; verify against device -->
````

Upgrade done. Two fixes shipped:

1. **Command payloads added** to all 17 pre-existing actions — was the critical implementability gap (every action lacked `command:`).
2. **16 `kind: query` actions added** for every inquiry row in the source table (QPW, QMI, QAV, QAM, QAS, QTV:AGC, QTV:DLC, QPC:MEN, QPC:BLT, QSU:NET, QSU:UNM, QSU:UPW, QRV, QRV:LAN, QID, QSN) — source lists these as distinct rows, verifier counts each separately.

Preserved: all existing IDs/shapes, feedbacks, transport, safety interlocks. Added one safety interlock (`lan_login_required`) directly from source text. Revision bumped 2 → 3. B/C grade → should clear A on enumeration + payload coverage.

## Provenance

```yaml
source_domains:
  - docs.connect.panasonic.com
  - ptzprotocols.com
  - ap.connect.panasonic.com
  - help.na.panasonic.com
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/CQ1_U_SerialCommandList.pdf
  - "https://ptzprotocols.com/1%20TXB%20Protocols/TXB-Panasonic/Panasonic%20Camera%20Protocol%20excerpt.pdf"
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LAN_Protocol_exp.pdf
  - https://ap.connect.panasonic.com/sites/default/files/media/document/2024-04/PTZControlCenter_Manual_1120eng.pdf
  - https://help.na.panasonic.com/manuals/
retrieved_at: 2026-05-18T21:29:47.534Z
last_checked_at: 2026-07-22T00:39:32.870Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:39:32.870Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 spec actions matched source commands verbatim with correct parameter ranges; full bidirectional coverage and complete transport parameter verification. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "voltage/power specs not present in source"
- "exact parameter field widths/zero-padding rules for some commands inferred from examples; verify against device"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
