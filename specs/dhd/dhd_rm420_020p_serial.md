---
spec_id: admin/dhd-rm420-020p
schema_version: ai4av-public-spec-v1
revision: 1
title: "DHD RM4200D DSP Frame with RM420 Communication Controllers ECP Control Spec"
manufacturer: DHD
model_family: "RM4200D DSP Frame with RM420-850 Communication Controller"
aliases: []
compatible_with:
  manufacturers:
    - DHD
  models:
    - "RM4200D DSP Frame with RM420-850 Communication Controller"
    - "RM4200D DSP Frame with RM420-852 Communication Controller"
    - "RM4200D DSP Frame with RM420-853 Communication Controller"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - developer.dhd.audio
  - dhd.audio
source_urls:
  - https://developer.dhd.audio/docs/API/ECP/
  - https://developer.dhd.audio/docs/API/ECP/commands
  - https://developer.dhd.audio/docs/API/ECP/communication
  - https://dhd.audio/home/rm-4200d/
  - https://developer.dhd.audio/
retrieved_at: 2026-08-17T18:06:10.139Z
last_checked_at: 2026-08-19T09:15:10.927Z
generated_at: 2026-08-19T09:15:10.927Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "ECP applies across many firmware versions with feature differences; per-command firmware-version gating is captured in Notes rather than per-action."
  - "RS-232 vs RS-422 pin assignment and electrical specs not stated in source; refer to module documentation."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:15:10.927Z
  matched_actions: 38
  action_count: 38
  confidence: medium
  summary: "All 38 spec actions map to documented ECP commands/opcodes; transport (38400 8N1, TCP 2008) verbatim in source. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-17
---

# DHD RM4200D DSP Frame with RM420 Communication Controllers ECP Control Spec

## Summary
DHD RM4200D DSP Frame controllers (RM420-850, RM420-852, RM420-853) implement the DHD External Control Protocol (ECP) over RS-232, RS-422, and TCP/IP. This spec covers the ECP command set for routing, fader control, I/O gain, logic, metering, monitoring, and snapshot save/load. DHD marks ECP deprecated as of firmware 10.2; new integrations should use the Control API.

<!-- UNRESOLVED: ECP applies across many firmware versions with feature differences; per-command firmware-version gating is captured in Notes rather than per-action. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 2008
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no login/auth procedure described in source
```

## Traits
```yaml
- routable  # inferred from Set Output Routing commands (0x01F5xxxx, 0x11000000)
- levelable  # inferred from Set Fader Level (0x11030000), Set Monitor Level (0x11100000), Set IO Gain (0x112D0000)
- queryable  # inferred from request variants of routing, fader, gain, logic, PFL commands
```

## Actions
```yaml
- id: set_output_routing_16bit
  label: Set Output Routing (16bit)
  kind: action
  command: "0x01F5xxxx"
  params:
    - name: length
      type: integer
      description: "0=request all, 2=request one, 4=set"
    - name: output_hi
      type: integer
      description: "Output address high byte (slot 1..30)"
    - name: output_lo
      type: integer
      description: "Output address low byte (port within slot)"
    - name: input_hi
      type: integer
      description: "Input address high byte"
    - name: input_lo
      type: integer
      description: "Input address low byte (0xFFFF = Mute)"

- id: set_output_routing_32bit
  label: Set Output Routing (32bit)
  kind: action
  command: "0x01F5xxxx"
  params:
    - name: length
      type: integer
      description: "1=notification, 5=request one, 8=set"
    - name: output_id
      type: integer
      description: "32bit Output AudioID"
    - name: input_id
      type: integer
      description: "32bit Input AudioID (0x00000000 = Mute)"

- id: crosspoint_notification_enable
  label: Enable Crosspoint Notification (TCP only)
  kind: action
  command: "0x01F5xxxx"
  params:
    - name: enable
      type: integer
      description: "0=deactivate, 1=activate"

- id: set_arbitration
  label: Set Arbitration
  kind: action
  command: "0x01F90000"
  params:
    - name: length
      type: integer
      description: "4=request, 5=set"
    - name: audio_id
      type: integer
      description: "32bit Output/Input AudioID"
    - name: device_id
      type: integer
      description: "Owner device ID (0x00=no owner, 0x40..0x60=owner)"

- id: set_monitor_channel
  label: Set Monitor Channel
  kind: action
  command: "0x11000000"
  params:
    - name: input_left_hi
      type: integer
      description: "Left input address high"
    - name: input_left_lo
      type: integer
      description: "Left input address low"
    - name: monitor_number
      type: integer
      description: "Monitor selector channel (0..5 fw05, 0..199 fw06+)"
    - name: input_right_hi
      type: integer
      description: "Right input address high"
    - name: input_right_lo
      type: integer
      description: "Right input address low"

