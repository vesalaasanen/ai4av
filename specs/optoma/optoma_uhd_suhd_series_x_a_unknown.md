---
spec_id: admin/optoma-uhd-suhd-series-x-a
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma UHD SUHD Series X A Control Spec"
manufacturer: Optoma
model_family: "Optoma UHD SUHD Series X A"
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - "Optoma UHD SUHD Series X A"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - optoma.co.uk
  - region-resource.optoma.com
  - optomaeurope.com
source_urls:
  - https://www.optoma.co.uk/uploads/RS232/EW628-RS232-en-GB.pdf
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://region-resource.optoma.com/products/import/Documents/471bc1d6-63f6-4825-aeef-2414e9cc5f99.pdf
  - https://www.optomaeurope.com/ContentStorage/Documents/731aa26e-4842-4414-999a-422879b17cee.pdf
retrieved_at: 2026-06-15T12:46:00.905Z
last_checked_at: 2026-06-16T07:10:00.657Z
generated_at: 2026-06-16T07:10:00.657Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model name \"UHD SUHD Series X A\" is a scraper artifact — the source is a generic Optoma RS232 Protocol Function List covering families such as EP721/EP723/EP727/EP728/EW1610. Confirm the exact product model before publishing."
  - "firmware version compatibility not stated in source"
  - "exact product model identifier not confirmed"
  - "no multi-step sequences described explicitly in source."
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility range not stated in source"
  - "exact product model identifier not confirmed — see Notes"
  - "~XX77 Security Timer payload format not documented"
  - "~XX35 hex/ASCII opcode mismatch in source needs vendor confirmation"
  - "opcode reuse (~XX36, ~XX61) — disambiguation method not documented"
verification:
  verdict: verified
  checked_at: 2026-06-16T07:10:00.657Z
  matched_actions: 173
  action_count: 173
  confidence: medium
  summary: "All 173 spec actions matched with exact command mnemonics in source; all transport parameters verified verbatim. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Optoma UHD SUHD Series X A Control Spec

## Summary
Optoma RS-232 serial control protocol for Optoma UHD/SUHD projectors. Provides power, source, display mode, image adjustment, lamp, security, menu and remote-emulation commands plus read-back queries. Command format: `~XX{cmd} {param}\r` where `XX` is the projector ID (`00` = all projectors, `01`–`99` = individual). Pass response = `P`, fail = `F`.

<!-- UNRESOLVED: model name "UHD SUHD Series X A" is a scraper artifact — the source is a generic Optoma RS232 Protocol Function List covering families such as EP721/EP723/EP727/EP728/EW1610. Confirm the exact product model before publishing. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact product model identifier not confirmed -->

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
  uart_fifo: disabled  # source: "UART16550 FIFO: Disable"
auth:
  type: none  # inferred: no auth procedure in source
# All commands are addressed by projector ID: XX=01-99 (specific) or 00 (all).
# Frame: ASCII "~XX{cmd} {param}" + CR (0x0D). Projector replies "P" (pass) or "F" (fail).
```

## Traits
```yaml
# Inferred from command examples present in source
traits:
  - powerable      # inferred: ~XX00 1/2 power on/off present
  - queryable      # inferred: ~XX121-129 read queries present
  - levelable      # inferred: brightness/contrast/volume/zoom parameterized commands present
  - routable       # inferred: source-selection commands ~XX12 / ~XX39 present
```

## Actions

```yaml
# XX = projector ID. `00` = broadcast to all projectors; `01`-`99` = specific unit.
# Source lists each enumerated variant as a separate row → each is its own action.
# `id` parameter is the projector address used in the leading ~XX field.
# Hex payloads transcribed verbatim from source. Where source carries obvious
# transcription bugs (e.g. ~XX35 uses 3036 = "06" hex, ~XX61/82/83 reuse 3030
# or 3038 hex groups) the payload is reproduced AS WRITTEN in the source -
# verifier should treat those rows as suspect.

- id: power_on
  label: Power On
  kind: action
  command: "~{id}00 1"
  params:
    - name: id
      type: string
      description: "Projector ID, 2 digits. '00'=all, '01'-'99'=specific. Hex: 7E {id-hex} 30 30 20 31 0D"
- id: power_off
  label: Power Off
  kind: action
  command: "~{id}00 2"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 30 20 32 0D"
- id: resync
  label: Resync
  kind: action
  command: "~{id}01 1"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 30 31 20 31 0D"
- id: av_mute_on
  label: AV Mute On
  kind: action
  command: "~{id}02 1"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 30 32 20 31 0D"
- id: av_mute_off
  label: AV Mute Off
  kind: action
  command: "~{id}02 2"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 30 32 20 32 0D"
