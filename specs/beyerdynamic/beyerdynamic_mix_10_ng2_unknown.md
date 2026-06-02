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
  - fccid.io
source_urls:
  - https://usermanual.wiki/Beyerdynamic/MIX10NG2-1016784.pdf
  - https://images.static-thomann.de/pics/atg/atgdata/document/manual/142489_anleitung.pdf
  - https://manualslib.com/manual/286677/Beyerdynamic-MIX-10-NG2.html
  - https://fccid.io/OSDMIX10NG2/User-Manual-1016784/ViewExhibitReport.cfm
retrieved_at: 2026-05-12T21:12:24.361Z
last_checked_at: 2026-05-14T05:46:52.872Z
generated_at: 2026-05-14T05:46:52.872Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "switch-on power sequencing, max cable length, behavior on malformed frames"
  - "data byte format for D8 not detailed in source beyond \"V 1.0\" example"
  - "source contains no explicit safety warnings or interlock procedures"
  - "max cable length, behavior on malformed frames, command timeouts, link-layer retry behavior"
verification:
  verdict: verified
  checked_at: 2026-05-14T05:46:52.872Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions match source received commands; transport verified; no fabrications or gaps detected. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Beyerdynamic MIX 10 NG2 Control Spec

## Summary
Stereo/mic line mixer with RS-232 control. Two-byte commands wrapped in DLE-framed packets with XOR checksum. 9600 baud, 8N1, no handshake. Sub-D 9 (Pin 2=Rx, Pin 3=Tx, Pin 5=GND). DevNo=0x01 for PC→Device, 0x00 for Device→PC.

<!-- UNRESOLVED: switch-on power sequencing, max cable length, behavior on malformed frames -->

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
  connector: "Sub-D 9 (Pin 2=Rx, Pin 3=Tx, Pin 5=GND)"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable  # inferred: input source selection (A1, C1)
- levelable  # inferred: volume commands (A2/A3/A6/A7)
- queryable  # inferred: inquiry commands (AF, BF)
- powerable  # inferred: switch-on status preset (B7, D7)
```

## Actions

PC→Device frame: `10 02 01 {Len} {Cmd} {Data0} {Data1?} 10 03 {CS}`.
`{CS}` = XOR of bytes STX(02) through ETX(03) inclusive.
`{Len}` = byte count of Cmd+Data (0x01 / 0x02 / 0x03).

```yaml
- id: select_line_source
  label: Select Line Source
  kind: action
  command: "10 02 01 02 A1 {Data0} 10 03 {CS}"
  params:
    - name: Data0
      type: integer
      description: Line source (00=none, 01=line1, 02=line2, 03=line3, 04=line4)

- id: set_stereo_volume
  label: Set Stereo Volume
  kind: action
  command: "10 02 01 03 A2 {Data0} {Data1} 10 03 {CS}"
  params:
    - name: Data0
      type: integer
      description: Volume value (00-4F hex; 4F-7F=mute)
    - name: Data1
      type: integer
      description: Stereo channel (00=LINE, 01=SUB-L, 02=SUB-R, 03=MASTER-L, 04=MASTER-R)

- id: set_mic_volume
  label: Set Mic Volume
  kind: action
  command: "10 02 01 03 A3 {Data0} {Data1} 10 03 {CS}"
  params:
    - name: Data0
      type: integer
      description: Volume value (00-4F hex)
    - name: Data1
      type: integer
      description: Mic channel (10=MIC1, 11=MIC2, 12=MIC3, 13=MIC4, 14=MIC5, 15=MIC6)

- id: change_stereo_volume_step
  label: Change Stereo Volume by N Steps
  kind: action
  command: "10 02 01 03 A6 {Data0} {Data1} 10 03 {CS}"
  params:
    - name: Data0
      type: integer
      description: Steps (00-1F) | bit 6 = direction (0=higher, 1=lower)
    - name: Data1
      type: integer
      description: Stereo channel (00-04)

