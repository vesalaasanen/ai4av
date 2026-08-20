---
spec_id: admin/dhd-rm420-020mp
schema_version: ai4av-public-spec-v1
revision: 1
title: "DHD RM420 020Mp Control Spec"
manufacturer: DHD
model_family: "RM4200D DSP Frame with RM420-850 Communication Controller"
aliases: []
compatible_with:
  manufacturers:
    - DHD
  models:
    - "RM4200D DSP Frame with RM420-850 Communication Controller"
    - "RM4200D DSP Frame with RM420-852 or RM420-853 Communication Controller"
    - "52/XR Router DSP Frame with 52-6850 or 52-6851 Communication Controller"
    - "52/XS Core"
    - "52/XC Core"
    - "52/XD Core with 52-7450 Controller"
    - "52/XS2 Core"
    - "52/XC2 Core"
    - "52/XD2 Core with 52-7456 Controller"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - developer.dhd.audio
  - dhd.audio
source_urls:
  - https://developer.dhd.audio/docs/API/ECP/
  - https://developer.dhd.audio/docs/API/ECP/communication
  - https://developer.dhd.audio/docs/API/ECP/commands
  - https://dhd.audio/systems/rm-4200d/
  - https://developer.dhd.audio/
retrieved_at: 2026-08-18T00:03:30.571Z
last_checked_at: 2026-08-19T09:18:31.672Z
generated_at: 2026-08-19T09:18:31.672Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "command-level firmware applicability varies across 05.xx.xx, 06.xx.xx, 07.xx.xx, 08.00.xx, 08.01.xx, 08.02.xx and 09.00.xx versions; see source per-command tables for exact availability"
  - "section omitted - all per-command parameter values are encoded in action params"
  - "section omitted - see Feedbacks for unsolicited notifications"
  - "source documents single commands only; no multi-step macro sequences described"
  - "source contains no explicit safety warnings beyond general \"IO Gain changes persist until restart\" note"
  - "32-bit AudioID bit fields differ between Series52 v1 (RM4200D/XR) and v2 (XS/XC/XD); source documents both layouts but spec does not enumerate them as separate fields"
verification:
  verdict: verified
  checked_at: 2026-08-19T09:18:31.672Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec action units have opcode/length/structure matches in the refined source; transport parameters (38400,8,N,1; port 2008) are verbatim; source command catalogue is fully represented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-18
---

# DHD RM420 020Mp Control Spec

## Summary
DHD External Control Protocol (ECP) for RM4200D DSP frames, 52/XC/XD/XS/XR cores and controllers. Provides routing, fader, monitor, IO gain, logic, metering, snapshot and CleanFeed control over RS-232/RS-422 serial or TCP/IP on port 2008. ECP is deprecated as of firmware 10.2; new integrations should use the Control API.

<!-- UNRESOLVED: command-level firmware applicability varies across 05.xx.xx, 06.xx.xx, 07.xx.xx, 08.00.xx, 08.01.xx, 08.02.xx and 09.00.xx versions; see source per-command tables for exact availability -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 2008
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable   # inferred from routing command examples
- levelable  # inferred from fader/monitor level commands
- queryable # inferred from request/notification commands
```

## Actions
```yaml
- id: route_output_16bit_request_all
  label: Route Output 16bit - Request All Crosspoints
  kind: query
  command: "01F50000,0"
  params: []

- id: route_output_16bit_request_one
  label: Route Output 16bit - Request One Crosspoint
  kind: query
  command: "01F5xxxx,2,OutputHi,OutputLo"
  params:
    - name: slot
      type: integer
      description: Controller module number (xxxx), 0 transmits - name: output
      type: integer
      description: Output address 0x0180..0x1EFF (HiByte=slot 1..30, LoByte=port 0..7)

