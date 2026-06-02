---
spec_id: admin/dt-videolabs-tbx-2201
schema_version: ai4av-public-spec-v1
revision: 1
title: "DT Videolabs H HR Series (TBX-2201) Control Spec"
manufacturer: "DT Videolabs"
model_family: TBX-2201
aliases: []
compatible_with:
  manufacturers:
    - "DT Videolabs"
  models:
    - TBX-2201
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - agneovo.com
  - allsee-tech.com
  - oceanoptics.com
source_urls:
  - https://www.agneovo.com/wp-content/uploads/2021/09/TBX-2201_RS232_CommandList.pdf
  - "https://www.allsee-tech.com/pdf/user/RS-232%20Commands%20TLxxH7.pdf"
  - https://www.oceanoptics.com/wp-content/uploads/2025/04/Serial_Communications_Protocol_RS-232_Tech_Note_Rev8.pdf
  - https://www.agneovo.com/wp-content/uploads/2021/07/PD-42_RS232_CommandList.pdf
  - https://www.agneovo.com/wp-content/uploads/2021/07/QD-98_RS232_CommandList1.pdf
retrieved_at: 2026-05-14T15:38:20.889Z
last_checked_at: 2026-06-02T21:41:38.000Z
generated_at: 2026-06-02T21:41:38.000Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "operator-supplied device name \"H HR Series\" was not found in the source document; the source document explicitly identifies the device as \"TBX-2201\". Treated TBX-2201 as the canonical model and flagged for human review."
  - "no safety warnings, interlocks, or power-on sequencing described"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:38.000Z
  matched_actions: 52
  action_count: 52
  confidence: medium
  summary: "All 52 spec actions match verbatim hex opcodes in the source; transport values baud 9600/8N1 and port 5000 confirmed; source command catalogue is fully covered (52 of 52). (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# DT Videolabs H HR Series (TBX-2201) Control Spec

## Summary
Display controller exposed over RS-232 and TCP/IP (Ethernet, port 5000). Commands use a fixed binary packet framed by 0xA6 header and XOR-checksummed, with Get/Set pairs for power, video, audio, and network configuration. This spec covers the complete command catalogue for the TBX-2201 display identified in the source document (TBX-2201 RS232 Command List v1.0).

<!-- UNRESOLVED: operator-supplied device name "H HR Series" was not found in the source document; the source document explicitly identifies the device as "TBX-2201". Treated TBX-2201 as the canonical model and flagged for human review. -->

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
  port: 5000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from Power State Set/Get commands
- levelable       # inferred from Volume, Backlight, Brightness, Contrast, Black, Sharpness, Hue, Saturation Set/Get commands
- queryable       # inferred from Get command catalogue
```

## Actions
```yaml
# Packet format (Set / Get):  A6 [MonitorID] 00 00 00 [Length] 01 [Opcode] [Params...] [Checksum]
# Length = bytes from Data Control (0x01) through Checksum inclusive.
# Checksum = XOR of every byte from Header (0xA6) through last Data byte, NOT including Checksum itself.
# Monitor ID range: 0x01-0xFF. 0x00 = broadcast (no ACK expected).
# All example bytes below are from the source for Monitor ID = 0x01.

- id: network_config_set
  label: Network Configuration Set
  kind: action
  command: "A6 {monitor_id} 00 00 00 {length} 01 05 {mode} {address_function} {address_bytes} {checksum}"
  params:
    - name: mode
      type: integer
      description: "0x01 = DHCP, 0x02 = Static IP"
    - name: address_function
      type: integer
      description: "DHCP: 0x00. Static: 0x01=IP, 0x02=Netmask, 0x03=MAC, 0x04=Gateway, 0x05=DNS1, 0x06=DNS2"
    - name: address_bytes
      type: bytes
      description: "MAC: 6 bytes; IP/Netmask/Gateway/DNS: 4 bytes; disable: 1 byte 0x00"

- id: network_config_get
  label: Network Configuration Get
  kind: query
  command: "A6 01 00 00 00 04 01 06 01 A5"
  params: []

- id: network_name_set
  label: Network Name Set
  kind: action
  command: "A6 01 00 00 00 13 01 09 41 47 4E 20 54 42 58 2D 32 32 30 31 20 20 20 20 B6"
  params:
    - name: name
      type: string
      description: "Up to 16 ASCII chars from set 0-9 A-Z space + - / :"