- id: change_mic_volume_step
  label: Change Mic Volume by N Steps
  kind: action
  command: "10 02 01 03 A7 {Data0} {Data1} 10 03 {CS}"
  params:
    - name: Data0
      type: integer
      description: Steps (00-1F) | bit 6 = direction (0=higher, 1=lower)
    - name: Data1
      type: integer
      description: Mic channel (10-15)

- id: set_ducking_manually
  label: Set Manual Ducking
  kind: action
  command: "10 02 01 02 A8 {Data0} 10 03 {CS}"
  params:
    - name: Data0
      type: integer
      description: 00=off, 02=on

- id: set_mic_ducking
  label: Set Mic Ducking
  kind: action
  command: "10 02 01 03 A9 {Data0} {Data1} 10 03 {CS}"
  params:
    - name: Data0
      type: integer
      description: 00=disabled, 01=enabled
    - name: Data1
      type: integer
      description: Mic channel (10-15)

- id: set_stereo_ganged
  label: Set Stereo Ganged
  kind: action
  command: "10 02 01 03 AA {Data0} {Data1} 10 03 {CS}"
  params:
    - name: Data0
      type: integer
      description: 00=disabled, 01=enabled
    - name: Data1
      type: integer
      description: 01=subgroup, 02=master

- id: recall_or_save_preset
  label: Recall or Save Preset
  kind: action
  command: "10 02 01 03 AB {Data0} {Data1} 10 03 {CS}"
  params:
    - name: Data0
      type: integer
      description: Preset number (00-03)
    - name: Data1
      type: integer
      description: 00=recall, 01=save

- id: mute_channel
  label: Mute Channel
  kind: action
  command: "10 02 01 03 AE {Data0} {Data1} 10 03 {CS}"
  params:
    - name: Data0
      type: integer
      description: 00=unmute, 01=mute
    - name: Data1
      type: integer
      description: Channel (00-04 stereo, 10-15 mic)

- id: inquiry_line_source
  label: Inquiry Line Source
  kind: query
  command: "10 02 01 02 AF 01 10 03 {CS}"

- id: inquiry_stereo_volume
  label: Inquiry Stereo Volume
  kind: query
  command: "10 02 01 03 AF 02 {Data1} 10 03 {CS}"
  params:
    - name: Data1
      type: integer
      description: Stereo channel (00-04)

- id: inquiry_mic_volume
  label: Inquiry Mic Volume
  kind: query
  command: "10 02 01 03 AF 03 {Data1} 10 03 {CS}"
  params:
    - name: Data1
      type: integer
      description: Mic channel (10-15)

- id: inquiry_stereo_ganged
  label: Inquiry Stereo Ganged
  kind: query
  command: "10 02 01 03 AF 06 {Data1} 10 03 {CS}"
  params:
    - name: Data1
      type: integer
      description: 01=subgroup, 02=master

- id: inquiry_mute_state
  label: Inquiry Mute State
  kind: query
  command: "10 02 01 03 AF 07 {Data1} 10 03 {CS}"
  params:
    - name: Data1
      type: integer
      description: Channel (00-04 stereo, 10-15 mic)

- id: set_fade_out_speed
  label: Set Fade-Out Speed
  kind: action
  command: "10 02 01 02 B0 {Data0} 10 03 {CS}"
  params:
    - name: Data0
      type: integer
      description: Speed value (00-7F)

- id: set_fade_in_speed
  label: Set Fade-In Speed
  kind: action
  command: "10 02 01 02 B1 {Data0} 10 03 {CS}"
  params:
    - name: Data0
      type: integer
      description: Speed value (00-7F)

- id: set_ducking_threshold
  label: Set Ducking Threshold
  kind: action
  command: "10 02 01 02 B2 {Data0} 10 03 {CS}"
  params:
    - name: Data0
      type: integer
      description: Threshold value (00-7F)

- id: set_ducking_attenuation
  label: Set Ducking Attenuation
  kind: action
  command: "10 02 01 02 B3 {Data0} 10 03 {CS}"
  params:
    - name: Data0
      type: integer
      description: Attenuation value (00-4F)

- id: set_ducking_hold
  label: Set Ducking Hold
  kind: action
  command: "10 02 01 02 B4 {Data0} 10 03 {CS}"
  params:
    - name: Data0
      type: integer
      description: Hold value (00-7F)

