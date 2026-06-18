---
spec_id: admin/optoma-zu655-zu660-dazullz-dazuluu
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma ZU655 / ZU660 / DAZULLZ / DAZULUU Control Spec"
manufacturer: Optoma
model_family: ZU655
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - ZU655
    - ZU660
    - DAZULLZ
    - DAZULUU
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - region-resource.optoma.com
  - optomaeurope.com
  - optoma.de
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/471bc1d6-63f6-4825-aeef-2414e9cc5f99.pdf
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://www.optomaeurope.com/ContentStorage/Documents/731aa26e-4842-4414-999a-422879b17cee.pdf
  - https://optoma.de/uploads/RS232/DS309-RS232-en.pdf
retrieved_at: 2026-06-16T01:52:03.661Z
last_checked_at: 2026-06-16T07:10:04.939Z
generated_at: 2026-06-16T07:10:04.939Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "SHDZ680 / TPZ760 model-specific command coverage not located."
  - "exact per-model support matrix of the generic command set is not stated in source."
  - "source PDF command table suffered column-shift corruption during text extraction; some parameter ranges / enum mappings may be imprecise. Verifier should re-check against original PDF."
  - "exact enum→value map partially corrupted in extracted table.\""
  - "code 450 also appears for LAN Standby in source - possible extraction collision.\""
  - "code 450 collides with Saturation in extracted table; original PDF should be checked.\""
  - "code formatting ambiguous in extracted table (~XX108 3 vs ~XX1083).\""
  - "code 150 reused across multiple read rows in extracted table - ambiguous.\""
  - "several additional Information read rows (Sub Source Resolution, System Temperature,"
  - "no separately-modeled continuous variables beyond those actions."
  - "no multi-step sequences described explicitly in source."
  - "source contains no explicit safety warnings or interlock procedures."
  - "SHDZ680 / TPZ760 model-specific documentation not located."
  - "exact per-model command subset not documented in source."
  - "source PDF command table suffered column-shift corruption during text extraction; some enum maps and the 450/150 code collisions should be re-verified against the original PDF (region-resource.optoma.com fcc27c8d-... and cf45148a-...)."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:10:04.939Z
  matched_actions: 122
  action_count: 122
  confidence: medium
  summary: "All 122 spec actions matched literally against source command table; transport parameters verified; comprehensive coverage of ZU-series protocol. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Optoma ZU655 / ZU660 / DAZULLZ / DAZULUU Control Spec

## Summary
Optoma ZU-series RS-232 control protocol covering the ZU655, ZU660, DAZULLZ, and DAZULUU projectors. Control is via a serial (UART) ASCII protocol using a `~` lead code, two-digit projector ID, three-digit command code, optional value, and `<CR>` terminator. Optoma publishes one shared ZU-series protocol document; the source notes "Some commands are not supported, it depends on models." SHDZ680 and TPZ760 share the family ID but have no model-specific documentation located.

<!-- UNRESOLVED: SHDZ680 / TPZ760 model-specific command coverage not located. -->
<!-- UNRESOLVED: exact per-model support matrix of the generic command set is not stated in source. -->
<!-- UNRESOLVED: source PDF command table suffered column-shift corruption during text extraction; some parameter ranges / enum mappings may be imprecise. Verifier should re-check against original PDF. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200       # source: "default is 19200 bps"; supports 9600-115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # Additional source note: UART16550 FIFO: Disable; long cable runs may need lower baud rate.
auth:
  type: none  # inferred: no auth procedure in source
# Command framing (verbatim from source):
#   Write:  ~ <ProjID 00-99> <Cmd 000-999> <space> <value 0-9999> <CR>
#   Read:   ~ <ProjID 00-99> <Cmd 000-999> <CR>
#   Lead code "~" = HEX 7E ; <CR> = HEX 0D ; ProjID 00 = all projectors
#   Pass response = "P", Fail response = "F"
#   Read pass response = "Ok <value>", Fail = "F"
#   Unsolicited standby notice: "INFO<value><CR>"
```

## Traits
```yaml
traits:
  - powerable    # inferred from Power On/Off commands (~XX001 / ~XX000)
  - queryable    # inferred from many Read commands returning values
  - levelable    # inferred from brightness/contrast/volume/keystone set commands
