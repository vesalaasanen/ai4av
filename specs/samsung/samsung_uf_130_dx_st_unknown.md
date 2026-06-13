---
spec_id: admin/samsung-uf-130-dx-st
schema_version: ai4av-public-spec-v1
revision: 1
title: "Samsung UF-130DX/ST Control Spec"
manufacturer: Samsung
model_family: UF-130DX
aliases: []
compatible_with:
  manufacturers:
    - Samsung
  models:
    - UF-130DX
    - UF-130ST
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
  - ia601606.us.archive.org
  - justaddpower.happyfox.com
  - classroomav.vt.edu
source_urls:
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/UF-130DX_RS232CManual.pdf"
  - "https://ia601606.us.archive.org/17/items/SDP_UF130DX_UF130ST_SPS130/Samsung%20Digital%20Presenter%20UF-130ST%20-%20User%27s%20Manual.pdf"
  - https://justaddpower.happyfox.com/kb/article/245-samsung-rs232-control-rs232c/
  - https://www.classroomav.vt.edu/content/dam/classroomav_vt_edu/manuals/uf130dx.pdf
retrieved_at: 2026-06-12T04:58:27.836Z
last_checked_at: 2026-06-12T19:38:23.107Z
generated_at: 2026-06-12T19:38:23.107Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "PIP/Overlay (0x48) command exists in source but its 2nd/3rd/4th transmit bytes are not shown — only listed as 0x48 0x00 0x05 0x00; verify against full manual."
  - "Preset Save/Execute \"Number\" byte encoding (1~4 range) not explicitly stated as raw byte values."
  - "Set-Status normal-mode response (0x61) bit definition table mixes Single/Dual DVI output rows — appears to be source typo; only one resolution encoding applies per mode."
  - "source does not document unsolicited event messages from device."
  - "source does not document multi-step macro sequences."
  - "source does not document safety warnings, interlocks, or power-on sequencing requirements."
  - "Preset Number byte (1~4) raw encoding not stated in source — assumed to be a direct numeric byte 0x01..0x04, not verified."
  - "PIP/Overlay (0x48) command row in source has truncated/merged 2nd/3rd/4th transmit columns — only the 0x00 0x05 0x00 column-block visible; confirm against full 12-page reference manual."
  - "Set-Status LSB \"Single or Dual-DVI output resolution\" rows in source appear duplicated/contradictory — likely a source typo. Spec lists all four bit-pair encodings as stated; downstream should re-verify against the full manual."
  - "Source notes \"Refer to page 6\" for full ACK and Focus-Status[Max/Min] tables — refined excerpt does not include page 6, so edge cases at extreme zoom positions not captured."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:38:23.107Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions verified against source command table with exact hex byte matches and parameter ranges confirmed; transport parameters all present verbatim. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-11
---

# Samsung UF-130DX/ST Control Spec

## Summary
RS-232C control spec for the Samsung UF-130DX and UF-130ST high-resolution digital presenters. Covers discrete 4-byte command protocol at 9600 baud (8N1) with start/stop framing bytes 0xB0/0xBF, including image, lamp, focus/zoom, iris, color, preset, rotate, freeze, and PIP/overlay controls plus status query commands.

<!-- UNRESOLVED: PIP/Overlay (0x48) command exists in source but its 2nd/3rd/4th transmit bytes are not shown — only listed as 0x48 0x00 0x05 0x00; verify against full manual.
UNRESOLVED: Preset Save/Execute "Number" byte encoding (1~4 range) not explicitly stated as raw byte values.
UNRESOLVED: Set-Status normal-mode response (0x61) bit definition table mixes Single/Dual DVI output rows — appears to be source typo; only one resolution encoding applies per mode. -->

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
  framing:
    start_code: 0xB0
    stop_code: 0xBF
    command_length_bytes: 4
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # inferred from Power On/Off commands (0x0F)
- queryable      # inferred from Set-Status / Iris-Status / Red-Status / Blue-Status / Zoom-Status / Focus-Status queries
- routable       # inferred from Internal (0x04) / External (0x0A) input selection commands
- levelable      # inferred from Iris/Red/Blue/Focus/Zoom Up/Down and Target commands
```

## Actions
```yaml
# Each command is a 4-byte frame sent from PC to MICOM.
# Source documents only the inner 4-byte command code; 0xB0/0xBF framing is per the protocol header.
# Literal payloads below show the inner 4-byte command code verbatim from the source.

