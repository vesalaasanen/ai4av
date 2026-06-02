---
spec_id: admin/primare-spa-25
schema_version: ai4av-public-spec-v1
revision: 1
title: "Primare SPA25 Control Spec"
manufacturer: Primare
model_family: SPA25
aliases: []
compatible_with:
  manufacturers:
    - Primare
  models:
    - SPA25
  firmware: "\"2.08\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - primare.net
source_urls:
  - https://primare.net/wp-content/uploads/2022/09/SPA25-RS232-Command-list-2023-02-23.pdf
retrieved_at: 2026-04-30T04:28:52.339Z
last_checked_at: 2026-06-02T10:14:10.965Z
generated_at: 2026-06-02T10:14:10.965Z
firmware_coverage: "\"2.08\""
protocol_coverage: []
known_gaps:
  - "TCP/IP transport asserted by operator (file path + Known protocol field) but source document is RS-232 only; TCP port number not documented in source."
  - "serial flow_control not stated in source."
  - "flow control not stated in source"
  - "TCP port not stated in source"
  - "no multi-step macro sequences described in source."
  - "source contains no explicit safety warnings, interlocks, or power-on sequencing notes."
  - "TCP transport — operator asserted TCP/IP but source documents only RS-232. Port, framing-over-TCP behavior, and any login/handshake are not specified in this source."
  - "serial flow_control not stated."
  - "behavior of `<value>` field length for variable-length string replies (preset name, manufacturer, model, firmware, BT name) — source shows `[]` placeholder but no length-prefix or termination rule beyond the trailing DLE+ETX."
  - "remote-key codes 0x25, 0x26 are skipped in source table between PLAY/PAUSE(long press)=0x24 and NEXT=0x27 — assignment unknown."
verification:
  verdict: verified
  checked_at: 2026-06-02T10:14:10.965Z
  matched_actions: 130
  action_count: 130
  confidence: medium
  summary: "All 130 spec action commands match source verbatim; transport serial params confirmed; source command catalogue fully represented. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Primare SPA25 Control Spec

## Summary
Primare SPA25 surround preamp/processor. Source documents binary-framed RS-232 protocol (STX/DLE/ETX wrapper, W/R command bytes, opcode + variable + value byte). User-supplied "Known protocol: TCP/IP" present; source itself only specifies RS-232 serial parameters. TCP port not stated in source.

<!-- UNRESOLVED: TCP/IP transport asserted by operator (file path + Known protocol field) but source document is RS-232 only; TCP port number not documented in source. -->
<!-- UNRESOLVED: serial flow_control not stated in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # asserted by operator input "Known protocol: TCP/IP"; no port in source
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source
framing:
  description: "Binary frame: <STX=0x02> <command=0x57 W | 0x52 R> <variable> [<value>] <DLE=0x10> <ETX=0x03>. Reply (verbose mode): <STX> <variable> [<value>] <DLE> <ETX>."
  stx: "0x02"
  etx: "0x03"
  dle: "0x10"
  write_byte: "0x57"
  read_byte: "0x52"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # inferred from operate/standby commands
- queryable   # inferred from read commands (manufacturer/model/version/volume/preset name)
- levelable   # inferred from volume set 0-99 command
```

## Actions
```yaml
- id: power_toggle
  label: Operate/Standby Toggle
  kind: action
  command: "02 57 01 00 10 03"
  params: []

- id: power_standby
  label: Set Standby
  kind: action
  command: "02 57 81 00 10 03"
  params: []

- id: power_operate
  label: Set Operate (power on)
  kind: action
  command: "02 57 81 01 10 03"
  params: []

- id: preset_previous
  label: Select Previous Preset
  kind: action
  command: "02 57 02 ff 10 03"
  params: []

- id: preset_next
  label: Select Next Preset
  kind: action
  command: "02 57 02 01 10 03"
  params: []

- id: preset_set_1
  label: Select Preset 1
  kind: action
  command: "02 57 82 01 10 03"
  params: []
- id: preset_set_2
  label: Select Preset 2
  kind: action
  command: "02 57 82 02 10 03"
  params: []