- id: network_name_get
  label: Network Name Get
  kind: query
  command: "A6 01 00 00 00 03 01 0A AF"
  params: []

- id: misc_info_get
  label: Miscellaneous Info Get
  kind: query
  command: "A6 01 00 00 00 04 01 0F 02 AF"
  params:
    - name: sub_command
      type: integer
      description: "0x02 = Operating Hours (only defined sub-command)"

- id: power_state_set
  label: Power State Set
  kind: action
  command: "A6 01 00 00 00 04 01 18 01 BB"
  params:
    - name: state
      type: integer
      description: "0x01 = Power OFF, 0x02 = Power ON"

- id: power_state_get
  label: Power State Get
  kind: query
  command: "A6 01 00 00 00 03 01 19 BC"
  params: []

- id: keypad_control_set
  label: Keypad / User Input Control Set
  kind: action
  command: "A6 01 00 00 00 04 01 1C 07 B9"
  params:
    - name: lock_bits
      type: integer
      description: "Bit-packed: bit2=power key, bit1=local keypad, bit0=remote (1=unlock). Source notes current model supports only power-key lock; documented values 0x01/0x03/0x05/0x07."

- id: keypad_control_get
  label: Keypad / User Input Control Get
  kind: query
  command: "A6 01 00 00 00 03 01 1D B8"
  params: []

- id: backlight_set
  label: Backlight Level Set
  kind: action
  command: "A6 01 00 00 00 04 01 30 32 A0"
  params:
    - name: level
      type: integer
      description: "0x00-0x64 (0-100). Example 0x32 = OSD 50."

- id: backlight_get
  label: Backlight Level Get
  kind: query
  command: "A6 01 00 00 00 03 01 31 94"
  params: []

- id: color_temperature_set
  label: Color Temperature Set
  kind: action
  command: "A6 01 00 00 00 04 01 34 20 B6"
  params:
    - name: temperature
      type: integer
      description: "0x20 = WARM, 0x21 = COOL, 0x23 = USER, 0x24 = NEUTRAL"

- id: color_temperature_get
  label: Color Temperature Get
  kind: query
  command: "A6 01 00 00 00 03 01 35 90"
  params: []

- id: volume_set
  label: Volume Level Set
  kind: action
  command: "A6 01 00 00 00 04 01 44 32 D4"
  params:
    - name: level
      type: integer
      description: "0x00-0x64 (0-100). Example 0x32 = OSD 50."

- id: volume_get
  label: Volume Level Get
  kind: query
  command: "A6 01 00 00 00 03 01 45 E0"
  params: []

- id: color_range_set
  label: Color Range Set
  kind: action
  command: "A6 01 00 00 00 04 01 50 00 F2"
  params:
    - name: range
      type: integer
      description: "0x00 = FULL, 0x01 = LIMITED"

- id: color_range_get
  label: Color Range Get
  kind: query
  command: "A6 01 00 00 00 03 01 51 F4"
  params: []

- id: led_set
  label: LED ON/OFF Set
  kind: action
  command: "A6 01 00 00 00 04 01 52 01 F1"
  params:
    - name: state
      type: integer
      description: "0x00 = OFF, 0x01 = ON"

- id: led_get
  label: LED ON/OFF Get
  kind: query
  command: "A6 01 00 00 00 03 01 53 F6"
  params: []

- id: signal_info_set
  label: Signal Info Set
  kind: action
  command: "A6 01 00 00 00 04 01 54 01 F7"
  params:
    - name: state
      type: integer
      description: "0x00 = OFF, 0x01 = ON"

- id: signal_info_get
  label: Signal Info Get
  kind: query
  command: "A6 01 00 00 00 03 01 55 F0"
  params: []

- id: blue_screen_set
  label: Blue Screen Set
  kind: action
  command: "A6 01 00 00 00 04 01 56 01 F5"
  params:
    - name: state
      type: integer
      description: "0x00 = OFF, 0x01 = ON"

- id: blue_screen_get
  label: Blue Screen Get
  kind: query
  command: "A6 01 00 00 00 03 01 57 F2"
  params: []

- id: logo_set
  label: LOGO Set
  kind: action
  command: "A6 01 00 00 00 04 01 58 01 FB"
  params:
    - name: state
      type: integer
      description: "0x00 = OFF, 0x01 = ON"

- id: logo_get
  label: LOGO Get
  kind: query
  command: "A6 01 00 00 00 03 01 59 FC"
  params: []