- id: mute_on
  label: Mute On
  kind: action
  command: "~{id}03 1"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 30 33 20 31 0D"
- id: mute_off
  label: Mute Off
  kind: action
  command: "~{id}03 2"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 30 33 20 32 0D"
- id: freeze
  label: Freeze
  kind: action
  command: "~{id}04 1"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 30 34 20 31 0D"
- id: unfreeze
  label: Unfreeze
  kind: action
  command: "~{id}04 2"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 30 34 20 32 0D"
- id: zoom_plus
  label: Zoom Plus
  kind: action
  command: "~{id}05 1"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 30 35 20 31 0D"
- id: zoom_minus
  label: Zoom Minus
  kind: action
  command: "~{id}06 1"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 30 36 20 31 0D"
- id: pan_up
  label: Pan Up (under zoom)
  kind: action
  command: "~{id}07 1"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 30 37 20 31 0D"
- id: pan_down
  label: Pan Down (under zoom)
  kind: action
  command: "~{id}08 1"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 30 38 20 31 0D"
- id: pan_left
  label: Pan Left (under zoom)
  kind: action
  command: "~{id}09 1"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 30 39 20 31 0D"
- id: pan_right
  label: Pan Right (under zoom)
  kind: action
  command: "~{id}10 1"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 31 30 20 31 0D"
- id: direct_source_dvid
  label: Direct Source DVI-D
  kind: action
  command: "~{id}12 2"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 31 32 20 32 0D"
- id: direct_source_dvia
  label: Direct Source DVI-A
  kind: action
  command: "~{id}12 3"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 31 32 20 33 0D"
- id: direct_source_vga_scart
  label: Direct Source VGA / VGA 1 SCART
  kind: action
  command: "~{id}12 7"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 31 32 20 37 0D"
- id: direct_source_vga_component
  label: Direct Source VGA 1 Component
  kind: action
  command: "~{id}12 8"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 31 32 20 38 0D"
- id: direct_source_svideo
  label: Direct Source S-Video
  kind: action
  command: "~{id}12 9"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 31 32 20 39 0D"
- id: direct_source_video
  label: Direct Source Video
  kind: action
  command: "~{id}12 10"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 31 32 20 31 30 0D"
- id: display_mode_presentation
  label: Display Mode Presentation
  kind: action
  command: "~{id}20 1"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 32 30 20 31 0D"
- id: display_mode_bright
  label: Display Mode Bright
  kind: action
  command: "~{id}20 2"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 32 30 20 32 0D"
- id: display_mode_movie
  label: Display Mode Movie
  kind: action
  command: "~{id}20 3"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 32 30 20 33 0D"
- id: display_mode_srgb
  label: Display Mode sRGB
  kind: action
  command: "~{id}20 4"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 32 30 20 34 0D"
- id: display_mode_user1
  label: Display Mode User 1
  kind: action
  command: "~{id}20 5"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 32 30 20 35 0D"
- id: set_brightness
  label: Set Brightness
  kind: action
  command: "~{id}21 {n}"
  params:
    - name: id
      type: string
      description: "Projector ID."
    - name: n
      type: integer
      description: "Brightness level, range -50 to +50. Hex: 7E {id-hex} 30 32 31 20 {n-hex} 0D"
- id: set_contrast
  label: Set Contrast
  kind: action
  command: "~{id}22 {n}"
  params:
    - name: id
      type: string
      description: "Projector ID."
    - name: n
      type: integer
      description: "Contrast level, range -50 to +50."
- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "~{id}23 {n}"
  params:
    - name: id
      type: string
      description: "Projector ID."
    - name: n
      type: integer
      description: "Sharpness level, range -50 to +50."
- id: set_red_gain
  label: Set Red Gain (Color)
  kind: action
  command: "~{id}24 {n}"
  params:
    - name: id
      type: string
      description: "Projector ID."
    - name: n
      type: integer
      description: "Red gain, range -50 to +50."
- id: set_green_gain
  label: Set Green Gain (Color)
  kind: action
  command: "~{id}25 {n}"
  params:
    - name: id
      type: string
      description: "Projector ID."
    - name: n
      type: integer
      description: "Green gain, range -50 to +50."
- id: set_blue_gain
  label: Set Blue Gain (Color)
  kind: action
  command: "~{id}26 {n}"
  params:
    - name: id
      type: string
      description: "Projector ID."
    - name: n
      type: integer
      description: "Blue gain, range -50 to +50."
- id: set_red_bias
  label: Set Red Bias
  kind: action
  command: "~{id}27 {n}"
  params:
    - name: id
      type: string
      description: "Projector ID."
    - name: n
      type: integer
      description: "Red bias, range -50 to +50."