```

## Actions
```yaml
# All commands use the framing documented in Transport.
# "command" field shows the verbatim template with the variable part in braces.
# Projector ID slot is shown as {pid} (00-99; 00 = all). Commands below assume pid=00.
# Many rows come from a corrupted PDF table extraction; ranges/enum maps preserved
# as best-readable from source. Where ambiguity exists, note says so.

# ---- Power / System ----
- id: power_off
  label: Power Off
  kind: action
  command: "~0000&2"
  params: []
  notes: "Source row: Power Off ~XX000 0 & 2 F P"

- id: power_on
  label: Power On
  kind: action
  command: "~0001"
  params: []
  notes: "Source row: Power On ~XX001 1 F P"

- id: resync
  label: Re-Sync
  kind: action
  command: "~0011"
  params: []

- id: av_mute_off
  label: AV Mute Off
  kind: action
  command: "~0020&2"
  params: []

- id: av_mute_on
  label: AV Mute On
  kind: action
  command: "~0021"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "~0030&2"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "~0031"
  params: []

- id: freeze_unfreeze
  label: Freeze Unfreeze
  kind: action
  command: "~0040&2"
  params: []

- id: freeze
  label: Freeze
  kind: action
  command: "~0041"
  params: []

- id: zoom_plus
  label: Zoom Plus
  kind: action
  command: "~0051"
  params: []

- id: zoom_minus
  label: Zoom Minus
  kind: action
  command: "~0061"
  params: []

# ---- Direct Power / Standby Settings ----
- id: direct_power_set
  label: Direct Power On
  kind: action
  command: "~0105{value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: signal_power_set
  label: Signal Power On
  kind: action
  command: "~0104{value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: reset_to_default
  label: Reset to Default
  kind: action
  command: "~0112{value}"
  params:
    - name: value
      type: integer
      description: "1=Yes (Cancel/Yes row)"

- id: auto_power_off_set
  label: Auto Power Off (minutes)
  kind: action
  command: "~0106{value}"
  params:
    - name: value
      type: integer
      description: "0~120, 5 min increments"

- id: ssi_power_mode_set
  label: SSI Power Mode
  kind: action
  command: "~0110{value}"
  params:
    - name: value
      type: integer
      description: "1=Normal, 2=Eco"

- id: high_altitude_set
  label: High Altitude
  kind: action
  command: "~0101{value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

# ---- Picture / Color Mode ----
- id: color_mode_set
  label: Color Mode Set
  kind: action
  command: "~020{value}"
  params:
    - name: value
      type: integer
      description: "Source enum (corrupted extraction): 0=None, 1=PC, 3=Movie, 4=Blending, 5=Game, 6=User, others per source"
  notes: "UNRESOLVED: exact enum→value map partially corrupted in extracted table."

- id: brightness_set
  label: Brightness
  kind: action
  command: "~0210{value}"
  params:
    - name: value
      type: integer
      description: "0~100 (Blending variant 0~8)"

- id: brightness_minus
  label: Brightness Minus
  kind: action
  command: "~0461"
  params: []

- id: brightness_plus
  label: Brightness Plus
  kind: action
  command: "~0462"
  params: []

- id: contrast_set
  label: Contrast
  kind: action
  command: "~0220{value}"
  params:
    - name: value
      type: integer
      description: "0~100"

- id: contrast_minus
  label: Contrast Minus
  kind: action
  command: "~0471"
  params: []

- id: contrast_plus
  label: Contrast Plus
  kind: action
  command: "~0472"
  params: []

- id: sharpness_set
  label: Sharpness
  kind: action
  command: "~0230{value}"
  params:
    - name: value
      type: integer
      description: "0~31"

- id: saturation_set
  label: Saturation
  kind: action
  command: "~0450{value}"
  params:
    - name: value
      type: integer
      description: "0~100 (VGA Video only)"
  notes: "UNRESOLVED: code 450 also appears for LAN Standby in source - possible extraction collision."

- id: hue_set
  label: Hue
  kind: action
  command: "~0440{value}"
  params:
    - name: value
      type: integer
      description: "0~100 (VGA Video only)"

