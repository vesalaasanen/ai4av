---
spec_id: admin/viewsonic-viewsonic-projectors
schema_version: ai4av-public-spec-v1
revision: 1
title: "ViewSonic Projectors Control Spec"
manufacturer: ViewSonic
model_family: "ViewSonic Projectors"
aliases: []
compatible_with:
  manufacturers:
    - ViewSonic
  models:
    - "ViewSonic Projectors"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - viewsonicglobal.com
source_urls:
  - "https://www.viewsonicglobal.com/public/products_download/user_guide/projector/LSC_6_7_8_Series/LSC%20Series%20RS-232%20LAN%20Control%20Protocol%20Specification.pdf"
retrieved_at: 2026-04-30T04:25:07.876Z
last_checked_at: 2026-06-01T20:45:25.304Z
generated_at: 2026-06-01T20:45:25.304Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific projector models not enumerated in source"
  - "firmware version compatibility not stated"
  - "command packet structure (header, length, function code fields) not formally documented beyond examples"
  - "checksum algorithm not explicitly stated; inferred from examples as sum of bytes[1..n-1] mod 256"
  - "contrast/brightness/sharpness valid value range not stated, only example values 0x00 and 0x01 shown"
  - "zoom and focus value ranges not stated; source shows only 0x01 and 0x02 examples"
  - "volume_set valid range not stated; source shows only 0x11 (17) example"
  - "checksum computation algorithm not explicitly stated in source; empirically verified as sum of bytes[1..n-1] mod 256 across multiple commands"
  - "input_skip input sub-address 0A-0C exact input mapping not labeled in source"
  - "freeze read response references \"value mapping table 3.2.1\" which was not included in source"
  - "operating temperature query command bytes not provided in source, only response format"
  - "light source usage time query command bytes not provided in source, only response format"
  - "source does not document unsolicited notification events"
  - "specific projector models covered by this protocol not enumerated"
  - "checksum algorithm not explicitly documented"
  - "contrast/brightness/sharpness/volume/zoom/focus valid value ranges not stated"
  - "input_skip sub-addresses 0A-0C exact input mapping not labeled"
  - "Freeze Read \"value mapping table 3.2.1\" referenced but not included in source"
  - "operating temperature and light source usage time query command bytes not in extracted source"
  - "error response status format documented (Note 3) for service debug only"
verification:
  verdict: verified
  checked_at: 2026-06-01T20:45:25.304Z
  matched_actions: 95
  action_count: 95
  confidence: medium
  summary: "All 95 spec actions matched exactly to source hex sequences; transport parameters verified; comprehensive protocol coverage. (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# ViewSonic Projectors Control Spec

## Summary

Binary RS-232 and LAN control protocol for ViewSonic projectors. Supports power, source selection, image adjustment (contrast, brightness, sharpness, zoom, focus), aspect ratio, color settings, volume, mute, freeze, lamp mode, and input skip. Commands are variable-length hex byte packets with trailing checksum. LAN transport uses the same byte values with backslash-escaped hex over TCP port 4661.

<!-- UNRESOLVED: specific projector models not enumerated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: command packet structure (header, length, function code fields) not formally documented beyond examples -->
<!-- UNRESOLVED: checksum algorithm not explicitly stated; inferred from examples as sum of bytes[1..n-1] mod 256 -->

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
  type: none
```

<!-- baud_rate default 19200; also supports 4800, 9600, 38400 per source -->
<!-- LAN port 4661; exception: Pro9 series uses port 23 per source Note 2 -->
<!-- LAN format: replace "0x" prefix with "\" backslash escape, same byte values -->
<!-- auth.type inferred: no login or password procedure described in source -->

## Traits

```yaml
traits:
  - powerable
  - queryable
  - routable
  - levelable