- id: set_green_bias
  label: Set Green Bias
  kind: action
  command: "~{id}28 {n}"
  params:
    - name: id
      type: string
      description: "Projector ID."
    - name: n
      type: integer
      description: "Green bias, range -50 to +50."
- id: set_blue_bias
  label: Set Blue Bias
  kind: action
  command: "~{id}29 {n}"
  params:
    - name: id
      type: string
      description: "Projector ID."
    - name: n
      type: integer
      description: "Blue bias, range -50 to +50."
- id: set_cyan
  label: Set Cyan
  kind: action
  command: "~{id}30 {n}"
  params:
    - name: id
      type: string
      description: "Projector ID."
    - name: n
      type: integer
      description: "Cyan, range -50 to +50."
- id: set_yellow
  label: Set Yellow
  kind: action
  command: "~{id}31 {n}"
  params:
    - name: id
      type: string
      description: "Projector ID."
    - name: n
      type: integer
      description: "Yellow, range -50 to +50."
- id: set_magenta
  label: Set Magenta
  kind: action
  command: "~{id}32 {n}"
  params:
    - name: id
      type: string
      description: "Projector ID."
    - name: n
      type: integer
      description: "Magenta, range -50 to +50."
- id: color_reset
  label: Color Reset
  kind: action
  command: "~{id}33 1"
  params:
    - name: id
      type: string
      description: "Projector ID. Hex: 7E {id-hex} 30 33 33 20 31 0D"
- id: set_whitepeaking
  label: Set WhitePeaking
  kind: action
  command: "~{id}34 {n}"
  params:
    - name: id
      type: string
      description: "Projector ID."
    - name: n
      type: integer
      description: "WhitePeaking level, range 0-10."
- id: degamma_film
  label: Degamma Film
  kind: action
  command: "~{id}35 1"
  params:
    - name: id
      type: string
      description: "Projector ID. Source hex row reads 7E 30 30 33 35 20 31 0D (mnemonic 35). Hex 7E {id-hex} 30 30 33 35 20 31 0D."
- id: degamma_video
  label: Degamma Video
  kind: action
  command: "~{id}35 2"
  params:
    - name: id
      type: string
      description: "Projector ID."
- id: degamma_graphics
  label: Degamma Graphics
  kind: action
  command: "~{id}35 3"
  params:
    - name: id
      type: string
      description: "Projector ID."
- id: degamma_pc
  label: Degamma PC
  kind: action
  command: "~{id}35 4"
  params:
    - name: id
      type: string
      description: "Projector ID."
- id: image_ai_on
  label: Image AI On
  kind: action
  command: "~{id}36 1"
  params:
    - name: id
      type: string
      description: "Projector ID. NOTE: source hex row for Image AI On is 7E 30 30 33 36 30 20 37 0D - duplicated/typo in source, reproduced verbatim."
- id: image_ai_off
  label: Image AI Off
  kind: action
  command: "~{id}36 2"
  params:
    - name: id
      type: string
      description: "Projector ID. NOTE: source hex row for Image AI Off is identical to On (7E 30 30 36 30 20 37 0D) - typo in source, reproduced verbatim."
- id: color_temp_warm
  label: Color Temperature Warm
  kind: action
  command: "~{id}36 1"
  params:
    - name: id
      type: string
      description: "Projector ID. NOTE: source reuses mnemonic 36 for both Image AI and Color Temp tables - distinct logical commands sharing the same opcode. Hex 7E {id-hex} 30 30 33 36 20 31 0D."
- id: color_temp_medium
  label: Color Temperature Medium
  kind: action
  command: "~{id}36 2"
  params:
    - name: id
      type: string
      description: "Projector ID."
- id: color_temp_cold
  label: Color Temperature Cold
  kind: action
  command: "~{id}36 3"
  params:
    - name: id
      type: string
      description: "Projector ID."
- id: color_space_auto
  label: Color Space Auto
  kind: action
  command: "~{id}37 1"
  params:
    - name: id
      type: string
      description: "Projector ID."
- id: color_space_rgb
  label: Color Space RGB
  kind: action
  command: "~{id}37 2"
  params:
    - name: id
      type: string
      description: "Projector ID."
- id: color_space_yuv
  label: Color Space YUV
  kind: action
  command: "~{id}37 3"
  params:
    - name: id
      type: string
      description: "Projector ID."
- id: input_source_dvi
  label: Input Source DVI
  kind: action
  command: "~{id}39 2"
  params:
    - name: id
      type: string
      description: "Projector ID."
- id: input_source_vga
  label: Input Source VGA
  kind: action
  command: "~{id}39 5"
  params:
    - name: id
      type: string
      description: "Projector ID."