- id: preset_set_3
  label: Select Preset 3
  kind: action
  command: "02 57 82 03 10 03"
  params: []
- id: preset_set_4
  label: Select Preset 4
  kind: action
  command: "02 57 82 04 10 03"
  params: []
- id: preset_set_5
  label: Select Preset 5
  kind: action
  command: "02 57 82 05 10 03"
  params: []
- id: preset_set_6
  label: Select Preset 6
  kind: action
  command: "02 57 82 06 10 03"
  params: []
- id: preset_set_7
  label: Select Preset 7
  kind: action
  command: "02 57 82 07 10 03"
  params: []
- id: preset_set_8
  label: Select Preset 8
  kind: action
  command: "02 57 82 08 10 03"
  params: []
- id: preset_set_9
  label: Select Preset 9
  kind: action
  command: "02 57 82 09 10 03"
  params: []
- id: preset_set_10
  label: Select Preset 10
  kind: action
  command: "02 57 82 0a 10 03"
  params: []
- id: preset_set_11
  label: Select Preset 11
  kind: action
  command: "02 57 82 0b 10 03"
  params: []
- id: preset_set_12
  label: Select Preset 12
  kind: action
  command: "02 57 82 0c 10 03"
  params: []
- id: preset_set_13
  label: Select Preset 13
  kind: action
  command: "02 57 82 0d 10 03"
  params: []
- id: preset_set_14
  label: Select Preset 14
  kind: action
  command: "02 57 82 0e 10 03"
  params: []
- id: preset_set_15
  label: Select Preset 15
  kind: action
  command: "02 57 82 0f 10 03"
  params: []
- id: preset_set_16
  label: Select Preset 16
  kind: action
  command: "02 57 82 10 10 03"
  params: []
- id: preset_set_17
  label: Select Preset 17 (Prismapreset)
  kind: action
  command: "02 57 82 11 10 03"
  params: []

- id: volume_decrease
  label: Volume Decrease (1 step)
  kind: action
  command: "02 57 03 ff 10 03"
  params: []

- id: volume_increase
  label: Volume Increase (1 step)
  kind: action
  command: "02 57 03 01 10 03"
  params: []

- id: volume_set
  label: Volume Set
  kind: action
  command: "02 57 83 {YY} 10 03"
  params:
    - name: YY
      type: integer
      description: "Volume level byte 0x00-0x63 (decimal 0-99)"
      min: 0
      max: 99
      encoding: "single byte, decimal value mapped to byte value (e.g. 99 → 0x63)"

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "02 57 09 00 10 03"
  params: []

- id: mute_disable
  label: Mute Disable
  kind: action
  command: "02 57 89 00 10 03"
  params: []

- id: mute_enable
  label: Mute Enable
  kind: action
  command: "02 57 89 01 10 03"
  params: []

- id: dim_cycle
  label: Dim Cycle (step through dim levels)
  kind: action
  command: "02 57 0a 00 10 03"
  params: []

- id: dim_off
  label: Dim Off
  kind: action
  command: "02 57 8a 00 10 03"
  params: []
- id: dim_low
  label: Dim Low
  kind: action
  command: "02 57 8a 01 10 03"
  params: []
- id: dim_mid
  label: Dim Mid
  kind: action
  command: "02 57 8a 02 10 03"
  params: []
- id: dim_high
  label: Dim High
  kind: action
  command: "02 57 8a 03 10 03"
  params: []

- id: dsp_cycle
  label: DSP Mode Cycle
  kind: action
  command: "02 57 0c 00 10 03"
  params: []

- id: dsp_auto
  label: DSP Mode Auto
  kind: action
  command: "02 57 8c 01 10 03"
  params: []
- id: dsp_bypass
  label: DSP Mode Bypass
  kind: action
  command: "02 57 8c 02 10 03"
  params: []
- id: dsp_stereo
  label: DSP Mode Stereo
  kind: action
  command: "02 57 8c 03 10 03"
  params: []
- id: dsp_party
  label: DSP Mode Party
  kind: action
  command: "02 57 8c 04 10 03"
  params: []