- id: set_fader_on_off
  label: Switch Fader/Channel On/Off
  kind: action
  command: "0x11020000"
  params:
    - name: fader_hi
      type: integer
      description: "Virtual Mixer selector (0x00..0x03) or 0x10 for fader channel addressing"
    - name: fader_lo
      type: integer
      description: "Fader/LogicFader number"
    - name: on
      type: integer
      description: "1=on, 0=off"

- id: set_fader_level
  label: Set Fader Level
  kind: action
  command: "0x11030000"
  params:
    - name: fader_hi
      type: integer
      description: "Virtual Mixer (0x00..0x03) or 0x10 for channel addressing"
    - name: fader_lo
      type: integer
      description: "Fader/LogicFader number"
    - name: level_hi
      type: integer
      description: "Level high (0x8000..0x7FFF = -327.68..327.67 dB)"
    - name: level_lo
      type: integer
      description: "Level low"
    - name: time_hi
      type: integer
      description: "Fade time high (ms)"
    - name: time_lo
      type: integer
      description: "Fade time low (ms, 0x0000..0x2000)"
    - name: type
      type: integer
      description: "0=level linear fade, 1=fader linear fade"

- id: fader_value_notification_enable
  label: Enable Fader Value Notification
  kind: action
  command: "0x11030000"
  params:
    - name: enable
      type: integer
      description: "0=deactivate, 1=activate (fw 07.02.09+)"

- id: set_fader_access
  label: Set Fader Access
  kind: action
  command: "0x11040000"
  params:
    - name: fader_hi
      type: integer
      description: "Virtual Mixer (0x00..0x03) or 0x10 for channel"
    - name: fader_lo
      type: integer
      description: "Fader/LogicFader number"
    - name: on
      type: integer
      description: "0=off, 1=on"
    - name: type
      type: integer
      description: "0=GAIN, 1=PAN/BAL, 2=INPUTSELECT"
    - name: channel_hi
      type: integer
      description: "Channel high (answer only)"
    - name: channel_lo
      type: integer
      description: "Channel low (answer only)"
    - name: acc_group
      type: integer
      description: "Acc-Group 1..6 (answer only)"

- id: set_channel_input_number
  label: Set Channel Input Number
  kind: action
  command: "0x110D0000"
  params:
    - name: fader_hi
      type: integer
      description: "Virtual Mixer (0x00..0x03)"
    - name: fader_lo
      type: integer
      description: "LogicFader number"
    - name: channel_hi
      type: integer
      description: "Channel number high (1..250)"
    - name: channel_lo
      type: integer
      description: "Channel number low"

- id: set_internal_logic_state
  label: Set Internal Logic State
  kind: action
  command: "0x110E0000"
  params:
    - name: logic_id_hi
      type: integer
      description: "LogicID high"
    - name: logic_id_lo
      type: integer
      description: "LogicID low"
    - name: on
      type: integer
      description: "0=false/off, 1=true/on"

- id: set_monitor_level
  label: Set Monitor Level (Potentiometer)
  kind: action
  command: "0x11100000"
  params:
    - name: pot_hi
      type: integer
      description: "Potentiometer high (0x0000..0x0077 = pot 1..120)"
    - name: pot_lo
      type: integer
      description: "Potentiometer low"
    - name: level_hi
      type: integer
      description: "Level high (0x8000..0x7FFF = -327.68..327.67 dB)"
    - name: level_lo
      type: integer
      description: "Level low"
    - name: time_hi
      type: integer
      description: "Fade time high (ms)"
    - name: time_lo
      type: integer
      description: "Fade time low (ms, 0x0000..0x2000)"
    - name: type
      type: integer
      description: "0=level linear fade, 1=fader linear fade"

- id: set_display_label
  label: Set Display or Channel Label
  kind: action
  command: "0x11140000"
  params:
    - name: channel_hi
      type: integer
      description: "Channel/module high"
    - name: channel_lo
      type: integer
      description: "Channel/module low (0x0001..0x00BA channel, 0x8001..0x800C module)"
    - name: display_nr
      type: integer
      description: "Display segment number (0x00..0x7F, 4 chars each)"
    - name: ascii1
      type: integer
      description: "ASCII char 1 (0x00..0x7F)"
    - name: ascii2
      type: integer
      description: "ASCII char 2"
    - name: ascii3
      type: integer
      description: "ASCII char 3"
    - name: ascii4
      type: integer
      description: "ASCII char 4"