- id: route_output_16bit_set
  label: Route Output 16bit - Set Crosspoint
  kind: action
  command: "01F5xxxx,4,OutputHi,OutputLo,InputHi,InputLo"
  params:
    - name: slot
      type: integer
      description: Controller module number (xxxx)
    - name: output
      type: integer
      description: Physical output 0x0180..0x1EFF
    - name: input
      type: integer
      description: Physical input 0x0100..0x1E7F, summation 0x4000..0x7FFF, or 0xFFFF mute

- id: route_output_32bit_crosspoint_notification
  label: Route Output 32bit - Activate/Deactivate Crosspoint Notification
  kind: action
  command: "01F50000,1,D0"
  params:
    - name: state
      type: integer
      description: 0x00 deactivate, 0x01 activate (TCP only)

- id: route_output_32bit_request_one
  label: Route Output 32bit - Request One Crosspoint
  kind: query
  command: "01F50000,5,OutputId_b0,OutputId_b1,OutputId_b2,OutputId_b3"
  params:
    - name: output_id_32bit
      type: integer
      description: 32bit Output AudioID (see AudioID description)

- id: route_output_32bit_set
  label: Route Output 32bit - Set Crosspoint
  kind: action
  command: "01F50000,8,OutputId_b0,OutputId_b1,OutputId_b2,OutputId_b3,InputId_b0,InputId_b1,InputId_b2,InputId_b3"
  params:
    - name: output_id_32bit
      type: integer
      description: 32bit Output AudioID
    - name: input_id_32bit
      type: integer
      description: 32bit Input AudioID; 0x00000000 to mute

- id: arbitration_request
  label: Set Arbitration - Request Owner
  kind: query
  command: "01F90000,4,AudioId_b0,AudioId_b1,AudioId_b2,AudioId_b3"
  params:
    - name: audio_id_32bit
      type: integer
      description: 32bit Output/Input AudioID

- id: arbitration_set
  label: Set Arbitration - Set Owner
  kind: action
  command: "01F90000,5,AudioId_b0,AudioId_b1,AudioId_b2,AudioId_b3,DeviceId"
  params:
    - name: audio_id_32bit
      type: integer
      description: 32bit Output/Input AudioID
    - name: device_id
      type: integer
      description: 0x00 no owner, 0x40..0x60 owning DeviceID

- id: set_monitor_channel_request
  label: Set Monitor Channel - Request Current Inputs
  kind: query
  command: "11000000,3,00,00,Number"
  params:
    - name: monitor_number
      type: integer
      description: Monitor selector channel 0..5 (firmware 05.xx.xx) or 0..199 (06.xx.xx+)

- id: set_monitor_channel_set
  label: Set Monitor Channel - Set
  kind: action
  command: "11000000,6,InputHiL,InputLoL,Number,InputHiR,InputLoR,0"
  params:
    - name: input_left
      type: integer
      description: Left input 0x0000..0x0027 (prefader) or 0x0100..0x1E7F (mixer) or 0x4000..0x7FFF (summation)
    - name: monitor_number
      type: integer
      description: Monitor selector channel 0..5 or 0..199
    - name: input_right
      type: integer
      description: Right input (same ranges as Left)

- id: set_fader_on_off
  label: Switch Fader/Channel On/Off
  kind: action
  command: "11020000,3,FaderHi,FaderLo,On"
  params:
    - name: fader_hi
      type: integer
      description: 0x00..0x03 VirtualMixer1..4 (LogicFader), or 0x10 FaderChannelNumber
    - name: fader_lo
      type: integer
      description: 0x00..0x27 (05.xx) or 0x00..0x2F LogicFader / 0x00..0x95 FaderChannel (06.xx+)
    - name: on
      type: integer
      description: 1=on, 0=off

- id: set_fader_level_notification
  label: Set Fader Level - Activate/Deactivate Notification
  kind: action
  command: "11030000,1,D0"
  params:
    - name: state
      type: integer
      description: 0x00 deactivate, 0x01 activate (firmware 07.02.09+)