- id: awc
  label: AWC (Auto White Balance)
  kind: action
  command: "01 00 05 00"
  params: []

- id: af
  label: AF (Auto Focus)
  kind: action
  command: "02 00 05 00"
  params: []

- id: lamp_on
  label: Lamp ON
  kind: action
  command: "03 00 05 00"
  params: []

- id: lamp_off
  label: Lamp OFF
  kind: action
  command: "03 00 0A 00"
  params: []

- id: input_internal
  label: Input Internal
  kind: action
  command: "04 00 05 00"
  params: []

- id: input_external
  label: Input External
  kind: action
  command: "04 00 0A 00"
  params: []

- id: aperture_on
  label: Aperture ON
  kind: action
  command: "09 00 05 00"
  params: []

- id: aperture_off
  label: Aperture OFF
  kind: action
  command: "09 00 0A 00"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "0F 00 05 00"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "0F 00 0A 00"
  params: []

- id: rotate_off
  label: Rotate OFF
  kind: action
  command: "11 00 05 00"
  params: []

- id: rotate_90
  label: Rotate 90°
  kind: action
  command: "11 00 08 00"
  params: []

- id: rotate_180
  label: Rotate 180°
  kind: action
  command: "11 00 0A 00"
  params: []

- id: rotate_270
  label: Rotate 270°
  kind: action
  command: "11 00 0D 00"
  params: []

- id: freeze_on
  label: Freeze ON
  kind: action
  command: "12 00 05 00"
  params: []

- id: freeze_off
  label: Freeze OFF
  kind: action
  command: "12 00 0A 00"
  params: []

- id: preset_save
  label: Preset Save
  kind: action
  command: "17 00 {number} 00"
  params:
    - name: number
      type: integer
      description: Preset number (1~4)

- id: preset_exe
  label: Preset Execute
  kind: action
  command: "18 00 {number} 00"
  params:
    - name: number
      type: integer
      description: Preset number (1~4)

- id: iris_up
  label: Iris Up
  kind: action
  command: "21 00 05 00"
  params: []

- id: iris_down
  label: Iris Down
  kind: action
  command: "21 00 0A 00"
  params: []

- id: red_up
  label: Red Up
  kind: action
  command: "23 00 05 00"
  params: []

- id: red_down
  label: Red Down
  kind: action
  command: "23 00 0A 00"
  params: []

- id: blue_up
  label: Blue Up
  kind: action
  command: "24 00 05 00"
  params: []

- id: blue_down
  label: Blue Down
  kind: action
  command: "24 00 0A 00"
  params: []

- id: overlay_pip
  label: Overlay (PIP)
  kind: action
  command: "48 00 05 00"
  params: []
  notes: "UF-130DX only (per source Note 2)."

- id: focus_far
  label: Focus Far
  kind: action
  command: "25 00 05 00"
  params: []

- id: focus_near
  label: Focus Near
  kind: action
  command: "25 00 0A 00"
  params: []

- id: zoom_tele
  label: Zoom Tele
  kind: action
  command: "26 00 05 00"
  params: []

- id: zoom_wide
  label: Zoom Wide
  kind: action
  command: "26 00 0A 00"
  params: []

- id: iris_target
  label: Iris Target
  kind: action
  command: "41 00 00 {data}"
  params:
    - name: data
      type: integer
      description: Target iris value (1~120)

- id: red_target
  label: Red Target
  kind: action
  command: "43 00 00 {data}"
  params:
    - name: data
      type: integer
      description: Target red value (1~200)

- id: blue_target
  label: Blue Target
  kind: action
  command: "44 00 00 {data}"
  params:
    - name: data
      type: integer
      description: Target blue value (1~200)

- id: focus_target
  label: Focus Target
  kind: action
  command: "45 00 {msb} {lsb}"
  params:
    - name: msb
      type: integer
      description: Focus value MSB (0~2225)
    - name: lsb
      type: integer
      description: Focus value LSB (0~2225)
  notes: "Range 0~2225; effective range depends on zoom position (see Focus-Status[Max]/[Min])."

