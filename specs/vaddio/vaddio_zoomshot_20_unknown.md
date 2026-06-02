---
spec_id: admin/vaddio-zoomshot-20
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio ZoomSHOT 20 Control Spec"
manufacturer: Vaddio
model_family: "ZoomSHOT 20"
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - "ZoomSHOT 20"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
  - fullcompass.com
  - manua.ls
  - manualslib.com
source_urls:
  - https://res.cloudinary.com/avd/image/upload/v134228628/Resources/Vaddio/Cameras/Operation/342-0962-reva-zoomshot-for-avbmp-manual.pdf
  - https://www.fullcompass.com/common/files/28647-VaddioZoomSHOT20Manual.pdf
  - https://www.manua.ls/vaddio/zoomshot-20-qusb/manual
  - https://www.fullcompass.com/common/files/36364-RoboSHOTHDBTCompleteManual.pdf
  - "https://www.manualslib.com/manual/975248/Vaddio-Zoomshot-20.html?page=17"
retrieved_at: 2026-05-26T22:42:47.818Z
last_checked_at: 2026-06-02T07:36:17.290Z
generated_at: 2026-06-02T07:36:17.290Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Telnet ASCII API via Quick-Connect USB Ethernet port referenced in recovery notes but not present in this refined source"
  - "AMX/Crestron module strings / get-set wrappers not present in this refined source"
  - "no unsolicited notification behavior is described in the"
  - "no multi-step sequences (e.g. power-on choreography, preset"
  - "refined source contains no safety warnings, interlock"
  - "firmware version compatibility range not stated in source."
  - "VISCA ACK/completion packet shape (y0 4x FF) not enumerated in source; only the data-response packets (y0 50 ... FF) are listed."
  - "command timing, debounce, and inter-command delay not stated in source."
  - "RJ-45 to DB-9 cable diagram / null-modem requirement not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T07:36:17.290Z
  matched_actions: 115
  action_count: 115
  confidence: medium
  summary: "All 115 spec action commands matched verbatim against source commands and inquiries; transport parameters verified against source specification. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Vaddio ZoomSHOT 20 Control Spec

## Summary
RS-232 VISCA-like binary control protocol for the Vaddio ZoomSHOT 20 fixed-position HD camera. Source documents a full command set (power, zoom, focus, white balance, gain, exposure, image enhancements, tally, ICR filter) plus a matching inquiry set for state readback over an RJ-45 RS-232 port at 9600/8N1.

<!-- UNRESOLVED: Telnet ASCII API via Quick-Connect USB Ethernet port referenced in recovery notes but not present in this refined source -->
<!-- UNRESOLVED: AMX/Crestron module strings / get-set wrappers not present in this refined source -->

## Transport
```yaml
# RS-232 only per refined source. Telnet ASCII API noted in recovery notes
# is not in the supplied refined document - see UNRESOLVED markers above.
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # inferred from CAM_Power On/Off commands
- levelable   # inferred from Zoom/Focus/Iris/Gain/Aperture/Bright/Shutter direct-set commands
- queryable   # inferred from CAM_*Inq inquiry commands returning state
```

