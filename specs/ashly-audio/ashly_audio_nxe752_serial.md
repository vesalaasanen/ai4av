---
spec_id: admin/ashly-audio-nxe752
schema_version: ai4av-public-spec-v1
revision: 1
title: "Ashly Audio Nxe752 Control Spec"
manufacturer: "Ashly Audio"
model_family: Nxe752
aliases: []
compatible_with:
  manufacturers:
    - "Ashly Audio"
  models:
    - Nxe752
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ashly.com
source_urls:
  - https://ashly.com/wp-content/uploads/2015/10/WR5_Protocol.pdf
  - https://ashly.com/wp-content/uploads/2018/07/nXa-manual-r04.pdf
  - https://ashly.com/wp-content/uploads/2015/08/Ethernet-Communications-v5_3.pdf
  - https://ashly.com/wp-content/uploads/2016/07/nXe-multimode-amplifiers-1U.pdf
  - https://ashly.com/knowledge-base/
retrieved_at: 2026-07-13T18:26:05.522Z
last_checked_at: 2026-07-21T20:25:42.397Z
generated_at: 2026-07-21T20:25:42.397Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "doc title is \"WR5 Remote Protocol (02/23/2018)\" and does not enumerate which Ashly target devices (Nxe752, 24.24M, etc.) are supported — Nxe752 compatibility inferred from device name supplied with the source. Voltage/current/power specs not stated. Physical connector pinout not stated. Cable wiring not stated."
  - "flow control not stated; source notes \"Hardware is logic 5v current loop, similar to MIDI\""
  - "source does not enumerate named settable variables separate from the"
  - "no other unsolicited notification categories documented."
  - "no multi-step sequences described in source."
  - "source contains no safety warnings, interlock procedures, or"
  - "electrical interface adapter requirements not documented"
  - "firmware version compatibility for the Nxe752 not stated."
  - "maximum number of inputs/outputs/zone channels per device not stated (protocol references up to 20 channels in bitmasks and 64 in/out in channel gain indexing)."
  - "response timing, timeouts, retry behavior not documented."
  - "byte ordering for multi-byte serial numbers (bits 13-7 / 6-0) confirmed but endianness of any other multi-byte fields not stated."
verification:
  verdict: verified
  checked_at: 2026-07-21T20:25:42.397Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions matched with distinct source message types; transport fully supported; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Ashly Audio Nxe752 Control Spec

## Summary
The Ashly Audio Nxe752 is controlled via the WR5 Remote Protocol, a binary SysEx-style message protocol carried over RS-232C serial at 9600 bps. Messages follow the form `$F0 00 01 2A $0C <msg-type> ... $F7` (Ashly manufacturer ID `00 01 2A`, WR5 model number `$0C`). The protocol supports device discovery, preset recall, channel gain, mute, matrix mixer, logic output, and WR5 settings download/upload. Third-party control systems send fixed serial-number bytes (`00 01`) as documented per message.

<!-- UNRESOLVED: doc title is "WR5 Remote Protocol (02/23/2018)" and does not enumerate which Ashly target devices (Nxe752, 24.24M, etc.) are supported — Nxe752 compatibility inferred from device name supplied with the source. Voltage/current/power specs not stated. Physical connector pinout not stated. Cable wiring not stated. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; source notes "Hardware is logic 5v current loop, similar to MIDI"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - queryable  # inferred: settings/preset/mute/gain/logic/matrix/firmware inquiry messages present
  - levelable  # inferred: channel/output gain set messages present (range 0-99)
  - routable   # inferred: matrix mixer inquiry/msg messages present
```

## Actions
```yaml
# All byte values in hex. "$" denotes hex in the source; leading "$" preserved where the source uses it.
# Common framing: $F0 00 01 2A $0C <target_id> <msg_type> <serial_hi> <serial_lo> ... $F7
# For 3rd-party control: <serial_hi>=00, <serial_lo>=01 (per source notes).
# Target Device Id byte ($00) is the default; for 24.24M use (front-panel Device Id - 1).
#
# Source documents each message type as a distinct row → one action per message type.

- id: device_discovery_request
  label: Device Discovery Request
  kind: action
  command: "F0 00 01 2A 0D 00 F7"
  params: []
  notes: "Broadcast discovery for all Ashly remotes. Byte5=0D (discovery model number), byte6=00 (msg type 0=Discovery Request)."

