---
spec_id: admin/sony-kdxg8588-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KD-XG8588 Series Control Spec"
manufacturer: Sony
model_family: KD-55XG8588
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - KD-55XG8588
    - KD-65XG8588
    - KD-75XG8588
    - KD-85XG8588
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-10T01:07:46.262Z
last_checked_at: 2026-06-10T07:35:28.901Z
generated_at: 2026-06-10T07:35:28.901Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "KD-XG8588-specific reference guide not located; commands documented in generic BRAVIA Simple IP Control doc and may not all apply."
  - "volume numeric range 0-100 inferred from typical BRAVIA; source"
  - "source defines no multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or"
  - "KD-XG8588-specific Reference Guide / owner's manual not located; spec built from generic Sony Pro Bravia SSIP document."
verification:
  verdict: verified
  checked_at: 2026-06-10T07:35:28.901Z
  matched_actions: 78
  action_count: 78
  confidence: medium
  summary: "All 78 spec actions match source commands literally; transport parameters (TCP, port 20060) confirmed; IR code table fully represented. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-10
---

# Sony KD-XG8588 Series Control Spec

## Summary
Sony BRAVIA KD-XG8588 series Android TV (2019 consumer line) controlled via Sony's "Simple IP Control" protocol (SSIP) over TCP. Fixed 24-byte framed messages, Four-CC commands, port 20060. Note: this spec was authored from the generic BRAVIA Professional Displays Simple IP Control document, not a KD-XG8588-specific manual; EU models have 3 RED-DA specification variants with differing command availability.

<!-- UNRESOLVED: KD-XG8588-specific reference guide not located; commands documented in generic BRAVIA Simple IP Control doc and may not all apply. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # inferred: setPowerStatus, getPowerStatus, togglePowerStatus
- queryable   # inferred: getPowerStatus, getInput, getAudioVolume, getAudioMute, getPictureMute, getSceneSetting
- routable    # inferred: setInput / getInput (HDMI/Composite/Component/Screen Mirroring)
- levelable   # inferred: setAudioVolume / getAudioVolume
```

## Actions
```yaml
# Protocol framing: all messages are 24 bytes.
#   Byte[0-1]  = 0x2A 0x53  (header, "*S")
#   Byte[2]   = message type: C=0x43 control, E=0x45 enquiry, A=0x41 answer, N=0x4E notify
#   Byte[3-6] = Four-CC command mnemonic
#   Byte[7-22]= parameter (16 bytes, ASCII, left-justified, padded with "0" or "#")
#   Byte[23]  = 0x0A (LF footer)
#
# Command strings below show the 24-byte payload without the trailing LF;
# the trailing 0x0A is implicit.

- id: power_off
  label: Power Off
  kind: action
  command: "*SCPOWR0000000000000000"
  params: []
  notes: 'Sets power to standby. Triggers firePowerChange notify (N POWR 0...).'

- id: power_on
  label: Power On
  kind: action
  command: "*SCPOWR0000000000000001"
  params: []
  notes: 'Sets power to active. Triggers firePowerChange notify (N POWR ...1).'

- id: toggle_power
  label: Toggle Power
  kind: action
  command: "*SCTPOW0000000000000000"
  params: []
  notes: Toggles current power state.

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR0000000000000000"
  params: []
  notes: 'Answer: A POWR ...0 = Standby, ...1 = Active.'

- id: set_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU0000000000{value}"
  params:
    - name: value
      type: integer
      description: Volume value 0-100, right-justified, left-padded with "0" (e.g. 41 = "0000000000000041").
  notes: Zero-pad to 16 chars total before the LF footer.

- id: get_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU0000000000000000"
  params: []
  notes: 'Answer returns current volume in same zero-padded format.'

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT0000000000{state}"
  params:
    - name: state
      type: integer
      description: '0 = Unmute, 1 = Mute'
  notes: 'Last byte (Byte[22]) carries the state.'

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT0000000000000000"
  params: []
  notes: 'Answer: ...0 = Not Muted, ...1 = Muted.'