## Actions
```yaml
- id: address_set_broadcast
  label: Address Set (Broadcast, Daisychain)
  kind: action
  command: "88 30 01 FF"
  params: []

- id: if_clear_broadcast
  label: IF Clear (Broadcast)
  kind: action
  command: "88 01 00 01 FF"
  params: []

- id: command_cancel
  label: Command Cancel
  kind: action
  command: "8x 2p FF"
  params:
    - name: p
      type: integer
      description: Socket number (1 or 2)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: power_on
  label: Power On
  kind: action
  command: "8x 01 04 00 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: power_off
  label: Power Off (Standby)
  kind: action
  command: "8x 01 04 00 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: zoom_stop
  label: Zoom Stop
  kind: action
  command: "8x 01 04 07 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: zoom_tele_standard
  label: Zoom Tele (Standard)
  kind: action
  command: "8x 01 04 07 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: zoom_wide_standard
  label: Zoom Wide (Standard)
  kind: action
  command: "8x 01 04 07 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: zoom_tele_variable
  label: Zoom Tele (Variable)
  kind: action
  command: "8x 01 04 07 2p FF"
  params:
    - name: p
      type: integer
      description: Speed (0-7)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: zoom_wide_variable
  label: Zoom Wide (Variable)
  kind: action
  command: "8x 01 04 07 3p FF"
  params:
    - name: p
      type: integer
      description: Speed (0-7)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: zoom_direct
  label: Zoom Direct
  kind: action
  command: "8x 01 04 47 0p 0q 0r 0s FF"
  params:
    - name: pqrs
      type: integer
      description: Zoom position (0x0000-0x071A)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: zoom_direct_variable
  label: Zoom Direct (Variable)
  kind: action
  command: "8x 01 7E 01 4A 0v 0p 0q 0r 0s FF"
  params:
    - name: v
      type: integer
      description: Speed (0-7)
    - name: pqrs
      type: integer
      description: Zoom position (0x0000-0x071A)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: focus_stop
  label: Focus Stop
  kind: action
  command: "8x 01 04 08 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: focus_far_standard
  label: Focus Far (Standard)
  kind: action
  command: "8x 01 04 08 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: focus_near_standard
  label: Focus Near (Standard)
  kind: action
  command: "8x 01 04 08 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: focus_far_variable
  label: Focus Far (Variable)
  kind: action
  command: "8x 01 04 08 2p FF"
  params:
    - name: p
      type: integer
      description: Speed (0-7)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: focus_near_variable
  label: Focus Near (Variable)
  kind: action
  command: "8x 01 04 08 3p FF"
  params:
    - name: p
      type: integer
      description: Speed (0-7)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: autofocus_on
  label: AutoFocus On
  kind: action
  command: "8x 01 04 38 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: manualfocus_on
  label: ManualFocus On
  kind: action
  command: "8x 01 04 38 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: focus_auto_manual_toggle
  label: Focus Auto/Manual Toggle
  kind: action
  command: "8x 01 04 38 10 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: focus_direct
  label: Focus Direct
  kind: action
  command: "8x 01 04 48 0p 0q 0r 0s FF"
  params:
    - name: pqrs
      type: integer
      description: Focus position (0x0ED-0x0944, dependent on zoom position)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: wb_auto
  label: White Balance Auto
  kind: action
  command: "8x 01 04 35 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: wb_manual
  label: White Balance Manual
  kind: action
  command: "8x 01 04 35 05 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: wb_indoor
  label: White Balance Indoor
  kind: action
  command: "8x 01 04 35 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: wb_outdoor
  label: White Balance Outdoor
  kind: action
  command: "8x 01 04 35 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: wb_one_push
  label: White Balance One Push
  kind: action
  command: "8x 01 04 35 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: rgain_reset
  label: Red Gain Reset
  kind: action
  command: "8x 01 04 03 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: rgain_up
  label: Red Gain Up
  kind: action
  command: "8x 01 04 03 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: rgain_down
  label: Red Gain Down
  kind: action
  command: "8x 01 04 03 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: rgain_direct
  label: Red Gain Direct
  kind: action
  command: "8x 01 04 43 0p 0q 0r 0s FF"
  params:
    - name: pqrs
      type: integer
      description: Gain value (0x0000-0xFFFF)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: bgain_reset
  label: Blue Gain Reset
  kind: action
  command: "8x 01 04 04 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: bgain_up
  label: Blue Gain Up
  kind: action
  command: "8x 01 04 04 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: bgain_down
  label: Blue Gain Down
  kind: action
  command: "8x 01 04 04 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: bgain_direct
  label: Blue Gain Direct
  kind: action
  command: "8x 01 04 44 43 0p 0q 0r 0s FF"
  params:
    - name: pqrs
      type: integer
      description: Gain value (0x0000-0xFFFF)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: ae_full_auto
  label: Auto Exposure Full Auto
  kind: action
  command: "8x 01 04 39 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: ae_manual
  label: Auto Exposure Manual
  kind: action
  command: "8x 01 04 39 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: ae_shutter_priority
  label: Auto Exposure Shutter Priority
  kind: action
  command: "8x 01 04 39 0A FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: ae_iris_priority
  label: Auto Exposure Iris Priority (default)
  kind: action
  command: "8x 01 04 39 0B FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: iris_reset
  label: Iris Reset
  kind: action
  command: "8x 01 04 0B 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: iris_up
  label: Iris Up
  kind: action
  command: "8x 01 04 0B 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: iris_down
  label: Iris Down
  kind: action
  command: "8x 01 04 0B 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: iris_direct
  label: Iris Direct
  kind: action
  command: "8x 01 04 4B 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: Iris value (0x00-0x08)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: gain_reset
  label: Gain Reset
  kind: action
  command: "8x 01 04 0C 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: gain_up
  label: Gain Up
  kind: action
  command: "8x 01 04 0C 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: gain_down
  label: Gain Down
  kind: action
  command: "8x 01 04 0C 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: gain_direct
  label: Gain Direct
  kind: action
  command: "8x 01 04 4C 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: Gain value (0x00-0x2A)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: bright_reset
  label: Brightness Reset
  kind: action
  command: "8x 01 04 0D 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: bright_up
  label: Brightness Up
  kind: action
  command: "8x 01 04 0D 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: bright_down
  label: Brightness Down
  kind: action
  command: "8x 01 04 0D 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: bright_direct
  label: Brightness Direct
  kind: action
  command: "8x 01 04 4D 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: Brightness value (0x01-0x64)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: backlight_on
  label: Backlight On
  kind: action
  command: "8x 01 04 33 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: backlight_off
  label: Backlight Off
  kind: action
  command: "8x 01 04 33 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: aperture_reset
  label: Aperture Reset
  kind: action
  command: "8x 01 04 02 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: aperture_up
  label: Aperture Up
  kind: action
  command: "8x 01 04 02 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: aperture_down
  label: Aperture Down
  kind: action
  command: "8x 01 04 02 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: aperture_direct
  label: Aperture Direct
  kind: action
  command: "8x 01 04 42 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: Aperture value (0x00-0x1F)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: memory_reset
  label: Memory Reset (preset clear)
  kind: action
  command: "8x 01 04 3F 00 0p FF"
  params:
    - name: p
      type: integer
      description: Memory number (0-0xF)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: memory_set
  label: Memory Set (store preset)
  kind: action
  command: "8x 01 04 3F 01 0p FF"
  params:
    - name: p
      type: integer
      description: Memory number (0-0xF)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: memory_recall
  label: Memory Recall (preset)
  kind: action
  command: "8x 01 04 3F 02 0p FF"
  params:
    - name: p
      type: integer
      description: Memory number (0-0xF)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: id_write
  label: Camera ID Write
  kind: action
  command: "8x 01 04 22 0p 0q 0r 0s FF"
  params:
    - name: pqrs
      type: integer
      description: ID value (0x0000-0xFFFF)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: lr_reverse_on
  label: Mirror (Horizontal) On
  kind: action
  command: "8x 01 04 61 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: lr_reverse_off
  label: Mirror (Horizontal) Off
  kind: action
  command: "8x 01 04 61 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: ir_receive_on
  label: IR Receive / Forwarding On
  kind: action
  command: "8x 01 06 08 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: ir_receive_off
  label: IR Receive / Forwarding Off
  kind: action
  command: "8x 01 06 08 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: ir_receive_toggle
  label: IR Receive On/Off (Toggle)
  kind: action
  command: "8x 01 06 08 10 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: tally_on
  label: Tally On
  kind: action
  command: "8x 01 7E 01 0A 00 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: tally_off
  label: Tally Off
  kind: action
  command: "8x 01 7E 01 0A 00 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: gamma_set
  label: Gamma Set
  kind: action
  command: "8x 01 7E 54 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: Gamma value (0x00-0x10)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: chroma_set
  label: Chroma Set
  kind: action
  command: "8x 01 7E 55 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: Chroma value (0x00-0x64)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: dis_on
  label: Digital Image Stabilizer On
  kind: action
  command: "8x 01 7E 57 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: dis_off
  label: Digital Image Stabilizer Off
  kind: action
  command: "8x 01 7E 57 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: snr_on
  label: Super Noise Reduction On
  kind: action
  command: "8x 01 7E 58 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: snr_off
  label: Super Noise Reduction Off
  kind: action
  command: "8x 01 7E 58 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: agc_off
  label: AGC Off
  kind: action
  command: "8x 01 7E 59 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: agc_low
  label: AGC Low
  kind: action
  command: "8x 01 7E 59 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: agc_medium
  label: AGC Medium
  kind: action
  command: "8x 01 7E 59 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: agc_high
  label: AGC High
  kind: action
  command: "8x 01 7E 59 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: shutter_reset
  label: Shutter Reset
  kind: action
  command: "8x 01 04 0A 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: shutter_up
  label: Shutter Up
  kind: action
  command: "8x 01 04 0A 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: shutter_down
  label: Shutter Down
  kind: action
  command: "8x 01 04 0A 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: shutter_direct
  label: Shutter Direct
  kind: action
  command: "8x 01 04 4A 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: Shutter value (0x00-0x1C)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: expcomp_on
  label: Exposure Compensation On (AutoExposure Off)
  kind: action
  command: "8x 01 04 3E 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: expcomp_off
  label: Exposure Compensation Off (AutoExposure On)
  kind: action
  command: "8x 01 04 3E 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: expcomp_reset
  label: Exposure Compensation Reset
  kind: action
  command: "8x 01 04 0E 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: expcomp_up
  label: Exposure Compensation Up
  kind: action
  command: "8x 01 04 0E 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: expcomp_down
  label: Exposure Compensation Down
  kind: action
  command: "8x 01 04 0E 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: expcomp_direct
  label: Exposure Compensation Direct
  kind: action
  command: "8x 01 04 4E 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: Exposure compensation value (0x00-0x2A)
    - name: x
      type: integer
      description: Camera address (1-7)

- id: icr_on
  label: ICR Cut Filter Out (Day mode)
  kind: action
  command: "8x 01 04 01 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: icr_off
  label: ICR Cut Filter In (Night mode)
  kind: action
  command: "8x 01 04 01 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: power_inq
  label: Power State Query
  kind: query
  command: "8x 09 04 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: zoom_pos_inq
  label: Zoom Position Query
  kind: query
  command: "8x 09 04 47 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: focus_pos_inq
  label: Focus Position Query
  kind: query
  command: "8x 09 04 48 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: wb_mode_inq
  label: White Balance Mode Query
  kind: query
  command: "8x 09 04 35 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: rgain_inq
  label: Red Gain Query
  kind: query
  command: "8x 09 04 43 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: bgain_inq
  label: Blue Gain Query
  kind: query
  command: "8x 09 04 44 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: iris_inq
  label: Iris Query
  kind: query
  command: "8x 09 04 4B FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: gain_inq
  label: Gain Query
  kind: query
  command: "8x 09 04 4C FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: bright_inq
  label: Brightness Query
  kind: query
  command: "8x 01 04 4D FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: backlight_mode_inq
  label: Backlight Mode Query
  kind: query
  command: "8x 09 04 33 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: aperture_inq
  label: Aperture Query
  kind: query
  command: "8x 09 04 42 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: memory_inq
  label: Memory Preset Query
  kind: query
  command: "8x 09 04 3F FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: id_inq
  label: Camera ID Query
  kind: query
  command: "8x 09 04 3F FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: receive_inq
  label: IR Receive State Query
  kind: query
  command: "8x 09 06 08 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: lr_reverse_inq
  label: Mirror (Horizontal) State Query
  kind: query
  command: "8x 09 04 61 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: tally_inq
  label: Tally State Query
  kind: query
  command: "8x 09 7E 01 0A FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: gamma_inq
  label: Gamma Query
  kind: query
  command: "8x 09 7E 54 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: chroma_inq
  label: Chroma Query
  kind: query
  command: "8x 09 7E 55 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: dis_inq
  label: Digital Image Stabilizer Query
  kind: query
  command: "8x 09 7E 57 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: snr_inq
  label: Super Noise Reduction Query
  kind: query
  command: "8x 09 7E 58 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: agc_inq
  label: AGC Mode Query
  kind: query
  command: "8x 09 7e 59 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: ae_mode_inq
  label: Auto Exposure Mode Query
  kind: query
  command: "8x 09 04 39 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: shutter_pos_inq
  label: Shutter Position Query
  kind: query
  command: "8x 09 04 4A FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: expcomp_mode_inq
  label: Exposure Compensation Mode Query
  kind: query
  command: "8x 09 04 3E FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: expcomp_pos_inq
  label: Exposure Compensation Position Query
  kind: query
  command: "8x 09 04 4E FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: icr_mode_inq
  label: ICR Mode Query
  kind: query
  command: "8x 09 04 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
  # y0 50 02 FF = On, y0 50 03 FF = Off (Standby) - per CAM_PowerInq response

- id: zoom_position
  type: integer
  range: [0, 1818]  # 0x0000-0x071A from CAM_ZoomPosInq response
  # Response: y0 50 0p 0q 0r 0s FF

- id: focus_position
  type: integer
  range: [237, 2372]  # 0x0ED-0x0944 from CAM_FocusPosInq response; dependent on zoom
  # Response: y0 50 0p 0q 0r 0s FF

- id: wb_mode
  type: enum
  values: [auto, manual, indoor, outdoor, one_push]
  # y0 50 00=Auto, 05=Manual, 01=Indoor, 02=Outdoor, 03=One Push WB

- id: rgain
  type: integer
  range: [0, 65535]  # 0x0000-0xFFFF from CAM_RGainInq response

- id: bgain
  type: integer
  range: [0, 65535]  # 0x0000-0xFFFF from CAM_BGainInq response

- id: iris
  type: integer
  range: [0, 8]  # 0x00-0x08 from CAM_IrisInq response

- id: gain
  type: integer
  range: [0, 42]  # 0x00-0x2A from CAM_GainInq response

- id: bright
  type: integer
  range: [1, 100]  # 0x01-0x64 from CAM_BrightInq response

- id: backlight_mode
  type: enum
  values: [on, off]
  # y0 50 02 FF = On, y0 50 03 FF = Off - per CAM_BacklightModeInq response

- id: aperture
  type: integer
  range: [0, 31]  # 0x00-0x1F from CAM_ApertureInq response

- id: memory_preset
  type: integer
  range: [0, 15]  # 0x0-0xF from CAM_MemoryInq response

- id: camera_id
  type: integer
  range: [0, 65535]  # 0x0000-0xFFFF from CAM_IDInq response

- id: ir_receive_state
  type: enum
  values: [on, off]
  # y0 50 02 FF = On, y0 50 03 FF = Off - per CAM_ReceiveInq response

- id: lr_reverse_state
  type: enum
  values: [on, off]
  # y0 50 02 FF = On, y0 50 03 FF = Off - per CAM_LR_Reverse inquiry

- id: tally_state
  type: enum
  values: [on, off]
  # y0 50 02 FF = On, y0 50 03 FF = Off - per TallyInq response

- id: gamma
  type: integer
  range: [0, 16]  # 0x00-0x10 from GMA.Enhance inquiry response

- id: chroma
  type: integer
  range: [0, 100]  # 0x00-0x64 from CRM.Enhance inquiry response

- id: dis_state
  type: enum
  values: [on, off]
  # y0 50 02 FF = On, y0 50 03 FF = Off - per DIS.Enhance inquiry

- id: snr_state
  type: enum
  values: [on, off]
  # y0 50 02 FF = On, y0 50 03 FF = Off - per SNR.Enhance inquiry

- id: agc_mode
  type: enum
  values: [off, low, medium, high, manual]
  # y0 50 00=Off, 01=Low, 02=Medium, 03=High, 04=Manual AGC - per AGC.Enhance inquiry

- id: ae_mode
  type: enum
  values: [full_auto, manual, shutter_priority, iris_priority]
  # y0 50 00=Full Auto, 03=Manual, 0A=Shutter Priority, 0B=Iris/Exposure Priority

- id: shutter_position
  type: integer
  range: [0, 28]  # 0x00-0x1C from CAM_ShutterPosInq response

- id: expcomp_mode
  type: enum
  values: [on_ae_off, off_ae_on]
  # y0 50 02 FF = On (AE Mode Off), y0 50 03 FF = Off (AE Mode On)

- id: expcomp_position
  type: integer
  range: [0, 42]  # 0x00-0x2A from CAM_ExpCompPosInq response

- id: icr_mode
  type: enum
  values: [on_filter_out, off_filter_in]
  # y0 50 02 FF = On (filter out, day mode), y0 50 03 FF = Off (filter in, night mode)
```