- id: device_discovery_response
  label: Device Discovery Response
  kind: feedback
  command: "F0 00 01 2A 0D 01 {model} {sn_hi} {sn_lo} {name[20]} F7"
  params:
    - name: model
      type: integer
      description: Device Model number (WR5 = 0C)
    - name: sn_hi
      type: integer
      description: Device Serial number bits 13-7
    - name: sn_lo
      type: integer
      description: Device Serial number bits 6-0
    - name: name
      type: string
      description: WR5 name characters 1-20
  notes: "Unsolicited response to Device Discovery Request. Byte7=01."

- id: wr5_settings_inquiry
  label: WR5 Settings Inquiry
  kind: query
  command: "F0 00 01 2A 0C 7F 00 {sn_hi} {sn_lo} F7"
  params:
    - name: sn_hi
      type: integer
      description: Device Serial number bits 13-7
    - name: sn_lo
      type: integer
      description: Device Serial number bits 6-0
  notes: "Byte6=$7F (PC Device Id). Byte7=$00 = msg type 0."

- id: wr5_settings_response
  label: WR5 Settings Response
  kind: feedback
  command: "F0 00 01 2A 0C 7F 01 {sn_hi} {sn_lo} {id} {name[20]} {op} {out_zone[4]} {btn1_cfg} {btn2_cfg} {btn3_cfg} {btn4_cfg} {btn5_cfg} {btn6_cfg} F7"
  params:
    - name: id
      type: integer
      description: Target Device Id (e.g. 24.24M Device Id)
    - name: name
      type: string
      description: WR5 name characters 1-20 (bytes 11-30)
    - name: op
      type: integer
      description: "Options byte: bit0=exclusive source select, bit1=disable output zone lvl, bit2=use checksums, bit6=supports LogicOut & matrix mixer (read only)"
    - name: out_zone
      type: array
      description: "Output 1-20 Zone Selection bitmask (bytes 32-34) + spare (byte 35)"
    - name: btnN_cfg
      type: object
      description: "Per-button block (buttons 1-6): function type ft, lower limit ll (0-99), upper limit ul (0-99), preset number pn (0-99), input assignment bitmask[4], output assignment bitmask[4] - 12 bytes per button"
  notes: "Byte7=$01. Function types (byte ft): 0=off, 1=preset recall, 2=preset scroll, 3=gain, 4=mute, 5=source selection; added in 2.0: 6=Logic Out (Active High), 7=Logic Out (Active Low), 8=Matrix Mixer."

- id: wr5_settings_download
  label: WR5 Settings Download
  kind: action
  command: "F0 00 01 2A 0C 7F 02 {sn_hi} {sn_lo} {id} {name[20]} {op} {out_zone[4]} {btn1_cfg} {btn2_cfg} {btn3_cfg} {btn4_cfg} {btn5_cfg} {btn6_cfg} F7"
  params:
    - name: sn_hi
      type: integer
    - name: sn_lo
      type: integer
    - name: id
      type: integer
      description: Target Device Id
    - name: name
      type: string
      description: WR5 name characters 1-20
    - name: op
      type: integer
      description: Options byte (see wr5_settings_response)
    - name: out_zone
      type: array
    - name: btnN_cfg
      type: object
  notes: "Same payload as WR5 Settings Response but byte7=$02. Source: '(same as WR5 Settings Response above, but with byte-7 as $02)'."

- id: preset_mute_status_inquiry
  label: Preset Number & Mute Status Inquiry
  kind: query
  command: "F0 00 01 2A 0C 00 03 00 01 F7"
  params: []
  notes: "Byte6=$00 Target Device Id (for 24.24M use front-panel Device Id - 1). Byte7=$03. Serial bytes fixed 00 01 for 3rd-party control."

- id: preset_mute_status_response
  label: Preset Number & Mute Status Response
  kind: feedback
  command: "F0 00 01 2A 0C 00 04 00 01 {preset} {in_mute[4]} {out_mute[4]} F7"
  params:
    - name: preset
      type: integer
      description: Target device preset number (24.24M preset number - 1)
    - name: in_mute
      type: array
      description: "Inputs 1-20 mute status bitmask (bytes 11-13) + spare (byte 14); high bit = channel muted"
    - name: out_mute
      type: array
      description: "Outputs 1-20 mute status bitmask (bytes 15-17) + spare (byte 18); high bit = channel muted"
  notes: "Byte7=$04."