- id: dsp_dolby_surround_movie
  label: DSP Mode Dolby Surround Movie
  kind: action
  command: "02 57 8c 05 10 03"
  params: []
- id: dsp_dolby_surround_music
  label: DSP Mode Dolby Surround Music
  kind: action
  command: "02 57 8c 06 10 03"
  params: []
- id: dsp_dolby_surround_night
  label: DSP Mode Dolby Surround Night
  kind: action
  command: "02 57 8c 07 10 03"
  params: []
- id: dsp_dts_neural_x
  label: DSP Mode DTS Neural:X
  kind: action
  command: "02 57 8c 08 10 03"
  params: []

- id: verbose_toggle
  label: Verbose Toggle
  kind: action
  command: "02 57 0d 00 10 03"
  params: []
- id: verbose_disable
  label: Verbose Disable
  kind: action
  command: "02 57 8d 00 10 03"
  params: []
- id: verbose_enable
  label: Verbose Enable
  kind: action
  command: "02 57 8d 01 10 03"
  params: []

- id: menu_toggle
  label: Menu Toggle (enter/leave OSD menu)
  kind: action
  command: "02 57 0e 00 10 03"
  params: []
- id: menu_leave
  label: Menu Leave
  kind: action
  command: "02 57 8e 00 10 03"
  params: []
- id: menu_enter
  label: Menu Enter
  kind: action
  command: "02 57 8e 01 10 03"
  params: []

- id: factory_reset
  label: Factory Reset
  kind: action
  command: "02 57 13 00 10 03"
  params: []

- id: read_current_preset_name
  label: Read Current Preset Name
  kind: query
  command: "02 52 14 00 10 03"
  params: []

- id: read_specific_preset_name
  label: Read Specific Preset Name
  kind: query
  command: "02 52 94 {YY} 10 03"
  params:
    - name: YY
      type: integer
      description: "Preset index byte (0x01-0x11; decimal 1-17, where 17 is Prismapreset)"
      min: 1
      max: 17

- id: read_manufacturer
  label: Read Manufacturer
  kind: query
  command: "02 52 15 00 10 03"
  params: []

- id: read_model
  label: Read Model
  kind: query
  command: "02 52 16 00 10 03"
  params: []

- id: read_version
  label: Read Firmware Version
  kind: query
  command: "02 52 17 00 10 03"
  params: []

- id: read_current_volume
  label: Read Current Volume
  kind: query
  command: "02 52 1f 00 10 03"
  params: []

- id: bt_visible_toggle
  label: Bluetooth Visible Toggle
  kind: action
  command: "02 57 18 00 10 03"
  params: []
- id: bt_visible_disable
  label: Bluetooth Visible Disable
  kind: action
  command: "02 57 98 00 10 03"
  params: []
- id: bt_visible_enable
  label: Bluetooth Visible Enable
  kind: action
  command: "02 57 98 01 10 03"
  params: []

- id: bt_autoconnect_toggle
  label: Bluetooth Auto-Connect Toggle
  kind: action
  command: "02 57 19 00 10 03"
  params: []
- id: bt_autoconnect_disable
  label: Bluetooth Auto-Connect Disable
  kind: action
  command: "02 57 99 00 10 03"
  params: []
- id: bt_autoconnect_enable
  label: Bluetooth Auto-Connect Enable
  kind: action
  command: "02 57 99 01 10 03"
  params: []

- id: read_bt_name
  label: Read Bluetooth Name
  kind: query
  command: "02 52 1c 00 10 03"
  params: []

# --- Remote-key emulation over RS-232 (opcode 0x0f) ---
- id: remote_operate
  label: Remote Operate (exit standby)
  kind: action
  command: "02 57 0f 01 10 03"
  params: []
- id: remote_standby
  label: Remote Standby (enter standby)
  kind: action
  command: "02 57 0f 02 10 03"
  params: []
- id: remote_standby_operate_toggle
  label: Remote Standby/Operate Toggle
  kind: action
  command: "02 57 0f 03 10 03"
  params: []