- id: set_input_hdmi
  label: Set Input HDMI
  kind: action
  command: "*SCINPT0000000001000{port}"
  params:
    - name: port
      type: integer
      description: HDMI port number 1-9999, right-justified in last 4 bytes.
  notes: 'Input type code "1" = HDMI. Other codes: 3=Composite, 4=Component, 5=Screen Mirroring.'

- id: set_input_composite
  label: Set Input Composite
  kind: action
  command: "*SCINPT0000000003000{port}"
  params:
    - name: port
      type: integer
      description: Composite port number 1-9999.
  notes: 'Input type code "3" = Composite.'

- id: set_input_component
  label: Set Input Component
  kind: action
  command: "*SCINPT0000000004000{port}"
  params:
    - name: port
      type: integer
      description: Component port number 1-9999.
  notes: 'Input type code "4" = Component.'

- id: set_input_screen_mirroring
  label: Set Input Screen Mirroring
  kind: action
  command: "*SCINPT0000000005000{port}"
  params:
    - name: port
      type: integer
      description: Screen Mirroring port number 1-9999.
  notes: 'Input type code "5" = Screen Mirroring.'

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT0000000000000000"
  params: []
  notes: 'Answer: input type code in Byte[15], port number in last 4 bytes (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring).'

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT0000000000{state}"
  params:
    - name: state
      type: integer
      description: '0 = disable picture mute (restore picture), 1 = enable picture mute (black screen)'
  notes: 'Last byte (Byte[22]) carries the state.'

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT0000000000000000"
  params: []
  notes: 'Answer: ...0 = Disabled, ...1 = Enabled.'

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU0000000000000000"
  params: []

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{value}000000000000"
  params:
    - name: value
      type: string
      description: 'Scene name, right-padded with "#" to 16 chars. Valid: auto, auto24pSync, general.'
  notes: 'Case-sensitive. e.g. auto24pSync#####  (11 chars + 5 "#" = 16).'

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN0000000000000000"
  params: []
  notes: 'Answer returns scene string in same padded format, or N... if not available for current input.'

- id: set_ircc_code
  label: Send IR Remote Code
  kind: action
  command: "*SCIRCC{irParam}0000000000"
  params:
    - name: irParam
      type: string
      description: 'IR command code as 16 ASCII digits, right-padded with "0". See IR Commands table for codes.'
  notes: 'Sends an IR-equivalent command to the TV. Use for keys not covered by dedicated SSIP commands (cursor, numeric, transport, etc.).'

# --- Network/identity queries (extended commands marked with * in source) ---

- id: get_broadcast_address
  label: Get Broadcast Address (eth0)
  kind: query
  command: "*SEBADRETH000000000000"
  params: []
  notes: 'Answer: IPv4 broadcast address as ASCII, padded right with "#" (e.g. 192.168.0.14##).'

- id: get_mac_address
  label: Get MAC Address (eth0)
  kind: query
  command: "*SEMADRETH000000000000"
  params: []
  notes: 'Answer: MAC address as ASCII, padded right with "#".'

# --- IR sub-commands delivered via setIrccCode (each is a distinct IR opcode) ---
# Each row below is documented as a separate IR command in source. Implemented
# by populating the last 2 digits (Byte[21-22]) of the setIrccCode parameter
# field; the rest of the 16-byte parameter is "0".

- id: ir_display
  label: IR - Display
  kind: action
  command: "*SCIRCC0000000000000005"
  params: []

- id: ir_home
  label: IR - Home
  kind: action
  command: "*SCIRCC0000000000000006"
  params: []

- id: ir_options
  label: IR - Options
  kind: action
  command: "*SCIRCC0000000000000007"
  params: []

- id: ir_return
  label: IR - Return
  kind: action
  command: "*SCIRCC0000000000000008"
  params: []

- id: ir_up
  label: IR - Up
  kind: action
  command: "*SCIRCC0000000000000009"
  params: []

- id: ir_down
  label: IR - Down
  kind: action
  command: "*SCIRCC0000000000000010"
  params: []

- id: ir_right
  label: IR - Right
  kind: action
  command: "*SCIRCC0000000000000011"
  params: []