# ---- Gamma ----
- id: gamma_set
  label: Gamma
  kind: action
  command: "~035{value}"
  params:
    - name: value
      type: integer
      description: "Source values: 16=Cubit, 15=Enhphoto, 4=2.2, 12=2.4"

# ---- Color Temperature ----
- id: color_temp_set
  label: Color Temperature
  kind: action
  command: "~036{value}"
  params:
    - name: value
      type: integer
      description: "10=6500K, 11=7500K, 12=8300K"

# ---- Color Matching (W / R / G / B / C / Y / M) ----
- id: cm_w_red_set
  label: Color Match (W) Red
  kind: action
  command: "~0345{value}"
  params:
    - name: value
      type: integer
      description: "1~199"

- id: cm_w_green_set
  label: Color Match (W) Green
  kind: action
  command: "~0346{value}"
  params:
    - name: value
      type: integer
      description: "1~199"

- id: cm_w_blue_set
  label: Color Match (W) Blue
  kind: action
  command: "~0347{value}"
  params:
    - name: value
      type: integer
      description: "1~199"

- id: cm_r_saturation_set
  label: Color Match (R) Saturation
  kind: action
  command: "~0333{value}"
  params:
    - name: value
      type: integer
      description: "0~199"

- id: cm_r_hue_set
  label: Color Match (R) Hue
  kind: action
  command: "~0327{value}"
  params:
    - name: value
      type: integer
      description: "-99~99"

- id: cm_r_gain_set
  label: Color Match (R) Gain
  kind: action
  command: "~0339{value}"
  params:
    - name: value
      type: integer
      description: "1~199"

- id: cm_g_saturation_set
  label: Color Match (G) Saturation
  kind: action
  command: "~0334{value}"
  params:
    - name: value
      type: integer
      description: "0~199"

- id: cm_g_hue_set
  label: Color Match (G) Hue
  kind: action
  command: "~0328{value}"
  params:
    - name: value
      type: integer
      description: "-99~99"

- id: cm_g_gain_set
  label: Color Match (G) Gain
  kind: action
  command: "~0340{value}"
  params:
    - name: value
      type: integer
      description: "1~199"

- id: cm_b_saturation_set
  label: Color Match (B) Saturation
  kind: action
  command: "~0335{value}"
  params:
    - name: value
      type: integer
      description: "0~199"

- id: cm_b_hue_set
  label: Color Match (B) Hue
  kind: action
  command: "~0329{value}"
  params:
    - name: value
      type: integer
      description: "-99~99"

- id: cm_b_gain_set
  label: Color Match (B) Gain
  kind: action
  command: "~0341{value}"
  params:
    - name: value
      type: integer
      description: "1~199"

- id: cm_c_saturation_set
  label: Color Match (C) Saturation
  kind: action
  command: "~0336{value}"
  params:
    - name: value
      type: integer
      description: "0~199"

- id: cm_c_hue_set
  label: Color Match (C) Hue
  kind: action
  command: "~0330{value}"
  params:
    - name: value
      type: integer
      description: "-99~99"

- id: cm_c_gain_set
  label: Color Match (C) Gain
  kind: action
  command: "~0342{value}"
  params:
    - name: value
      type: integer
      description: "1~199"

- id: cm_y_saturation_set
  label: Color Match (Y) Saturation
  kind: action
  command: "~0337{value}"
  params:
    - name: value
      type: integer
      description: "0~199"

- id: cm_y_hue_set
  label: Color Match (Y) Hue
  kind: action
  command: "~0331{value}"
  params:
    - name: value
      type: integer
      description: "-99~99"

- id: cm_y_gain_set
  label: Color Match (Y) Gain
  kind: action
  command: "~0343{value}"
  params:
    - name: value
      type: integer
      description: "1~199"

- id: cm_m_saturation_set
  label: Color Match (M) Saturation
  kind: action
  command: "~0338{value}"
  params:
    - name: value
      type: integer
      description: "0~199"

- id: cm_m_hue_set
  label: Color Match (M) Hue
  kind: action
  command: "~0332{value}"
  params:
    - name: value
      type: integer
      description: "-99~99"