- id: input_source_svideo
  label: Input Source S-Video
  kind: action
  command: "~{id}39 9"
  params:
    - name: id
      type: string
      description: "Projector ID."
- id: input_source_video
  label: Input Source Video
  kind: action
  command: "~{id}39 10"
  params:
    - name: id
      type: string
      description: "Projector ID."
- id: format_4_3
  label: Format 4:3
  kind: action
  command: "~{id}60 1"
  params:
    - name: id
      type: string
      description: "Projector ID."
- id: format_16_10_16_9
  label: Format 16:10 / 16:9
  kind: action
  command: "~{id}60 2"
  params:
    - name: id
      type: string
      description: "Projector ID."
- id: format_lbx
  label: Format LBX
  kind: action
  command: "~{id}60 5"
  params:
    - name: id
      type: string
      description: "Projector ID."
- id: format_native
  label: Format Native
  kind: action
  command: "~{id}60 6"
  params:
    - name: id
      type: string
      description: "Projector ID."
- id: format_auto
  label: Format Auto
  kind: action
  command: "~{id}60 7"
  params:
    - name: id
      type: string
      description: "Projector ID."
- id: pcmode_on
  label: PCMode On
  kind: action
  command: "~{id}61 1"
  params:
    - name: id
      type: string
      description: "Projector ID. NOTE: source hex row reads 7E 30 30 36 30 20 37 0D for both On and Off (typo)."
- id: pcmode_off
  label: PCMode Off
  kind: action
  command: "~{id}61 2"
  params:
    - name: id
      type: string
      description: "Projector ID. NOTE: source hex row reads 7E 30 30 36 30 20 37 0D (typo)."
- id: set_overscan
  label: Set Overscan
  kind: action
  command: "~{id}61 {n}"
  params:
    - name: id
      type: string
      description: "Projector ID."
    - name: n
      type: integer
      description: "Overscan, range 0-12. NOTE: source reuses mnemonic 61 - distinct command from PCMode."
- id: set_zoom
  label: Set Zoom
  kind: action
  command: "~{id}62 {n}"
  params:
    - name: id
      type: string
      description: "Projector ID."
    - name: n
      type: integer
      description: "Zoom, range 0-100."
- id: set_h_image_shift
  label: Set H Image Shift
  kind: action
  command: "~{id}63 {n}"
  params:
    - name: id
      type: string
      description: "Projector ID."
    - name: n
      type: integer
      description: "H Image Shift, range -50 to +50."
- id: set_v_image_shift
  label: Set V Image Shift
  kind: action
  command: "~{id}64 {n}"
  params:
    - name: id
      type: string
      description: "Projector ID."
    - name: n
      type: integer
      description: "V Image Shift, range -50 to +50."
- id: set_v_keystone
  label: Set V Keystone
  kind: action
  command: "~{id}66 {n}"
  params:
    - name: id
      type: string
      description: "Projector ID."
    - name: n
      type: integer
      description: "V Keystone, range -20 to +20."
- id: language_english
  label: Language English
  kind: action
  command: "~{id}70 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: language_german
  label: Language German
  kind: action
  command: "~{id}70 2"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: language_french
  label: Language French
  kind: action
  command: "~{id}70 3"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: language_italian
  label: Language Italian
  kind: action
  command: "~{id}70 4"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: language_spanish
  label: Language Spanish
  kind: action
  command: "~{id}70 5"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: language_portuguese
  label: Language Portuguese
  kind: action
  command: "~{id}70 6"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: language_polish
  label: Language Polish
  kind: action
  command: "~{id}70 7"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: language_dutch
  label: Language Dutch
  kind: action
  command: "~{id}70 8"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: language_swedish
  label: Language Swedish
  kind: action
  command: "~{id}70 9"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: language_norwegian_danish
  label: Language Norwegian/Danish
  kind: action
  command: "~{id}70 10"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: language_finnish
  label: Language Finnish
  kind: action
  command: "~{id}70 11"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: language_greek
  label: Language Greek
  kind: action
  command: "~{id}70 12"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: language_traditional_chinese
  label: Language Traditional Chinese
  kind: action
  command: "~{id}70 13"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: language_simplified_chinese
  label: Language Simplified Chinese
  kind: action
  command: "~{id}70 14"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: language_japanese
  label: Language Japanese
  kind: action
  command: "~{id}70 15"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: language_korean
  label: Language Korean
  kind: action
  command: "~{id}70 16"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: language_russian
  label: Language Russian
  kind: action
  command: "~{id}70 17"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: language_hungarian
  label: Language Hungarian
  kind: action
  command: "~{id}70 18"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: language_czech
  label: Language Czech
  kind: action
  command: "~{id}70 19"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: language_arabic
  label: Language Arabic
  kind: action
  command: "~{id}70 20"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: language_thai
  label: Language Thai
  kind: action
  command: "~{id}70 21"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: projection_front_desktop
  label: Projection Front-Desktop
  kind: action
  command: "~{id}71 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: projection_rear_desktop
  label: Projection Rear-Desktop
  kind: action
  command: "~{id}71 2"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: projection_front_ceiling
  label: Projection Front-Ceiling
  kind: action
  command: "~{id}71 3"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: projection_rear_ceiling
  label: Projection Rear-Ceiling
  kind: action
  command: "~{id}71 4"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: menu_location_top_left
  label: Menu Location Top Left
  kind: action
  command: "~{id}72 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: menu_location_top_right
  label: Menu Location Top Right
  kind: action
  command: "~{id}72 2"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: menu_location_centre
  label: Menu Location Centre
  kind: action
  command: "~{id}72 3"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: menu_location_bottom_left
  label: Menu Location Bottom Left
  kind: action
  command: "~{id}72 4"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: menu_location_bottom_right
  label: Menu Location Bottom Right
  kind: action
  command: "~{id}72 5"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: set_signal_frequency
  label: Set Signal Frequency
  kind: action
  command: "~{id}73 {n}"
  params:
    - {name: id, type: string, description: "Projector ID."}
    - {name: n, type: integer, description: "Frequency, range -5 to +5."}