```

<!-- powerable: power on/off commands -->
<!-- queryable: read/status query commands for most functions -->
<!-- routable: source input selection commands -->
<!-- levelable: volume, contrast, brightness, sharpness, zoom, focus, white balance -->

## Actions

```yaml
actions:
  - id: factory_reset
    label: Reset to Factory Default
    kind: action
    command: "06 14 00 03 00 34 0C 08 5F"
    params: []
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
  - id: quick_power_off_off
    label: Quick Power Off Disable
    kind: action
    command: "06 14 00 04 00 34 11 0B 00 68"
    params: []
  - id: quick_power_off_on
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
  - id: pres_timer_off
    label: Presentation Timer Off
    kind: action
    command: "06 14 00 04 00 34 11 15 00 72"
    params: []
  - id: pres_timer_1
    label: Presentation Timer 1
    kind: action
    command: "06 14 00 04 00 34 11 15 01 73"
    params: []
  - id: pres_timer_2
    label: Presentation Timer 2
    kind: action
    command: "06 14 00 04 00 34 11 15 02 74"
    params: []
  - id: pres_timer_3
    label: Presentation Timer 3
    kind: action
    command: "06 14 00 04 00 34 11 15 03 75"
    params: []
  - id: pres_timer_read
    label: Presentation Timer Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 15 72"
    params: []
  - id: contrast_set
    label: Contrast Set
    kind: action
    command: "06 14 00 04 00 34 11 20 {value} {checksum}"
    params:
      - name: value
        type: integer
        description: Contrast value byte
  - id: contrast_read
    label: Contrast Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 20 7D"
    params: []
  - id: brightness_set
    label: Brightness Set
    kind: action
    command: "06 14 00 04 00 34 11 21 {value} {checksum}"
    params:
      - name: value
        type: integer
        description: Brightness value byte
  - id: brightness_read
    label: Brightness Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 21 7E"
    params: []
  - id: wb_red_increase
    label: White Balance Red Gain Increase
    kind: action
    command: "06 14 00 04 00 34 11 22 01 80"
    params: []
  - id: wb_red_decrease
    label: White Balance Red Gain Decrease
    kind: action
    command: "06 14 00 04 00 34 11 22 02 81"
    params: []
  - id: wb_red_read
    label: White Balance Red Gain Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 22 80"
    params: []
  - id: wb_green_increase
    label: White Balance Green Gain Increase
    kind: action
    command: "06 14 00 04 00 34 11 23 01 81"
    params: []
  - id: wb_green_decrease
    label: White Balance Green Gain Decrease
    kind: action
    command: "06 14 00 04 00 34 11 23 02 82"
    params: []
  - id: wb_green_read
    label: White Balance Green Gain Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 23 81"
    params: []
  - id: wb_blue_increase
    label: White Balance Blue Gain Increase
    kind: action
    command: "06 14 00 04 00 34 11 24 01 82"
    params: []
  - id: wb_blue_decrease
    label: White Balance Blue Gain Decrease
    kind: action
    command: "06 14 00 04 00 34 11 24 02 83"
    params: []
  - id: wb_blue_read
    label: White Balance Blue Gain Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 24 82"
    params: []
  - id: sharpness_set
    label: Sharpness Set
    kind: action
    command: "06 14 00 04 00 34 11 25 {value} {checksum}"
    params:
      - name: value
        type: integer
        description: Sharpness value byte
  - id: sharpness_read
    label: Sharpness Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 25 82"
    params: []
  - id: zoom_set
    label: Zoom Set
    kind: action
    command: "06 14 00 04 00 34 11 26 {value} {checksum}"
    params:
      - name: value
        type: integer
        description: "Zoom value byte (01=increase, 02=decrease per source examples)"
  - id: zoom_read
    label: Zoom Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 11 26 83"
    params: []
  - id: focus_set
    label: Focus Set
    kind: action
    command: "06 14 00 04 00 34 11 27 {value} {checksum}"
    params:
      - name: value
        type: integer
        description: "Focus value byte (01=increase, 02=decrease per source examples)"
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
  - id: aspect_235_1
    label: Aspect Ratio 2.35:1
    kind: action
    command: "06 14 00 04 00 34 11 30 05 8C"
    params: []
  - id: aspect_235_2
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
  - id: source_dsub
    label: Source D-Sub / Component 1
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
  - id: auto_search_on
    label: Quick Auto Search On
    kind: action
    command: "06 14 00 04 00 34 13 02 01 62"
    params: []
  - id: auto_search_off
    label: Quick Auto Search Off
    kind: action
    command: "06 14 00 04 00 34 13 02 00 61"
    params: []
  - id: auto_search_read
    label: Quick Auto Search Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 13 02 62"
    params: []
  - id: mute_on
    label: Mute On
    kind: action
    command: "06 14 00 04 00 34 14 00 01 61"
    params: []
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
        description: "Volume level (e.g. 0x11 = 17 per source example)"
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
  - id: input_skip_on
    label: Input Skip On
    kind: action
    command: "06 14 00 04 00 34 13 {input} 01 {checksum}"
    params:
      - name: input
        type: integer
        description: "Input sub-address byte (03=DSub, 04=HDMI1, 05=HDMI2, 06=HDBaseT, 07=USB Reader, 08=LAN/WiFi, 09=USB Display, 0A=input9, 0B=input10, 0C=input11)"
  - id: input_skip_off
    label: Input Skip Off
    kind: action
    command: "06 14 00 04 00 34 13 {input} 00 {checksum}"
    params:
      - name: input
        type: integer
        description: "Input sub-address byte (03=DSub, 04=HDMI1, 05=HDMI2, 06=HDBaseT, 07=USB Reader, 08=LAN/WiFi, 09=USB Display, 0A=input9, 0B=input10, 0C=input11)"
  - id: input_skip_read
    label: Input Skip Status Query
    kind: query
    command: "07 14 00 05 00 34 00 00 13 {input} {checksum}"
    params:
      - name: input
        type: integer
        description: "Input sub-address byte (03-0C)"