- id: set_pfl_channel
  label: Set PFL for Channel
  kind: action
  command: "0x11160000"
  params:
    - name: fader_hi
      type: integer
      description: "Virtual Mixer (0x00..0x03) or 0x10 for channel"
    - name: fader_lo
      type: integer
      description: "Fader/LogicFader number"
    - name: on
      type: integer
      description: "1=PFL on, 0=PFL off"
    - name: auto_mute
      type: integer
      description: "1=all others switched off, 0=others unchanged"

- id: pfl_switch_off_all
  label: PFL Switch Off All (Virtual Mixer)
  kind: action
  command: "0x11160000"
  params:
    - name: fader_hi
      type: integer
      description: "Virtual Mixer selector 0x00..0x03 (fw 06+)"

- id: load_save_setups
  label: Load/Save Setups (Snapshot)
  kind: action
  command: "0x111C0000"
  params:
    - name: action
      type: integer
      description: "0x00=Load Channel, 0x01=Save Channel, 0x0a=Load Mixer, 0x0b=Save Mixer"
    - name: snapshot_number
      type: integer
      description: "Mixer 0..20 or Channel 0..250"
    - name: mixer_id
      type: integer
      description: "Virtual Mixer (0x00..0x03) or 0x10 for channel"
    - name: fader_channel
      type: integer
      description: "Fader 0..47 or Channel 0..250"

- id: set_io_gain_16bit
  label: Set IO Gain (16bit)
  kind: action
  command: "0x112D0000"
  params:
    - name: io_hi
      type: integer
      description: "I/O slot high (1..30)"
    - name: io_lo
      type: integer
      description: "I/O port low (0xFFFF = Mute)"
    - name: value_hi
      type: integer
      description: "Gain value high (0x8000..0x7FFF = -327.68..327.67 dB)"
    - name: value_lo
      type: integer
      description: "Gain value low"

- id: set_io_gain_32bit
  label: Set IO Gain (32bit)
  kind: action
  command: "0x112D0000"
  params:
    - name: audio_id
      type: integer
      description: "32bit AudioID of input/output"
    - name: value_hi
      type: integer
      description: "Gain value high (0x8000..0x7FFF = -327.68..327.67 dB)"
    - name: value_lo
      type: integer
      description: "Gain value low"

- id: metering_subscribe
  label: Metering Subscribe
  kind: action
  command: "0x111D0000"
  params:
    - name: leveldetect
      type: integer
      description: "Leveldetect position 1..48"
    - name: on
      type: integer
      description: "0=deactivate, 1=activate notification"

- id: get_set_cf_in_parameter
  label: Get/Set CleanFeed Input Parameter
  kind: action
  command: "0x11810000"
  params:
    - name: channel_hi
      type: integer
      description: "Channel high (1..250)"
    - name: channel_lo
      type: integer
      description: "Channel low"
    - name: cfin_prefix_hi
      type: integer
      description: "CFIn prefix high (0x00)"
    - name: cfin_prefix_lo
      type: integer
      description: "CFIn prefix low (0x24)"
    - name: parameter_value
      type: integer
      description: "32bit CFIn parameter (bits 7..0 = 0xD8..0x0F = -40..0..+15 dB)"

- id: get_set_cf_out_parameter
  label: Get/Set CleanFeed Output Parameter
  kind: action
  command: "0x11810000"
  params:
    - name: channel_hi
      type: integer
      description: "Channel high (1..250)"
    - name: channel_lo
      type: integer
      description: "Channel low"
    - name: cfout_prefix_hi
      type: integer
      description: "CFOut prefix high (0x00)"
    - name: cfout_prefix_lo
      type: integer
      description: "CFOut prefix low (0x25)"
    - name: parameter_value
      type: integer
      description: "32bit CFOut parameter (gain 0xD2..0x0A = -30..0..+10 dB, plus flags)"

- id: request_output_routing_all
  label: Request All Crosspoints (16bit)
  kind: query
  command: "0x01F50000"
  params:
    - name: length
      type: integer
      description: "0"

- id: request_output_routing_one_16bit
  label: Request One Crosspoint (16bit)
  kind: query
  command: "0x01F50000"
  params:
    - name: output_hi
      type: integer
      description: "Output high"
    - name: output_lo
      type: integer
      description: "Output low"

- id: request_output_routing_one_32bit
  label: Request One Crosspoint (32bit)
  kind: query
  command: "0x01F50000"
  params:
    - name: output_id
      type: integer
      description: "32bit Output AudioID"

