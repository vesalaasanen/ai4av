---
spec_id: admin/viewsonic-ls860wu
schema_version: ai4av-public-spec-v1
revision: 1
title: "ViewSonic LS860WU Control Spec"
manufacturer: ViewSonic
model_family: LS860WU
aliases: []
compatible_with:
  manufacturers:
    - ViewSonic
  models:
    - LS860WU
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - viewsonicglobal.com
  - viewsonicvsa.freshdesk.com
source_urls:
  - "https://www.viewsonicglobal.com/public/products_download/user_guide/projector/LSC_6_7_8_Series/LSC%20Series%20RS-232%20LAN%20Control%20Protocol%20Specification.pdf"
  - https://www.viewsonicglobal.com/public/products_download/user_guide/Projector/LS750WU_LS850WU_LS860WU/LS750WU_LS850WU_LS860WU_UG_ENG.pdf
  - https://viewsonicvsa.freshdesk.com/support/solutions/articles/43000470420-viewsonic-projector-rs232-protocol
  - https://www.viewsonicglobal.com/public/products_download/software/projector/ls/ViewSonic_projector_LS750WU_Serial.zip
retrieved_at: 2026-06-01T20:37:47.429Z
last_checked_at: 2026-06-01T20:45:24.520Z
generated_at: 2026-06-01T20:45:24.520Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "checksum algorithm not documented in source"
  - "LAN command format described as replacing \"0x\" with \"\\\" but exact wire format unclear"
  - "max volume value not stated in source"
  - "no unsolicited notification events documented in source"
  - "no multi-step sequences documented in source"
  - "checksum computation algorithm not documented"
  - "value range for contrast, brightness, sharpness parameters not stated"
  - "volume_set parameter range not stated"
  - "input skip channel-to-input mapping beyond HDMI1(03), HDMI2(07), HDBaseT(0C) not stated"
  - "Auto Adjust function only active for non-digital inputs (VGA/Computer1/D-sub)"
  - "HDMI range values (Enhanced 0-255, Normal 16-235) mentioned but no control command documented"
verification:
  verdict: verified
  checked_at: 2026-06-01T20:45:24.520Z
  matched_actions: 127
  action_count: 127
  confidence: medium
  summary: "All 127 spec actions match literal hex codes in source command table; all transport parameters (baud 19200, 8 data bits, port 4661, no parity/flow) verified verbatim in source. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# ViewSonic LS860WU Control Spec

## Summary
ViewSonic LS860WU laser projector with RS-232 serial and TCP/IP LAN control. Binary packet protocol with per-command checksums. Covers power, source selection, image adjustment, lens control, and administrative functions.

<!-- UNRESOLVED: checksum algorithm not documented in source -->
<!-- UNRESOLVED: LAN command format described as replacing "0x" with "\" but exact wire format unclear -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 4661
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred from power on/off commands
  - queryable     # inferred from read/status query commands
  - routable      # inferred from source input selection commands
  - levelable     # inferred from volume, brightness, contrast, sharpness controls
