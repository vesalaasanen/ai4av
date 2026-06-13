---
spec_id: admin/sony-kdl-xbr5-kds-zxbr5
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDL-XBR5 / KDS-ZXBR5 Series RS-232C Control Spec"
manufacturer: Sony
model_family: KDL-40XBR5
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - KDL-40XBR5
    - KDL-46XBR5
    - KDL-52XBR5
    - KDS-Z60XBR5
    - KDS-Z70XBR5
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hf-files-oregon.s3.amazonaws.com
  - support.justaddpower.com
  - pro-bravia.sony.net
  - manualslib.com
source_urls:
  - https://hf-files-oregon.s3.amazonaws.com/hdpjustaddpower_kb_attachments/2016/04-20/ab25a088-38d8-41a8-a136-fabda0005a1e/RS232_XBR5_protocol.pdf
  - https://support.justaddpower.com/kb/article/22-sony-rs232-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://www.manualslib.com/manual/321046/Sony-Bravia-Kdl-40xbr5.html
retrieved_at: 2026-06-11T23:49:10.943Z
last_checked_at: 2026-06-12T19:45:00.990Z
generated_at: 2026-06-12T19:45:00.990Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is partial (truncated mid-table after Screen/Wide / 4:3 Mode entries). Several command categories in the official Sony manual not captured here."
  - "source does not enumerate settable numeric ranges for Direct/UpDown parameters"
  - "source does not document unsolicited notifications from the display."
  - "source does not document multi-step sequences."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:45:00.990Z
  matched_actions: 91
  action_count: 91
  confidence: medium
  summary: "All 91 spec actions matched exactly to function codes 0x00-0x46 in the source table; transport parameters verified; source is truncated but fully represented. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Sony KDL-XBR5 / KDS-ZXBR5 Series RS-232C Control Spec

## Summary
RS-232C control spec for Sony KDL-40XBR5 / KDL-46XBR5 / KDL-52XBR5 LCD TVs and KDS-Z60XBR5 / KDS-Z70XBR5 SXRD projection TVs. Fixed-format binary protocol on D-sub 9-pin serial at 9600 baud, 8N1, no flow control. Commands cover power, input select, channel, volume, picture, sound, geometry, screen and closed-caption.

<!-- UNRESOLVED: source is partial (truncated mid-table after Screen/Wide / 4:3 Mode entries). Several command categories in the official Sony manual not captured here. -->

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
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from Power (0x00) and Standby Command (0x01)
- routable        # inferred from Input Select (0x02) variants
- queryable       # inferred: Control commands return Answer frames with completed/limit/parse state
- levelable       # inferred from Volume (0x05), Treble (0x32), Bass (0x33), Picture (0x23), Brightness (0x24), Color (0x25), Hue (0x26), Sharpness (0x28)
```

## Actions
```yaml
# Protocol frame (host -> display):
#   0x8C | 0x00 | <fn> | <len> | <data...> | <chk>
#   Header=0x8C, Category=0x00 (fixed), Function code, Length (incl. checksum),
#   data bytes, then 1-byte checksum = low 8 bits of sum of bytes 1..N.
# Answer frame (display -> host):
#   0x70 | <answer> | <chk>
#   answer: 0x00 Completed, 0x01 Limit Over (max), 0x02 Limit Over (min),
#           0x03 Command Canceled, 0x04 Parse Error.

- id: power
  label: Power (Function 0x00)
  kind: action
  command: "8C 00 00 02 {byte0} XX"
  params:
    - name: byte0
      type: enum
      values: [off, on]
      # byte0: 0x00 = OFF (always enable), 0x01 = ON (only enable when Standby Command is Enable)
      description: "0x00 OFF, 0x01 ON"

- id: standby_command
  label: Standby Command (Function 0x01)
  kind: action
  command: "8C 00 01 02 {byte0} XX"
  params:
    - name: byte0
      type: enum
      values: [disable, enable]
      description: "0x00 Disable standby, 0x01 Enable standby (required before Power ON is accepted)"

- id: input_select_toggle
  label: Input Select Toggle
  kind: action
  command: "8C 00 02 02 00 XX"
  params: []

- id: input_select_tv
  label: Input Select TV (last channel)
  kind: action
  command: "8C 00 02 02 01 XX"
  params: []

- id: input_select_video
  label: Input Select Video
  kind: action
  command: "8C 00 02 02 02 XX"
  params: []

- id: input_select_video1
  label: Input Select Video #1
  kind: action
  command: "8C 00 02 03 02 01 XX"
  params: []

- id: input_select_video2
  label: Input Select Video #2
  kind: action
  command: "8C 00 02 03 02 02 XX"
  params: []