- id: set_signal_phase
  label: Set Signal Phase
  kind: action
  command: "~{id}74 {n}"
  params:
    - {name: id, type: string, description: "Projector ID."}
    - {name: n, type: integer, description: "Phase, range 0-31."}
- id: set_h_position
  label: Set H Position
  kind: action
  command: "~{id}75 {n}"
  params:
    - {name: id, type: string, description: "Projector ID."}
    - {name: n, type: integer, description: "H Position, range -5 to +5."}
- id: set_v_position
  label: Set V Position
  kind: action
  command: "~{id}76 {n}"
  params:
    - {name: id, type: string, description: "Projector ID."}
    - {name: n, type: integer, description: "V Position, range -5 to +5."}
- id: set_security_timer
  label: Set Security Timer
  kind: action
  command: "~{id}77 {nnnnnn}"
  params:
    - {name: id, type: string, description: "Projector ID."}
    - {name: nnnnnn, type: string, description: "Six-digit Month/Day/Hour security timer."}
  notes: "Source documents no ASCII/HEX payload for this row - payload format UNRESOLVED beyond the parameter shape."
- id: security_settings_on
  label: Security Settings On
  kind: action
  command: "~{id}78 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: security_settings_off
  label: Security Settings Off
  kind: action
  command: "~{id}78 2"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: set_projector_id
  label: Set Projector ID
  kind: action
  command: "~{id}79 {n}"
  params:
    - {name: id, type: string, description: "Projector ID (addressed)."}
    - {name: n, type: integer, description: "New projector ID to assign, range 00-99."}
- id: mute2_on
  label: Mute (alternate) On
  kind: action
  command: "~{id}80 1"
  params: [{name: id, type: string, description: "Projector ID. Source labels this row 'Mute' distinct from ~XX03."}]
- id: mute2_off
  label: Mute (alternate) Off
  kind: action
  command: "~{id}80 2"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: set_volume
  label: Set Volume
  kind: action
  command: "~{id}81 {n}"
  params:
    - {name: id, type: string, description: "Projector ID."}
    - {name: n, type: integer, description: "Volume level, range 0-15."}
- id: startup_logo_on
  label: Start Up Logo On
  kind: action
  command: "~{id}82 1"
  params: [{name: id, type: string, description: "Projector ID. NOTE: source Off hex identical to On (typo)."}]
- id: startup_logo_off
  label: Start Up Logo Off
  kind: action
  command: "~{id}82 2"
  params: [{name: id, type: string, description: "Projector ID. NOTE: source Off hex identical to On (typo)."}]
- id: screen_type_16_10
  label: Screen Type 16:10
  kind: action
  command: "~{id}83 1"
  params: [{name: id, type: string, description: "Projector ID. NOTE: source hex for both rows identical (typo)."}]
- id: screen_type_16_9
  label: Screen Type 16:9
  kind: action
  command: "~{id}83 2"
  params: [{name: id, type: string, description: "Projector ID. NOTE: source hex for both rows identical (typo)."}]