```

## Actions
```yaml
actions:
  - id: factory_reset
    label: Reset to Factory Default
    kind: action
    command: "06 14 00 03 00 34 0C 08 5F"
    params: []
    notes: Reboot required after reset to clear parameters

  - id: lan_reset
    label: LAN Reset
    kind: action
    command: "06 14 00 04 00 34 0C 5A 00 B2"
    params: []

  - id: power_on
    label: Power On
    kind: action
    command: "06 14 00 04 00 34 11 00 00 5D"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "06 14 00 04 00 34 11 01 00 5E"
    params: []

  - id: power_read
    label: Power Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 00 5E"
    params: []

  - id: splash_black
    label: Splash Screen Black
    kind: action
    command: "06 14 00 04 00 34 11 0A 00 67"
    params: []

  - id: splash_blue
    label: Splash Screen Blue
    kind: action
    command: "06 14 00 04 00 34 11 0A 01 68"
    params: []

  - id: splash_read
    label: Splash Screen Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 0A 68"
    params: []

  - id: quick_power_off_disable
    label: Quick Power Off Disable
    kind: action
    command: "06 14 00 04 00 34 11 0B 00 68"
    params: []

  - id: quick_power_off_enable
    label: Quick Power Off Enable
    kind: action
    command: "06 14 00 04 00 34 11 0B 01 69"
    params: []

  - id: quick_power_off_read
    label: Quick Power Off Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 0B 69"
    params: []

  - id: high_altitude_off
    label: High Altitude Mode Off
    kind: action
    command: "06 14 00 04 00 34 11 0C 00 69"
    params: []

  - id: high_altitude_on
    label: High Altitude Mode On
    kind: action
    command: "06 14 00 04 00 34 11 0C 01 6A"
    params: []

  - id: high_altitude_auto
    label: High Altitude Mode Auto
    kind: action
    command: "06 14 00 04 00 34 11 0C 02 6B"
    params: []

  - id: high_altitude_read
    label: High Altitude Mode Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 0C 6A"
    params: []

  - id: lamp_mode_normal
    label: Lamp Mode Normal
    kind: action
    command: "06 14 00 04 00 34 11 10 00 6D"
    params: []

  - id: lamp_mode_full_normal
    label: Lamp Mode Full Normal
    kind: action
    command: "06 14 00 04 00 34 11 10 0B 78"
    params: []

  - id: lamp_mode_eco
    label: Lamp Mode Eco
    kind: action
    command: "06 14 00 04 00 34 11 10 01 6E"
    params: []

  - id: lamp_mode_eco_extended
    label: Lamp Mode Eco Extended
    kind: action
    command: "06 14 00 04 00 34 11 10 02 6F"
    params: []

  - id: lamp_mode_read
    label: Lamp Mode Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 10 6F"
    params: []

  - id: presentation_timer_off
    label: Presentation Timer Off
    kind: action
    command: "06 14 00 04 00 34 11 15 00 72"
    params: []

  - id: presentation_timer_1
    label: Presentation Timer 1
    kind: action
    command: "06 14 00 04 00 34 11 15 01 73"
    params: []

  - id: presentation_timer_2
    label: Presentation Timer 2
    kind: action
    command: "06 14 00 04 00 34 11 15 02 74"
    params: []

  - id: presentation_timer_3
    label: Presentation Timer 3
    kind: action
    command: "06 14 00 04 00 34 11 15 03 75"
    params: []

  - id: presentation_timer_read
    label: Presentation Timer Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 15 72"
    params: []

  - id: contrast_decrease
    label: Contrast Decrease
    kind: action
    command: "06 14 00 04 00 34 11 20 00 7D"
    params: []

  - id: contrast_increase
    label: Contrast Increase
    kind: action
    command: "06 14 00 04 00 34 11 20 01 7E"
    params: []

  - id: contrast_read
    label: Contrast Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 20 7D"
    params: []

  - id: brightness_decrease
    label: Brightness Decrease
    kind: action
    command: "06 14 00 04 00 34 11 21 00 7E"
    params: []

  - id: brightness_increase
    label: Brightness Increase
    kind: action
    command: "06 14 00 04 00 34 11 21 01 7F"
    params: []

  - id: brightness_read
    label: Brightness Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 21 7E"
    params: []

  - id: wb_red_gain_increase
    label: White Balance Red Gain Increase
    kind: action
    command: "06 14 00 04 00 34 11 22 01 80"
    params: []

  - id: wb_red_gain_decrease
    label: White Balance Red Gain Decrease
    kind: action
    command: "06 14 00 04 00 34 11 22 02 81"
    params: []

  - id: wb_red_gain_read
    label: White Balance Red Gain Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 22 80"
    params: []

  - id: wb_green_gain_increase
    label: White Balance Green Gain Increase
    kind: action
    command: "06 14 00 04 00 34 11 23 01 81"
    params: []

  - id: wb_green_gain_decrease
    label: White Balance Green Gain Decrease
    kind: action
    command: "06 14 00 04 00 34 11 23 02 82"
    params: []

  - id: wb_green_gain_read
    label: White Balance Green Gain Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 23 81"
    params: []

  - id: wb_blue_gain_increase
    label: White Balance Blue Gain Increase
    kind: action
    command: "06 14 00 04 00 34 11 24 01 82"
    params: []

  - id: wb_blue_gain_decrease
    label: White Balance Blue Gain Decrease
    kind: action
    command: "06 14 00 04 00 34 11 24 02 83"
    params: []

  - id: wb_blue_gain_read
    label: White Balance Blue Gain Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 24 82"
    params: []

  - id: sharpness_decrease
    label: Sharpness Decrease
    kind: action
    command: "06 14 00 04 00 34 11 25 00 82"
    params: []

  - id: sharpness_increase
    label: Sharpness Increase
    kind: action
    command: "06 14 00 04 00 34 11 25 01 83"
    params: []

  - id: sharpness_read
    label: Sharpness Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 25 82"
    params: []

  - id: zoom_increase
    label: Zoom Increase
    kind: action
    command: "06 14 00 04 00 34 11 26 01 84"
    params: []

  - id: zoom_decrease
    label: Zoom Decrease
    kind: action
    command: "06 14 00 04 00 34 11 26 02 85"
    params: []

  - id: zoom_read
    label: Zoom Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 26 83"
    params: []

  - id: focus_increase
    label: Focus Increase
    kind: action
    command: "06 14 00 04 00 34 11 27 01 85"
    params: []

  - id: focus_decrease
    label: Focus Decrease
    kind: action
    command: "06 14 00 04 00 34 11 27 02 86"
    params: []

  - id: focus_read
    label: Focus Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 27 84"
    params: []

  - id: freeze_on
    label: Freeze On
    kind: action
    command: "06 14 00 04 00 34 13 00 01 60"
    params: []

  - id: freeze_off
    label: Freeze Off
    kind: action
    command: "06 14 00 04 00 34 13 00 00 5F"
    params: []

  - id: freeze_read
    label: Freeze Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 13 00 60"
    params: []

  - id: aspect_auto
    label: Aspect Ratio Auto
    kind: action
    command: "06 14 00 04 00 34 11 30 00 87"
    params: []

  - id: aspect_4_3
    label: Aspect Ratio 4:3
    kind: action
    command: "06 14 00 04 00 34 11 30 01 88"
    params: []

  - id: aspect_16_9
    label: Aspect Ratio 16:9
    kind: action
    command: "06 14 00 04 00 34 11 30 02 89"
    params: []

  - id: aspect_16_10
    label: Aspect Ratio 16:10
    kind: action
    command: "06 14 00 04 00 34 11 30 03 8A"
    params: []

  - id: aspect_panorama
    label: Aspect Ratio Panorama
    kind: action
    command: "06 14 00 04 00 34 11 30 04 8B"
    params: []

  - id: aspect_2_35_1
    label: Aspect Ratio 2.35:1
    kind: action
    command: "06 14 00 04 00 34 11 30 05 8C"
    params: []

  - id: aspect_2_35_2
    label: Aspect Ratio 2.35:2
    kind: action
    command: "06 14 00 04 00 34 11 30 06 8D"
    params: []

  - id: aspect_native
    label: Aspect Ratio Native
    kind: action
    command: "06 14 00 04 00 34 11 30 07 8E"
    params: []

  - id: aspect_read
    label: Aspect Ratio Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 30 87"
    params: []

  - id: source_dsub_comp1
    label: Source D-Sub / Comp.1
    kind: action
    command: "06 14 00 04 00 34 13 01 00 60"
    params: []

  - id: source_hdmi1
    label: Source HDMI 1
    kind: action
    command: "06 14 00 04 00 34 13 01 03 63"
    params: []

  - id: source_hdmi2
    label: Source HDMI 2
    kind: action
    command: "06 14 00 04 00 34 13 01 07 67"
    params: []

  - id: source_hdbaset
    label: Source HDBaseT
    kind: action
    command: "06 14 00 04 00 34 13 01 0C 6C"
    params: []

  - id: source_usb_reader
    label: Source USB Reader / USB1
    kind: action
    command: "06 14 00 04 00 34 13 01 1A 7A"
    params: []

  - id: source_lan_wifi
    label: Source LAN / WiFi Display
    kind: action
    command: "06 14 00 04 00 34 13 01 1B 7B"
    params: []

  - id: source_usb_display
    label: Source USB Display
    kind: action
    command: "06 14 00 04 00 34 13 01 1C 7C"
    params: []

  - id: source_read
    label: Source Input Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 13 01 61"
    params: []

  - id: quick_auto_search_on
    label: Quick Auto Search On
    kind: action
    command: "06 14 00 04 00 34 13 02 01 62"
    params: []

  - id: quick_auto_search_off
    label: Quick Auto Search Off
    kind: action
    command: "06 14 00 04 00 34 13 02 00 61"
    params: []

  - id: quick_auto_search_read
    label: Quick Auto Search Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 13 02 62"
    params: []

  - id: mute_on
    label: Mute On
    kind: action
    command: "06 14 00 04 00 34 14 00 01 61"
    params: []
    notes: Only active when input source is applied

  - id: mute_off
    label: Mute Off
    kind: action
    command: "06 14 00 04 00 34 14 00 00 60"
    params: []

  - id: mute_read
    label: Mute Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 14 00 61"
    params: []

  - id: volume_increase
    label: Volume Increase
    kind: action
    command: "06 14 00 04 00 34 14 01 00 61"
    params: []

  - id: volume_decrease
    label: Volume Decrease
    kind: action
    command: "06 14 00 04 00 34 14 02 00 62"
    params: []

  - id: volume_set
    label: Volume Set Value
    kind: action
    command: "06 14 00 04 00 34 13 2A {value} {checksum}"
    params:
      - name: value
        type: integer
        description: Volume level value
    notes: Last byte is checksum computed over preceding bytes

  - id: volume_read
    label: Volume Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 14 03 64"
    params: []

  - id: dde_film
    label: DDE Mode Film
    kind: action
    command: "06 14 00 04 00 34 11 31 00 88"
    params: []

  - id: dde_video
    label: DDE Mode Video
    kind: action
    command: "06 14 00 04 00 34 11 31 01 89"
    params: []

  - id: dde_standard
    label: DDE Mode Standard
    kind: action
    command: "06 14 00 04 00 34 11 31 02 8A"
    params: []

  - id: dde_read
    label: DDE Mode Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 31 88"
    params: []

  - id: color_temp_6500k
    label: Color Temperature 6500K
    kind: action
    command: "06 14 00 04 00 34 11 32 00 89"
    params: []

  - id: color_temp_7000k
    label: Color Temperature 7000K
    kind: action
    command: "06 14 00 04 00 34 11 32 01 8A"
    params: []

  - id: color_temp_7500k
    label: Color Temperature 7500K
    kind: action
    command: "06 14 00 04 00 34 11 32 02 8B"
    params: []

  - id: color_temp_9000k
    label: Color Temperature 9000K
    kind: action
    command: "06 14 00 04 00 34 11 32 03 8C"
    params: []

  - id: color_temp_9300k
    label: Color Temperature 9300K
    kind: action
    command: "06 14 00 04 00 34 11 32 04 8D"
    params: []

  - id: color_temp_user1
    label: Color Temperature User1
    kind: action
    command: "06 14 00 04 00 34 11 32 05 8E"
    params: []

  - id: color_temp_user2
    label: Color Temperature User2
    kind: action
    command: "06 14 00 04 00 34 11 32 06 8F"
    params: []

  - id: color_temp_user3
    label: Color Temperature User3
    kind: action
    command: "06 14 00 04 00 34 11 32 07 90"
    params: []

  - id: color_temp_user4
    label: Color Temperature User4
    kind: action
    command: "06 14 00 04 00 34 11 32 08 91"
    params: []

  - id: color_temp_read
    label: Color Temperature Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 32 89"
    params: []

  - id: color_space_auto
    label: Color Space Auto
    kind: action
    command: "06 14 00 04 00 34 11 33 00 8A"
    params: []

  - id: color_space_rgb
    label: Color Space RGB
    kind: action
    command: "06 14 00 04 00 34 11 33 01 8B"
    params: []

  - id: color_space_yuv
    label: Color Space YUV
    kind: action
    command: "06 14 00 04 00 34 11 33 02 8C"
    params: []

  - id: color_space_read
    label: Color Space Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 33 8A"
    params: []

  - id: input_skip_ch03_on
    label: Input Skip Channel 03 On
    kind: action
    command: "06 14 00 04 00 34 13 03 01 64"
    params: []

  - id: input_skip_ch03_off
    label: Input Skip Channel 03 Off
    kind: action
    command: "06 14 00 04 00 34 13 03 00 63"
    params: []

  - id: input_skip_ch03_read
    label: Input Skip Channel 03 Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 13 03 63"
    params: []

  - id: input_skip_ch04_on
    label: Input Skip Channel 04 On
    kind: action
    command: "06 14 00 04 00 34 13 04 01 65"
    params: []

  - id: input_skip_ch04_off
    label: Input Skip Channel 04 Off
    kind: action
    command: "06 14 00 04 00 34 13 04 00 64"
    params: []

  - id: input_skip_ch04_read
    label: Input Skip Channel 04 Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 13 04 64"
    params: []

  - id: input_skip_ch05_on
    label: Input Skip Channel 05 On
    kind: action
    command: "06 14 00 04 00 34 13 05 01 66"
    params: []

  - id: input_skip_ch05_off
    label: Input Skip Channel 05 Off
    kind: action
    command: "06 14 00 04 00 34 13 05 00 65"
    params: []

  - id: input_skip_ch05_read
    label: Input Skip Channel 05 Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 13 05 65"
    params: []

  - id: input_skip_ch06_on
    label: Input Skip Channel 06 On
    kind: action
    command: "06 14 00 04 00 34 13 06 01 67"
    params: []

  - id: input_skip_ch06_off
    label: Input Skip Channel 06 Off
    kind: action
    command: "06 14 00 04 00 34 13 06 00 66"
    params: []

  - id: input_skip_ch06_read
    label: Input Skip Channel 06 Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 13 06 66"
    params: []

  - id: input_skip_ch07_on
    label: Input Skip Channel 07 On
    kind: action
    command: "06 14 00 04 00 34 13 07 01 68"
    params: []

  - id: input_skip_ch07_off
    label: Input Skip Channel 07 Off
    kind: action
    command: "06 14 00 04 00 34 13 07 00 67"
    params: []

  - id: input_skip_ch07_read
    label: Input Skip Channel 07 Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 13 07 67"
    params: []

  - id: input_skip_ch08_on
    label: Input Skip Channel 08 On
    kind: action
    command: "06 14 00 04 00 34 13 08 01 69"
    params: []

  - id: input_skip_ch08_off
    label: Input Skip Channel 08 Off
    kind: action
    command: "06 14 00 04 00 34 13 08 00 68"
    params: []

  - id: input_skip_ch08_read
    label: Input Skip Channel 08 Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 13 08 68"
    params: []

  - id: input_skip_ch09_on
    label: Input Skip Channel 09 On
    kind: action
    command: "06 14 00 04 00 34 13 09 01 6A"
    params: []

  - id: input_skip_ch09_off
    label: Input Skip Channel 09 Off
    kind: action
    command: "06 14 00 04 00 34 13 09 00 69"
    params: []

  - id: input_skip_ch09_read
    label: Input Skip Channel 09 Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 13 09 69"
    params: []

  - id: input_skip_ch0a_on
    label: Input Skip Channel 0A On
    kind: action
    command: "06 14 00 04 00 34 13 0A 01 6B"
    params: []

  - id: input_skip_ch0a_off
    label: Input Skip Channel 0A Off
    kind: action
    command: "06 14 00 04 00 34 13 0A 00 6A"
    params: []

  - id: input_skip_ch0a_read
    label: Input Skip Channel 0A Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 13 0A 6A"
    params: []

  - id: input_skip_ch0b_on
    label: Input Skip Channel 0B On
    kind: action
    command: "06 14 00 04 00 34 13 0B 01 6C"
    params: []

  - id: input_skip_ch0b_off
    label: Input Skip Channel 0B Off
    kind: action
    command: "06 14 00 04 00 34 13 0B 00 6B"
    params: []

  - id: input_skip_ch0b_read
    label: Input Skip Channel 0B Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 13 0B 6B"
    params: []

  - id: input_skip_ch0c_on
    label: Input Skip Channel 0C On
    kind: action
    command: "06 14 00 04 00 34 13 0C 01 6D"
    params: []

  - id: input_skip_ch0c_off
    label: Input Skip Channel 0C Off
    kind: action
    command: "06 14 00 04 00 34 13 0C 00 6C"
    params: []

  - id: input_skip_ch0c_read
    label: Input Skip Channel 0C Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 13 0C 6C"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [off, on, warm_up, cool_down]
    notes: "Read response byte7: 0x00=off, 0x01=on, 0x02=warm up, 0x03=cool down"

  - id: splash_screen_state
    type: enum
    values: [black, blue]
    notes: "Read response byte7: 0x00=black, 0x01=blue"

  - id: quick_power_off_state
    type: enum
    values: ["off", "on"]
    notes: "Read response byte7: 0x00=off, 0x01=on"

  - id: high_altitude_state
    type: enum
    values: [off, on, auto]
    notes: "Read response byte7: 0x00=off, 0x01=on, 0x02=auto"

  - id: lamp_mode_state
    type: enum
    values: [normal, eco, eco_extended, full_normal]
    notes: "Read response byte7: 0x00=normal, 0x01=eco, 0x02=eco_extended, 0x0B=full_normal"

  - id: presentation_timer_state
    type: enum
    values: [off, timer_1, timer_2, timer_3]
    notes: "Read response byte7: 0x00=off, 0x01=timer1, 0x02=timer2, 0x03=timer3"

  - id: contrast_level
    type: integer
    notes: "Read response returns current contrast level"

  - id: brightness_level
    type: integer
    notes: "Read response returns current brightness level"

  - id: wb_red_gain
    type: integer
    notes: "Read response returns current red gain value"

  - id: wb_green_gain
    type: integer
    notes: "Read response returns current green gain value"

  - id: wb_blue_gain
    type: integer
    notes: "Read response returns current blue gain value"

  - id: sharpness_level
    type: integer
    notes: "Read response returns current sharpness level"

  - id: zoom_level
    type: integer
    notes: "Read response returns current zoom level"

  - id: focus_level
    type: integer
    notes: "Read response returns current focus level"

  - id: freeze_state
    type: enum
    values: [off, on]
    notes: "Read response byte7: 0x00=off, 0x01=on. Refer to value mapping table 3.2.1 (1 byte)"

  - id: aspect_ratio_state
    type: enum
    values: [auto, "4:3", "16:9", "16:10", panorama, "2.35:1", "2.35:2", native]
    notes: "Read response byte7: 0x00=auto, 0x01=4:3, 0x02=16:9, 0x03=16:10, 0x04=panorama, 0x05=2.35:1, 0x06=2.35:2, 0x07=native"

  - id: source_input_state
    type: enum
    values: [dsub_comp1, hdmi1, hdmi2, hdbaset, usb_reader, lan_wifi_display, usb_display]
    notes: "Read response byte7: 0x00=D-Sub/Comp.1, 0x03=HDMI1, 0x07=HDMI2, 0x0C=HDBaseT, 0x1A=USB Reader/USB1, 0x1B=LAN/WiFi Display, 0x1C=USB Display"

  - id: quick_auto_search_state
    type: enum
    values: [off, on]
    notes: "Read response byte7: 0x00=off, 0x01=on"

  - id: mute_state
    type: enum
    values: [off, on]
    notes: "Read response byte7: 0x00=off, 0x01=on. Only active when input source applied."

  - id: volume_level
    type: integer
    notes: "Read response returns current volume level"

  - id: dde_mode_state
    type: enum
    values: [film, video, standard]
    notes: "Read response byte7: 0x00=film, 0x01=video, 0x02=standard"

  - id: color_temperature_state
    type: enum
    values: ["6500K", "7000K", "7500K", "9000K", "9300K", user1, user2, user3, user4]
    notes: "Read response byte7: 0x00=6500K, 0x01=7000K, 0x02=7500K, 0x03=9000K, 0x04=9300K, 0x05=User1, 0x06=User2, 0x07=User3, 0x08=User4"

  - id: color_space_state
    type: enum
    values: [auto, rgb, yuv]
    notes: "Read response byte7: 0x00=auto, 0x01=RGB, 0x02=YUV"

  - id: input_skip_ch03_state
    type: enum
    values: [off, on]

  - id: input_skip_ch04_state
    type: enum
    values: [off, on]

  - id: input_skip_ch05_state
    type: enum
    values: [off, on]

  - id: input_skip_ch06_state
    type: enum
    values: [off, on]

  - id: input_skip_ch07_state
    type: enum
    values: [off, on]

  - id: input_skip_ch08_state
    type: enum
    values: [off, on]

  - id: input_skip_ch09_state
    type: enum
    values: [off, on]

  - id: input_skip_ch0a_state
    type: enum
    values: [off, on]

  - id: input_skip_ch0b_state
    type: enum
    values: [off, on]

  - id: input_skip_ch0c_state
    type: enum
    values: [off, on]

  - id: operating_temperature
    type: float
    notes: "Response byte7-byte10 little-endian HEX divided by 10 = degrees C. Ex: 0x00000129=297 -> 29.7 C"

  - id: light_source_usage_time
    type: integer
    notes: "Response byte7-byte10 little-endian HEX = hours. Ex: 0x00000BB8=3000 -> 3000 hrs"
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    min: 0
    max: null  # UNRESOLVED: max volume value not stated in source
    access: rw
    notes: Set via volume_set command, read via volume_read
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: |
  Warm Up and Cool Down phases: do not send other commands during these states.
  Factory reset requires projector reboot to clear parameters.
  Power Off requires LAN control settings / Standby LAN Control set to ON for LAN reboot.
  Response 0x00 0x14 0x00 0x00 0x00 0x14 at first byte indicates function is disabled (greyed out).