- id: output_gain_mixer_mutes_inquiry
  label: Output Gain & Mixer Mutes Inquiry
  kind: query
  command: "F0 00 01 2A 0C 00 05 00 01 {channel} F7"
  params:
    - name: channel
      type: integer
      description: Target Device output channel (byte 10 = nn)
  notes: "Byte7=$05."

- id: output_gain_mixer_mutes_response
  label: Output Gain & Mixer Mutes Response
  kind: feedback
  command: "F0 00 01 2A 0C 00 06 00 01 {channel} {level} {src_mute[4]} F7"
  params:
    - name: channel
      type: integer
      description: Target device output channel requested (0 to n = output 1 to n+1)
    - name: level
      type: integer
      description: Output channel level (0-99)
    - name: src_mute
      type: array
      description: "Output channel's sources 1-20 mute status bitmask (bytes 12-14) + spare (byte 15)"
  notes: "Byte7=$06."

- id: channel_gain_inquiry
  label: Channel Gain Inquiry
  kind: query
  command: "F0 00 01 2A 0C 00 07 00 01 {channel} F7"
  params:
    - name: channel
      type: integer
      description: "Target Device channel: 0-63 = inputs 1-64, 64-127 = outputs 1-64"
  notes: "Byte7=$07."

- id: channel_gain_response
  label: Channel Gain Response
  kind: feedback
  command: "F0 00 01 2A 0C 00 08 00 01 {channel} {level} F7"
  params:
    - name: channel
      type: integer
      description: "Target Device channel: 0-63 = inputs 1-64, 64-127 = outputs 1-64"
    - name: level
      type: integer
      description: Channel level (0-99)
  notes: "Byte7=$08."

- id: preset_recall
  label: Preset Recall
  kind: action
  command: "F0 00 01 2A 0C 00 09 00 01 {preset} F7"
  params:
    - name: preset
      type: integer
      description: Target device preset number (24.24M preset number - 1)
  notes: "Byte7=$09. Message type 9 = Target Device Preset Recall Message."

- id: mute_unmute
  label: Mute/Unmute
  kind: action
  command: "F0 00 01 2A 0C 00 0A 00 01 {um} {in_mask[4]} {out_mask[4]} F7"
  params:
    - name: um
      type: integer
      description: "0 = unmute selected channels, 1-7F = mute selected channels"
    - name: in_mask
      type: array
      description: "Inputs 1-20 selection bitmask (bytes 11-13) + spare (byte 14); high bit = channel selected"
    - name: out_mask
      type: array
      description: "Outputs 1-20 selection bitmask (bytes 15-17) + spare (byte 18); high bit = channel selected"
  notes: "Byte7=$0A. Message type 10."

- id: gain_set
  label: Gain Set
  kind: action
  command: "F0 00 01 2A 0C 00 0B 00 01 {level} {in_mask[4]} {out_mask[4]} F7"
  params:
    - name: level
      type: integer
      description: New gain value (0-99)
    - name: in_mask
      type: array
      description: "Inputs 1-20 selection bitmask (bytes 12-14) + spare (byte 15); high bit = channel selected for new gain"
    - name: out_mask
      type: array
      description: "Outputs 1-20 selection bitmask (bytes 16-18) + spare (byte 19); high bit = channel selected for new gain"
  notes: "Byte7=$0B. Message type 11 = Target Device Gain Message."

- id: mixer_source_mute_unmute
  label: Mixer Source Mute/Unmute
  kind: action
  command: "F0 00 01 2A 0C 00 0C 00 01 {out_mask[4]} {mute_mask[4]} {unmute_mask[4]} F7"
  params:
    - name: out_mask
      type: array
      description: "Mixer (output channel) 1-20 selection bitmask (bytes 10-12) + spare (byte 13)"
    - name: mute_mask
      type: array
      description: "Sources (mix faders) 1-20 to mute bitmask (bytes 14-16) + spare (byte 17); high = fader mutes, low = fader not affected"
    - name: unmute_mask
      type: array
      description: "Sources (mix faders) 1-20 to unmute bitmask (bytes 18-20) + spare (byte 21)"
  notes: "Byte7=$0C. Message type 12 = Target Device Mixer Source Mute/Unmute Message."