- id: color_rgb_set
  label: Color RGB Set
  kind: action
  command: "A6 01 00 00 00 06 01 66 FF FF FF 39"
  params:
    - name: red
      type: integer
      description: "0x00-0xFF (0-255) red gain"
    - name: green
      type: integer
      description: "0x00-0xFF (0-255) green gain"
    - name: blue
      type: integer
      description: "0x00-0xFF (0-255) blue gain"

- id: color_rgb_get
  label: Color RGB Get
  kind: query
  command: "A6 01 00 00 00 03 01 67 C2"
  params: []

- id: platform_version_get
  label: Platform / Version Label Get
  kind: query
  command: "A6 01 00 00 00 04 01 A2 01 01"
  params:
    - name: label
      type: integer
      description: "0x00 = F/W version, 0x01 = Model Name"

- id: brightness_set
  label: Brightness Set
  kind: action
  command: "A6 01 00 00 00 04 01 C0 32 50"
  params:
    - name: level
      type: integer
      description: "0x00-0x64 (0-100). Example 0x32 = OSD 50."

- id: brightness_get
  label: Brightness Get
  kind: query
  command: "A6 01 00 00 00 03 01 C1 64"
  params: []

- id: contrast_set
  label: Contrast Set
  kind: action
  command: "A6 01 00 00 00 04 01 C2 32 52"
  params:
    - name: level
      type: integer
      description: "0x00-0x64 (0-100). Example 0x32 = OSD 50."

- id: contrast_get
  label: Contrast Get
  kind: query
  command: "A6 01 00 00 00 03 01 C3 66"
  params: []

- id: black_level_set
  label: Black Level Set
  kind: action
  command: "A6 01 00 00 00 04 01 C4 32 54"
  params:
    - name: level
      type: integer
      description: "0x00-0x64 (0-100). Example 0x32 = OSD 50."

- id: black_level_get
  label: Black Level Get
  kind: query
  command: "A6 01 00 00 00 03 01 C5 60"
  params: []

- id: sharpness_set
  label: Sharpness Set
  kind: action
  command: "A6 01 00 00 00 04 01 C6 32 56"
  params:
    - name: level
      type: integer
      description: "0x00-0x64 (0-100). Example 0x32 = OSD 50."

- id: sharpness_get
  label: Sharpness Get
  kind: query
  command: "A6 01 00 00 00 03 01 C7 62"
  params: []

- id: hue_set
  label: HUE (TINT) Set
  kind: action
  command: "A6 01 00 00 00 04 01 C8 32 58"
  params:
    - name: level
      type: integer
      description: "0x00-0x64 (0-100). Example 0x32 = OSD 50."

- id: hue_get
  label: HUE (TINT) Get
  kind: query
  command: "A6 01 00 00 00 03 01 C9 6C"
  params: []

- id: saturation_set
  label: Saturation Set
  kind: action
  command: "A6 01 00 00 00 04 01 CA 32 5A"
  params:
    - name: level
      type: integer
      description: "0x00-0x64 (0-100). Example 0x32 = OSD 50."

- id: saturation_get
  label: Saturation Get
  kind: query
  command: "A6 01 00 00 00 03 01 CB 6E"
  params: []

- id: dcr_set
  label: DCR (Dynamic Contrast) Set
  kind: action
  command: "A6 01 00 00 00 04 01 D2 01 71"
  params:
    - name: state
      type: integer
      description: "0x00 = OFF, 0x01 = ON"

- id: dcr_get
  label: DCR (Dynamic Contrast) Get
  kind: query
  command: "A6 01 00 00 00 03 01 D3 76"
  params: []

- id: gamma_set
  label: Gamma Set
  kind: action
  command: "A6 01 00 00 00 04 01 DC 01 7F"
  params:
    - name: gamma
      type: integer
      description: "0x00 = 2.2, 0x01 = 2.4, 0x04 = 2.0, 0x05 = S-Curve"

- id: gamma_get
  label: Gamma Get
  kind: query
  command: "A6 01 00 00 00 03 01 DD 78"
  params: []

- id: noise_reduction_set
  label: Noise Reduction Set
  kind: action
  command: "A6 01 00 00 00 04 01 DE 01 7D"
  params:
    - name: level
      type: integer
      description: "0x00 = OFF, 0x01 = LOW, 0x02 = MEDIUM, 0x03 = HIGH"