- id: input_select_video3
  label: Input Select Video #3
  kind: action
  command: "8C 00 02 03 02 03 XX"
  params: []

- id: input_select_component
  label: Input Select Component
  kind: action
  command: "8C 00 02 03 03 XX"
  params: []

- id: input_select_component1
  label: Input Select Component #1
  kind: action
  command: "8C 00 02 03 03 01 XX"
  params: []

- id: input_select_component2
  label: Input Select Component #2
  kind: action
  command: "8C 00 02 03 03 02 XX"
  params: []

- id: input_select_hdmi
  label: Input Select HDMI
  kind: action
  command: "8C 00 02 03 04 XX"
  params: []

- id: input_select_hdmi1
  label: Input Select HDMI #1
  kind: action
  command: "8C 00 02 03 04 01 XX"
  params: []

- id: input_select_hdmi2
  label: Input Select HDMI #2
  kind: action
  command: "8C 00 02 03 04 02 XX"
  params: []

- id: input_select_hdmi3
  label: Input Select HDMI #3
  kind: action
  command: "8C 00 02 03 04 03 XX"
  params: []

- id: input_select_hdmi4
  label: Input Select HDMI #4
  kind: action
  command: "8C 00 02 03 04 04 XX"
  params: []
  notes: "HDMI #4 only available on SXRD models (KDS-Z60XBR5 / KDS-Z70XBR5)."

- id: input_select_pc
  label: Input Select PC
  kind: action
  command: "8C 00 02 03 05 XX"
  params: []

- id: program_select_up
  label: Program Select Up
  kind: action
  command: "8C 00 04 03 00 00 XX"
  params: []

- id: program_select_down
  label: Program Select Down
  kind: action
  command: "8C 00 04 03 00 01 XX"
  params: []

- id: program_select_direct
  label: Program Select Direct (channel number)
  kind: action
  command: "8C 00 04 0D 01 {type} {ch10bytes...} XX"
  params:
    - name: type
      type: enum
      values: [terr_digital, terr_analogue, catv]
      description: "0x01 Terr Digital, 0x02 Terr Analogue, 0x03 CATV"
    - name: ch10bytes
      type: bytes
      description: "10 bytes fixed length; allowed values 0x00-0x09, 0x2C, 0xFF (terminator). In CATV(US), 0x2C acts as '.'. 0xFF-filled channel = last channel."

- id: volume_up
  label: Volume Up
  kind: action
  command: "8C 00 05 03 00 00 XX"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "8C 00 05 03 00 01 XX"
  params: []

- id: volume_direct
  label: Volume Direct
  kind: action
  command: "8C 00 05 03 01 {value} XX"
  params:
    - name: value
      type: integer
      description: "Volume level byte"

- id: audio_muting_toggle
  label: Audio Muting Toggle
  kind: action
  command: "8C 00 06 02 00 XX"
  params: []

- id: audio_muting_off
  label: Audio Muting Off
  kind: action
  command: "8C 00 06 03 01 00 XX"
  params: []

- id: audio_muting_on
  label: Audio Muting On
  kind: action
  command: "8C 00 06 03 01 01 XX"
  params: []

- id: language_english
  label: Language English
  kind: action
  command: "8C 00 07 05 00 65 6E 67 XX"
  params: []

- id: language_french
  label: Language French
  kind: action
  command: "8C 00 07 05 00 66 72 65 XX"
  params: []

- id: language_spanish
  label: Language Spanish
  kind: action
  command: "8C 00 07 05 00 73 70 61 XX"
  params: []

- id: off_timer_toggle
  label: Off Timer (SLEEP) Toggle
  kind: action
  command: "8C 00 0C 02 00 XX"
  params: []

- id: off_timer_direct
  label: Off Timer (SLEEP) Direct
  kind: action
  command: "8C 00 0C 03 01 {offset} XX"
  params:
    - name: offset
      type: enum
      values: [off, 15, 30, 45, 60, 90, 120]
      description: "0x00 OFF, 0x0F 15min, 0x1E 30min, 0x2D 45min, 0x3C 60min, 0x5A 90min, 0x78 120min"

- id: display_toggle
  label: Display (Info) Toggle
  kind: action
  command: "8C 00 0F 02 00 XX"
  params: []

- id: closed_caption_toggle
  label: Closed Caption Toggle
  kind: action
  command: "8C 00 10 02 00 XX"
  params: []

- id: closed_caption_off
  label: Closed Caption Direct Off
  kind: action
  command: "8C 00 10 03 01 00 XX"
  params: []

- id: closed_caption_on
  label: Closed Caption Direct On
  kind: action
  command: "8C 00 10 03 01 01 XX"
  params: []