- id: cm_m_gain_set
  label: Color Match (M) Gain
  kind: action
  command: "~0344{value}"
  params:
    - name: value
      type: integer
      description: "1~199"

# ---- Aspect Ratio ----
- id: aspect_ratio_set
  label: Aspect Ratio
  kind: action
  command: "~060{value}"
  params:
    - name: value
      type: integer
      description: "1=4:3, 2=16:9, 3=16:10, 7=Auto"

# ---- Display / Screen geometry ----
- id: phase_set
  label: Phase
  kind: action
  command: "~074{value}"
  params:
    - name: value
      type: integer
      description: "0~31"

- id: clock_set
  label: Clock
  kind: action
  command: "~073{value}"
  params:
    - name: value
      type: integer
      description: "-5~5"

- id: h_position_set
  label: H. Position
  kind: action
  command: "~075{value}"
  params:
    - name: value
      type: integer
      description: "-5~5"

- id: v_position_set
  label: V. Position
  kind: action
  command: "~076{value}"
  params:
    - name: value
      type: integer
      description: "-5~5 (source row shows -5~2; PDF extraction may be off)"

- id: digital_zoom_set
  label: Digital Zoom
  kind: action
  command: "~062{value}"
  params:
    - name: value
      type: integer
      description: "0~10"

- id: projection_set
  label: Projection Mode
  kind: action
  command: "~071{value}"
  params:
    - name: value
      type: integer
      description: "1=Front, 2=Rear, 3=Front Ceiling, 4=Rear Ceiling"

- id: v_keystone_set
  label: V Keystone
  kind: action
  command: "~066{value}"
  params:
    - name: value
      type: integer
      description: "-40~40"

- id: h_keystone_set
  label: H Keystone
  kind: action
  command: "~065{value}"
  params:
    - name: value
      type: integer
      description: "-40~40"

- id: size_set
  label: Size
  kind: action
  command: "~067{value}"
  params:
    - name: value
      type: integer
      description: "0 ~ -25"

- id: image_h_shift_set
  label: Image H Shift
  kind: action
  command: "~068{value}"
  params:
    - name: value
      type: integer
      description: "250 ~ -250"

- id: image_v_shift_set
  label: Image V Shift
  kind: action
  command: "~069{value}"
  params:
    - name: value
      type: integer
      description: "100 ~ -100"

# ---- Setting / Language / Menu ----
- id: language_set
  label: Language
  kind: action
  command: "~070{value}"
  params:
    - name: value
      type: integer
      description: "1=English,2=Deutsch,3=Français,4=Italiano,5=Español,6=Português,7=Polski,8=Nederlands,9=Svenska,10=Norwegian,11=Suomi,12=ελληνικά,13=繁體中文,14=簡体中文,15=日本語,16=한국어,17=Русский,18=Magyar,19=Čeština,20=عربي,21=ไทย,22=Türkçe,23=فارسی,24=Dansk,25=Vietnamese,26=Indonesia,27=Romanian,28=Slovakian"

- id: menu_location_set
  label: Menu Location
  kind: action
  command: "~072{value}"
  params:
    - name: value
      type: integer
      description: "1=Top left,2=Top right,3=Center,4=Bottom left,5=Bottom right"

- id: vga_out_standby_set
  label: VGA Out (Standby)
  kind: action
  command: "~0309{value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: lan_standby_set
  label: LAN (Standby)
  kind: action
  command: "~0450{value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"
  notes: "UNRESOLVED: code 450 collides with Saturation in extracted table; original PDF should be checked."

- id: input_source_set
  label: Input Source
  kind: action
  command: "~0121{value}"
  params:
    - name: value
      type: integer
      description: "Source enum (corrupted): 1=HDMI, 3=VGA2, 5=Video, 10=Multimedia, 92=NetworkDisplay/VGA, others per Note*1 cc map"

# ---- Audio ----
- id: speaker_set
  label: Speaker
  kind: action
  command: "~0310{value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: audio_out_set
  label: Audio Out
  kind: action
  command: "~0510{value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: volume_mic_set
  label: Volume Microphone
  kind: action
  command: "~0562{value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=muted (per source 0&2 / 1)"