- id: set_fader_level_request
  label: Set Fader Level - Request
  kind: query
  command: "11030000,2,FaderHi,FaderLo"
  params:
    - name: fader_hi
      type: integer
      description: 0x00..0x03 VirtualMixer (LogicFader) or 0x10 FaderChannelNumber
    - name: fader_lo
      type: integer
      description: Fader number per DHD spec

- id: set_fader_level_set
  label: Set Fader Level - Set Instantly
  kind: action
  command: "11030000,4,FaderHi,FaderLo,LevelHi,LevelLo"
  params:
    - name: fader_hi
      type: integer
      description: VirtualMixer or FaderChannel selector
    - name: fader_lo
      type: integer
      description: Fader number
    - name: level
      type: integer
      description: 0x8000..0x7FFF (-327.68..+327.67 dB)

- id: set_fader_level_set_with_time
  label: Set Fader Level - Set Within Time
  kind: action
  command: "11030000,7,FaderHi,FaderLo,LevelHi,LevelLo,TimeHi,TimeLo,Type"
  params:
    - name: fader_hi
      type: integer
      description: VirtualMixer or FaderChannel selector
    - name: fader_lo
      type: integer
      description: Fader number
    - name: level
      type: integer
      description: 0x8000..0x7FFF dB
    - name: time_ms
      type: integer
      description: 0x0000..0x2000 ms
    - name: type
      type: integer
      description: 0 level linear fade, 1 fader linear fade

- id: set_fader_access_request
  label: Set Fader Access - Request Status
  kind: query
  command: "11040000,0"

- id: set_fader_access_set
  label: Set Fader Access - Set
  kind: action
  command: "11040000,7,FaderHi,FaderLo,On,Type,ChannelHi,ChannelLo,AccGroup"
  params:
    - name: fader_hi
      type: integer
      description: VirtualMixer / FaderChannel selector
    - name: fader_lo
      type: integer
      description: Fader number
    - name: on
      type: integer
      description: 0 off, 1 on
    - name: type
      type: integer
      description: 0 GAIN, 1 PAN/BAL, 2 INPUTSELECT
    - name: channel
      type: integer
      description: 1..150 (status answer only)
    - name: acc_group
      type: integer
      description: 0..5 (status answer only)

- id: set_channel_input_number_request_all
  label: Set Channel Input Number - Request All
  kind: query
  command: "110D0000,0"

- id: set_channel_input_number_request
  label: Set Channel Input Number - Request Input For Fader
  kind: query
  command: "110D0000,2,FaderHi,FaderLo"
  params:
    - name: fader_hi
      type: integer
      description: VirtualMixer / FaderChannel selector
    - name: fader_lo
      type: integer
      description: Fader number

- id: set_channel_input_number_set
  label: Set Channel Input Number - Input Select
  kind: action
  command: "110D0000,4,FaderHi,FaderLo,ChannelHi,ChannelLo"
  params:
    - name: fader_hi
      type: integer
      description: VirtualMixer / FaderChannel selector
    - name: fader_lo
      type: integer
      description: Fader number
    - name: channel
      type: integer
      description: 0x0001..0x00BA Fader Channel Number (1..250)

- id: set_internal_logic_states_request
  label: Set Internal Logic States - Request
  kind: query
  command: "110E0000,2,LogicIdHi,LogicIdLo"
  params:
    - name: logic_id
      type: integer
      description: 16-bit LogicID per DHD spec

- id: set_internal_logic_states_set
  label: Set Internal Logic States - Set
  kind: action
  command: "110E0000,3,LogicIdHi,LogicIdLo,On"
  params:
    - name: logic_id
      type: integer
      description: 16-bit LogicID
    - name: on
      type: integer
      description: 0 off/false, 1 on/true

- id: set_monitor_level_request
  label: Set Monitor Level - Request
  kind: query
  command: "11100000,2,PotHi,PotLo"
  params:
    - name: pot
      type: integer
      description: Potentiometer 0x0000..0x0077 (1..120)

