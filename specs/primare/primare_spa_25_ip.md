---
spec_id: admin/primare-spa25
schema_version: ai4av-public-spec-v1
revision: 1
title: "Primare SPA 25 Control Spec"
manufacturer: Primare
model_family: "SPA 25"
aliases: []
compatible_with:
  manufacturers:
    - Primare
  models:
    - "SPA 25"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - primare.net
retrieved_at: 2026-05-04T15:12:58.449Z
last_checked_at: 2026-04-25T21:50:02.643Z
generated_at: 2026-04-25T21:50:02.643Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:50:02.643Z
  matched_actions: 54
  action_count: 54
  confidence: low
  summary: "All 54 spec actions matched source commands; transport parameters verified verbatim; source fully represented"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Primare SPA 25 Control Spec

## Summary
Primare SPA 25 is a multi-channel audio amplifier/prerocessor with RS-232 control interface. This spec covers the serial command protocol for power control, volume/mute, preset management, DSP mode selection, display dimming, and Bluetooth control. Protocol settings: 115200 baud, 8 data bits, no parity, 1 stop bit.

<!-- UNRESOLVED: IP/Ethernet control protocol not covered in this source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: power on/off commands present
- levelable       # inferred: volume, mute, dim commands present
- queryable       # inferred: read commands for preset name, volume, BT name, firmware present
```

## Actions
```yaml
- id: power_toggle
  label: Operate/Standby Toggle
  kind: action
  params: []

- id: power_standby
  label: Standby
  kind: action
  params: []

- id: power_operate
  label: Operate
  kind: action
  params: []

- id: preset_previous
  label: Select Previous Preset
  kind: action
  params: []

- id: preset_next
  label: Select Next Preset
  kind: action
  params: []

- id: preset_set
  label: Set Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (1-17)
      values:
        min: 1
        max: 17

- id: volume_decrease
  label: Volume Decrease
  kind: action
  params: []

- id: volume_increase
  label: Volume Increase
  kind: action
  params: []

- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume level (0-99), device maps to 0x00-0x63 internally
      values:
        min: 0
        max: 99

- id: mute_toggle
  label: Mute Toggle
  kind: action
  params: []

- id: mute_disable
  label: Mute Disable
  kind: action
  params: []

- id: mute_enable
  label: Mute Enable
  kind: action
  params: []

- id: dim_cycle
  label: Step Through All Dim Levels
  kind: action
  params: []

- id: dim_set
  label: Set Dim Level
  kind: action
  params:
    - name: level
      type: integer
      description: Dim level (0=OFF, 1=LOW, 2=MID, 3=HIGH)
      values:
        - 0
        - 1
        - 2
        - 3

- id: dsp_mode_cycle
  label: Cycle Through DSP Modes
  kind: action
  params: []

- id: dsp_mode_set
  label: Set DSP Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: DSP mode (1=Auto, 2=Bypass, 3=Stereo, 4=Party, 5=Dolby Surround Movie, 6=Dolby Surround Music, 7=Dolby Surround Night, 8=DTS Neural:X)
      values:
        - 1
        - 2
        - 3
        - 4
        - 5
        - 6
        - 7
        - 8

- id: verbose_toggle
  label: Verbose Toggle
  kind: action
  params: []

- id: verbose_disable
  label: Disable Verbose
  kind: action
  params: []

- id: verbose_enable
  label: Enable Verbose
  kind: action
  params: []

- id: menu_toggle
  label: Enter or Leave Menu
  kind: action
  params: []

- id: menu_leave
  label: Leave Menu
  kind: action
  params: []

- id: menu_enter
  label: Enter Menu
  kind: action
  params: []

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []

- id: bt_visible_toggle
  label: Bluetooth Visible Toggle
  kind: action
  params: []

- id: bt_visible_disable
  label: Bluetooth Visible Disable
  kind: action
  params: []

- id: bt_visible_enable
  label: Bluetooth Visible Enable
  kind: action
  params: []

- id: bt_autoconnect_toggle
  label: Bluetooth Auto-Connect Toggle
  kind: action
  params: []

- id: bt_autoconnect_disable
  label: Bluetooth Auto-Connect Disable
  kind: action
  params: []

- id: bt_autoconnect_enable
  label: Bluetooth Auto-Connect Enable
  kind: action
  params: []

- id: remote_operate
  label: Remote Operate (Exit Standby)
  kind: action
  params: []

- id: remote_standby
  label: Remote Standby (Enter Standby)
  kind: action
  params: []

- id: remote_standby_toggle
  label: Remote Standby/Operate Toggle
  kind: action
  params: []

- id: remote_number
  label: Remote Number Key
  kind: action
  params:
    - name: key
      type: integer
      description: Number key (0-9)
      values:
        - 0
        - 1
        - 2
        - 3
        - 4
        - 5
        - 6
        - 7
        - 8
        - 9

- id: remote_volume_up
  label: Remote Volume Up
  kind: action
  params: []

- id: remote_volume_down
  label: Remote Volume Down
  kind: action
  params: []

- id: remote_up
  label: Remote Arrow Up
  kind: action
  params: []

- id: remote_down
  label: Remote Arrow Down
  kind: action
  params: []

- id: remote_left
  label: Remote Arrow Left
  kind: action
  params: []