## Variables
```yaml
# Continuous settable parameters that have a range and an associated
# direct-set command in the source. Range values come from the same
# "Comments" column that limits the direct-set hex payload.
- id: zoom_position
  type: integer
  range: [0, 1818]  # 0x0000-0x071A
  set_command: "8x 01 04 47 0p 0q 0r 0s FF"

- id: focus_position
  type: integer
  range: [237, 2372]  # 0x0ED-0x0944; valid range is zoom-position dependent
  set_command: "8x 01 04 48 0p 0q 0r 0s FF"

- id: rgain
  type: integer
  range: [0, 65535]
  set_command: "8x 01 04 43 0p 0q 0r 0s FF"

- id: bgain
  type: integer
  range: [0, 65535]
  set_command: "8x 01 04 44 43 0p 0q 0r 0s FF"

- id: iris
  type: integer
  range: [0, 8]
  set_command: "8x 01 04 4B 00 00 0p 0q FF"

- id: gain
  type: integer
  range: [0, 42]
  set_command: "8x 01 04 4C 00 00 0p 0q FF"

- id: bright
  type: integer
  range: [1, 100]
  set_command: "8x 01 04 4D 00 00 0p 0q FF"

- id: aperture
  type: integer
  range: [0, 31]
  set_command: "8x 01 04 42 00 00 0p 0q FF"

- id: gamma
  type: integer
  range: [0, 16]
  set_command: "8x 01 7E 54 00 00 0p 0q FF"

- id: chroma
  type: integer
  range: [0, 100]
  set_command: "8x 01 7E 55 00 00 0p 0q FF"

- id: shutter
  type: integer
  range: [0, 28]
  set_command: "8x 01 04 4A 00 00 0p 0q FF"

- id: expcomp
  type: integer
  range: [0, 42]
  set_command: "8x 01 04 4E 00 00 0p 0q FF"

- id: memory_preset
  type: integer
  range: [0, 15]
  set_command: "8x 01 04 3F 01 0p FF"
  # Also recall: 8x 01 04 3F 02 0p FF; clear: 8x 01 04 3F 00 0p FF

- id: camera_id
  type: integer
  range: [0, 65535]
  set_command: "8x 01 04 22 0p 0q 0r 0s FF"

- id: zoom_speed
  type: integer
  range: [0, 7]
  set_command: "8x 01 7E 01 4A 0v 0p 0q 0r 0s FF"
  # Speed parameter v for the variable-speed direct zoom command only.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification behavior is described in the
# refined source. VISCA-style completion/ACK packets (y0 50 ... FF) are
# the response to a command or inquiry, not a push event.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences (e.g. power-on choreography, preset
# recall chains) are described in the refined source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: refined source contains no safety warnings, interlock
# procedures, or power-on sequencing requirements.
```