- id: wr5_button_pressed
  label: WR5 Button Pressed
  kind: feedback
  command: "F0 00 01 2A 0C 7F 0D {sn_hi} {sn_lo} {button} F7"
  params:
    - name: sn_hi
      type: integer
      description: Device Serial number bits 13-7
    - name: sn_lo
      type: integer
      description: Device Serial number bits 6-0
    - name: button
      type: integer
      description: WR5 button number pressed
  notes: "Byte6=$7F (PC Device Id). Byte7=$0D. Message type 13 = WR5 Button Pressed Msg."

- id: wr5_button_released
  label: WR5 Button Released
  kind: feedback
  command: "F0 00 01 2A 0C 7F 0E {sn_hi} {sn_lo} F7"
  params:
    - name: sn_hi
      type: integer
    - name: sn_lo
      type: integer
  notes: "Byte7=$0E. Message type 14 = WR5 Button Released Msg."

- id: logic_output_status_inquiry
  label: Logic Output Status Inquiry
  kind: query
  command: "F0 00 01 2A 0C 00 0F 00 01 F7"
  params: []
  notes: "Byte7=$0F. Message type 15 = Target Device Logic Output inquiry."

- id: logic_output_status_response
  label: Logic Output Status Response
  kind: feedback
  command: "F0 00 01 2A 0C 00 10 00 01 {in_logic[4]} F7"
  params:
    - name: in_logic
      type: array
      description: "Inputs 1-20 logic status bitmask (bytes 10-12) + spare (byte 13); high bit = channel is high (FET off)"
  notes: "Byte7=$10. Message type 16. NOTE: source labels bytes 10-13 as 'inputs' logic status - likely means logic output channels; preserved verbatim."

- id: logic_output_set
  label: Logic Output Set
  kind: action
  command: "F0 00 01 2A 0C 00 11 00 01 {number} {value} F7"
  params:
    - name: number
      type: integer
      description: Logic Output Number (0 to number of logic outputs)
    - name: value
      type: integer
      description: "0 = Low (FET on), 1 = High (FET off)"
  notes: "Byte7=$11. Message type 17 = Target Device Logic Output Message."

- id: matrix_mixer_inquiry
  label: Matrix Mixer Inquiry
  kind: query
  command: "F0 00 01 2A 0C 00 12 00 01 {zone} {input} F7"
  params:
    - name: zone
      type: integer
      description: Output Zone to request mixer settings for
    - name: input
      type: integer
      description: Mixer Input Number
  notes: "Byte7=$12. Message type 18 = Target Device Matrix Mixer Inquiry."

- id: matrix_mixer_response
  label: Matrix Mixer Response
  kind: feedback
  command: "F0 00 01 2A 0C 00 13 00 01 {zone} {input} {mix_level} F7"
  params:
    - name: zone
      type: integer
      description: Output Zone that Mixer Settings are for
    - name: input
      type: integer
      description: Mixer Input Number
    - name: mix_level
      type: integer
      description: Mix Level
  notes: "Byte7=$13. Message type 19."

- id: matrix_mixer_set
  label: Matrix Mixer Set
  kind: action
  command: "F0 00 01 2A 0C 00 14 00 01 {level} {zone_mask[4]} {input_mask[4]} F7"
  params:
    - name: level
      type: integer
      description: New gain value (0-99)
    - name: zone_mask
      type: array
      description: "Zone outputs 1-20 selection bitmask (bytes 11-13) + spare (byte 14)"
    - name: input_mask
      type: array
      description: "Mixer inputs 1-20 selection bitmask (bytes 15-17) + spare (byte 18); high bit = channel selected for new level"
  notes: "Byte7=$14. Message type 20 = Target Device Matrix Mixer Message."