```

## Notes
- Connector: DSUB 9-Pin male, pins 2(RXD), 3(TXD), 5(GND). Crossover (null modem) cable required if needed.
- LAN format: replace hex "0x" prefix with "\" for TCP commands on port 4661. Exception: Pro9 series uses RS232 codes and port 23.
- Baud rates supported: 4800, 9600, 19200 (default), 38400.
- Write command acknowledgment: `03 14 00 00 00 14`
- Read command response: `05 14 00 03 00 00 00 {value_byte} {checksum}`
- Functions greyed out in OSD respond with `00 14 00 00 00 14` indicating disabled state.
- Mute only active when input source is applied.
- Source entries 60-61 and 81-83 in original table are duplicates of Freeze and Volume commands respectively.

<!-- UNRESOLVED: checksum computation algorithm not documented -->
<!-- UNRESOLVED: value range for contrast, brightness, sharpness parameters not stated -->
<!-- UNRESOLVED: volume_set parameter range not stated -->
<!-- UNRESOLVED: input skip channel-to-input mapping beyond HDMI1(03), HDMI2(07), HDBaseT(0C) not stated -->
<!-- UNRESOLVED: Auto Adjust function only active for non-digital inputs (VGA/Computer1/D-sub) -->
<!-- UNRESOLVED: HDMI range values (Enhanced 0-255, Normal 16-235) mentioned but no control command documented -->

## Provenance

```yaml
source_domains:
  - viewsonicglobal.com
  - viewsonicvsa.freshdesk.com