- id: source_lock_on
  label: Source Lock On
  kind: action
  command: "~{id}100 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: source_lock_off
  label: Source Lock Off
  kind: action
  command: "~{id}100 2"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: high_altitude_on
  label: High Altitude On
  kind: action
  command: "~{id}101 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: high_altitude_off
  label: High Altitude Off
  kind: action
  command: "~{id}101 2"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: information_hide_on
  label: Information Hide On
  kind: action
  command: "~{id}102 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: information_hide_off
  label: Information Hide Off
  kind: action
  command: "~{id}102 2"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: keypad_lock_on
  label: Keypad Lock On
  kind: action
  command: "~{id}103 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: keypad_lock_off
  label: Keypad Lock Off
  kind: action
  command: "~{id}103 2"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: background_color_blue
  label: Background Color Blue
  kind: action
  command: "~{id}104 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: background_color_black
  label: Background Color Black
  kind: action
  command: "~{id}104 2"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: direct_power_on_on
  label: Direct Power On
  kind: action
  command: "~{id}105 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: direct_power_on_off
  label: Direct Power Off
  kind: action
  command: "~{id}105 2"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: set_auto_power_off
  label: Set Auto Power Off (minutes)
  kind: action
  command: "~{id}106 {n}"
  params:
    - {name: id, type: string, description: "Projector ID."}
    - {name: n, type: integer, description: "Auto Power Off, range 0-180 minutes."}
- id: set_sleep_timer
  label: Set Sleep Timer (minutes)
  kind: action
  command: "~{id}107 {n}"
  params:
    - {name: id, type: string, description: "Projector ID."}
    - {name: n, type: integer, description: "Sleep Timer, range 0-999 minutes."}
- id: lamp_hour
  label: Lamp Setting - Lamp Hour
  kind: action
  command: "~{id}108 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: lamp_reminder_on
  label: Lamp Reminder On
  kind: action
  command: "~{id}109 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: lamp_reminder_off
  label: Lamp Reminder Off
  kind: action
  command: "~{id}109 2"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: brightness_mode_bright
  label: Brightness Mode BRIGHT
  kind: action
  command: "~{id}110 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: brightness_mode_std
  label: Brightness Mode STD
  kind: action
  command: "~{id}110 2"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: lamp_reset_yes
  label: Lamp Reset Yes
  kind: action
  command: "~{id}111 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: lamp_reset_no
  label: Lamp Reset No
  kind: action
  command: "~{id}111 2"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: reset_yes
  label: Reset Yes
  kind: action
  command: "~{id}112 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: reset_no
  label: Reset No
  kind: action
  command: "~{id}112 2"
  params: [{name: id, type: string, description: "Projector ID."}]

# --- READ queries (kind: query) ---
- id: query_input_source
  label: Query Input Source
  kind: query
  command: "~{id}121 1"
  params: [{name: id, type: string, description: "Projector ID. Hex 7E {id-hex} 30 30 31 32 31 20 31 0D."}]
- id: query_software_version
  label: Query Software Version
  kind: query
  command: "~{id}122 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: query_display_mode
  label: Query Display Mode
  kind: query
  command: "~{id}123 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: query_power_state
  label: Query Power State
  kind: query
  command: "~{id}124 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: query_brightness
  label: Query Brightness
  kind: query
  command: "~{id}125 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: query_contrast
  label: Query Contrast
  kind: query
  command: "~{id}126 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: query_aspect_ratio
  label: Query Aspect Ratio
  kind: query
  command: "~{id}127 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: query_color_temperature
  label: Query Color Temperature
  kind: query
  command: "~{id}128 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: query_projection_mode
  label: Query Projection Mode
  kind: query
  command: "~{id}129 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: query_information
  label: Query Information
  kind: query
  command: "~{id}150 1"
  params: [{name: id, type: string, description: "Projector ID. Response: 'OKabbbbccdddde' - a=On/Off, bbbb=LampHour, cc=source (00 None/01 DVID/02 VGA1/03 VGA2/04 S-Video/05 Video), dddd=FW version, e=Display mode."}]
- id: query_model_name
  label: Query Model Name
  kind: query
  command: "~{id}151 1"
  params: [{name: id, type: string, description: "Projector ID. Response 'OKn' where n=0..4 maps to EP721/EP723/EP727/EP728/EW1610."}]