- id: checksum_msg
  label: Checksum Message
  kind: action
  command: "F0 00 01 2A 0C 00 15 00 01 {follow_type} {checksum} F7"
  params:
    - name: follow_type
      type: integer
      description: Message to Follow Type (byte 10 = aa)
    - name: checksum
      type: integer
      description: "Message to Follow Checksum (byte 11 = bb). Computed: sum all message bytes → 1's complement → +1 → AND 0x7F."
  notes: "Byte7=$15. Message type 21 = Checksum Message. Source: 'may be prepended to all wr5 messages to ensure integrity. May be omitted if the flag to require it is not set in the options.'"

- id: reprogram_msg
  label: Reprogram Message
  kind: action
  command: "F0 00 01 2A 0C 7F 16 {sn_hi} {sn_lo} 33 55 F7"
  params:
    - name: sn_hi
      type: integer
      description: Device Serial number bits 13-7
    - name: sn_lo
      type: integer
      description: Device Serial number bits 6-0
  notes: "Byte6=$7F Reserved. Byte7=$16. Byte10=$33, byte11=$55 reserved. Message type 22 = Enter Reprogram Message."

- id: download_firmware_msg
  label: Download Firmware Protocol Msg
  kind: action
  command: "F0 00 01 2A 0C 7F 17 {sn_hi} {sn_lo} {length} F7"
  params:
    - name: sn_hi
      type: integer
    - name: sn_lo
      type: integer
    - name: length
      type: integer
      description: Length of message (Byte 1)
  notes: "Byte7=$17. Message type 23. Reserved bytes 8-9 = device serial number."

- id: download_firmware_crc_error_msg
  label: Download Firmware CRC Error Msg
  kind: feedback
  command: "F0 00 01 2A 0C 7F 18 {sn_hi} {sn_lo} {unknown} {length} F7"
  params:
    - name: sn_hi
      type: integer
    - name: sn_lo
      type: integer
    - name: unknown
      type: integer
      description: "Byte 10 - source description blank (?)"
    - name: length
      type: integer
      description: Length of message (Byte 1)
  notes: "Byte7=$18. Source labels msg type 24 as 'Download Firmware Protocol Msg' (likely typo for CRC Error per section title)."

- id: firmware_version_inquiry
  label: WR5 Firmware Version Inquiry
  kind: query
  command: "F0 00 01 2A 0C 7F 19 {sn_hi} {sn_lo} F7"
  params:
    - name: sn_hi
      type: integer
    - name: sn_lo
      type: integer
  notes: "Byte7=$19. Message type 25 = Firmware Version Inquiry Msg."

- id: firmware_version_response
  label: WR5 Firmware Version Response
  kind: feedback
  command: "F0 00 01 2A 0C 7F 1A {sn_hi} {sn_lo} {version} F7"
  params:
    - name: sn_hi
      type: integer
    - name: sn_lo
      type: integer
    - name: version
      type: integer
      description: Firmware Version (byte 10 = aa)
  notes: "Byte7=$1A. Message type 26 = Firmware Version Response Msg."
```

## Feedbacks
```yaml
# Feedback entries mirror the Response/Button/Status message types above.
# See Actions section for full payloads. Listed here for indexing.
- id: device_discovery_response
  type: object
- id: wr5_settings_response
  type: object
- id: preset_mute_status_response
  type: object
- id: output_gain_mixer_mutes_response
  type: object
- id: channel_gain_response
  type: object
- id: wr5_button_pressed
  type: object
- id: wr5_button_released
  type: object
- id: logic_output_status_response
  type: object
- id: matrix_mixer_response
  type: object
- id: download_firmware_crc_error_msg
  type: object
- id: firmware_version_response
  type: object
```

## Variables
```yaml
# UNRESOLVED: source does not enumerate named settable variables separate from the
# action messages above (gain/mute/preset/matrix levels are all carried as action
# payloads rather than named variable slots).
```

## Events
```yaml
# Unsolicited device → host messages documented in source:
- id: wr5_button_pressed
  description: Emitted by WR5 remote on button press.
- id: wr5_button_released
  description: Emitted by WR5 remote on button release.
- id: download_firmware_crc_error_msg
  description: Emitted by device on firmware download CRC error.