- id: closed_caption_setting
  label: Closed Caption Direct Setting
  kind: action
  command: "8C 00 10 04 02 {kind} {value} XX"
  params:
    - name: kind
      type: enum
      values: [analog, digital]
      description: "0x00 Analog, 0x01 Digital"
    - name: value
      type: integer
      description: "Analog: 0x01 CC1, 0x02 CC2, 0x03 CC3, 0x04 CC4, 0x05 Text1, 0x06 Text2, 0x07 Text3, 0x08 Text4. Digital: 0x01 Service1, 0x02 Service2, 0x03 Service3, 0x04 Service4, 0x05 Service5, 0x06 Service6, 0x07 CC1, 0x08 CC2, 0x09 CC3, 0x0A CC4."

- id: picture_mode_toggle
  label: Picture Mode Toggle
  kind: action
  command: "8C 00 20 02 00 XX"
  params: []

- id: picture_mode_vivid
  label: Picture Mode Vivid
  kind: action
  command: "8C 00 20 03 01 00 XX"
  params: []

- id: picture_mode_standard
  label: Picture Mode Standard
  kind: action
  command: "8C 00 20 03 01 01 XX"
  params: []

- id: picture_mode_cinema
  label: Picture Mode Cinema
  kind: action
  command: "8C 00 20 03 01 02 XX"
  params: []

- id: picture_mode_custom
  label: Picture Mode Custom
  kind: action
  command: "8C 00 20 03 01 03 XX"
  params: []

- id: cine_motion_off
  label: Cine Motion Off
  kind: action
  command: "8C 00 2A 02 00 XX"
  params: []

- id: cine_motion_auto1
  label: Cine Motion Auto1
  kind: action
  command: "8C 00 2A 02 02 XX"
  params: []

- id: cine_motion_auto2
  label: Cine Motion Auto2
  kind: action
  command: "8C 00 2A 02 03 XX"
  params: []

- id: advanced_iris_min
  label: Advanced Iris Min
  kind: action
  command: "8C 00 2B 02 00 XX"
  params: []
  notes: "Advanced Iris only available on SXRD models (KDS-Z60XBR5 / KDS-Z70XBR5)."

- id: advanced_iris_low
  label: Advanced Iris Low
  kind: action
  command: "8C 00 2B 02 01 XX"
  params: []

- id: advanced_iris_mid
  label: Advanced Iris Mid
  kind: action
  command: "8C 00 2B 02 02 XX"
  params: []

- id: advanced_iris_high
  label: Advanced Iris High
  kind: action
  command: "8C 00 2B 02 03 XX"
  params: []

- id: advanced_iris_max
  label: Advanced Iris Max
  kind: action
  command: "8C 00 2B 02 04 XX"
  params: []

- id: advanced_iris_auto1
  label: Advanced Iris Auto1
  kind: action
  command: "8C 00 2B 02 05 XX"
  params: []

- id: advanced_iris_auto2
  label: Advanced Iris Auto2
  kind: action
  command: "8C 00 2B 02 06 XX"
  params: []

- id: picture_up
  label: Picture Up
  kind: action
  command: "8C 00 23 03 00 00 XX"
  params: []

- id: picture_down
  label: Picture Down
  kind: action
  command: "8C 00 23 03 00 01 XX"
  params: []

- id: picture_direct
  label: Picture Direct
  kind: action
  command: "8C 00 23 03 01 {value} XX"
  params:
    - name: value
      type: integer
      description: "Picture value byte"

- id: brightness_up
  label: Brightness Up
  kind: action
  command: "8C 00 24 03 00 00 XX"
  params: []

- id: brightness_down
  label: Brightness Down
  kind: action
  command: "8C 00 24 03 00 01 XX"
  params: []

- id: brightness_direct
  label: Brightness Direct
  kind: action
  command: "8C 00 24 03 01 {value} XX"
  params:
    - name: value
      type: integer
      description: "Brightness value byte"

- id: color_up
  label: Color Up
  kind: action
  command: "8C 00 25 03 00 00 XX"
  params: []

- id: color_down
  label: Color Down
  kind: action
  command: "8C 00 25 03 00 01 XX"
  params: []

- id: color_direct
  label: Color Direct
  kind: action
  command: "8C 00 25 03 01 {value} XX"
  params:
    - name: value
      type: integer
      description: "Color value byte"

- id: hue_up
  label: Hue Up
  kind: action
  command: "8C 00 26 04 00 00 00 XX"
  params: []

- id: hue_down
  label: Hue Down
  kind: action
  command: "8C 00 26 04 00 01 01 XX"
  params: []