```

<!-- UNRESOLVED: contrast/brightness/sharpness valid value range not stated, only example values 0x00 and 0x01 shown -->
<!-- UNRESOLVED: zoom and focus value ranges not stated; source shows only 0x01 and 0x02 examples -->
<!-- UNRESOLVED: volume_set valid range not stated; source shows only 0x11 (17) example -->
<!-- UNRESOLVED: checksum computation algorithm not explicitly stated in source; empirically verified as sum of bytes[1..n-1] mod 256 across multiple commands -->
<!-- UNRESOLVED: input_skip input sub-address 0A-0C exact input mapping not labeled in source -->

## Feedbacks

```yaml
feedbacks:
  - id: power_state
    type: enum
    values:
      - key: "00"
        label: Power Off
      - key: "01"
        label: Power On
      - key: "02"
        label: Warm Up
      - key: "03"
        label: Cool Down
    response_format: "05 14 00 03 00 00 00 {status} {checksum}"
  - id: splash_screen
    type: enum
    values:
      - key: "00"
        label: Black
      - key: "01"
        label: Blue
    response_format: "05 14 00 03 00 00 00 {status} {checksum}"
  - id: quick_power_off_state
    type: enum
    values:
      - key: "00"
        label: Off
      - key: "01"
        label: On
    response_format: "05 14 00 03 00 00 00 {status} {checksum}"
  - id: high_altitude_state
    type: enum
    values:
      - key: "00"
        label: Off
      - key: "01"
        label: On
      - key: "02"
        label: Auto
    response_format: "05 14 00 03 00 00 00 {status} {checksum}"
  - id: lamp_mode_state
    type: enum
    values:
      - key: "00"
        label: Normal
      - key: "01"
        label: Eco
      - key: "02"
        label: Eco Extended
      - key: "0B"
        label: Full Normal
    response_format: "05 14 00 03 00 00 00 {status} {checksum}"
  - id: pres_timer_state
    type: enum
    values:
      - key: "00"
        label: Off
      - key: "01"
        label: Timer 1
      - key: "02"
        label: Timer 2
      - key: "03"
        label: Timer 3
    response_format: "05 14 00 03 00 00 00 {status} {checksum}"
  - id: contrast_level
    type: integer
    response_format: "05 14 00 03 00 00 00 {value} {checksum}"
  - id: brightness_level
    type: integer
    response_format: "05 14 00 03 00 00 00 {value} {checksum}"
  - id: wb_red_gain
    type: integer
    response_format: "05 14 00 03 00 00 00 {value} {checksum}"
  - id: wb_green_gain
    type: integer
    response_format: "05 14 00 03 00 00 00 {value} {checksum}"
  - id: wb_blue_gain
    type: integer
    response_format: "05 14 00 03 00 00 00 {value} {checksum}"
  - id: sharpness_level
    type: integer
    response_format: "05 14 00 03 00 00 00 {value} {checksum}"
  - id: zoom_level
    type: integer
    response_format: "05 14 00 03 00 00 00 {value} {checksum}"
  - id: focus_level
    type: integer
    response_format: "05 14 00 03 00 00 00 {value} {checksum}"
  - id: freeze_state
    type: enum
    values:
      - key: "00"
        label: Off
      - key: "01"
        label: On
    response_format: "05 14 00 03 00 00 00 {status} {checksum}"
  - id: aspect_ratio
    type: enum
    values:
      - key: "00"
        label: Auto
      - key: "01"
        label: "4:3"
      - key: "02"
        label: "16:9"
      - key: "03"
        label: "16:10"
      - key: "04"
        label: Panorama
      - key: "05"
        label: "2.35:1"
      - key: "06"
        label: "2.35:2"
      - key: "07"
        label: Native
    response_format: "05 14 00 03 00 00 00 {status} {checksum}"
  - id: source_input
    type: enum
    values:
      - key: "00"
        label: D-Sub / Component 1
      - key: "03"
        label: HDMI 1
      - key: "07"
        label: HDMI 2
      - key: "0C"
        label: HDBaseT
      - key: "1A"
        label: USB Reader / USB1
      - key: "1B"
        label: LAN / WiFi Display
      - key: "1C"
        label: USB Display
    response_format: "05 14 00 03 00 00 00 {status} {checksum}"
  - id: auto_search_state
    type: enum
    values:
      - key: "00"
        label: Off
      - key: "01"
        label: On
    response_format: "05 14 00 03 00 00 00 {status} {checksum}"
  - id: mute_state
    type: enum
    values:
      - key: "00"
        label: Off
      - key: "01"
        label: On
    response_format: "05 14 00 03 00 00 00 {status} {checksum}"
  - id: volume_level
    type: integer
    response_format: "05 14 00 03 00 00 00 {value} {checksum}"
  - id: dde_mode
    type: enum
    values:
      - key: "00"
        label: Film
      - key: "01"
        label: Video
      - key: "02"
        label: Standard
    response_format: "05 14 00 03 00 00 00 {status} {checksum}"
  - id: color_temperature
    type: enum
    values:
      - key: "00"
        label: 6500K
      - key: "01"
        label: 7000K
      - key: "02"
        label: 7500K
      - key: "03"
        label: 9000K
      - key: "04"
        label: 9300K
      - key: "05"
        label: User1
      - key: "06"
        label: User2
      - key: "07"
        label: User3
      - key: "08"
        label: User4
    response_format: "05 14 00 03 00 00 00 {status} {checksum}"
  - id: color_space
    type: enum
    values:
      - key: "00"
        label: Auto
      - key: "01"
        label: RGB
      - key: "02"
        label: YUV
    response_format: "05 14 00 03 00 00 00 {status} {checksum}"
  - id: input_skip_state
    type: enum
    values:
      - key: "00"
        label: Off
      - key: "01"
        label: On
    response_format: "05 14 00 03 00 00 00 {status} {checksum}"
  - id: function_disabled
    type: flag
    description: "Response 00 14 00 00 00 14 indicates function is disabled or greyed out"