- id: set_monitor_level_set
  label: Set Monitor Level - Set Instantly
  kind: action
  command: "11100000,4,PotHi,PotLo,LevelHi,LevelLo"
  params:
    - name: pot
      type: integer
      description: Potentiometer 1..120
    - name: level
      type: integer
      description: 0x8000..0x7FFF (-327.68..+327.67 dB)

- id: set_monitor_level_set_with_time
  label: Set Monitor Level - Set Within Time
  kind: action
  command: "11100000,7,PotHi,PotLo,LevelHi,LevelLo,TimeHi,TimeLo,Type"
  params:
    - name: pot
      type: integer
      description: Potentiometer 1..120
    - name: level
      type: integer
      description: dB level
    - name: time_ms
      type: integer
      description: 0x0000..0x2000 ms
    - name: type
      type: integer
      description: 0 level linear fade, 1 fader linear fade

- id: set_display_channel_label_reproduce
  label: Set Display/Channel Label - Reproduce Original Text
  kind: action
  command: "11140000,2,ChannelHi,ChannelLo"

- id: set_display_channel_label_request
  label: Set Display/Channel Label - Request
  kind: query
  command: "11140000,3,ChannelHi,ChannelLo,DisplayNr"
  params:
    - name: channel
      type: integer
      description: 0x0001..0x00BA channel or 0x8001..0x800C central panel
    - name: display_nr
      type: integer
      description: 0x00..0x7F

- id: set_display_channel_label_set
  label: Set Display/Channel Label - Set
  kind: action
  command: "11140000,8,ChannelHi,ChannelLo,DisplayNr,ASCII1,ASCII2,ASCII3,ASCII4"
  params:
    - name: channel
      type: integer
      description: Channel or central panel module
    - name: display_nr
      type: integer
      description: 0x00..0x7F
    - name: ascii1
      type: integer
      description: 0x00..0x7F
    - name: ascii2
      type: integer
      description: 0x00..0x7F
    - name: ascii3
      type: integer
      description: 0x00..0x7F
    - name: ascii4
      type: integer
      description: 0x00..0x7F

- id: set_pfl_switch_off_all
  label: Set PFL - Switch Off All
  kind: action
  command: "11160000,0"

- id: set_pfl_switch_off_all_virtual_mixer
  label: Set PFL - Switch Off All On Virtual Mixer
  kind: action
  command: "11160000,1,VirtualMixer"
  params:
    - name: virtual_mixer
      type: integer
      description: 0x00..0x03 VirtualMixer1..4 (firmware 06.xx+)

- id: set_pfl_request
  label: Set PFL - Request State
  kind: query
  command: "11160000,2,FaderHi,FaderLo"
  params:
    - name: fader_hi
      type: integer
      description: VirtualMixer / FaderChannel selector
    - name: fader_lo
      type: integer
      description: Fader number

- id: set_pfl_set
  label: Set PFL - Set
  kind: action
  command: "11160000,4,FaderHi,FaderLo,On,AutoMute"
  params:
    - name: fader_hi
      type: integer
      description: VirtualMixer / FaderChannel selector
    - name: fader_lo
      type: integer
      description: Fader number
    - name: on
      type: integer
      description: 1 PFL on, 0 PFL off
    - name: auto_mute
      type: integer
      description: 1 mute all others, 0 leave unchanged

- id: load_save_setups_load_channel
  label: Load/Save Setups - Load Channel Snapshot
  kind: action
  command: "111C0000,4,00,SnapshotNumber,MixerID,FaderChannel"
  params:
    - name: snapshot_number
      type: integer
      description: 0..250 channel snapshot
    - name: mixer_id
      type: integer
      description: 0x00..0x03 VirtualMixer1..4 or 0x10 Channel
    - name: fader_channel
      type: integer
      description: 0..47 fader or 0..250 channel

- id: load_save_setups_save_channel
  label: Load/Save Setups - Save Channel Snapshot
  kind: action
  command: "111C0000,4,01,SnapshotNumber,MixerID,FaderChannel"
  params:
    - name: snapshot_number
      type: integer
      description: 0..250 channel snapshot
    - name: mixer_id
      type: integer
      description: 0x00..0x03 VirtualMixer1..4 or 0x10 Channel
    - name: fader_channel
      type: integer
      description: 0..47 fader or 0..250 channel