- id: hue_direct_red
  label: Hue Direct (Red)
  kind: action
  command: "8C 00 26 04 01 00 {value} XX"
  params:
    - name: value
      type: integer
      description: "Hue value byte (Red axis)"

- id: hue_direct_green
  label: Hue Direct (Green)
  kind: action
  command: "8C 00 26 04 01 01 {value} XX"
  params:
    - name: value
      type: integer
      description: "Hue value byte (Green axis)"

- id: sharpness_up
  label: Sharpness Up
  kind: action
  command: "8C 00 28 03 00 00 XX"
  params: []

- id: sharpness_down
  label: Sharpness Down
  kind: action
  command: "8C 00 28 03 00 01 XX"
  params: []

- id: sharpness_direct
  label: Sharpness Direct
  kind: action
  command: "8C 00 28 03 01 {value} XX"
  params:
    - name: value
      type: integer
      description: "Sharpness value byte"

- id: sound_mode_toggle
  label: Sound Mode Toggle
  kind: action
  command: "8C 00 30 02 00 XX"
  params: []

- id: sound_mode_dynamic
  label: Sound Mode Dynamic
  kind: action
  command: "8C 00 30 03 01 00 XX"
  params: []

- id: sound_mode_standard
  label: Sound Mode Standard
  kind: action
  command: "8C 00 30 03 01 01 XX"
  params: []

- id: sound_mode_custom
  label: Sound Mode Custom
  kind: action
  command: "8C 00 30 03 01 02 XX"
  params: []

- id: treble_up
  label: Treble Up
  kind: action
  command: "8C 00 32 03 00 00 XX"
  params: []

- id: treble_direct
  label: Treble Direct
  kind: action
  command: "8C 00 32 04 01 00 {value} XX"
  params:
    - name: value
      type: integer
      description: "Treble value byte"

- id: bass_up
  label: Bass Up
  kind: action
  command: "8C 00 33 03 00 00 XX"
  params: []

- id: bass_direct
  label: Bass Direct
  kind: action
  command: "8C 00 33 04 01 00 {value} XX"
  params:
    - name: value
      type: integer
      description: "Bass value byte"

- id: speaker_off_toggle
  label: Speaker Off Toggle
  kind: action
  command: "8C 00 36 02 00 XX"
  params: []

- id: speaker_off
  label: Speaker Off
  kind: action
  command: "8C 00 36 03 01 00 XX"
  params: []

- id: speaker_on
  label: Speaker On
  kind: action
  command: "8C 00 36 03 01 01 XX"
  params: []

- id: h_size_up
  label: H Size Up
  kind: action
  command: "8C 00 40 03 00 00 XX"
  params: []

- id: h_size_direct
  label: H Size Direct
  kind: action
  command: "8C 00 40 04 01 00 {value} XX"
  params:
    - name: value
      type: integer
      description: "H Size value byte"

- id: h_shift_up
  label: H Shift Up
  kind: action
  command: "8C 00 41 04 00 00 00 XX"
  params: []

- id: h_shift_down
  label: H Shift Down
  kind: action
  command: "8C 00 41 04 00 01 {value} XX"
  params:
    - name: value
      type: integer
      description: "H Shift value byte"

- id: h_shift_direct
  label: H Shift Direct
  kind: action
  command: "8C 00 41 03 01 00 XX"
  params: []

- id: v_size_up
  label: V Size Up
  kind: action
  command: "8C 00 42 03 00 00 XX"
  params: []

- id: v_size_direct
  label: V Size Direct
  kind: action
  command: "8C 00 42 04 01 00 {value} XX"
  params:
    - name: value
      type: integer
      description: "V Size value byte"

- id: v_shift_up
  label: V Shift Up
  kind: action
  command: "8C 00 43 04 00 00 XX"
  params: []

- id: v_shift_direct
  label: V Shift Direct
  kind: action
  command: "8C 00 43 03 01 00 {value} XX"
  params:
    - name: value
      type: integer
      description: "V Shift value byte"

- id: screen_wide_toggle
  label: Wide (Aspect) Toggle
  kind: action
  command: "8C 00 44 02 00 XX"
  params: []

- id: screen_wide_direct
  label: Wide (Aspect) Direct
  kind: action
  command: "8C 00 44 03 01 {mode} XX"
  params:
    - name: mode
      type: enum
      values: [wide_zoom, full, zoom, normal, pc_normal, pc_full1, pc_full2, pc_zoom]
      description: "0x00 Wide Zoom, 0x01 Full, 0x02 Zoom, 0x03 Normal, 0x05 PCNormal, 0x06 PC_Full1, 0x07 PC_Full2, 0x08 PC_ZOOM (SXRD only)"