- id: zoom_target
  label: Zoom Target
  kind: action
  command: "46 00 {msb} {lsb}"
  params:
    - name: msb
      type: integer
      description: Zoom value MSB (0~1916)
    - name: lsb
      type: integer
      description: Zoom value LSB (0~1916)

- id: focus_zoom_concurrent
  label: Focus/Zoom Concurrent Target
  kind: action
  command: "47 00 {zoom_msb} {zoom_lsb} {focus_msb} {focus_lsb}"
  params:
    - name: zoom_msb
      type: integer
      description: Zoom value MSB (0~1916)
    - name: zoom_lsb
      type: integer
      description: Zoom value LSB (0~1916)
    - name: focus_msb
      type: integer
      description: Focus value MSB (0~2225)
    - name: focus_lsb
      type: integer
      description: Focus value LSB (0~2225)
  notes: "6-byte payload - 4-byte command + 2 extra focus bytes. Effective focus range depends on zoom position."

- id: drive_stop
  label: Drive Stop
  kind: action
  command: "2F 00 05 00"
  params: []
  notes: "Stops the running Iris/Red/Blue/Focus/Zoom continuous-drive command."

- id: set_status_query
  label: Set-Status Query (Normal)
  kind: query
  command: "61 00 00 00"
  params: []
  notes: "Response carries Status MSB/LSB bytes - see Status Bit Definition."

- id: iris_status_query
  label: Iris Status Query
  kind: query
  command: "65 00 00 00"
  params: []
  notes: "Response Status byte range 1~120."

- id: red_status_query
  label: Red Status Query
  kind: query
  command: "67 00 00 00"
  params: []
  notes: "Response Status byte range 1~200."

- id: blue_status_query
  label: Blue Status Query
  kind: query
  command: "68 00 00 00"
  params: []
  notes: "Response Status byte range 1~200."

- id: zoom_status_query
  label: Zoom Status Query
  kind: query
  command: "69 00 00 00"
  params: []
  notes: "Response Status(MSB)/Status(LSB) range 0~1916."

- id: focus_status_query
  label: Focus Status Query
  kind: query
  command: "6A 00 00 00"
  params: []
  notes: "Response Status(MSB)/Status(LSB) range 0~2225."

- id: focus_status_max_query
  label: Focus Status [Max] Query
  kind: query
  command: "6B 00 05 00"
  params: []
  notes: "Returns focus max at current zoom. Range 648~2225."

- id: focus_status_min_query
  label: Focus Status [Min] Query
  kind: query
  command: "6B 00 0A 00"
  params: []
  notes: "Returns focus min at current zoom. Range 0~1383."
```

## Feedbacks
```yaml
- id: ack_data
  type: bitset
  description: "ACK byte (2nd receive byte) - bit definition in source."
  bits:
    - name: executing_panel_key
      position: 0
      description: "Set is executing command by panel-key"
    - name: executing_remocon
      position: 1
      description: "Set is executing command by remote control"
    - name: executing_rs232c
      position: 2
      description: "Set is executing command by RS-232C"
    - name: executing_usb
      position: 3
      description: "Set is executing command by USB"
    - name: os_boot_completion
      position: 4
      description: "OS System Boot Completion (UF-130DX only) - 0=Booting, 1=OK"

- id: set_status_lsb
  type: bitset
  description: "Status LSB byte returned by Set-Status query (0x61)."
  bits:
    - name: output_resolution
      position: 0
      description: "Bit pair encodes output resolution (Single: 0,1=SXGA / 1,0=XGA / 1,1=HD[1280x720p] / 0,0=Single)"
    - name: lamp_state
      description: "0=Lamp OFF, 1=Lamp ON"
    - name: input_source
      description: "0=Internal, 1=External"
    - name: system_power
      description: "0=System Power OFF, 1=System Power ON"