- id: remote_key_0
  label: Remote Key 0
  kind: action
  command: "02 57 0f 04 10 03"
  params: []
- id: remote_key_0_long
  label: Remote Key 0 (long press)
  kind: action
  command: "02 57 0f 05 10 03"
  params: []
- id: remote_key_1
  label: Remote Key 1
  kind: action
  command: "02 57 0f 06 10 03"
  params: []
- id: remote_key_1_long
  label: Remote Key 1 (long press)
  kind: action
  command: "02 57 0f 07 10 03"
  params: []
- id: remote_key_2
  label: Remote Key 2
  kind: action
  command: "02 57 0f 08 10 03"
  params: []
- id: remote_key_2_long
  label: Remote Key 2 (long press)
  kind: action
  command: "02 57 0f 09 10 03"
  params: []
- id: remote_key_3
  label: Remote Key 3
  kind: action
  command: "02 57 0f 0a 10 03"
  params: []
- id: remote_key_3_long
  label: Remote Key 3 (long press)
  kind: action
  command: "02 57 0f 0b 10 03"
  params: []
- id: remote_key_4
  label: Remote Key 4
  kind: action
  command: "02 57 0f 0c 10 03"
  params: []
- id: remote_key_4_long
  label: Remote Key 4 (long press)
  kind: action
  command: "02 57 0f 0d 10 03"
  params: []
- id: remote_key_5
  label: Remote Key 5
  kind: action
  command: "02 57 0f 0e 10 03"
  params: []
- id: remote_key_5_long
  label: Remote Key 5 (long press)
  kind: action
  command: "02 57 0f 0f 10 03"
  params: []
- id: remote_key_6
  label: Remote Key 6
  kind: action
  command: "02 57 0f 10 10 03"
  params: []
- id: remote_key_6_long
  label: Remote Key 6 (long press)
  kind: action
  command: "02 57 0f 11 10 03"
  params: []
- id: remote_key_7
  label: Remote Key 7
  kind: action
  command: "02 57 0f 12 10 03"
  params: []
- id: remote_key_7_long
  label: Remote Key 7 (long press)
  kind: action
  command: "02 57 0f 13 10 03"
  params: []
- id: remote_key_8
  label: Remote Key 8
  kind: action
  command: "02 57 0f 14 10 03"
  params: []
- id: remote_key_8_long
  label: Remote Key 8 (long press)
  kind: action
  command: "02 57 0f 15 10 03"
  params: []
- id: remote_key_9
  label: Remote Key 9
  kind: action
  command: "02 57 0f 16 10 03"
  params: []
- id: remote_key_9_long
  label: Remote Key 9 (long press)
  kind: action
  command: "02 57 0f 17 10 03"
  params: []
- id: remote_volume_up
  label: Remote Volume Up (1 step)
  kind: action
  command: "02 57 0f 18 10 03"
  params: []
- id: remote_volume_down
  label: Remote Volume Down (1 step)
  kind: action
  command: "02 57 0f 19 10 03"
  params: []
- id: remote_up
  label: Remote Arrow Up
  kind: action
  command: "02 57 0f 1a 10 03"
  params: []
- id: remote_down
  label: Remote Arrow Down
  kind: action
  command: "02 57 0f 1b 10 03"
  params: []
- id: remote_left
  label: Remote Arrow Left
  kind: action
  command: "02 57 0f 1c 10 03"
  params: []
- id: remote_right
  label: Remote Arrow Right
  kind: action
  command: "02 57 0f 1d 10 03"
  params: []
- id: remote_select
  label: Remote Select
  kind: action
  command: "02 57 0f 1e 10 03"
  params: []
- id: remote_return
  label: Remote Return
  kind: action
  command: "02 57 0f 1f 10 03"
  params: []
- id: remote_return_long
  label: Remote Return (long press)
  kind: action
  command: "02 57 0f 20 10 03"
  params: []
- id: remote_play
  label: Remote Play (resume playback)
  kind: action
  command: "02 57 0f 21 10 03"
  params: []