- id: load_save_setups_load_mixer
  label: Load/Save Setups - Load Mixer Snapshot
  kind: action
  command: "111C0000,3,0a,SnapshotNumber,MixerID"
  params:
    - name: snapshot_number
      type: integer
      description: 0..20 mixer snapshot
    - name: mixer_id
      type: integer
      description: 0x00..0x03 VirtualMixer1..4

- id: load_save_setups_save_mixer
  label: Load/Save Setups - Save Mixer Snapshot
  kind: action
  command: "111C0000,3,0b,SnapshotNumber,MixerID"
  params:
    - name: snapshot_number
      type: integer
      description: 0..20 mixer snapshot
    - name: mixer_id
      type: integer
      description: 0x00..0x03 VirtualMixer1..4

- id: set_io_gain_16bit_request
  label: Set IO Gain 16bit - Request
  kind: query
  command: "112D0000,2,IoHi,IoLo"
  params:
    - name: io
      type: integer
      description: Output 0x0180..0x1EFF or Input 0x0100..0x1E7F / 0x4000..0x7FFF

- id: set_io_gain_16bit_set
  label: Set IO Gain 16bit - Set
  kind: action
  command: "112D0000,4,IoHi,IoLo,ValueHi,ValueLo"
  params:
    - name: io
      type: integer
      description: Output or Input address
    - name: value
      type: integer
      description: 0x8000..0x7FFF (-327.68..+327.67 dB); 0xFFFF mute

- id: set_io_gain_32bit_request
  label: Set IO Gain 32bit - Request
  kind: query
  command: "112D0000,4,AudioId_b0,AudioId_b1,AudioId_b2,AudioId_b3"
  params:
    - name: audio_id_32bit
      type: integer
      description: 32bit AudioID

- id: set_io_gain_32bit_set
  label: Set IO Gain 32bit - Set
  kind: action
  command: "112D0000,6,AudioId_b0,AudioId_b1,AudioId_b2,AudioId_b3,ValueHi,ValueLo"
  params:
    - name: audio_id_32bit
      type: integer
      description: 32bit AudioID
    - name: value
      type: integer
      description: 0x8000..0x7FFF dB

- id: metering_set_notification
  label: Metering - Activate/Deactivate
  kind: action
  command: "111D0000,2,Leveldetect,ON"
  params:
    - name: leveldetect
      type: integer
      description: 1..48 Leveldetect/TruePeak/Loudness position from TB8 config
    - name: on
      type: integer
      description: 0 deactivate, 1 activate

- id: cf_in_parameter_request
  label: CleanFeed Input Parameter - Request
  kind: query
  command: "11810000,4,ChannelHi,ChannelLo,00,24"
  params:
    - name: channel
      type: integer
      description: 0x0001..0x00BA (1..250)

- id: cf_in_parameter_set
  label: CleanFeed Input Parameter - Set
  kind: action
  command: "11810000,8,ChannelHi,ChannelLo,00,24,Param_b0,Param_b1,Param_b2,Param_b3"
  params:
    - name: channel
      type: integer
      description: 0x0001..0x00BA
    - name: cf_input_gain_db
      type: integer
      description: Byte00xD8..0x00..0x0F (-40..0..+15 dB), upper bytes0

- id: cf_out_parameter_request
  label: CleanFeed Output Parameter - Request
  kind: query
  command: "11810000,4,ChannelHi,ChannelLo,00,25"
  params:
    - name: channel
      type: integer
      description: 0x0001..0x00BA- id: cf_out_parameter_set
  label: CleanFeed Output Parameter - Set
  kind: action
  command: "11810000,8,ChannelHi,ChannelLo,00,25,Param_b0,Param_b1,Param_b2,Param_b3"
  params:
    - name: channel
      type: integer
      description: 0x0001..0x00BA
    - name: param_bits
      type: integer
      description: Bits:18 N-Mix, 17 AltSrc, 16 CFMute, 15..8 AltSrcListPos, 7..0 Gain 0xD2..0x00..0x0A (-30..0..+10 dB)