- id: request_arbitration
  label: Request Arbitration
  kind: query
  command: "0x01F90000"
  params:
    - name: audio_id
      type: integer
      description: "32bit Output/Input AudioID"

- id: request_monitor_channel
  label: Request Monitor Channel
  kind: query
  command: "0x11000000"
  params:
    - name: monitor_number
      type: integer
      description: "Monitor selector number"

- id: request_fader_level
  label: Request Fader Level
  kind: query
  command: "0x11030000"
  params:
    - name: fader_hi
      type: integer
      description: "Virtual Mixer (0x00..0x03) or 0x10 for channel"
    - name: fader_lo
      type: integer
      description: "Fader/LogicFader number"

- id: request_fader_access
  label: Request Fader Access Status
  kind: query
  command: "0x11040000"
  params: []

- id: request_channel_input_number_all
  label: Request All Channel Input Numbers
  kind: query
  command: "0x110D0000"
  params: []

- id: request_channel_input_number
  label: Request Channel Input Number
  kind: query
  command: "0x110D0000"
  params:
    - name: fader_hi
      type: integer
      description: "Virtual Mixer"
    - name: fader_lo
      type: integer
      description: "LogicFader"

- id: request_logic_state
  label: Request Internal Logic State
  kind: query
  command: "0x110E0000"
  params:
    - name: logic_id_hi
      type: integer
      description: "LogicID high"
    - name: logic_id_lo
      type: integer
      description: "LogicID low"

- id: request_monitor_level
  label: Request Monitor Level (Pot)
  kind: query
  command: "0x11100000"
  params:
    - name: pot_hi
      type: integer
      description: "Pot high"
    - name: pot_lo
      type: integer
      description: "Pot low"

- id: request_channel_label
  label: Request Channel Label
  kind: query
  command: "0x11140000"
  params:
    - name: channel_hi
      type: integer
      description: "Channel high"
    - name: channel_lo
      type: integer
      description: "Channel low"
    - name: display_nr
      type: integer
      description: "Display segment number"

- id: request_pfl_state
  label: Request PFL State
  kind: query
  command: "0x11160000"
  params:
    - name: fader_hi
      type: integer
      description: "Virtual Mixer (0x00..0x03) or 0x10 for channel"
    - name: fader_lo
      type: integer
      description: "Fader/LogicFader number"

- id: request_io_gain_16bit
  label: Request IO Gain (16bit)
  kind: query
  command: "0x112D0000"
  params:
    - name: io_hi
      type: integer
      description: "I/O slot high"
    - name: io_lo
      type: integer
      description: "I/O port low"

- id: request_io_gain_32bit
  label: Request IO Gain (32bit)
  kind: query
  command: "0x112D0000"
  params:
    - name: audio_id
      type: integer
      description: "32bit AudioID"

- id: request_cf_in_parameter
  label: Request CleanFeed Input Parameter
  kind: query
  command: "0x11810000"
  params:
    - name: channel_hi
      type: integer
      description: "Channel high"
    - name: channel_lo
      type: integer
      description: "Channel low"
    - name: cfin_prefix_hi
      type: integer
      description: "0x00"
    - name: cfin_prefix_lo
      type: integer
      description: "0x24"

- id: request_cf_out_parameter
  label: Request CleanFeed Output Parameter
  kind: query
  command: "0x11810000"
  params:
    - name: channel_hi
      type: integer
      description: "Channel high"
    - name: channel_lo
      type: integer
      description: "Channel low"
    - name: cfout_prefix_hi
      type: integer
      description: "0x00"
    - name: cfout_prefix_lo
      type: integer
      description: "0x25"
```

## Feedbacks
```yaml
- id: crosspoint_notification
  type: bytes
  description: "Datagram of length 8 sent when internal routing changes (32bit routing, TCP only, after 0x01F5xxxx with length 1, enable=1)"
- id: fader_value_notification
  type: bytes
  description: "Datagram of length 4 sent when fader value changes (after 0x11030000 with length 1, enable=1; fw 07.02.09+)"
- id: metering_notification
  type: bytes
  description: "Datagram of length 6 with LevelL, LevelR, Correlation (after 0x111D0000 with length 2, on=1; fw 08.01.18+)"
- id: motorfader_touched
  type: bytes
  description: "Datagram of length 2 sent automatically when a motorized fader is touched (0x11820000; ChannelNr 1..250, Touch 0/1)"