- id: remote_pause
  label: Remote Pause
  kind: action
  command: "02 57 0f 22 10 03"
  params: []
- id: remote_play_pause
  label: Remote Play/Pause Toggle
  kind: action
  command: "02 57 0f 23 10 03"
  params: []
- id: remote_play_pause_long
  label: Remote Play/Pause (long press)
  kind: action
  command: "02 57 0f 24 10 03"
  params: []
- id: remote_next
  label: Remote Next (skip to next song)
  kind: action
  command: "02 57 0f 27 10 03"
  params: []
- id: remote_next_long
  label: Remote Next (long press)
  kind: action
  command: "02 57 0f 29 10 03"
  params: []
- id: remote_previous
  label: Remote Previous (skip to previous song)
  kind: action
  command: "02 57 0f 28 10 03"
  params: []
- id: remote_previous_long
  label: Remote Previous (long press)
  kind: action
  command: "02 57 0f 2a 10 03"
  params: []
- id: remote_repeat
  label: Remote Repeat Toggle
  kind: action
  command: "02 57 0f 2b 10 03"
  params: []
- id: remote_repeat_long
  label: Remote Repeat (long press)
  kind: action
  command: "02 57 0f 2c 10 03"
  params: []
- id: remote_mute
  label: Remote Mute Toggle
  kind: action
  command: "02 57 0f 2d 10 03"
  params: []
- id: remote_mute_long
  label: Remote Mute (long press) - Speaker Mute Toggle
  kind: action
  command: "02 57 0f 2e 10 03"
  params: []
- id: remote_info
  label: Remote Info (display OSD info page)
  kind: action
  command: "02 57 0f 2f 10 03"
  params: []
- id: remote_info_long
  label: Remote Info (long press)
  kind: action
  command: "02 57 0f 30 10 03"
  params: []
- id: remote_dim
  label: Remote Dim (cycle dim levels)
  kind: action
  command: "02 57 0f 31 10 03"
  params: []
- id: remote_dim_long
  label: Remote Dim (long press)
  kind: action
  command: "02 57 0f 32 10 03"
  params: []
- id: remote_menu
  label: Remote Menu (toggle OSD menu)
  kind: action
  command: "02 57 0f 33 10 03"
  params: []
- id: remote_menu_long
  label: Remote Menu (long press)
  kind: action
  command: "02 57 0f 34 10 03"
  params: []
- id: remote_audio
  label: Remote Audio (cycle DSP modes)
  kind: action
  command: "02 57 0f 37 10 03"
  params: []
- id: remote_audio_long
  label: Remote Audio (long press)
  kind: action
  command: "02 57 0f 38 10 03"
  params: []
- id: remote_balance
  label: Remote Balance (enter temporary adjustment menu)
  kind: action
  command: "02 57 0f 39 10 03"
  params: []
- id: remote_balance_long
  label: Remote Balance (long press)
  kind: action
  command: "02 57 0f 3a 10 03"
  params: []
- id: remote_red
  label: Remote Red
  kind: action
  command: "02 57 0f 3b 10 03"
  params: []
- id: remote_red_long
  label: Remote Red (long press)
  kind: action
  command: "02 57 0f 3c 10 03"
  params: []
- id: remote_green
  label: Remote Green
  kind: action
  command: "02 57 0f 3d 10 03"
  params: []
- id: remote_green_long
  label: Remote Green (long press)
  kind: action
  command: "02 57 0f 3e 10 03"
  params: []
- id: remote_yellow
  label: Remote Yellow
  kind: action
  command: "02 57 0f 3f 10 03"
  params: []
- id: remote_yellow_long
  label: Remote Yellow (long press)
  kind: action
  command: "02 57 0f 40 10 03"
  params: []
- id: remote_blue
  label: Remote Blue
  kind: action
  command: "02 57 0f 41 10 03"
  params: []
- id: remote_blue_long
  label: Remote Blue (long press)
  kind: action
  command: "02 57 0f 42 10 03"
  params: []
- id: remote_preset
  label: Remote Preset
  kind: action
  command: "02 57 0f 43 10 03"
  params: []
