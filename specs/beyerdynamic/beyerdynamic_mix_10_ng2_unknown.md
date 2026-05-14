---
spec_id: admin/beyerdynamic-mix-10-ng2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Beyerdynamic MIX 10 NG2 Control Spec"
manufacturer: Beyerdynamic
model_family: "MIX 10 NG2"
aliases: []
compatible_with:
  manufacturers:
    - Beyerdynamic
  models:
    - "MIX 10 NG2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - usermanual.wiki
  - images.static-thomann.de
  - manualslib.com
  - adeogroup.it
source_urls:
  - https://usermanual.wiki/Beyerdynamic/MIX10NG2-1016784.pdf
  - https://images.static-thomann.de/pics/atg/atgdata/document/manual/142489_anleitung.pdf
  - https://manualslib.com/manual/286677/Beyerdynamic-MIX-10-NG2.html
  - https://adeogroup.it/sites/default/files/prodotti_allegati_pubblici/beyerdynamic_brochure-orbis.pdf
retrieved_at: 2026-05-12T21:12:24.361Z
last_checked_at: 2026-05-14T05:46:52.872Z
generated_at: 2026-05-14T05:46:52.872Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T05:46:52.872Z
  matched_actions: 31
  action_count: 31
  confidence: high
  summary: "All 31 spec actions match source received commands; transport verified; no fabrications or gaps detected."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-13
---

# Beyerdynamic MIX 10 NG2 Control Spec

## Summary
Beyerdynamic MIX 10 NG2 is a mixing unit with RS-232 control interface. Communication uses DLE/STX/ETX-framed two-byte commands with XOR checksum. No authentication required.

<!-- UNRESOLVED: no mention of TCP/IP, HTTP, or other protocols — serial-only device -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  pinout:
    rx: 2  # Sub-D 9 pin 2
    tx: 3  # Sub-D 9 pin 3
    gnd: 5 # Sub-D 9 pin 5
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable     # Switch-on status command (B7) present
- routable      # Select line source command (A1) present
- queryable     # Inquiry commands (AF, BF) present
- levelable     # Volume control commands (A2, A3, A6, A7) present
```

## Actions
```yaml
- id: select_line_source
  label: Select Line Source
  kind: action
  params:
    - name: source
      type: integer
      description: Line source 0=none, 1-4=line 1-4

- id: set_stereo_volume
  label: Set Stereo Volume
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 0x00-0x4F (non-linear scale, see Notes)
    - name: channel
      type: integer
      description: Stereo channel 0x00=LINE, 0x01=SUB-L, 0x02=SUB-R, 0x03=MASTER-L, 0x04=MASTER-R

- id: set_mic_volume
  label: Set Mic Volume
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 0x00-0x4F
    - name: channel
      type: integer
      description: Mic channel 0x10=MIC1, 0x11=MIC2, ..., 0x15=MIC6

- id: change_stereo_volume_by_steps
  label: Change Stereo Volume by N Steps
  kind: action
  params:
    - name: steps
      type: integer
      description: Number of steps 0x00-0x1F; upper bit of byte 2 determines direction (0=up, 1=down)
    - name: direction
      type: integer
      description: 0=higher, 1=lower
    - name: channel
      type: integer
      description: Stereo channel 0x00-0x04

- id: change_mic_volume_by_steps
  label: Change Mic Volume by N Steps
  kind: action
  params:
    - name: steps
      type: integer
      description: Number of steps 0x00-0x1F
    - name: direction
      type: integer
      description: 0=higher, 1=lower
    - name: channel
      type: integer
      description: Mic channel 0x10-0x15

- id: set_ducking_manually
  label: Set Ducking Manually
  kind: action
  params:
    - name: state
      type: integer
      description: 0x02=on, 0x00=off

- id: set_mic_ducking
  label: Set Mic Ducking
  kind: action
  params:
    - name: enabled
      type: integer
      description: 0x01=enabled, 0x00=disabled
    - name: channel
      type: integer
      description: Mic channel 0x10-0x15

- id: set_stereo_ganged
  label: Set Stereo Ganged
  kind: action
  params:
    - name: enabled
      type: integer
      description: 0x01=enabled, 0x00=disabled
    - name: mode
      type: integer
      description: 0x01=subgroup, 0x02=master

- id: recall_or_save_preset
  label: Recall or Save Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 0x00-0x03 (0=default, 1-3=user presets)
    - name: operation
      type: integer
      description: 0x00=recall, 0x01=save