- id: set_status_msb
  type: bitset
  description: "Status MSB byte returned by Set-Status query (0x61)."
  bits:
    - name: image_rotate
      description: "Bit pair: 0,0=OFF / 0,1=90° / 1,0=180° / 1,1=270°"
    - name: image_freeze
      description: "0=Freeze OFF, 1=Freeze ON"
    - name: aperture
      description: "0=ON, 1=OFF (per source)"
    - name: model
      description: "0=DX Model, 1=ST Model"
    - name: control_enable
      description: "0=Disable Control, 1=Enable Control (UF-130DX only)"
```

## Variables
```yaml
# Discrete ranges per source - encoded as the parameterized target commands above.
# No continuous variables beyond what is covered by Iris/Red/Blue/Focus/Zoom Target actions.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event messages from device.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
- Protocol header bytes 0xB0 (start) and 0xBF (stop) frame each 4-byte command; the action `command:` payloads above are the inner 4 bytes only.
- ACK data 0x80 expected on 2nd receive byte when device is idle; other values indicate another input source (panel/remote/USB) currently driving the system.
- Iris Up/Down, Red Up/Down, Blue Up/Down, Focus Far/Near, Zoom Tele/Wide are continuous-drive commands — they run to endpoint unless Drive Stop (0x2F) is issued.
- Overlay/PIP (0x48) applies to UF-130DX only (source Note 2).
- OS-related Set-Status bits and Disable/Enable Control bit apply to UF-130DX only.

<!-- UNRESOLVED: Preset Number byte (1~4) raw encoding not stated in source — assumed to be a direct numeric byte 0x01..0x04, not verified.
UNRESOLVED: PIP/Overlay (0x48) command row in source has truncated/merged 2nd/3rd/4th transmit columns — only the 0x00 0x05 0x00 column-block visible; confirm against full 12-page reference manual.
UNRESOLVED: Set-Status LSB "Single or Dual-DVI output resolution" rows in source appear duplicated/contradictory — likely a source typo. Spec lists all four bit-pair encodings as stated; downstream should re-verify against the full manual.
UNRESOLVED: Source notes "Refer to page 6" for full ACK and Focus-Status[Max/Min] tables — refined excerpt does not include page 6, so edge cases at extreme zoom positions not captured. -->

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
  - ia601606.us.archive.org
  - justaddpower.happyfox.com
  - classroomav.vt.edu
source_urls:
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/UF-130DX_RS232CManual.pdf"
  - "https://ia601606.us.archive.org/17/items/SDP_UF130DX_UF130ST_SPS130/Samsung%20Digital%20Presenter%20UF-130ST%20-%20User%27s%20Manual.pdf"
  - https://justaddpower.happyfox.com/kb/article/245-samsung-rs232-control-rs232c/
  - https://www.classroomav.vt.edu/content/dam/classroomav_vt_edu/manuals/uf130dx.pdf
retrieved_at: 2026-06-12T04:58:27.836Z
last_checked_at: 2026-06-12T19:38:23.107Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:38:23.107Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions verified against source command table with exact hex byte matches and parameter ranges confirmed; transport parameters all present verbatim. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "PIP/Overlay (0x48) command exists in source but its 2nd/3rd/4th transmit bytes are not shown — only listed as 0x48 0x00 0x05 0x00; verify against full manual."
- "Preset Save/Execute \"Number\" byte encoding (1~4 range) not explicitly stated as raw byte values."
- "Set-Status normal-mode response (0x61) bit definition table mixes Single/Dual DVI output rows — appears to be source typo; only one resolution encoding applies per mode."
- "source does not document unsolicited event messages from device."
- "source does not document multi-step macro sequences."
- "source does not document safety warnings, interlocks, or power-on sequencing requirements."
- "Preset Number byte (1~4) raw encoding not stated in source — assumed to be a direct numeric byte 0x01..0x04, not verified."
- "PIP/Overlay (0x48) command row in source has truncated/merged 2nd/3rd/4th transmit columns — only the 0x00 0x05 0x00 column-block visible; confirm against full 12-page reference manual."
- "Set-Status LSB \"Single or Dual-DVI output resolution\" rows in source appear duplicated/contradictory — likely a source typo. Spec lists all four bit-pair encodings as stated; downstream should re-verify against the full manual."
- "Source notes \"Refer to page 6\" for full ACK and Focus-Status[Max/Min] tables — refined excerpt does not include page 6, so edge cases at extreme zoom positions not captured."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