- id: ir_left
  label: IR - Left
  kind: action
  command: "*SCIRCC0000000000000012"
  params: []

- id: ir_confirm
  label: IR - Confirm
  kind: action
  command: "*SCIRCC0000000000000013"
  params: []

- id: ir_red
  label: IR - Red
  kind: action
  command: "*SCIRCC0000000000000014"
  params: []

- id: ir_green
  label: IR - Green
  kind: action
  command: "*SCIRCC0000000000000015"
  params: []

- id: ir_yellow
  label: IR - Yellow
  kind: action
  command: "*SCIRCC0000000000000016"
  params: []

- id: ir_blue
  label: IR - Blue
  kind: action
  command: "*SCIRCC0000000000000017"
  params: []

- id: ir_num1
  label: IR - Num 1
  kind: action
  command: "*SCIRCC0000000000000018"
  params: []

- id: ir_num2
  label: IR - Num 2
  kind: action
  command: "*SCIRCC0000000000000019"
  params: []

- id: ir_num3
  label: IR - Num 3
  kind: action
  command: "*SCIRCC0000000000000020"
  params: []

- id: ir_num4
  label: IR - Num 4
  kind: action
  command: "*SCIRCC0000000000000021"
  params: []

- id: ir_num5
  label: IR - Num 5
  kind: action
  command: "*SCIRCC0000000000000022"
  params: []

- id: ir_num6
  label: IR - Num 6
  kind: action
  command: "*SCIRCC0000000000000023"
  params: []

- id: ir_num7
  label: IR - Num 7
  kind: action
  command: "*SCIRCC0000000000000024"
  params: []

- id: ir_num8
  label: IR - Num 8
  kind: action
  command: "*SCIRCC0000000000000025"
  params: []

- id: ir_num9
  label: IR - Num 9
  kind: action
  command: "*SCIRCC0000000000000026"
  params: []

- id: ir_num0
  label: IR - Num 0
  kind: action
  command: "*SCIRCC0000000000000027"
  params: []

- id: ir_volume_up
  label: IR - Volume Up
  kind: action
  command: "*SCIRCC0000000000000030"
  params: []

- id: ir_volume_down
  label: IR - Volume Down
  kind: action
  command: "*SCIRCC0000000000000031"
  params: []

- id: ir_mute
  label: IR - Mute
  kind: action
  command: "*SCIRCC0000000000000032"
  params: []

- id: ir_channel_up
  label: IR - Channel Up
  kind: action
  command: "*SCIRCC0000000000000033"
  params: []

- id: ir_channel_down
  label: IR - Channel Down
  kind: action
  command: "*SCIRCC0000000000000034"
  params: []

- id: ir_subtitle
  label: IR - Subtitle
  kind: action
  command: "*SCIRCC0000000000000035"
  params: []

- id: ir_dot
  label: IR - DOT
  kind: action
  command: "*SCIRCC0000000000000038"
  params: []

- id: ir_picture_off
  label: IR - Picture Off
  kind: action
  command: "*SCIRCC0000000000000050"
  params: []

- id: ir_wide
  label: IR - Wide
  kind: action
  command: "*SCIRCC0000000000000061"
  params: []

- id: ir_jump
  label: IR - Jump
  kind: action
  command: "*SCIRCC0000000000000062"
  params: []

- id: ir_sync_menu
  label: IR - Sync Menu
  kind: action
  command: "*SCIRCC0000000000000076"
  params: []

- id: ir_forward
  label: IR - Forward
  kind: action
  command: "*SCIRCC0000000000000077"
  params: []

- id: ir_play
  label: IR - Play
  kind: action
  command: "*SCIRCC0000000000000078"
  params: []

- id: ir_rewind
  label: IR - Rewind
  kind: action
  command: "*SCIRCC0000000000000079"
  params: []

- id: ir_prev
  label: IR - Prev
  kind: action
  command: "*SCIRCC0000000000000080"
  params: []

- id: ir_stop
  label: IR - Stop
  kind: action
  command: "*SCIRCC0000000000000081"
  params: []