- id: mute_channel
  label: Mute Channel
  kind: action
  params:
    - name: mute
      type: integer
      description: 0x00=unmute, 0x01=mute
    - name: channel
      type: integer
      description: Channel 0x00-0x04 (stereo) or 0x10-0x15 (mic)

- id: inquiry_select_line_source
  label: Inquiry Line Source
  kind: action
  params: []

- id: inquiry_stereo_volume
  label: Inquiry Stereo Volume
  kind: action
  params:
    - name: channel
      type: integer
      description: Stereo channel 0x00-0x04

- id: inquiry_mic_volume
  label: Inquiry Mic Volume
  kind: action
  params:
    - name: channel
      type: integer
      description: Mic channel 0x10-0x15

- id: inquiry_stereo_ganged
  label: Inquiry Stereo Ganged
  kind: action
  params:
    - name: mode
      type: integer
      description: 0x01=subgroup, 0x02=master

- id: inquiry_mute_state
  label: Inquiry Mute State
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel 0x00-0x04 (stereo) or 0x10-0x15 (mic)

- id: set_fade_out_speed
  label: Set Fade-Out Speed
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed value 0x00-0x7F

- id: set_fade_in_speed
  label: Set Fade-In Speed
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed value 0x00-0x7F

- id: set_ducking_threshold
  label: Set Ducking Threshold
  kind: action
  params:
    - name: threshold
      type: integer
      description: Threshold value 0x00-0x7F

- id: set_ducking_attenuation
  label: Set Ducking Attenuation
  kind: action
  params:
    - name: attenuation
      type: integer
      description: Attenuation value 0x00-0x4F

- id: set_ducking_hold
  label: Set Ducking Hold
  kind: action
  params:
    - name: value
      type: integer
      description: Hold value 0x00-0x7F

- id: set_switch_on_status
  label: Set Switch-On Status
  kind: action
  params:
    - name: preset
      type: integer
      description: 0x00=switch-off status, 0x01-0x03=preset 1-3

- id: reset_eeprom
  label: Reset EEPROM
  kind: action
  params: []

- id: inquiry_fade_out_speed
  label: Inquiry Fade-Out Speed
  kind: action
  params: []

- id: inquiry_fade_in_speed
  label: Inquiry Fade-In Speed
  kind: action
  params: []

- id: inquiry_ducking_threshold
  label: Inquiry Ducking Threshold
  kind: action
  params: []

- id: inquiry_ducking_stereo_reduction
  label: Inquiry Ducking Stereo Reduction
  kind: action
  params: []

- id: inquiry_ducking_hold
  label: Inquiry Ducking Hold
  kind: action
  params: []

- id: inquiry_ducking_fade_out_speed
  label: Inquiry Ducking Fade-Out Speed
  kind: action
  params: []

- id: inquiry_ducking_fade_in_speed
  label: Inquiry Ducking Fade-In Speed
  kind: action
  params: []

- id: inquiry_start_configuration
  label: Inquiry Start Configuration
  kind: action
  params: []

- id: inquiry_programmed_version
  label: Inquiry Programmed Version
  kind: action
  params: []
```

## Feedbacks
```yaml
# Device sends acknowledgment after every received command.
# Device also sends unsolicited status changes for:
- id: line_source_selected
  label: Line Source Selected (Unsolicited)
  type: integer
  description: Line 0=none, 1-4=line 1-4
  values: [0, 1, 2, 3, 4]

- id: stereo_volume_currently_adjusted
  label: Stereo Volume Currently Adjusted
  type: object
  fields:
    - name: value
      type: integer
      description: Volume value 0x00-0x4F
    - name: channel
      type: integer
      description: Stereo channel 0x00-0x04

- id: mic_volume_currently_adjusted
  label: Mic Volume Currently Adjusted
  type: object
  fields:
    - name: value
      type: integer
      description: Volume value 0x00-0x4F
    - name: channel
      type: integer
      description: Mic channel 0x10-0x15

- id: stereo_volume_now
  label: Stereo Volume Now
  type: object
  fields:
    - name: value
      type: integer
      description: Volume value 0x00-0x4F
    - name: channel
      type: integer
      description: Stereo channel 0x00-0x04

- id: mic_volume_now
  label: Mic Volume Now
  type: object
  fields:
    - name: value
      type: integer
      description: Volume value 0x00-0x4F
    - name: channel
      type: integer
      description: Mic channel 0x10-0x15