# --- SEND to emulate Remote (~XX140) ---
- id: remote_power
  label: Remote Power
  kind: action
  command: "~{id}140 1"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_mouse_up
  label: Remote Mouse Up
  kind: action
  command: "~{id}140 3"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_mouse_left
  label: Remote Mouse Left
  kind: action
  command: "~{id}140 4"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_mouse_enter
  label: Remote Mouse Enter
  kind: action
  command: "~{id}140 5"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_mouse_right
  label: Remote Mouse Right
  kind: action
  command: "~{id}140 6"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_mouse_down
  label: Remote Mouse Down
  kind: action
  command: "~{id}140 7"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_mouse_left_click
  label: Mouse Left Click
  kind: action
  command: "~{id}140 8"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_mouse_right_click
  label: Mouse Right Click
  kind: action
  command: "~{id}140 9"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_up_page_plus
  label: Remote Up / Page +
  kind: action
  command: "~{id}140 10"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_left_source
  label: Remote Left / Source
  kind: action
  command: "~{id}140 11"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_enter_menu
  label: Remote Enter (for projection MENU)
  kind: action
  command: "~{id}140 12"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_right_resync
  label: Remote Right / Re-SYNC
  kind: action
  command: "~{id}140 13"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_down_page_minus
  label: Remote Down / Page -
  kind: action
  command: "~{id}140 14"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_keystone_plus
  label: Remote Keystone +
  kind: action
  command: "~{id}140 15"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_keystone_minus
  label: Remote Keystone -
  kind: action
  command: "~{id}140 16"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_volume_minus
  label: Remote Volume -
  kind: action
  command: "~{id}140 17"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_volume_plus
  label: Remote Volume +
  kind: action
  command: "~{id}140 18"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_brightness
  label: Remote Brightness
  kind: action
  command: "~{id}140 19"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_menu
  label: Remote Menu
  kind: action
  command: "~{id}140 20"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_zoom
  label: Remote Zoom
  kind: action
  command: "~{id}140 21"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_dvi
  label: Remote DVI
  kind: action
  command: "~{id}140 22"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_freeze
  label: Remote Freeze
  kind: action
  command: "~{id}140 23"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_av_mute
  label: Remote AV Mute
  kind: action
  command: "~{id}140 24"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_svideo
  label: Remote S-Video
  kind: action
  command: "~{id}140 25"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_vga
  label: Remote VGA
  kind: action
  command: "~{id}140 26"
  params: [{name: id, type: string, description: "Projector ID."}]
- id: remote_video
  label: Remote Video
  kind: action
  command: "~{id}140 27"
  params: [{name: id, type: string, description: "Projector ID."}]
```

## Feedbacks
```yaml
# Pass/Fail acknowledgement for every command
- id: command_pass
  type: enum
  values: ["P"]
  description: "Projector returns 'P' on command pass."
- id: command_fail
  type: enum
  values: ["F"]
  description: "Projector returns 'F' on command fail."
- id: input_source
  type: string
  description: "Response to ~XX121 1 query."
- id: software_version
  type: string
  description: "Response to ~XX122 1 query."
- id: display_mode
  type: enum
  values: [Presentation, Bright, Movie, sRGB, "User 1"]
  description: "Response to ~XX123 1 query."
- id: power_state
  type: enum
  values: [on, off]
  description: "Response to ~XX124 1 query."
- id: brightness_value
  type: integer
  description: "Response to ~XX125 1 query."
- id: contrast_value
  type: integer
  description: "Response to ~XX126 1 query."
- id: aspect_ratio
  type: enum
  description: "Response to ~XX127 1 query."
- id: color_temperature
  type: enum
  values: [Warm, Medium, Cold]
  description: "Response to ~XX128 1 query."
- id: projection_mode
  type: enum
  values: ["Front-Desktop", "Rear-Desktop", "Front-Ceiling", "Rear-Ceiling"]
  description: "Response to ~XX129 1 query."
- id: information_block
  type: string
  description: "Response to ~XX150 1: 'OKabbbbccdddde' packed status (a On/Off, bbbb LampHour, cc source 00-05, dddd FW version, e Display mode)."
- id: model_name
  type: enum
  values: [EP721, EP723, EP727, EP728, EW1610]
  description: "Response to ~XX151 1 query."
```

## Variables
```yaml
- id: brightness
  type: integer
  range: [-50, 50]
  description: "Picture brightness; set via ~XX21 n."
- id: contrast
  type: integer
  range: [-50, 50]
  description: "Picture contrast; set via ~XX22 n."
- id: sharpness
  type: integer
  range: [-50, 50]
  description: "Picture sharpness; set via ~XX23 n."
- id: red_gain
  type: integer
  range: [-50, 50]
- id: green_gain
  type: integer
  range: [-50, 50]
- id: blue_gain
  type: integer
  range: [-50, 50]
- id: red_bias
  type: integer
  range: [-50, 50]
- id: green_bias
  type: integer
  range: [-50, 50]
- id: blue_bias
  type: integer
  range: [-50, 50]
- id: cyan
  type: integer
  range: [-50, 50]
- id: yellow
  type: integer
  range: [-50, 50]
- id: magenta
  type: integer
  range: [-50, 50]
- id: whitepeaking
  type: integer
  range: [0, 10]