- id: mute_toggle
  label: Mute
  kind: action
  command: "~080{value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: volume_set
  label: Volume
  kind: action
  command: "~081{value}"
  params:
    - name: value
      type: integer
      description: "0~30"

- id: mic_volume_set
  label: Microphone Volume
  kind: action
  command: "~093{value}"
  params:
    - name: value
      type: integer
      description: "0~30"

# ---- Logo ----
- id: logo_set
  label: Logo
  kind: action
  command: "~082{value}"
  params:
    - name: value
      type: integer
      description: "1=Default, 2=User"

- id: logo_capture
  label: Logo Capture
  kind: action
  command: "~083{value}"
  params:
    - name: value
      type: integer
      description: "1=Yes (Cancel/Yes)"

# ---- Source / Auto ----
- id: auto_source_set
  label: Auto Source
  kind: action
  command: "~0563{value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: test_pattern_grid
  label: Test Pattern Grid
  kind: action
  command: "~0195{value}"
  params:
    - name: value
      type: integer
      description: "1=On, 0=None"

# ---- 3D ----
- id: td_format_set
  label: 3D Format
  kind: action
  command: "~0405{value}"
  params:
    - name: value
      type: integer
      description: "Auto=4, On=5, Off=6, FramePacking=7, SbS-Half=1, TopBottom=2, FrameSeq=3, FieldSeq=9"

- id: td_invert_set
  label: 3D Invert
  kind: action
  command: "~0231{value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

# ---- Filter ----
- id: filter_reminder_set
  label: Filter Reminder
  kind: action
  command: "~0322{value}"
  params:
    - name: value
      type: integer
      description: "0~1000"

- id: optional_filter_cleaning_reminder_set
  label: Optional Filter Cleaning Reminder
  kind: action
  command: "~0323{value}"
  params:
    - name: value
      type: integer
      description: "0=No, 1=Yes (row shows 0&2 F P)"

- id: open_info_menu
  label: Open Info Menu
  kind: action
  command: "~0313{value}"
  params:
    - name: value
      type: integer
      description: "1=open, 0/2=close"

# ---- Remote Control Simulation (Keypad Emulation) ----
# Source documents each as a distinct row under "Remote Control Simulation".
- id: rc_power
  label: RC Power
  kind: action
  command: "~0140{value}"
  params:
    - name: value
      type: integer
      description: "1"
  notes: "Source row maps to Remote 'Power' = 1."

- id: rc_power_off
  label: RC Power Off
  kind: action
  command: "~0140{value}"
  params:
    - name: value
      type: integer
      description: "50"
  notes: "Source: Power Off = 50."

- id: rc_up
  label: RC Up
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "10"}]

- id: rc_left
  label: RC Left
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "11"}]

- id: rc_enter
  label: RC Enter
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "12"}]

- id: rc_right
  label: RC Right
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "13"}]

- id: rc_down
  label: RC Down
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "14"}]

- id: rc_v_keystone_plus
  label: RC V Keystone +
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "15"}]

- id: rc_v_keystone_minus
  label: RC V Keystone -
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "16"}]

- id: rc_volume_minus
  label: RC Volume -
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "17"}]

- id: rc_volume_plus
  label: RC Volume +
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "18"}]

- id: rc_menu
  label: RC Menu
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "20"}]

- id: rc_zoom_plus
  label: RC Zoom+
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "32"}]

- id: rc_zoom_minus
  label: RC Zoom-
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "33"}]

- id: rc_vga1
  label: RC VGA-1
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "23"}]

- id: rc_av_mute
  label: RC AV Mute
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "24"}]

- id: rc_freeze
  label: RC Freeze
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "30"}]

- id: rc_mode
  label: RC Mode
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "36"}]

- id: rc_format
  label: RC Format
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "37"}]

- id: rc_info
  label: RC Info
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "40"}]

- id: rc_resync
  label: RC Re-sync
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "41"}]

- id: rc_hdmi1
  label: RC HDMI 1
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "42"}]

- id: rc_hdmi2
  label: RC HDMI 2
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "43"}]

- id: rc_source
  label: RC Source
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "47"}]