- id: remote_right
  label: Remote Arrow Right
  kind: action
  params: []

- id: remote_select
  label: Remote Select
  kind: action
  params: []

- id: remote_return
  label: Remote Return
  kind: action
  params: []

- id: remote_play
  label: Remote Play/Resume
  kind: action
  params: []

- id: remote_pause
  label: Remote Pause
  kind: action
  params: []

- id: remote_play_pause_toggle
  label: Remote Play/Pause Toggle
  kind: action
  params: []

- id: remote_next
  label: Remote Skip Next
  kind: action
  params: []

- id: remote_previous
  label: Remote Skip Previous
  kind: action
  params: []

- id: remote_repeat_toggle
  label: Remote Repeat Toggle
  kind: action
  params: []

- id: remote_mute_toggle
  label: Remote Mute Toggle
  kind: action
  params: []

- id: remote_speaker_mute_toggle
  label: Remote Speaker Mute Toggle
  kind: action
  params: []

- id: remote_info
  label: Remote Info (OSD)
  kind: action
  params: []

- id: remote_dim
  label: Remote Dim Cycle
  kind: action
  params: []

- id: remote_menu
  label: Remote Menu Toggle
  kind: action
  params: []

- id: remote_audio
  label: Remote Audio (Cycle DSP)
  kind: action
  params: []

- id: remote_balance
  label: Remote Balance (Temp Adjustment Menu)
  kind: action
  params: []

- id: remote_color_key
  label: Remote Color Key
  kind: action
  params:
    - name: color
      type: string
      enum: [RED, GREEN, YELLOW, BLUE]

- id: remote_preset
  label: Remote Preset
  kind: action
  params: []

- id: remote_source
  label: Remote Source
  kind: action
  params: []

- id: remote_channel_up
  label: Remote Channel Up
  kind: action
  params: []

- id: remote_channel_down
  label: Remote Channel Down
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - standby
    - operate

- id: current_preset
  label: Current Preset
  type: integer
  values:
    min: 1
    max: 17

- id: preset_name
  label: Preset Name
  type: string
  description: Alias name of current or specified preset

- id: volume
  label: Volume Level
  type: integer
  values:
    min: 0
    max: 99

- id: mute_state
  label: Mute State
  type: enum
  values:
    - disabled
    - enabled

- id: dim_level
  label: Dim Level
  type: enum
  values:
    - OFF
    - LOW
    - MID
    - HIGH

- id: dsp_mode
  label: DSP Mode
  type: enum
  values:
    - Auto
    - Bypass
    - Stereo
    - Party
    - Dolby_Surround_Movie
    - Dolby_Surround_Music
    - Dolby_Surround_Night
    - DTS_Neural_X

- id: verbose_state
  label: Verbose State
  type: enum
  values:
    - disabled
    - enabled

- id: menu_state
  label: Menu State
  type: enum
  values:
    - exited
    - entered

- id: manufacturer
  label: Manufacturer
  type: string
  description: Returns "PRIMARE"

- id: model_name
  label: Model Name
  type: string

- id: firmware_version
  label: Firmware Version
  type: string

- id: bt_visible_state
  label: Bluetooth Visible State
  type: enum
  values:
    - disabled
    - enabled

- id: bt_autoconnect_state
  label: Bluetooth Auto-Connect State
  type: enum
  values:
    - disabled
    - enabled

- id: bt_name
  label: Bluetooth Name
  type: string
```

## Variables
```yaml
# UNRESOLVED: source describes only action/feedback pairs, no separate settable parameters
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event notifications from device
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain safety warnings or interlock procedures
```

## Notes

**Command Protocol Structure:**
- All commands use binary format: `<STX> <command> <variable> [<value>] <DLE> <ETX>`
- STX = 0x02, DLE = 0x10, ETX = 0x03
- Write command = 0x57 (ASCII W), Read command = 0x52 (ASCII R)
- Write commands use high bit set on variable byte (e.g., 0x81 for standby write vs 0x01 for toggle)
- Verbose mode causes device to send reply on command receipt

**Volume Range Note:**
- User-facing volume range is 0-99
- Device internally uses 0x00-0x63 (0-99 decimal)

**DSP Modes:**
- Source documents modes 1-8; mode 0 may exist but is not listed

**Preset Count:**
- Write commands support presets 1-17 (0x01-0x11)
- Read commands support presets 1-17 plus Prismapreset (0x11)

**Remote Control Passthrough:**
- Remote commands section maps IR remote button presses to equivalent serial commands for integration with external control systems

**Firmware:**
- Tested with v2.08 (2023-02-23) — other firmware versions may differ

<!-- UNRESOLVED: TCP/IP/Ethernet control protocol not documented in this source -->
<!-- UNRESOLVED: exact binary encoding of string values (preset names, BT name) not specified -->
<!-- UNRESOLVED: flow control (RTS/CTS, XON/XOFF) not stated in source -->
<!-- UNRESOLVED: response timing specifications not provided -->

## Provenance

```yaml
source_domains:
  - primare.net
retrieved_at: 2026-05-04T15:12:58.449Z
last_checked_at: 2026-04-25T21:50:02.643Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:50:02.643Z
matched_actions: 54
action_count: 54
confidence: low
summary: "All 54 spec actions matched source commands; transport parameters verified verbatim; source fully represented"
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