- id: set_switch_on_status
  label: Set Switch-On Status
  kind: action
  command: "10 02 01 02 B7 {Data0} 10 03 {CS}"
  params:
    - name: Data0
      type: integer
      description: 00=switch-off status, 01=preset 1, 02=preset 2, 03=preset 3

- id: reset_eeprom
  label: Reset EEPROM
  kind: action
  command: "10 02 01 02 B8 00 10 03 {CS}"

- id: inquiry_fade_out_speed
  label: Inquiry Fade-Out Speed
  kind: query
  command: "10 02 01 02 BF 00 10 03 {CS}"

- id: inquiry_fade_in_speed
  label: Inquiry Fade-In Speed
  kind: query
  command: "10 02 01 02 BF 01 10 03 {CS}"

- id: inquiry_ducking_threshold
  label: Inquiry Ducking Threshold
  kind: query
  command: "10 02 01 02 BF 02 10 03 {CS}"

- id: inquiry_ducking_stereo_reduction
  label: Inquiry Ducking Stereo Reduction
  kind: query
  command: "10 02 01 02 BF 03 10 03 {CS}"

- id: inquiry_ducking_hold
  label: Inquiry Ducking Hold
  kind: query
  command: "10 02 01 02 BF 04 10 03 {CS}"

- id: inquiry_ducking_fade_out_speed
  label: Inquiry Ducking Fade-Out Speed
  kind: query
  command: "10 02 01 02 BF 05 10 03 {CS}"

- id: inquiry_ducking_fade_in_speed
  label: Inquiry Ducking Fade-In Speed
  kind: query
  command: "10 02 01 02 BF 06 10 03 {CS}"

- id: inquiry_start_configuration
  label: Inquiry Start Configuration
  kind: query
  command: "10 02 01 02 BF 07 10 03 {CS}"

- id: inquiry_programmed_version
  label: Inquiry Programmed Version
  kind: query
  command: "10 02 01 02 BF 08 10 03 {CS}"
```

## Feedbacks

Device→PC frame: `10 02 00 {Len} {Cmd} {Data0} {Data1?} 10 03 {CS}`. DevNo=0x00.

```yaml
- id: line_source_selected
  type: integer
  description: Currently selected line source (00=none, 01-04=line 1-4)
  command: "10 02 00 02 C1 {Data0} 10 03 {CS}"

- id: stereo_volume_currently_adjusted
  type: integer
  description: Stereo volume in adjustment (00-4F; 4F-7F=mute)
  command: "10 02 00 03 C2 {Data0} {Data1} 10 03 {CS}"

- id: mic_volume_currently_adjusted
  type: integer
  description: Mic volume in adjustment (00-4F)
  command: "10 02 00 03 C3 {Data0} {Data1} 10 03 {CS}"

- id: stereo_volume_now
  type: integer
  description: Settled stereo volume (00-4F)
  command: "10 02 00 03 C4 {Data0} {Data1} 10 03 {CS}"

- id: mic_volume_now
  type: integer
  description: Settled mic volume (00-4F)
  command: "10 02 00 03 C5 {Data0} {Data1} 10 03 {CS}"

- id: auto_ducking_flag
  type: enum
  values: [on, off]
  description: Auto ducking state (bit 0 of Data0; 1=on, 0=off)
  command: "10 02 00 02 C8 20 10 03 {CS}"

- id: ducking_manually_flag
  type: enum
  values: [on, off]
  description: Manual ducking state (bit 1 of Data0; 1=on, 0=off)
  command: "10 02 00 02 C8 21 10 03 {CS}"

- id: mic_ducking
  type: enum
  values: [enabled, disabled]
  description: Per-mic ducking enable state
  command: "10 02 00 03 C9 {Data0} {Data1} 10 03 {CS}"

- id: stereo_ganged
  type: enum
  values: [enabled, disabled]
  description: Stereo ganged state
  command: "10 02 00 03 CA {Data0} {Data1} 10 03 {CS}"