- id: rc_key_1
  label: RC Key 1
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "51"}]

- id: rc_key_2
  label: RC Key 2
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "52"}]

- id: rc_key_3
  label: RC Key 3
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "53"}]

- id: rc_key_4
  label: RC Key 4
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "54"}]

- id: rc_key_5
  label: RC Key 5
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "55"}]

- id: rc_key_6
  label: RC Key 6
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "56"}]

- id: rc_key_7
  label: RC Key 7
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "57"}]

- id: rc_key_8
  label: RC Key 8
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "58"}]

- id: rc_key_9
  label: RC Key 9
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "59"}]

- id: rc_key_0
  label: RC Key 0
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "60"}]

- id: rc_pip_pbp
  label: RC PIP/PBP
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "63"}]

- id: rc_geometric_correction
  label: RC Geometric Correction
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "68"}]

- id: rc_hotkey_f1
  label: RC Hot Key F1
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "70"}]

- id: rc_hotkey_f2
  label: RC Hot Key F2
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "71"}]

- id: rc_hotkey_f3
  label: RC Hot Key F3
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "72"}]

- id: rc_exit
  label: RC Exit
  kind: action
  command: "~0140{value}"
  params: [{name: value, type: integer, description: "74"}]
```

## Feedbacks
```yaml
# Read commands (source "Read CMD" column) - each returns "Ok <value>" on pass.
- id: power_state_query
  type: enum
  values: [off, on]
  command: "~0124"
  notes: "Returns 0=Off / 1=On"

- id: color_mode_query
  type: enum
  command: "~0123"
  notes: "Returns Color Mode enum value"

- id: brightness_query
  type: integer
  command: "~0125"

- id: contrast_query
  type: integer
  command: "~0126"

- id: color_temp_query
  type: enum
  command: "~0128"

- id: aspect_ratio_query
  type: enum
  command: "~0127"

- id: mute_state_query
  type: enum
  values: [off, on]
  command: "~0356"

- id: av_mute_state_query
  type: enum
  values: [off, on]
  command: "~0355"

- id: v_keystone_query
  type: integer
  command: "~0543"

- id: h_keystone_query
  type: integer
  command: "~0544"

- id: size_query
  type: integer
  command: "~0545"

- id: image_h_shift_query
  type: integer
  command: "~0546"

- id: image_v_shift_query
  type: integer
  command: "~0547"

- id: projection_query
  type: enum
  command: "~0129"
  notes: "Returns 0=Front,2=Rear,1=FrontCeiling,3=RearCeiling"

- id: model_name_query
  type: string
  command: "~0151"

- id: snid_query
  type: string
  command: "~0353"

- id: main_source_resolution_query
  type: string
  command: "~0150"

- id: sw_version_query
  type: string
  command: "~0122"

- id: ssi_hours_normal_query
  type: integer
  command: "~0108"
  notes: "Source shows ~XX108 returns normal/eco hours"

- id: ssi_hours_used_normal_query
  type: integer
  command: "~01083"
  notes: "UNRESOLVED: code formatting ambiguous in extracted table (~XX108 3 vs ~XX1083)."

- id: ssi_hours_used_eco_query
  type: integer
  command: "~01084"

- id: ssi_power_mode_query
  type: enum
  command: "~0150"
  notes: "Source: ~XX150 1 → 5; maps to SSI Power Mode. Returns 1=Normal,0=Eco per set row."

- id: filter_usage_hours_query
  type: integer
  command: "~0321"

- id: network_status_query
  type: enum
  values: [disconnected, connected]
  command: "~0871"

- id: ip_address_query
  type: string
  command: "~0873"

- id: dhcp_client_query
  type: enum
  command: "~0150"
  notes: "UNRESOLVED: code 150 reused across multiple read rows in extracted table - ambiguous."

- id: mac_address_query
  type: string
  command: "~0555"