```

<!-- UNRESOLVED: freeze read response references "value mapping table 3.2.1" which was not included in source -->
<!-- UNRESOLVED: operating temperature query command bytes not provided in source, only response format -->
<!-- UNRESOLVED: light source usage time query command bytes not provided in source, only response format -->

## Variables

```yaml
variables: []
```

<!-- All settable parameters are represented as Actions with explicit command bytes -->

## Events

```yaml
events: []
```

<!-- UNRESOLVED: source does not document unsolicited notification events -->

## Macros

```yaml
macros:
  - id: factory_reset_reboot
    label: Factory Reset with Reboot
    steps:
      - action: factory_reset
        note: "Sends factory reset command"
      - note: "Reboot projector to clear parameters (source Note 9)"
```

## Safety

```yaml
confirmation_required_for:
  - factory_reset
  - lan_reset
interlocks:
  - condition: "Warm Up state"
    description: "Do not send commands during warm up (source Note 7)"
  - condition: "Cool Down state"
    description: "Do not send commands during cool down (source Note 7)"
```

## Notes

- Command format: binary hex byte packets. Write commands start with `06` header, Read/Query commands start with `07` header.
- Response format: `03 14 00 00 00 14` for write acknowledgement (single-byte), `05 14 00 03 00 00 00 {status} {checksum}` for query response (two-byte).
- Checksum: last byte of every packet. Empirically verified as sum of all preceding bytes except the first header byte (`06` or `07`), mod 256. Not explicitly documented in source.
- LAN transport: identical byte values, but each `0x` prefix replaced with `\` backslash escape. TCP port 4661. Exception: Pro9 series uses port 23.
- RS-232: DSUB 9-pin connector, pins 2 (RXD), 3 (TXD), 5 (GND). Null modem cable required.
- Baud rate supports 4800, 9600, 19200 (default), 38400.
- Response `00 14 00 00 00 14` at first byte indicates function is disabled or greyed out (e.g. Aspect Ratio when no source is connected).
- Mute function only active when an input source is applied (Note 8).
- Auto Adjust function only active for non-digital inputs like VGA/D-Sub (Note 8).
- Operating temperature response: bytes 7-10 form a 32-bit little-endian hex value; divide by 10 for degrees Celsius (Note 1).
- Light source usage time response: bytes 7-10 form a 32-bit little-endian hex value; decimal interpretation gives hours (Note 4).
- HDMI Range: Enhanced/Full = 0-255, Normal/Limited = 16-235 (Note 6).

<!-- UNRESOLVED: specific projector models covered by this protocol not enumerated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: checksum algorithm not explicitly documented -->
<!-- UNRESOLVED: contrast/brightness/sharpness/volume/zoom/focus valid value ranges not stated -->
<!-- UNRESOLVED: input_skip sub-addresses 0A-0C exact input mapping not labeled -->
<!-- UNRESOLVED: Freeze Read "value mapping table 3.2.1" referenced but not included in source -->
<!-- UNRESOLVED: operating temperature and light source usage time query command bytes not in extracted source -->
<!-- UNRESOLVED: error response status format documented (Note 3) for service debug only -->

## Provenance

```yaml
source_domains:
  - viewsonicglobal.com