- id: ir_next
  label: IR - Next
  kind: action
  command: "*SCIRCC0000000000000082"
  params: []

- id: ir_pause
  label: IR - Pause
  kind: action
  command: "*SCIRCC0000000000000084"
  params: []

- id: ir_flash_plus
  label: IR - Flash Plus
  kind: action
  command: "*SCIRCC0000000000000086"
  params: []

- id: ir_flash_minus
  label: IR - Flash Minus
  kind: action
  command: "*SCIRCC0000000000000087"
  params: []

- id: ir_tv_power
  label: IR - TV Power
  kind: action
  command: "*SCIRCC0000000000000098"
  params: []

- id: ir_audio
  label: IR - Audio
  kind: action
  command: "*SCIRCC0000000000000099"
  params: []

- id: ir_input
  label: IR - Input
  kind: action
  command: "*SCIRCC0000000000000101"
  params: []

- id: ir_sleep
  label: IR - Sleep
  kind: action
  command: "*SCIRCC0000000000000104"
  params: []

- id: ir_sleep_timer
  label: IR - Sleep Timer
  kind: action
  command: "*SCIRCC0000000000000105"
  params: []

- id: ir_video2
  label: IR - Video 2
  kind: action
  command: "*SCIRCC0000000000000108"
  params: []

- id: ir_picture_mode
  label: IR - Picture Mode
  kind: action
  command: "*SCIRCC0000000000000110"
  params: []

- id: ir_demo_surround
  label: IR - Demo Surround
  kind: action
  command: "*SCIRCC0000000000000121"
  params: []

- id: ir_hdmi1
  label: IR - HDMI 1
  kind: action
  command: "*SCIRCC0000000000000124"
  params: []

- id: ir_hdmi2
  label: IR - HDMI 2
  kind: action
  command: "*SCIRCC0000000000000125"
  params: []

- id: ir_hdmi3
  label: IR - HDMI 3
  kind: action
  command: "*SCIRCC0000000000000126"
  params: []

- id: ir_hdmi4
  label: IR - HDMI 4
  kind: action
  command: "*SCIRCC0000000000000127"
  params: []

- id: ir_action_menu
  label: IR - Action Menu
  kind: action
  command: "*SCIRCC0000000000000129"
  params: []

- id: ir_help
  label: IR - Help
  kind: action
  command: "*SCIRCC0000000000000130"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  source: getPowerStatus answer (...0 standby, ...1 active)
  notes: 'Also delivered unsolicited via firePowerChange (N POWR ...) on every power transition.'

- id: audio_volume
  type: integer
  range: '0-100'
  source: getAudioVolume answer
  notes: 'Right-padded ASCII in Byte[7-22]. Delivered unsolicited via fireVolumeChange (N VOLU ...).'

- id: audio_mute
  type: enum
  values: [unmuted, muted]
  source: getAudioMute answer (...0 unmuted, ...1 muted)
  notes: 'Also delivered unsolicited via fireMuteChange (N AMUT ...).'

- id: current_input
  type: object
  fields:
    - name: input_type
      type: enum
      values: [hdmi, composite, component, screen_mirroring]
    - name: port
      type: integer
      range: '1-9999'
  source: getInput answer
  notes: 'Input type code in Byte[15] (1/3/4/5). Port number in last 4 bytes. Delivered unsolicited via fireInputChange (N INPT ...).'

- id: picture_mute
  type: enum
  values: [disabled, enabled]
  source: getPictureMute answer (...0 disabled, ...1 enabled)
  notes: 'Also delivered unsolicited via firePictureMuteChange (N PMUT ...).'

- id: scene_setting
  type: string
  source: getSceneSetting answer
  notes: 'Case-sensitive string, right-padded with "#" to 16 chars. Valid: auto, auto24pSync, general. N... means "not available for current input".'

- id: broadcast_address
  type: string
  source: getBroadcastAddress answer
  notes: 'ASCII IPv4 string padded with "#". Interface "eth0".'

- id: mac_address
  type: string
  source: getMacAddress answer
  notes: 'ASCII MAC string padded with "#". Interface "eth0".'