## Notes
- The "x" in every command packet is the camera address (1-7). The "y" in inquiry response packets is the response socket indicator (per VISCA convention); the refined source shows y0 as a fixed prefix in response listings.
- The `8x 09 04 3F FF` inquiry opcode is shared by both `CAM_MemoryInq` and `CAM_IDInq` as printed in the source — both listings were captured verbatim, but a real device distinguishes the two responses only by context.
- `CAM_Bright` inquiry packet is shown as `8x 01 04 4D FF` in the source's inquiry table (rather than the `09` inquiry byte used by every other query). Captured verbatim.
- HD output resolution is selected via a hardware rotary switch (positions 0-F map to a fixed resolution table in the source) and is not controllable via serial.
- A hardware DIP switch block selects IR routing (IR1/IR2/IR3), IR enable, and a Normal / Image-Flip mode; these are not serial-controllable.
- "All Down" DIP position plus a power cycle resets the device to defaults.
- Refined source warns: "similar to, but not identical to, Sony VISCA … not all VISCA commands are supported."
- Recovery notes mention a Telnet ASCII API exposed over the Quick-Connect USB Ethernet port of the QC-USB variant, but the supplied refined document contains only the binary RS-232 protocol. Treat the Telnet surface as an open question for a follow-up refinement pass.