- id: mode_4_3_toggle
  label: 4:3 Mode Toggle
  kind: action
  command: "8C 00 46 02 00 XX"
  params: []

- id: mode_4_3_direct
  label: 4:3 Mode Direct
  kind: action
  command: "8C 00 46 03 01 {mode} XX"
  params:
    - name: mode
      type: enum
      values: [off, zoom, full, wide_zoom, normal]
      description: "0x00 Off, 0x01 Zoom, 0x02 Full, 0x03 Wide Zoom, 0x04 Normal"
```

## Feedbacks
```yaml
- id: control_answer
  label: Control Answer
  type: enum
  values: [completed, limit_over_max, limit_over_min, command_canceled, parse_error]
  # Frame: 0x70 | answer | chk
  # 0x00 Completed, 0x01 Limit Over (max), 0x02 Limit Over (min), 0x03 Command Canceled, 0x04 Parse Error
```

## Variables
```yaml
# UNRESOLVED: source does not enumerate settable numeric ranges for Direct/UpDown parameters
# (Picture, Brightness, Color, Hue, Sharpness, Treble, Bass, H/V Size, H/V Shift). User-menu
# range applies per source note §3, but no byte-range values are stated.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications from the display.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_on
  - input_switch
# Per source §3:
#   - Send control command after 20 seconds of power on.
#   - In standby mode, only the Power ON command is accepted; all others are disabled.
#   - Standby Command (0x01, Enable=0x01) MUST be sent before Power ON is accepted.
#   - Command interval must be >= 500 ms.
#   - Strict round-trip: wait for Answer before next command.
interlocks:
  - "Power ON only accepted after Standby Command Enable (0x01, 0x01) is acknowledged."
  - "Wait >= 20s after power on before issuing control commands."
  - "Command interval >= 500 ms."
  - "Wait for Answer frame (0x70 ...) before sending next command."
```

## Notes
- Models covered: KDL-40XBR5, KDL-46XBR5, KDL-52XBR5 (LCD), KDS-Z60XBR5, KDS-Z70XBR5 (SXRD).
- Source: Sony RS-232C Protocol Manual, 1st Edition (file `sony_kdl_x0r_5x0a_unknown.refined.md`).
- Frame structure: `0x8C | 0x00 | <function> | <length> | <data...> | <checksum>`. Checksum = low 8 bits of sum of bytes 1..N (header through last data byte).
- Answer frame: `0x70 | <answer_code> | <checksum>`.
- The source is truncated after Screen/4:3 Mode. Command categories that would normally follow (Channel presets, Timer/Clock, Setup, parental control, etc.) are not present in this document and have NOT been enumerated.
- SXRD-only features: HDMI #4 input, Advanced Iris, PC_ZOOM wide mode.
- All command hex bytes in the source use lowercase; reproduced verbatim. ASCII Language strings (`eng`/`fre`/`spa`) shown as ASCII byte hex (`65 6E 67` etc.) per source.
- Cable: D-sub 9-pin male on display, D-sub 9-pin on host. Only pins 2 (RD), 3 (TD), 5 (GND) carry signal; remaining pins NC. Cross-over (null-modem) wiring required.
- Source note: "Value range for direct command is same as user can change by menu." → numeric Direct/UpDown byte ranges (Picture, Brightness, Color, etc.) not enumerated in this source.

## Provenance

```yaml
source_domains:
  - hf-files-oregon.s3.amazonaws.com
  - support.justaddpower.com
  - pro-bravia.sony.net
  - manualslib.com
source_urls:
  - https://hf-files-oregon.s3.amazonaws.com/hdpjustaddpower_kb_attachments/2016/04-20/ab25a088-38d8-41a8-a136-fabda0005a1e/RS232_XBR5_protocol.pdf
  - https://support.justaddpower.com/kb/article/22-sony-rs232-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://www.manualslib.com/manual/321046/Sony-Bravia-Kdl-40xbr5.html
retrieved_at: 2026-06-11T23:49:10.943Z
last_checked_at: 2026-06-12T19:45:00.990Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:45:00.990Z
matched_actions: 91
action_count: 91
confidence: medium
summary: "All 91 spec actions matched exactly to function codes 0x00-0x46 in the source table; transport parameters verified; source is truncated but fully represented. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is partial (truncated mid-table after Screen/Wide / 4:3 Mode entries). Several command categories in the official Sony manual not captured here."
- "source does not enumerate settable numeric ranges for Direct/UpDown parameters"
- "source does not document unsolicited notifications from the display."
- "source does not document multi-step sequences."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