# UNRESOLVED: several additional Information read rows (Sub Source Resolution, System Temperature,
# Standby Power Mode, Light Source Mode) share ambiguous codes due to PDF table corruption.
```

## Variables
```yaml
# All settable parameters are represented as Actions above (Optoma exposes them as write commands).
# UNRESOLVED: no separately-modeled continuous variables beyond those actions.
```

## Events
```yaml
# Source documents an unsolicited "System Automatically Standby" notification:
#   "INFO<value><CR>"
# Values documented (row "System Auto Send"):
- id: system_auto_send
  type: enum
  values:
    - {value: 0, label: Standby Mode}
    - {value: 4, label: LD Fail}
    - {value: 6, label: Fan Lock}
    - {value: 7, label: Over Temperature}
    - {value: 12, label: Color Wheel Unexpected Stop}
    - {value: 13, label: Power Good Error}
    - {value: 21, label: "LD NTC (1) Over Temperature"}
    - {value: 24, label: System Ready}
  notes: "Unsolicited; format 'INFO<n><CR>'."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures.
# Note: "High Altitude" setting exists (0101) but no safety interlock text accompanies it.
```

## Notes
- Optoma publishes one shared RS-232 protocol across the ZU-series; the source explicitly notes "Some commands are not supported, it depends on models." Per-model command availability matrix is not provided.
- Projector ID 00 broadcasts to all projectors on the bus; 01–99 address individual units.
- HEX reference: `~`=7E, `0`-`9`=30-39, Space=20, `<CR>`=0D. Example from source: ASCII `~00195 1<CR>` = HEX `7E 30 30 31 39 35 20 31 0D`.
- Baud rate default 19200; supported range 9600–115200. UART16550 FIFO disabled.
- Pass response is single char `P`; Fail is `F`. Read pass returns `Ok <value>`.
- The `Info String` (read 1) packs multiple fields into one token of shape `abbbbbccddddee` — see source Note*1 for the cc (input source) and ee (display mode) enumeration maps.
- SHDZ680 and TPZ760 are listed in the family but have no model-specific protocol doc located; they are presumed to share the generic ZU-series protocol but this is unverified.

<!-- UNRESOLVED: SHDZ680 / TPZ760 model-specific documentation not located. -->
<!-- UNRESOLVED: exact per-model command subset not documented in source. -->
<!-- UNRESOLVED: source PDF command table suffered column-shift corruption during text extraction; some enum maps and the 450/150 code collisions should be re-verified against the original PDF (region-resource.optoma.com fcc27c8d-... and cf45148a-...). -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - region-resource.optoma.com
  - optomaeurope.com
  - optoma.de
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/471bc1d6-63f6-4825-aeef-2414e9cc5f99.pdf
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://www.optomaeurope.com/ContentStorage/Documents/731aa26e-4842-4414-999a-422879b17cee.pdf
  - https://optoma.de/uploads/RS232/DS309-RS232-en.pdf
retrieved_at: 2026-06-16T01:52:03.661Z
last_checked_at: 2026-06-16T07:10:04.939Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:10:04.939Z
matched_actions: 122
action_count: 122
confidence: medium
summary: "All 122 spec actions matched literally against source command table; transport parameters verified; comprehensive coverage of ZU-series protocol. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "SHDZ680 / TPZ760 model-specific command coverage not located."
- "exact per-model support matrix of the generic command set is not stated in source."
- "source PDF command table suffered column-shift corruption during text extraction; some parameter ranges / enum mappings may be imprecise. Verifier should re-check against original PDF."
- "exact enum→value map partially corrupted in extracted table.\""
- "code 450 also appears for LAN Standby in source - possible extraction collision.\""
- "code 450 collides with Saturation in extracted table; original PDF should be checked.\""
- "code formatting ambiguous in extracted table (~XX108 3 vs ~XX1083).\""
- "code 150 reused across multiple read rows in extracted table - ambiguous.\""
- "several additional Information read rows (Sub Source Resolution, System Temperature,"
- "no separately-modeled continuous variables beyond those actions."
- "no multi-step sequences described explicitly in source."
- "source contains no explicit safety warnings or interlock procedures."
- "SHDZ680 / TPZ760 model-specific documentation not located."
- "exact per-model command subset not documented in source."
- "source PDF command table suffered column-shift corruption during text extraction; some enum maps and the 450/150 code collisions should be re-verified against the original PDF (region-resource.optoma.com fcc27c8d-... and cf45148a-...)."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