# UNRESOLVED: no other unsolicited notification categories documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Reprogram and firmware-download messages
# (types 22-24) are destructive but carry no documented confirmation flow.
```

## Notes
- All messages use SysEx-style framing: `$F0` start byte, `$F7` stop byte, Ashly manufacturer ID `00 01 2A`, WR5 model number `$0C` (except Device Discovery which uses model `$0D` at byte 5).
- Serial port: 9600 bps, 1 start bit, 1 stop bit, no parity. Source notes hardware is "logic 5v current loop, similar to MIDI" — physical layer is NOT standard RS-232 voltage despite the RS-232C framing; interface adapter may be required. <!-- UNRESOLVED: electrical interface adapter requirements not documented -->
- Checksum is optional (controlled by options bit 2 in WR5 Settings Response `op` byte). When enabled, Checksum Msg (type 21) is prepended to the following message. Computation: sum all message bytes → 1's complement → add 1 (two's complement) → AND `0x7F`. Result goes in byte 11 of the Checksum Msg.
- For third-party control systems, the device serial-number bytes (bytes 8-9 of most messages) are fixed at `00 01` per source notes. A Serial Number of `0x0000` = Non-WR5 Host Message to update WR5 Remotes only.
- Target Device Id (byte 6) is `$00` for the default target; for the Ashly 24.24M use (front-panel Device Id - 1). WR5-internal messages (settings, button, firmware) use `$7F` (PC Device Id) at byte 6.
- Channel indexing: in Channel Gain messages (types 7-8), channel `0-63` = inputs `1-64`, `64-127` = outputs `1-64`. In Output Gain messages (types 5-6), `0 to n = output 1 to n+1`. Preset numbers in 24.24M context are 0-indexed (front-panel preset - 1).
- Bitmask convention: each selection/status byte packs 7 channels (LSB=channel 1, etc.) with the high bit used as the per-channel flag (selected/muted/high). Three payload bytes cover channels 1-20 plus a spare byte. Source writes these as `0-7-6-5-4-3-2-1` (bit positions).
- Function types added in protocol v2.0: 6 = Logic Out (Active High), 7 = Logic Out (Active Low), 8 = Matrix Mixer.

<!-- UNRESOLVED: firmware version compatibility for the Nxe752 not stated. -->
<!-- UNRESOLVED: maximum number of inputs/outputs/zone channels per device not stated (protocol references up to 20 channels in bitmasks and 64 in/out in channel gain indexing). -->
<!-- UNRESOLVED: response timing, timeouts, retry behavior not documented. -->
<!-- UNRESOLVED: byte ordering for multi-byte serial numbers (bits 13-7 / 6-0) confirmed but endianness of any other multi-byte fields not stated. -->

## Provenance

```yaml
source_domains:
  - ashly.com
source_urls:
  - https://ashly.com/wp-content/uploads/2015/10/WR5_Protocol.pdf
  - https://ashly.com/wp-content/uploads/2018/07/nXa-manual-r04.pdf
  - https://ashly.com/wp-content/uploads/2015/08/Ethernet-Communications-v5_3.pdf
  - https://ashly.com/wp-content/uploads/2016/07/nXe-multimode-amplifiers-1U.pdf
  - https://ashly.com/knowledge-base/
retrieved_at: 2026-07-13T18:26:05.522Z
last_checked_at: 2026-07-21T20:25:42.397Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:25:42.397Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions matched with distinct source message types; transport fully supported; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "doc title is \"WR5 Remote Protocol (02/23/2018)\" and does not enumerate which Ashly target devices (Nxe752, 24.24M, etc.) are supported — Nxe752 compatibility inferred from device name supplied with the source. Voltage/current/power specs not stated. Physical connector pinout not stated. Cable wiring not stated."
- "flow control not stated; source notes \"Hardware is logic 5v current loop, similar to MIDI\""
- "source does not enumerate named settable variables separate from the"
- "no other unsolicited notification categories documented."
- "no multi-step sequences described in source."
- "source contains no safety warnings, interlock procedures, or"
- "electrical interface adapter requirements not documented"
- "firmware version compatibility for the Nxe752 not stated."
- "maximum number of inputs/outputs/zone channels per device not stated (protocol references up to 20 channels in bitmasks and 64 in/out in channel gain indexing)."
- "response timing, timeouts, retry behavior not documented."
- "byte ordering for multi-byte serial numbers (bits 13-7 / 6-0) confirmed but endianness of any other multi-byte fields not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