- id: noise_reduction_get
  label: Noise Reduction Get
  kind: query
  command: "A6 01 00 00 00 03 01 DF 7A"
  params: []

- id: audio_mute_set
  label: Audio Mute Set
  kind: action
  command: "A6 01 00 00 00 04 01 E0 00 42"
  params:
    - name: state
      type: integer
      description: "0x00 = OFF, 0x01 = ON"

- id: audio_mute_get
  label: Audio Mute Get
  kind: query
  command: "A6 01 00 00 00 03 01 E1 44"
  params: []

- id: power_saving_set
  label: Power Saving Set
  kind: action
  command: "A6 01 00 00 00 04 01 E2 01 41"
  params:
    - name: state
      type: integer
      description: "0x00 = OFF, 0x01 = ON"

- id: power_saving_get
  label: Power Saving Get
  kind: query
  command: "A6 01 00 00 00 03 01 E3 46"
  params: []

- id: anti_burn_in_set
  label: Anti-Burn-In (Pixel Shift) Set
  kind: action
  command: "A6 01 00 00 00 06 01 E4 01 01 01 45"
  params:
    - name: enable
      type: integer
      description: "0x00 = OFF, 0x01 = ON"
    - name: hours
      type: integer
      description: "0x01 = 4 hrs, 0x02 = 5, 0x03 = 6, 0x04 = 8"
    - name: type
      type: integer
      description: "0x01 = A, 0x02 = B, 0x03 = C"

- id: anti_burn_in_get
  label: Anti-Burn-In (Pixel Shift) Get
  kind: query
  command: "A6 01 00 00 00 03 01 E5 40"
  params: []
```

## Feedbacks
```yaml
- id: ack_reply
  type: enum
  values: [completed, command_canceled, parse_error]
  description: "Report header 0x21 with Data[1] = 0x00 (completed), 0x03 (command canceled / out-of-range), 0x04 (parse error / checksum error)."

- id: power_state_report
  type: enum
  values: [power_off, power_on]
  description: "Response to power_state_get. 0x01=OFF, 0x02=ON."

- id: backlight_level_report
  type: integer
  description: "0x00-0x64 (0-100)"

- id: color_temperature_report
  type: enum
  values: [warm, cool, user, neutral]
  description: "0x20=WARM, 0x21=COOL, 0x23=USER, 0x24=NEUTRAL"

- id: volume_level_report
  type: integer
  description: "0x00-0x64 (0-100)"

- id: color_range_report
  type: enum
  values: [full, limited]

- id: led_state_report
  type: enum
  values: [off, on]

- id: signal_info_report
  type: enum
  values: [off, on]

- id: blue_screen_report
  type: enum
  values: [off, on]

- id: logo_report
  type: enum
  values: [off, on]

- id: color_rgb_report
  type: object
  description: "3 bytes: red 0x00-0xFF, green 0x00-0xFF, blue 0x00-0xFF"

- id: brightness_report
  type: integer
  description: "0x00-0x64 (0-100)"

- id: contrast_report
  type: integer
  description: "0x00-0x64 (0-100)"

- id: black_level_report
  type: integer
  description: "0x00-0x64 (0-100)"

- id: sharpness_report
  type: integer
  description: "0x00-0x64 (0-100)"

- id: hue_report
  type: integer
  description: "0x00-0x64 (0-100)"

- id: saturation_report
  type: integer
  description: "0x00-0x64 (0-100)"

- id: dcr_report
  type: enum
  values: [off, on]

- id: gamma_report
  type: enum
  values: ["2.0", "2.2", "2.4", s_curve]
  description: "0x00=2.2, 0x01=2.4, 0x04=2.0, 0x05=S-Curve"

- id: noise_reduction_report
  type: enum
  values: [off, low, medium, high]

- id: audio_mute_report
  type: enum
  values: [off, on]

- id: power_saving_report
  type: enum
  values: [off, on]

- id: anti_burn_in_report
  type: object
  description: "enable (0/1), hours (0x01-0x04), type (0x01-0x03)"

- id: network_config_report
  type: object
  description: "Mode (0x01=DHCP, 0x02=Static), Address Function (0x01-0x06), Address bytes (4 bytes for IP/netmask/gw/DNS, 6 bytes for MAC)"

- id: network_name_report
  type: string
  description: "Up to 16 ASCII chars"

- id: operating_hours_report
  type: integer
  description: "16-bit little-endian (Data[1]=MSB, Data[2]=LSB); example value 10 = 0x000A"