```

## Feedbacks
```yaml
- id: route_output_16bit_crosspoint_notification
  type: object
  description: 16-bit crosspoint notification (firmware 06.xx+) - length 1- id: route_output_32bit_crosspoint_notification
  type: object
  description: 32-bit crosspoint notification - length 8; sent when DHD-internal routing changes (TCP only)

- id: arbitration_answer
  type: object
  description: Arbitration answer - length 5; Output/Input AudioID + owning DeviceID

- id: fader_value_notification
  type: object
  description: Fader value notification (firmware 07.02.09+) - length 4

- id: pfl_state_notification
  type: object
  description: PFL state answer (length 4) - VirtualMixer/Fader + On/AutoMute

- id: motorfader_touched
  type: object
  description: 0x11820000 - ChannelNr0x01..0xFA + Touch 0/1

- id: metering_notification
  type: object
  description: 0x111D0000 - length 6; Correlation + LevelL + LevelR

- id: cf_in_value_info
  type: object
  description: CleanFeed input value information when value changes internally - length 8

- id: cf_out_value_info
  type: object
  description: CleanFeed output value information when value changes internally - length 8
```

## Variables
```yaml
# UNRESOLVED: section omitted - all per-command parameter values are encoded in action params
```

## Events
```yaml
# UNRESOLVED: section omitted - see Feedbacks for unsolicited notifications
```

## Macros
```yaml
# UNRESOLVED: source documents single commands only; no multi-step macro sequences described
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings beyond general "IO Gain changes persist until restart" note
```

## Notes
ECP is deprecated as of firmware 10.2; new integrations should use the DHD Control API. Per-command firmware applicability varies significantly across 05.xx.xx, 06.xx.xx, 07.xx.xx, 08.xx.xx and 09.00.xx versions — consult the per-command tables in the source. All data is Motorola-format (MSB first). Serial block format uses STX/Length/29-bit ID/Data/Checksum/EOT framing with 38400,8,N,1 and a DLE-escape scheme for bytes 0x00-0x1F. ACK/NAK handshake within 80 ms; up to 3 retries per block; up to 100 blocks buffered.

<!-- UNRESOLVED: 32-bit AudioID bit fields differ between Series52 v1 (RM4200D/XR) and v2 (XS/XC/XD); source documents both layouts but spec does not enumerate them as separate fields -->

## Provenance

```yaml
source_domains:
  - developer.dhd.audio
  - dhd.audio
source_urls:
  - https://developer.dhd.audio/docs/API/ECP/
  - https://developer.dhd.audio/docs/API/ECP/communication
  - https://developer.dhd.audio/docs/API/ECP/commands
  - https://dhd.audio/systems/rm-4200d/
  - https://developer.dhd.audio/
retrieved_at: 2026-08-18T00:03:30.571Z
last_checked_at: 2026-08-19T09:18:31.672Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:18:31.672Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec action units have opcode/length/structure matches in the refined source; transport parameters (38400,8,N,1; port 2008) are verbatim; source command catalogue is fully represented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "command-level firmware applicability varies across 05.xx.xx, 06.xx.xx, 07.xx.xx, 08.00.xx, 08.01.xx, 08.02.xx and 09.00.xx versions; see source per-command tables for exact availability"
- "section omitted - all per-command parameter values are encoded in action params"
- "section omitted - see Feedbacks for unsolicited notifications"
- "source documents single commands only; no multi-step macro sequences described"
- "source contains no explicit safety warnings beyond general \"IO Gain changes persist until restart\" note"
- "32-bit AudioID bit fields differ between Series52 v1 (RM4200D/XR) and v2 (XS/XC/XD); source documents both layouts but spec does not enumerate them as separate fields"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