<!-- UNRESOLVED: firmware version compatibility range not stated in source. -->
<!-- UNRESOLVED: VISCA ACK/completion packet shape (y0 4x FF) not enumerated in source; only the data-response packets (y0 50 ... FF) are listed. -->
<!-- UNRESOLVED: command timing, debounce, and inter-command delay not stated in source. -->
<!-- UNRESOLVED: RJ-45 to DB-9 cable diagram / null-modem requirement not stated in source. -->

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
  - fullcompass.com
  - manua.ls
  - manualslib.com
source_urls:
  - https://res.cloudinary.com/avd/image/upload/v134228628/Resources/Vaddio/Cameras/Operation/342-0962-reva-zoomshot-for-avbmp-manual.pdf
  - https://www.fullcompass.com/common/files/28647-VaddioZoomSHOT20Manual.pdf
  - https://www.manua.ls/vaddio/zoomshot-20-qusb/manual
  - https://www.fullcompass.com/common/files/36364-RoboSHOTHDBTCompleteManual.pdf
  - "https://www.manualslib.com/manual/975248/Vaddio-Zoomshot-20.html?page=17"
retrieved_at: 2026-05-26T22:42:47.818Z
last_checked_at: 2026-06-02T07:36:17.290Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:36:17.290Z
matched_actions: 115
action_count: 115
confidence: medium
summary: "All 115 spec action commands matched verbatim against source commands and inquiries; transport parameters verified against source specification. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Telnet ASCII API via Quick-Connect USB Ethernet port referenced in recovery notes but not present in this refined source"
- "AMX/Crestron module strings / get-set wrappers not present in this refined source"
- "no unsolicited notification behavior is described in the"
- "no multi-step sequences (e.g. power-on choreography, preset"
- "refined source contains no safety warnings, interlock"
- "firmware version compatibility range not stated in source."
- "VISCA ACK/completion packet shape (y0 4x FF) not enumerated in source; only the data-response packets (y0 50 ... FF) are listed."
- "command timing, debounce, and inter-command delay not stated in source."
- "RJ-45 to DB-9 cable diagram / null-modem requirement not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