- id: remote_preset_long
  label: Remote Preset (long press)
  kind: action
  command: "02 57 0f 44 10 03"
  params: []
- id: remote_source
  label: Remote Source
  kind: action
  command: "02 57 0f 45 10 03"
  params: []
- id: remote_source_long
  label: Remote Source (long press)
  kind: action
  command: "02 57 0f 46 10 03"
  params: []
- id: remote_channel_up
  label: Remote Channel Up
  kind: action
  command: "02 57 0f 47 10 03"
  params: []
- id: remote_channel_down
  label: Remote Channel Down
  kind: action
  command: "02 57 0f 48 10 03"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, operate]
  source_reply:
    standby: "02 01 00 10 03"
    operate: "02 01 01 10 03"
  description: "Returned after Standby/Operate set or as verbose reply to Operate/Standby Toggle."

- id: current_preset
  type: integer
  range: [1, 17]
  source_reply: "02 02 {YY} 10 03"
  description: "Verbose reply after Preset set (YY = 0x01-0x11)."

- id: current_volume
  type: integer
  range: [0, 99]
  source_reply: "02 03 {YY} 10 03"
  description: "Verbose reply after Volume set or Read current volume (YY = 0x00-0x63)."

- id: mute_state
  type: enum
  values: [off, on]
  source_reply:
    off: "02 09 00 10 03"
    on: "02 09 01 10 03"

- id: dim_level
  type: enum
  values: [off, low, mid, high]
  source_reply:
    off: "02 0a 00 10 03"
    low: "02 0a 01 10 03"
    mid: "02 0a 02 10 03"
    high: "02 0a 03 10 03"

- id: dsp_mode
  type: enum
  values: [auto, bypass, stereo, party, dolby_surround_movie, dolby_surround_music, dolby_surround_night, dts_neural_x]
  source_reply: "02 0c {YY} 10 03"
  description: "YY = 0x01-0x08 mapping to mode list."

- id: verbose_state
  type: enum
  values: [disabled, enabled]
  source_reply:
    disabled: "02 0d 00 10 03"
    enabled: "02 0d 01 10 03"

- id: menu_state
  type: enum
  values: [closed, open]
  source_reply:
    closed: "02 0e 00 10 03"
    open: "02 0e 01 10 03"

- id: bt_visible_state
  type: enum
  values: [disabled, enabled]
  source_reply:
    disabled: "02 18 00 10 03"
    enabled: "02 18 01 10 03"

- id: bt_autoconnect_state
  type: enum
  values: [disabled, enabled]
  source_reply:
    disabled: "02 19 00 10 03"
    enabled: "02 19 01 10 03"

- id: preset_name
  type: string
  source_reply: "02 14 [name bytes] 10 03"
  description: "Reply to Read current preset name or Read specific preset name (variable-length name payload)."

- id: manufacturer
  type: string
  source_reply: "02 15 [bytes] 10 03"
  description: "Reply payload is the literal string PRIMARE per source."

- id: model_name
  type: string
  source_reply: "02 16 [bytes] 10 03"

- id: firmware_version
  type: string
  source_reply: "02 17 [bytes] 10 03"

- id: bt_name
  type: string
  source_reply: "02 1c [bytes] 10 03"
```

## Variables
```yaml
- id: volume
  type: integer
  min: 0
  max: 99
  description: "Master volume, byte 0x00-0x63. Set via volume_set, read via read_current_volume."
  set_action: volume_set
  query: read_current_volume

- id: preset
  type: integer
  min: 1
  max: 17
  description: "Active preset index (1-16 numbered; 17 = Prismapreset)."
  set_actions:
    - preset_set_1
    - preset_set_2
    - preset_set_3
    - preset_set_4
    - preset_set_5
    - preset_set_6
    - preset_set_7
    - preset_set_8
    - preset_set_9
    - preset_set_10
    - preset_set_11
    - preset_set_12
    - preset_set_13
    - preset_set_14
    - preset_set_15
    - preset_set_16
    - preset_set_17