- id: arbitration_answer
  type: bytes
  description: "Datagram of length 5 (0x01F90000) returning 32bit AudioID + DeviceID 0x00=free, 0x40..0x60=owner"
- id: ack
  type: bytes
  description: "0x06 - block successfully received"
- id: nak
  type: bytes
  description: "0x05 - block rejected"
```

## Variables
```yaml
# Source uses 16bit/32bit parameter slots directly in actions; no separate variable list.
```

## Events
```yaml
# Covered in Feedbacks (crosspoint_notification, fader_value_notification, metering_notification, motorfader_touched).
```

## Macros
```yaml
# Source does not document multi-step macro sequences; snapshot save/load is handled via 0x111C0000 action.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Arbitration ownership is informational only; firmware does not enforce it. Resource control must be handled by connected applications (source warning)."
  - "I/O Gain changes (0x112D0000) are valid only until next system reset/reboot/power cycle; cannot be changed from the console (source warning)."
  - "On firmware 06.xx.xx and higher, TCP sockets are nonblocking; if data is not fetched fast enough, the socket is automatically closed."
```

## Notes
- ECP deprecated as of firmware 10.2; new integrations should use DHD Control API.
- Serial: 38400, 8, N, 1, no protocol. Blocks: STX | Length | 28bit ID | 0-8 data bytes | Checksum | EOT. ACK=0x06, NAK=0x05, DLE=0x0A, STX=0x02, EOT=0x08. Bytes 0x00..0x1F escaped as DLE, byte+0x20. Block must be answered within 80ms; max 3 retransmits; buffer holds 100 blocks.
- TCP: Port 2008. Block always 16 bytes: 0,0,0,0,L3..L0 | U0 | 0,0,0,ID28..ID24 | ID23..ID16 | ID15..ID8 | ID7..ID0 | B0..B7 | U1 | U2. Motorola-format (MSB first).
- Multiple AudioID versions exist (V1 for 52/RM4200D/XR, V2 for 52/XS/XC/XD/XS2/XC2/XD2). AudioIDs must be looked up from the project's TB5/TB8 configuration.
- Per-command firmware gating (from source footnotes):
  - 0x01F5xxxx 32bit: since 06.07.15 / 07.01.16
  - 0x01F90000 (Arbitration): since 07.02.32
  - 0x11030000 fader notification: since 07.02.09
  - 0x11140000 (Channel Label request): since 07.02.10
  - 0x11100000 / 0x11160000 request variants: since 07.04.11
  - 0x111D0000 (Metering): since 08.01.18
  - 0x11810000 (CF In/Out): since 09.00.05
- Virtual Mixer addressing: FaderHi 0x00..0x03 = VM1..VM4 with FaderLo as LogicFader (0x00..0x2F); FaderHi 0x10 = FaderLo as Fader Channel Number 1..150.
- Firmware 05.xx.xx uses FaderLo 0x00..0x27 with FaderHi=0x00.
- Level range 0x8000..0x7FFF = -327.68..327.67 dB (signed short).
- Time range 0x0000..0x2000 ms.
- Source recommends 32bit commands (0x01F5 and 0x112D) for 52/XS/XC/XD and 52/XS2/XC2/XD2 devices.
- Controller availability: RM420-850 has 1 RS-232 + RS-422 on controller and 1-3 RS-232 on each RM420-851; RM420-852 adds RS-422; RM420-853 only RS-422 on B-variants. TCP max 10 sockets (5 sockets on fw <= 7.04.06; 4 sockets on RM420-850 fw 05.05.27..05.06.01).
```

<!-- UNRESOLVED: RS-232 vs RS-422 pin assignment and electrical specs not stated in source; refer to module documentation. -->

## Provenance

```yaml
source_domains:
  - developer.dhd.audio
  - dhd.audio
source_urls:
  - https://developer.dhd.audio/docs/API/ECP/
  - https://developer.dhd.audio/docs/API/ECP/commands
  - https://developer.dhd.audio/docs/API/ECP/communication
  - https://dhd.audio/home/rm-4200d/
  - https://developer.dhd.audio/
retrieved_at: 2026-08-17T18:06:10.139Z
last_checked_at: 2026-08-19T09:15:10.927Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:15:10.927Z
matched_actions: 38
action_count: 38
confidence: medium
summary: "All 38 spec actions map to documented ECP commands/opcodes; transport (38400 8N1, TCP 2008) verbatim in source. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "ECP applies across many firmware versions with feature differences; per-command firmware-version gating is captured in Notes rather than per-action."
- "RS-232 vs RS-422 pin assignment and electrical specs not stated in source; refer to module documentation."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