- id: platform_version_report
  type: string
  description: "Up to 36 ASCII chars; F/W version or Model Name"
```

## Variables
```yaml
# No discrete numeric range controls beyond those exposed as Set actions. The Set
# commands above (backlight, volume, brightness, contrast, black, sharpness,
# hue, saturation) are the full set of settable parameters with range 0-100.
# Color RGB exposes a 3-byte (R,G,B) gain tuple.
```

## Events
```yaml
# No unsolicited event messages documented. The device only reports in reply
# to Get commands (Report header 0x21) or Set commands (ACK 0x21). No exception,
# fault, or state-change broadcast is described in the source.
```

## Macros
```yaml
# No multi-step sequences or macro definitions are described in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing described
# in source. The Command Procedure section notes a 500 ms retry interval but
# does not document any hardware interlock or hazardous-state confirmation.
```

## Notes
- Source document title is "RS232 Command List — TBX-2201 — Version 1.0". All command tables, opcode assignments, and example byte sequences in this spec are sourced from that document.
- Operator-supplied device name "DT Videolabs H HR Series" was not located in the source. The source explicitly identifies the device as TBX-2201 in its title and in the example network name / model name strings (`AGN TBX-2201`). Treat TBX-2201 as the documented model and reconcile the operator's family name with the manufacturer separately.
- All Set commands must include a trailing XOR checksum byte covering every preceding byte of the packet. Example bytes in the Actions section are computed for Monitor ID = 0x01 only; the checksum must be recomputed when the Monitor ID byte changes.
- Source documents a 500 ms acknowledgement window ("if a response is not received within 500 milliseconds a retry may be triggered"). ACK (Data[1]=0x00) means completed, 0x03 means command canceled / out-of-range, 0x04 means parse error or checksum error. No reply is sent when the Monitor ID in the request does not match the device.
- Broadcast Monitor ID 0x00 is supported; the device sends no ACK or report in response.
- Source notes that on the current model, only power-key lock is implemented for the Keypad / User Input Control command; other bit combinations are documented but reserved.
- The `keypad_control_get` example report in the source (line 327) prints "Get Lock all key / Unlock Remote control – 0x01", which appears to be a documentation labelling error: Data[1]=0x01 is described in the same section as "Key lock all" with the bit-0 remote bit cleared. Treated the bit definitions in section 4.5.1 as authoritative and flagged the source wording for review.
- The `brightness_get` and `contrast_get` example bytes (line 730: `0xC1 0x64`, line 766: `0xC3 0x66`) deviate from the standard XOR-of-preceding-bytes checksum for Monitor ID 0x01. Either the source example checksums are incorrect or the source omits bytes from the checksum range. Flagged as a likely source-document error; do not rely on these two example checksums without verification against a real device.
- Source covers commands 0x05 through 0xE5; no other opcodes are defined. All are Set/Get pairs except 0x0F (Miscellaneous Get only) and 0xA2 (Platform/Version Get only).

## Provenance

```yaml
source_domains:
  - agneovo.com
  - allsee-tech.com
  - oceanoptics.com
source_urls:
  - https://www.agneovo.com/wp-content/uploads/2021/09/TBX-2201_RS232_CommandList.pdf
  - "https://www.allsee-tech.com/pdf/user/RS-232%20Commands%20TLxxH7.pdf"
  - https://www.oceanoptics.com/wp-content/uploads/2025/04/Serial_Communications_Protocol_RS-232_Tech_Note_Rev8.pdf
  - https://www.agneovo.com/wp-content/uploads/2021/07/PD-42_RS232_CommandList.pdf
  - https://www.agneovo.com/wp-content/uploads/2021/07/QD-98_RS232_CommandList1.pdf
retrieved_at: 2026-05-14T15:38:20.889Z
last_checked_at: 2026-06-02T21:41:38.000Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:38.000Z
matched_actions: 52
action_count: 52
confidence: medium
summary: "All 52 spec actions match verbatim hex opcodes in the source; transport values baud 9600/8N1 and port 5000 confirmed; source command catalogue is fully covered (52 of 52). (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "operator-supplied device name \"H HR Series\" was not found in the source document; the source document explicitly identifies the device as \"TBX-2201\". Treated TBX-2201 as the canonical model and flagged for human review."
- "no safety warnings, interlocks, or power-on sequencing described"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