- id: overscan
  type: integer
  range: [0, 12]
- id: zoom
  type: integer
  range: [0, 100]
- id: h_image_shift
  type: integer
  range: [-50, 50]
- id: v_image_shift
  type: integer
  range: [-50, 50]
- id: v_keystone
  type: integer
  range: [-20, 20]
- id: signal_frequency
  type: integer
  range: [-5, 5]
- id: signal_phase
  type: integer
  range: [0, 31]
- id: h_position
  type: integer
  range: [-5, 5]
- id: v_position
  type: integer
  range: [-5, 5]
- id: volume
  type: integer
  range: [0, 15]
- id: projector_id
  type: integer
  range: [0, 99]
- id: auto_power_off_minutes
  type: integer
  range: [0, 180]
- id: sleep_timer_minutes
  type: integer
  range: [0, 999]
```

## Events
```yaml
# Unsolicited notifications sent from projector automatically.
- id: status_info
  type: string
  description: >
    Unsolicited 'INFOn' notification. n: 0=Standby, 1=Warming, 2=Cooling,
    3=Out of Range, 4=Lamp Fail. Sent automatically on those transitions.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Lamp Reset (~XX111 1) and global Reset
# (~XX112 1) are destructive but the source documents no confirmation step.
```

## Notes
- Source is a **generic Optoma RS232 Protocol Function List** — not specific to any single product. The model name "UHD SUHD Series X A" appears to be a scraper artifact; the source's own model-name query (`~XX151 1`) returns one of EP721/EP723/EP727/EP728/EW1610. Treat the model binding as UNRESOLVED until a real product is matched.
- All commands carry a 2-digit projector ID prefix `~XX`. `00` broadcasts to all projectors on the bus; `01`–`99` address a specific unit. Each frame ends with CR (`0x0D`).
- Pass/Fail acknowledgement: projector replies `P` (pass) or `F` (fail) for each accepted command.
- **Suspect rows in source (reproduced verbatim, flagged for verifier attention):**
  - `~XX35` (Degamma) source hex row reads `7E 30 30 33 35 20 31 0D` but ASCII column shows `~XX35` — opcode mismatch between ASCII and hex columns.
  - `~XX36` is reused for **both** Image AI and Color Temperature tables — same opcode, different logical meanings.
  - `~XX61` is reused for **both** PCMode (on/off) and Overscan (n=0-12) — same opcode, different logical meanings.
  - `~XX82` (Start Up Logo) On and Off rows share identical hex in source (typo).
  - `~XX83` (Screen Type) 16:10 and 16:9 rows share identical hex in source (typo).
  - `~XX77` (Security Timer) row has empty HEX Code column — payload UNRESOLVED.
  - `~XX108 1` (Lamp Hour) lists no description beyond "Lamp Hour" — likely a query-style read, but classified here as an action per its placement under "SEND to projector".

<!-- UNRESOLVED: firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: exact product model identifier not confirmed — see Notes -->
<!-- UNRESOLVED: ~XX77 Security Timer payload format not documented -->
<!-- UNRESOLVED: ~XX35 hex/ASCII opcode mismatch in source needs vendor confirmation -->
<!-- UNRESOLVED: opcode reuse (~XX36, ~XX61) — disambiguation method not documented -->
````

## Provenance

```yaml
source_domains:
  - optoma.co.uk
  - region-resource.optoma.com
  - optomaeurope.com
source_urls:
  - https://www.optoma.co.uk/uploads/RS232/EW628-RS232-en-GB.pdf
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://region-resource.optoma.com/products/import/Documents/471bc1d6-63f6-4825-aeef-2414e9cc5f99.pdf
  - https://www.optomaeurope.com/ContentStorage/Documents/731aa26e-4842-4414-999a-422879b17cee.pdf
retrieved_at: 2026-06-15T12:46:00.905Z
last_checked_at: 2026-06-16T07:10:00.657Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:10:00.657Z
matched_actions: 173
action_count: 173
confidence: medium
summary: "All 173 spec actions matched with exact command mnemonics in source; all transport parameters verified verbatim. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model name \"UHD SUHD Series X A\" is a scraper artifact — the source is a generic Optoma RS232 Protocol Function List covering families such as EP721/EP723/EP727/EP728/EW1610. Confirm the exact product model before publishing."
- "firmware version compatibility not stated in source"
- "exact product model identifier not confirmed"
- "no multi-step sequences described explicitly in source."
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility range not stated in source"
- "exact product model identifier not confirmed — see Notes"
- "~XX77 Security Timer payload format not documented"
- "~XX35 hex/ASCII opcode mismatch in source needs vendor confirmation"
- "opcode reuse (~XX36, ~XX61) — disambiguation method not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