source_urls:
  - "https://www.viewsonicglobal.com/public/products_download/user_guide/projector/LSC_6_7_8_Series/LSC%20Series%20RS-232%20LAN%20Control%20Protocol%20Specification.pdf"
  - https://www.viewsonicglobal.com/public/products_download/user_guide/Projector/LS750WU_LS850WU_LS860WU/LS750WU_LS850WU_LS860WU_UG_ENG.pdf
  - https://viewsonicvsa.freshdesk.com/support/solutions/articles/43000470420-viewsonic-projector-rs232-protocol
  - https://www.viewsonicglobal.com/public/products_download/software/projector/ls/ViewSonic_projector_LS750WU_Serial.zip
retrieved_at: 2026-06-01T20:37:47.429Z
last_checked_at: 2026-06-01T20:45:24.520Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T20:45:24.520Z
matched_actions: 127
action_count: 127
confidence: medium
summary: "All 127 spec actions match literal hex codes in source command table; all transport parameters (baud 19200, 8 data bits, port 4661, no parity/flow) verified verbatim in source. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "checksum algorithm not documented in source"
- "LAN command format described as replacing \"0x\" with \"\\\" but exact wire format unclear"
- "max volume value not stated in source"
- "no unsolicited notification events documented in source"
- "no multi-step sequences documented in source"
- "checksum computation algorithm not documented"
- "value range for contrast, brightness, sharpness parameters not stated"
- "volume_set parameter range not stated"
- "input skip channel-to-input mapping beyond HDMI1(03), HDMI2(07), HDBaseT(0C) not stated"
- "Auto Adjust function only active for non-digital inputs (VGA/Computer1/D-sub)"
- "HDMI range values (Enhanced 0-255, Normal 16-235) mentioned but no control command documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