- id: preset_load_save
  type: integer
  description: Preset load/save notification (Data0: 00=default, 01-03=preset; Data1: 00=load, 01=save)
  command: "10 02 00 03 CB {Data0} {Data1} 10 03 {CS}"

- id: mute_flag
  type: enum
  values: [on, off]
  description: Channel mute state (Data0: 1=mute, 0=unmute)
  command: "10 02 00 03 CE {Data0} {Data1} 10 03 {CS}"

- id: fade_out_speed
  type: integer
  description: Current fade-out speed (00-7F)
  command: "10 02 00 02 D0 {Data0} 10 03 {CS}"

- id: fade_in_speed
  type: integer
  description: Current fade-in speed (00-7F)
  command: "10 02 00 02 D1 {Data0} 10 03 {CS}"

- id: ducking_threshold_value
  type: integer
  description: Current ducking threshold (00-7F)
  command: "10 02 00 02 D2 {Data0} 10 03 {CS}"

- id: ducking_reduction
  type: integer
  description: Current ducking reduction (00-4F)
  command: "10 02 00 02 D3 {Data0} 10 03 {CS}"

- id: ducking_hold
  type: integer
  description: Current ducking hold (00-7F)
  command: "10 02 00 02 D4 {Data0} 10 03 {CS}"

- id: switch_on_status
  type: integer
  description: Power-on default state (00=switch-off, 01-03=preset 1-3)
  command: "10 02 00 02 D7 {Data0} 10 03 {CS}"

- id: programmed_version
  type: string
  description: Firmware version string
  command: "10 02 00 02 D8 10 03 {CS}"
  # UNRESOLVED: data byte format for D8 not detailed in source beyond "V 1.0" example
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures
```

## Notes

- **Frame format**: `DLE STX DevNo Len Cmd Data[0..1] DLE ETX CS`. DLE=0x10, STX=0x02, ETX=0x03.
- **Checksum**: XOR of bytes STX(02) through ETX(03) inclusive, excluding the leading DLE(10) and the CS byte itself.
- **Length**: byte count of `Cmd + Data` (typically 0x02 or 0x03).
- **Volume scale (hex)**: `00..20` → N × (-0.5 dB); `21..40` → N × (-1.0 dB) + 16.0 dB; `41..4E` → N × (-2.0 dB) + 80.0 dB; `4F..7F` → -104 dB (mute).
- **Channel codes**: `00..04` = LINE, SUB-L, SUB-R, MASTER-L, MASTER-R; `10..15` = MIC1..MIC6.
- **A6/A7 step direction**: bit 6 of Data0 — 0=higher, 1=lower.
- **C8 bit fields**: bit 0 = auto ducking, bit 1 = manual ducking.
- **Acknowledgement**: device sends an ack immediately after each request.
- **Worked example** (select CD line input = line 3): `10 02 01 02 A1 03 10 03 A0` (XOR of 02⊕01⊕02⊕A1⊕03⊕10⊕03 = A0).

<!-- UNRESOLVED: max cable length, behavior on malformed frames, command timeouts, link-layer retry behavior -->

## Provenance

```yaml
source_domains:
  - usermanual.wiki
  - images.static-thomann.de
  - manualslib.com
  - fccid.io
source_urls:
  - https://usermanual.wiki/Beyerdynamic/MIX10NG2-1016784.pdf
  - https://images.static-thomann.de/pics/atg/atgdata/document/manual/142489_anleitung.pdf
  - https://manualslib.com/manual/286677/Beyerdynamic-MIX-10-NG2.html
  - https://fccid.io/OSDMIX10NG2/User-Manual-1016784/ViewExhibitReport.cfm
retrieved_at: 2026-05-12T21:12:24.361Z
last_checked_at: 2026-05-14T05:46:52.872Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T05:46:52.872Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions match source received commands; transport verified; no fabrications or gaps detected. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "switch-on power sequencing, max cable length, behavior on malformed frames"
- "data byte format for D8 not detailed in source beyond \"V 1.0\" example"
- "source contains no explicit safety warnings or interlock procedures"
- "max cable length, behavior on malformed frames, command timeouts, link-layer retry behavior"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