source_urls:
  - "https://www.viewsonicglobal.com/public/products_download/user_guide/projector/LSC_6_7_8_Series/LSC%20Series%20RS-232%20LAN%20Control%20Protocol%20Specification.pdf"
retrieved_at: 2026-04-30T04:25:07.876Z
last_checked_at: 2026-06-01T20:45:25.304Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T20:45:25.304Z
matched_actions: 95
action_count: 95
confidence: medium
summary: "All 95 spec actions matched exactly to source hex sequences; transport parameters verified; comprehensive protocol coverage. (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific projector models not enumerated in source"
- "firmware version compatibility not stated"
- "command packet structure (header, length, function code fields) not formally documented beyond examples"
- "checksum algorithm not explicitly stated; inferred from examples as sum of bytes[1..n-1] mod 256"
- "contrast/brightness/sharpness valid value range not stated, only example values 0x00 and 0x01 shown"
- "zoom and focus value ranges not stated; source shows only 0x01 and 0x02 examples"
- "volume_set valid range not stated; source shows only 0x11 (17) example"
- "checksum computation algorithm not explicitly stated in source; empirically verified as sum of bytes[1..n-1] mod 256 across multiple commands"
- "input_skip input sub-address 0A-0C exact input mapping not labeled in source"
- "freeze read response references \"value mapping table 3.2.1\" which was not included in source"
- "operating temperature query command bytes not provided in source, only response format"
- "light source usage time query command bytes not provided in source, only response format"
- "source does not document unsolicited notification events"
- "specific projector models covered by this protocol not enumerated"
- "checksum algorithm not explicitly documented"
- "contrast/brightness/sharpness/volume/zoom/focus valid value ranges not stated"
- "input_skip sub-addresses 0A-0C exact input mapping not labeled"
- "Freeze Read \"value mapping table 3.2.1\" referenced but not included in source"
- "operating temperature and light source usage time query command bytes not in extracted source"
- "error response status format documented (Note 3) for service debug only"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