```

## Variables
```yaml
# No settable scalar parameters outside the actions above.
# (Volume is an integer covered by setAudioVolume; the parameter range 0-100
#  is implicit in the protocol design but the source gives no explicit
#  minimum/maximum - UNRESOLVED.)
#
# UNRESOLVED: volume numeric range 0-100 inferred from typical BRAVIA; source
#             states "decimal digit pad" but no explicit min/max.
```

## Events
```yaml
- id: fire_power_change
  type: notify
  message: "N POWR {state}"
  notes: 'Sent on every power transition. state: 0=standby, 1=active.'

- id: fire_input_change
  type: notify
  message: "N INPT {input_type_code}{port}"
  notes: 'Sent when input changes on the monitor. input_type_code: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring. port: 1-9999.'

- id: fire_volume_change
  type: notify
  message: "N VOLU {value}"
  notes: 'Sent when volume changes.'

- id: fire_mute_change
  type: notify
  message: "N AMUT {state}"
  notes: 'Sent when mute state changes. state: 0=unmuted, 1=muted.'

- id: fire_picture_mute_change
  type: notify
  message: "N PMUT {state}"
  notes: 'Sent when picture mute state changes. state: 0=enabled, 1=disabled (per source; the source documents the byte order inverted vs setPictureMute - verify on real device).'
```

## Macros
```yaml
# UNRESOLVED: source defines no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. EU models have 3 RED-DA specification
# variants with different available commands; operator should verify which
# variant applies to the target device before sending setPowerStatus.
```

## Notes
- Protocol is "Simple IP Control" (SSIP) — Sony BRAVIA proprietary 24-byte framed TCP protocol. Not REST, not WebAPI, not the older SOAP/json-rpc "Video Side" API. This is the modern replacement.
- Enable path on the TV: Settings → Network & Internet → Remote device settings → Control remotely, AND Settings → Network & Internet → Home network → IP control → Simple IP control. Both must be on, or the TCP listener on port 20060 will not accept connections.
- EU RED-DA compliance: EU KD-XG8588 units ship in one of three specification variants; command availability differs per variant. Refer to https://pro-bravia.sony.net/setup/device-settings/red-da/ before relying on any single command.
- Volume parameter: the source documents the parameter as "decimal digit pad on the left with 0" (zero-padded) and gives the example "0000000000000029" = 41 decimal. Range 0-100 is not explicitly stated in the source.
- Network queries getBroadcastAddress/getMacAddress are marked with an asterisk in the source ("BADR*" / "MADR*"); availability on consumer XG8588 firmware has not been verified.
- This spec was built from the generic BRAVIA Professional Displays Simple IP Control knowledge-center page (https://pro-bravia.sony.net/remote-display-control/simple-ip-control/), not from a KD-XG8588-specific reference guide. The Sony consumer support page for KD-55XG8588/KD-65XG8588 is a JS-rendered SPA with no IP-control doc linked, and the XG8588 is not listed on the Sony Pro Bravia site. The 2019 XG/AG generation is believed to implement the same SSIP command set, but this has not been confirmed against a real device.
- IR commands are an alternative pathway: setIrccCode lets a controller emulate any IR remote button (cursor, numeric keypad, transport, etc.) without needing per-function SSIP commands.
<!-- UNRESOLVED: KD-XG8588-specific Reference Guide / owner's manual not located; spec built from generic Sony Pro Bravia SSIP document. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-10T01:07:46.262Z
last_checked_at: 2026-06-10T07:35:28.901Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T07:35:28.901Z
matched_actions: 78
action_count: 78
confidence: medium
summary: "All 78 spec actions match source commands literally; transport parameters (TCP, port 20060) confirmed; IR code table fully represented. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "KD-XG8588-specific reference guide not located; commands documented in generic BRAVIA Simple IP Control doc and may not all apply."
- "volume numeric range 0-100 inferred from typical BRAVIA; source"
- "source defines no multi-step sequences."
- "source contains no safety warnings, interlock procedures, or"
- "KD-XG8588-specific Reference Guide / owner's manual not located; spec built from generic Sony Pro Bravia SSIP document."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