- id: auto_ducking_state
  label: Auto Ducking State
  type: boolean
  description: Bit 0 of byte 1

- id: ducking_manually_state
  label: Ducking Manually State
  type: boolean
  description: Bit 1 of byte 2

- id: mic_ducking_enabled
  label: Mic Ducking Enabled
  type: object
  fields:
    - name: enabled
      type: boolean
    - name: channel
      type: integer
      description: Mic channel 0x10-0x15

- id: stereo_ganged_state
  label: Stereo Ganged State
  type: object
  fields:
    - name: enabled
      type: boolean
    - name: mode
      type: integer
      description: 0x01=subgroup, 0x02=master

- id: preset_load_save
  label: Preset Load or Save
  type: object
  fields:
    - name: preset
      type: integer
      description: 0x00=default, 0x01-0x03=preset 1-3
    - name: operation
      type: integer
      description: 0x00=load, 0x01=save

- id: mute_flag
  label: Mute Flag
  type: object
  fields:
    - name: muted
      type: boolean
    - name: channel
      type: integer
      description: Channel 0x00-0x04 (stereo) or 0x10-0x15 (mic)

- id: fade_out_speed
  label: Fade-Out Speed
  type: integer
  description: Speed value 0x00-0x7F

- id: fade_in_speed
  label: Fade-In Speed
  type: integer
  description: Speed value 0x00-0x7F

- id: ducking_threshold_value
  label: Ducking Threshold Value
  type: integer
  description: Threshold value 0x00-0x7F

- id: ducking_reduction
  label: Ducking Reduction
  type: integer
  description: Reduction value 0x00-0x4F

- id: ducking_hold
  label: Ducking Hold
  type: integer
  description: Hold value 0x00-0x7F

- id: switch_on_status
  label: Switch-On Status
  type: integer
  description: 0x00=switch-off, 0x01-0x03=preset 1-3

- id: programmed_version
  label: Programmed Version
  type: string
  description: Version string e.g. "V 1.0"
```

## Variables
```yaml
# Volume scaling is non-linear:
# 0x00-0x20: N × (-0.5 dB)
# 0x21-0x40: N × (-1.0 dB) + 16.0 dB
# 0x41-0x4E: N × (-2.0 dB) + 80.0 dB
# 0x4F-0x7F: -104 dB (mute)
```

## Events
```yaml
# Device sends unsolicited status changes for all state variables.
# Acknowledge message sent directly after receiving any command.
```

## Macros
```yaml
# No explicit macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

**Command packet structure:**
```
DLE STX DeviceNo Len Cmd[Data] DLE ETX Checksum
0x10 0x02 0x01    0x02 A1 03    0x10 03  A0
```
- Device→PC uses DeviceNo=0x00; PC→Device uses DeviceNo=0x01
- Checksum = XOR of all bytes from STX through ETX (inclusive)

**Channel addressing:**
- Stereo channels: 0x00=LINE, 0x01=SUB-L, 0x02=SUB-R, 0x03=MASTER-L, 0x04=MASTER-R
- Mic channels: 0x10=MIC1, 0x11=MIC2, ..., 0x15=MIC6

**Volume scale:** Non-linear curve; 0x4F-0x7F maps to -104 dB (mute). See Variables section.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: no mention of TCP/IP, HTTP, REST, or other protocols — serial only -->
<!-- UNRESOLVED: error handling behavior not described in source -->
<!-- UNRESOLVED: no mention of command timing or polling requirements -->

## Provenance

```yaml
source_domains:
  - usermanual.wiki
  - images.static-thomann.de
  - manualslib.com
  - adeogroup.it
source_urls:
  - https://usermanual.wiki/Beyerdynamic/MIX10NG2-1016784.pdf
  - https://images.static-thomann.de/pics/atg/atgdata/document/manual/142489_anleitung.pdf
  - https://manualslib.com/manual/286677/Beyerdynamic-MIX-10-NG2.html
  - https://adeogroup.it/sites/default/files/prodotti_allegati_pubblici/beyerdynamic_brochure-orbis.pdf
retrieved_at: 2026-05-12T21:12:24.361Z
last_checked_at: 2026-05-14T05:46:52.872Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T05:46:52.872Z
matched_actions: 31
action_count: 31
confidence: high
summary: "All 31 spec actions match source received commands; transport verified; no fabrications or gaps detected."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