- id: dim_level_var
  type: enum
  values: [off, low, mid, high]
  set_actions: [dim_off, dim_low, dim_mid, dim_high]

- id: dsp_mode_var
  type: enum
  values: [auto, bypass, stereo, party, dolby_surround_movie, dolby_surround_music, dolby_surround_night, dts_neural_x]
  set_actions: [dsp_auto, dsp_bypass, dsp_stereo, dsp_party, dsp_dolby_surround_movie, dsp_dolby_surround_music, dsp_dolby_surround_night, dsp_dts_neural_x]
```

## Events
```yaml
# Source describes "verbose mode": when enabled, the device emits an unsolicited reply frame
# (<STX> <variable> [<value>] <DLE> <ETX>) whenever a command changes state. There is no
# documented separate event channel beyond these verbose replies.
- id: verbose_state_change
  description: "When verbose is enabled, every successful set/toggle command echoes a state reply on the same wire. See Feedbacks entries for per-variable reply framing."
  enabled_by: verbose_enable
  disabled_by: verbose_disable
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset  # destructive: resets device to factory default settings per source
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or power-on sequencing notes.
```

## Notes
- Frame format from source: `<STX=0x02> <command=0x57 W | 0x52 R> <variable> [<value>] <DLE=0x10> <ETX=0x03>`.
- Verbose mode (`verbose_enable`) makes the device echo state changes as `<STX> <variable> [<value>] <DLE> <ETX>` frames. Polling clients should enable verbose at session start.
- Opcode pattern: bit 7 of the variable byte appears to distinguish toggle (`0x0X`) from explicit set (`0x8X`) for the same logical control (e.g. mute toggle = `0x09`, mute set = `0x89`). This is observation across source rows; source does not state it as a rule.
- Read commands (`0x52`) and write commands (`0x57`) share variable numbering for paired query/set (e.g. `0x14` read current preset alias vs `0x94` read specific preset alias).
- Preset 17 is labelled "Prismapreset" in source.
- Source firmware test note: v2.08, 2023-02-23.
<!-- UNRESOLVED: TCP transport — operator asserted TCP/IP but source documents only RS-232. Port, framing-over-TCP behavior, and any login/handshake are not specified in this source. -->
<!-- UNRESOLVED: serial flow_control not stated. -->
<!-- UNRESOLVED: behavior of `<value>` field length for variable-length string replies (preset name, manufacturer, model, firmware, BT name) — source shows `[]` placeholder but no length-prefix or termination rule beyond the trailing DLE+ETX. -->
<!-- UNRESOLVED: remote-key codes 0x25, 0x26 are skipped in source table between PLAY/PAUSE(long press)=0x24 and NEXT=0x27 — assignment unknown. -->

## Provenance

```yaml
source_domains:
  - primare.net
source_urls:
  - https://primare.net/wp-content/uploads/2022/09/SPA25-RS232-Command-list-2023-02-23.pdf
retrieved_at: 2026-04-30T04:28:52.339Z
last_checked_at: 2026-06-02T10:14:10.965Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T10:14:10.965Z
matched_actions: 130
action_count: 130
confidence: medium
summary: "All 130 spec action commands match source verbatim; transport serial params confirmed; source command catalogue fully represented. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP transport asserted by operator (file path + Known protocol field) but source document is RS-232 only; TCP port number not documented in source."
- "serial flow_control not stated in source."
- "flow control not stated in source"
- "TCP port not stated in source"
- "no multi-step macro sequences described in source."
- "source contains no explicit safety warnings, interlocks, or power-on sequencing notes."
- "TCP transport — operator asserted TCP/IP but source documents only RS-232. Port, framing-over-TCP behavior, and any login/handshake are not specified in this source."
- "serial flow_control not stated."
- "behavior of `<value>` field length for variable-length string replies (preset name, manufacturer, model, firmware, BT name) — source shows `[]` placeholder but no length-prefix or termination rule beyond the trailing DLE+ETX."
- "remote-key codes 0x25, 0x26 are skipped in source table between PLAY/PAUSE(long press)=0x24 and NEXT=0x27 — assignment unknown."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
