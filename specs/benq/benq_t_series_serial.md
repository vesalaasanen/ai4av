---
spec_id: admin/benq-t_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ T-Series Control Spec"
manufacturer: BenQ
model_family: PU9530
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - PU9530
    - PW9520
    - PX9510
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esupportdownload.benq.com
  - manualslib.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/PU9530/RS232%20Control%20Guide_0_Windows7_Windows8_WinXP.pdf"
  - https://www.manualslib.com/manual/481564/Benq-RS232-Commands.html
  - https://www.manualslib.com/manual/2887673/Benq-Rs232.html
retrieved_at: 2026-05-01T02:09:19.277Z
last_checked_at: 2026-10-07T17:31:35.073Z
generated_at: 2026-10-07T17:31:35.073Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "official model name \"T-Series\" not explicitly stated in source; inferred from product grouping in document header."
  - "projector baud rate configured via OSD menu; source lists supported rates (9600/14400/19200/38400/57600/115200 bps) but does not state a default"
  - "source does not describe unsolicited event notifications from projector."
  - "source does not describe multi-step command macros."
  - "no safety warnings or interlock procedures stated in source."
  - "exact default baud rate not stated. UNRESOLVED: TCP port 8000 confirmed for RS-232 via LAN, but IP address configuration method not described in source. UNRESOLVED: HDBaseT port number not stated."
verification:
  verdict: verified
  checked_at: 2026-10-07T17:31:35.073Z
  matched_actions: 211
  action_count: 211
  confidence: medium
  summary: "All 211 action units match source command rows with correct shapes, transport values are supported, and the source catalogue (about 210 distinct wire commands) is fully covered. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# BenQ T-Series Control Spec

## Summary
BenQ professional installation projectors (PU9530/PW9520/PX9510) controllable via RS-232 serial, TCP/IP (port 8000), and HDBaseT. Protocol uses ASCII command strings wrapped in `<CR>*cmd=value#<CR>` syntax. Supports power, source routing, picture adjustment, lamp management, and lens/keystone control.

<!-- UNRESOLVED: official model name "T-Series" not explicitly stated in source; inferred from product grouping in document header. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 8000  # TCP port for RS-232 via LAN
serial:
  baud_rate: null  # UNRESOLVED: projector baud rate configured via OSD menu; source lists supported rates (9600/14400/19200/38400/57600/115200 bps) but does not state a default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: source_rgb
  label: Select Computer 1 / RGB
  kind: action
  params: []
- id: source_rgb2
  label: Select Computer 2 / RGB2
  kind: action
  params: []
- id: source_ypbr
  label: Select Component
  kind: action
  params: []
- id: source_dvid
  label: Select DVI-D
  kind: action
  params: []
- id: source_hdmi
  label: Select HDMI
  kind: action
  params: []
- id: source_vid
  label: Select Composite
  kind: action
  params: []
- id: source_svid
  label: Select S-Video
  kind: action
  params: []
- id: source_hdbaset
  label: Select HDBaseT
  kind: action
  params: []
- id: blank_on
  label: Blank Screen On
  kind: action
  params: []
- id: blank_off
  label: Blank Screen Off
  kind: action
  params: []
- id: freeze_on
  label: Freeze On
  kind: action
  params: []
- id: freeze_off
  label: Freeze Off
  kind: action
  params: []
- id: menu_on
  label: Menu On
  kind: action
  params: []
- id: menu_off
  label: Menu Off
  kind: action
  params: []
- id: contrast_up
  label: Contrast +
  kind: action
  params: []
- id: contrast_down
  label: Contrast -
  kind: action
  params: []
- id: brightness_up
  label: Brightness +
  kind: action
  params: []
- id: brightness_down
  label: Brightness -
  kind: action
  params: []
- id: color_up
  label: Color +
  kind: action
  params: []
- id: color_down
  label: Color -
  kind: action
  params: []
- id: sharpness_up
  label: Sharpness +
  kind: action
  params: []
- id: sharpness_down
  label: Sharpness -
  kind: action
  params: []
- id: color_temp_normal
  label: Color Temperature Normal
  kind: action
  params: []
- id: color_temp_warm
  label: Color Temperature Warm
  kind: action
  params: []
- id: color_temp_cool
  label: Color Temperature Cool
  kind: action
  params: []
- id: color_temp_native
  label: Color Temperature Lamp Native
  kind: action
  params: []
- id: aspect_4_3
  label: Aspect Ratio 4:3
  kind: action
  params: []
- id: aspect_16_9
  label: Aspect Ratio 16:9
  kind: action
  params: []
- id: aspect_16_10
  label: Aspect Ratio 16:10
  kind: action
  params: []
- id: aspect_auto
  label: Aspect Ratio Auto
  kind: action
  params: []
- id: aspect_real
  label: Aspect Ratio Real
  kind: action
  params: []
- id: aspect_5_4
  label: Aspect Ratio 5:4
  kind: action
  params: []
- id: aspect_1_88_1
  label: Aspect Ratio 1.88:1
  kind: action
  params: []
- id: aspect_2_35_1
  label: Aspect Ratio 2.35:1
  kind: action
  params: []
- id: zoom_in
  label: Zoom In
  kind: action
  params: []
- id: zoom_out
  label: Zoom Out
  kind: action
  params: []
- id: auto_setup
  label: Auto Setup
  kind: action
  params: []
- id: position_front_table
  label: Projector Position Front Table
  kind: action
  params: []
- id: position_rear_table
  label: Projector Position Rear Table
  kind: action
  params: []
- id: position_rear_ceiling
  label: Projector Position Rear Ceiling
  kind: action
  params: []
- id: position_front_ceiling
  label: Projector Position Front Ceiling
  kind: action
  params: []
- id: quick_auto_search_on
  label: Quick Auto Search On
  kind: action
  params: []
- id: quick_auto_search_off
  label: Quick Auto Search Off
  kind: action
  params: []
- id: direct_power_on_on
  label: Direct Power On On
  kind: action
  params: []
- id: direct_power_on_off
  label: Direct Power On Off
  kind: action
  params: []
- id: standby_standard
  label: Standby Mode Standard
  kind: action
  params: []
- id: standby_eco
  label: Standby Mode Eco
  kind: action
  params: []
- id: standby_network
  label: Standby Mode Network
  kind: action
  params: []
- id: lamp_normal
  label: Lamp Mode Normal
  kind: action
  params: []
- id: lamp_eco
  label: Lamp Mode Eco
  kind: action
  params: []
- id: lamp_dual
  label: Lamp Mode Dual
  kind: action
  params: []
- id: lamp1_only
  label: Lamp 1 Only
  kind: action
  params: []
- id: lamp2_only
  label: Lamp 2 Only
  kind: action
  params: []
- id: lamp_single_min
  label: Single Lamp Minimum
  kind: action
  params: []
- id: lamp_hour_reset
  label: Lamp Hour Reset
  kind: action
  params: []
- id: lamp2_hour_reset
  label: Lamp 2 Hour Reset
  kind: action
  params: []
- id: d_3d_auto
  label: 3D Sync Auto
  kind: action
  params: []
- id: d_3d_top_bottom
  label: 3D Sync Top Bottom
  kind: action
  params: []
- id: d_3d_frame_sequential
  label: 3D Sync Frame Sequential
  kind: action
  params: []
- id: d_3d_side_by_side
  label: 3D Sync Side by Side
  kind: action
  params: []
- id: d_3d_inverter_disable
  label: 3D Sync Inverter Disable
  kind: action
  params: []
- id: d_3d_inverter
  label: 3D Sync Inverter Enable
  kind: action
  params: []
- id: d_3d_off
  label: 3D Sync Off
  kind: action
  params: []
- id: trigger_on
  label: Trigger On
  kind: action
  params: []
- id: trigger_off
  label: Trigger Off
  kind: action
  params: []
- id: high_altitude_on
  label: High Altitude Mode On
  kind: action
  params: []
- id: high_altitude_off
  label: High Altitude Mode Off
  kind: action
  params: []
- id: lens_shift_up
  label: Lens Shift Up
  kind: action
  params: []
- id: lens_shift_down
  label: Lens Shift Down
  kind: action
  params: []
- id: lens_shift_left
  label: Lens Shift Left
  kind: action
  params: []
- id: lens_shift_right
  label: Lens Shift Right
  kind: action
  params: []
- id: focus_plus
  label: Focus Plus
  kind: action
  params: []
- id: focus_minus
  label: Focus Minus
  kind: action
  params: []
- id: zoom_plus
  label: Zoom Plus
  kind: action
  params: []
- id: zoom_minus
  label: Zoom Minus
  kind: action
  params: []
- id: keystone_vert_decrease
  label: Keystone Vertical Decrease
  kind: action
  params: []
- id: keystone_vert_increase
  label: Keystone Vertical Increase
  kind: action
  params: []
- id: menu_up
  label: Menu Up
  kind: action
  params: []
- id: menu_down
  label: Menu Down
  kind: action
  params: []
- id: menu_right
  label: Menu Right
  kind: action
  params: []
- id: menu_left
  label: Menu Left
  kind: action
  params: []
- id: menu_enter
  label: Menu Enter
  kind: action
  params: []
- id: error_report
  label: Error Code Report
  kind: action
  params: []
- id: baud_set
  label: Set Baud Rate
  kind: action
  params:
    - name: baud
      type: integer
      description: Baud rate (2400/4800/9600/14400/19200/38400/57600/115200)
- id: source_ypbr2
  label: Select Component2
  kind: action
  command: "*sour=ypbr2#"
  params: []
- id: source_dvia
  label: Select DVI-A
  kind: action
  command: "*sour=dviA#"
  params: []
- id: source_hdmi2
  label: Select HDMI 2
  kind: action
  command: "*sour=hdmi2#"
  params: []
- id: source_network
  label: Select Network
  kind: action
  command: "*sour=network#"
  params: []
- id: source_usb_display
  label: Select USB Display
  kind: action
  command: "*sour=usbdisplay#"
  params: []
- id: source_usb_reader
  label: Select USB Reader
  kind: action
  command: "*sour=usbreader#"
  params: []
- id: source_wireless
  label: Select Wireless
  kind: action
  command: "*sour=wireless#"
  params: []
- id: source_displayport
  label: Select DisplayPort
  kind: action
  command: "*sour=dp#"
  params: []
- id: source_hd_connect
  label: Select HD Connect
  kind: action
  command: "*sour=hdconnect#"
  params: []
- id: picture_mode_dynamic
  label: Picture Mode Dynamic
  kind: action
  command: "*appmod=dynamic#"
  params: []
- id: picture_mode_presentation
  label: Picture Mode Presentation
  kind: action
  command: "*appmod=preset#"
  params: []
- id: picture_mode_srgb
  label: Picture Mode sRGB
  kind: action
  command: "*appmod=srgb#"
  params: []
- id: picture_mode_bright
  label: Picture Mode Bright
  kind: action
  command: "*appmod=bright#"
  params: []
- id: picture_mode_living_room
  label: Picture Mode Living Room
  kind: action
  command: "*appmod=livingroom#"
  params: []
- id: picture_mode_game
  label: Picture Mode Game
  kind: action
  command: "*appmod=game#"
  params: []
- id: picture_mode_cinema
  label: Picture Mode Cinema
  kind: action
  command: "*appmod=cine#"
  params: []
- id: picture_mode_standard
  label: Picture Mode Standard
  kind: action
  command: "*appmod=std#"
  params: []
- id: picture_mode_user1
  label: Picture Mode User1
  kind: action
  command: "*appmod=user1#"
  params: []
- id: picture_mode_user2
  label: Picture Mode User2
  kind: action
  command: "*appmod=user2#"
  params: []
- id: picture_mode_user3
  label: Picture Mode User3
  kind: action
  command: "*appmod=user3#"
  params: []
- id: picture_mode_isf_day
  label: Picture Mode ISF Day
  kind: action
  command: "*appmod=isfday#"
  params: []
- id: picture_mode_isf_night
  label: Picture Mode ISF Night
  kind: action
  command: "*appmod=isfnight#"
  params: []
- id: picture_mode_3d
  label: Picture Mode 3D
  kind: action
  command: "*appmod=threed#"
  params: []
- id: aspect_letterbox
  label: Aspect Ratio Letterbox
  kind: action
  command: "*asp=LBOX#"
  params: []
- id: aspect_wide
  label: Aspect Ratio Wide
  kind: action
  command: "*asp=WIDE#"
  params: []
- id: aspect_anamorphic
  label: Aspect Ratio Anamorphic
  kind: action
  command: "*asp=ANAM#"
  params: []
- id: brilliant_color_on
  label: Brilliant Color On
  kind: action
  command: "*BC=on#"
  params: []
- id: brilliant_color_off
  label: Brilliant Color Off
  kind: action
  command: "*BC=off#"
  params: []
- id: position_up_front
  label: Projector Position Up Front
  kind: action
  command: "*pp=UF#"
  params: []
- id: position_down_front
  label: Projector Position Down Front
  kind: action
  command: "*pp=DF#"
  params: []
- id: signal_power_on
  label: Signal Power On On
  kind: action
  command: "*autopower=on#"
  params: []
- id: signal_power_off
  label: Signal Power On Off
  kind: action
  command: "*autopower=off#"
  params: []
- id: standby_network_on
  label: Standby Network On
  kind: action
  command: "*standbynet=on#"
  params: []
- id: standby_network_off
  label: Standby Network Off
  kind: action
  command: "*standbynet=off#"
  params: []
- id: standby_microphone_on
  label: Standby Microphone On
  kind: action
  command: "*standbymic=on#"
  params: []
- id: standby_microphone_off
  label: Standby Microphone Off
  kind: action
  command: "*standbymic=off#"
  params: []
- id: standby_monitor_out_on
  label: Standby Monitor Out On
  kind: action
  command: "*standbymnt=on#"
  params: []
- id: standby_monitor_out_off
  label: Standby Monitor Out Off
  kind: action
  command: "*standbymnt=off#"
  params: []
- id: mute_on
  label: Mute On
  kind: action
  command: "*mute=on#"
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  command: "*mute=off#"
  params: []
- id: volume_up
  label: Volume +
  kind: action
  command: "*vol=+#"
  params: []
- id: volume_down
  label: Volume -
  kind: action
  command: "*vol=-#"
  params: []
- id: microphone_volume_up
  label: Microphone Volume +
  kind: action
  command: "*micvol=+#"
  params: []
- id: microphone_volume_down
  label: Microphone Volume -
  kind: action
  command: "*micvol=-#"
  params: []
- id: audio_source_off
  label: Audio Pass Through Off
  kind: action
  command: "*audiosour=off#"
  params: []
- id: audio_source_rgb
  label: Audio Computer 1
  kind: action
  command: "*audiosour=RGB#"
  params: []
- id: audio_source_rgb2
  label: Audio Computer 2
  kind: action
  command: "*audiosour=RGB2#"
  params: []
- id: audio_source_video
  label: Audio Video / S-Video
  kind: action
  command: "*audiosour=vid#"
  params: []
- id: audio_source_component
  label: Audio Component
  kind: action
  command: "*audiosour=ypbr#"
  params: []
- id: audio_source_hdmi
  label: Audio HDMI
  kind: action
  command: "*audiosour=hdmi#"
  params: []
- id: audio_source_hdmi2
  label: Audio HDMI 2
  kind: action
  command: "*audiosour=hdmi2#"
  params: []
- id: lamp_smart_eco
  label: Lamp Mode Smart Eco
  kind: action
  command: "*lampm=seco#"
  params: []
- id: lamp_smart_eco_lampcare
  label: Lamp Mode Smart Eco LampCare
  kind: action
  command: "*lampm=seco2#"
  params: []
- id: lamp_smart_eco_lumencare
  label: Lamp Mode Smart Eco IumenCare
  kind: action
  command: "*lampm=seco3#"
  params: []
- id: lamp_dual_brightest
  label: Lamp Mode Dual Brightest
  kind: action
  command: "* lampm =dualbr#"
  params: []
- id: lamp_dual_reliable
  label: Lamp Mode Dual Reliable
  kind: action
  command: "* lampm =dualre#"
  params: []
- id: lamp_single_alternative
  label: Lamp Mode Single Alternative
  kind: action
  command: "* lampm =single#"
  params: []
- id: lamp_single_alternative_eco
  label: Lamp Mode Single Alternative Eco
  kind: action
  command: "* lampm =singleeco#"
  params: []
- id: d_3d_frame_packing
  label: 3D Frame Packing
  kind: action
  command: "*3d=fp#"
  params: []
- id: d_3d_2d_to_3d
  label: 3D 2D to 3D
  kind: action
  command: "*3d=2d3d#"
  params: []
- id: d_3d_nvidia
  label: 3D NVIDIA
  kind: action
  command: "*3d=nvidia#"
  params: []
- id: remote_set
  label: Remote Set
  kind: action
  command: "*rrset=0#"
  params: []
- id: remote_receiver_front_rear
  label: Remote Receiver Front and Rear
  kind: action
  command: "*rr=fr#"
  params: []
- id: remote_receiver_front
  label: Remote Receiver Front
  kind: action
  command: "*rr=f#"
  params: []
- id: remote_receiver_rear
  label: Remote Receiver Rear
  kind: action
  command: "*rr=r#"
  params: []
- id: remote_receiver_top
  label: Remote Receiver Top
  kind: action
  command: "*rr=t#"
  params: []
- id: remote_receiver_top_front
  label: Remote Receiver Top and Front
  kind: action
  command: "*rr=tf#"
  params: []
- id: remote_receiver_top_rear
  label: Remote Receiver Top and Rear
  kind: action
  command: "*rr=tr#"
  params: []
- id: instant_on_on
  label: Instant On On
  kind: action
  command: "*ins=on#"
  params: []
- id: instant_on_off
  label: Instant On Off
  kind: action
  command: "*ins=off#"
  params: []
- id: lamp_saver_on
  label: Lamp Saver Mode On
  kind: action
  command: "*lpsaver=on#"
  params: []
- id: lamp_saver_off
  label: Lamp Saver Mode Off
  kind: action
  command: "*lpsaver=off#"
  params: []
- id: projection_login_code_on
  label: Projection Log In Code On
  kind: action
  command: "*prjlogincode=on#"
  params: []
- id: projection_login_code_off
  label: Projection Log In Code Off
  kind: action
  command: "*prjlogincode=off#"
  params: []
- id: broadcasting_on
  label: Broadcasting On
  kind: action
  command: "*broadcasting=on#"
  params: []
- id: broadcasting_off
  label: Broadcasting Off
  kind: action
  command: "*broadcasting=off#"
  params: []
- id: amx_device_discovery_on
  label: AMX Device Discovery On
  kind: action
  command: "*amxdd=on#"
  params: []
- id: amx_device_discovery_off
  label: AMX Device Discovery Off
  kind: action
  command: "*amxdd=off#"
  params: []
- id: color_temp_warmer
  label: Color Temperature Warmer
  kind: action
  command: "*ct=warmer#"
  params: []
- id: color_temp_cooler
  label: Color Temperature Cooler
  kind: action
  command: "*ct=cooler#"
  params: []
- id: serial_number_code1
  label: Serial Number Code1
  kind: action
  command: "V99N1234"
  params: []
- id: serial_number_query
  label: Serial Number Query
  kind: action
  command: "V99N0000"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power Status
  type: enum
  values:
    - "on"
    - "off"
  read_command: "*pow=?#"
  query_command: "*pow=?#"
  write_command: "*pow=on#*pow=off#"
- id: source_state
  label: Current Source
  type: enum
  values:
    - rgb
    - rgb2
    - ypbr
    - dvid
    - hdmi
    - vid
    - svid
    - hdbaset
  read_command: "*sour=?#"
  query_command: "*sour=?#"
- id: picture_mode_state
  label: Picture Mode
  type: enum
  values:
    - dynamic
    - presentation
    - srgb
    - bright
    - livingroom
    - game
    - cine
    - std
    - user1
    - user2
    - user3
    - isfday
    - isfnight
    - threed
  read_command: "*appmod=?#"
  query_command: "*appmod=?#"
- id: mute_state
  label: Mute Status
  type: enum
  values:
    - "on"
    - "off"
  read_command: "*mute=?#"
  query_command: "*mute=?#"
- id: blank_state
  label: Blank Status
  type: enum
  values:
    - "on"
    - "off"
  read_command: "*blank=?#"
  query_command: "*blank=?#"
- id: freeze_state
  label: Freeze Status
  type: enum
  values:
    - "on"
    - "off"
  read_command: "*freeze=?#"
  query_command: "*freeze=?#"
- id: menu_state
  label: Menu Status
  type: enum
  values:
    - "on"
    - "off"
  read_command: "*menu=?#"
  query_command: "*menu=?#"
- id: contrast_state
  label: Contrast Value
  type: integer
  read_command: "*con=?#"
  query_command: "*con=?#"
- id: brightness_state
  label: Brightness Value
  type: integer
  read_command: "*bri=?#"
  query_command: "*bri=?#"
- id: color_state
  label: Color Value
  type: integer
  read_command: "*color=?#"
  query_command: "*color=?#"
- id: sharpness_state
  label: Sharpness Value
  type: integer
  read_command: "*sharp=?#"
  query_command: "*sharp=?#"
- id: color_temp_state
  label: Color Temperature Status
  type: enum
  values:
    - warmer
    - warm
    - normal
    - cool
    - cooler
    - native
  read_command: "*ct=?#"
  query_command: "*ct=?#"
- id: aspect_state
  label: Aspect Ratio Status
  type: enum
  values:
    - "4:3"
    - "16:9"
    - "16:10"
    - AUTO
    - REAL
    - LBOX
    - WIDE
    - ANAM
    - "5:4"
    - "1.88:1"
    - "2.35:1"
  read_command: "*asp=?#"
  query_command: "*asp=?#"
- id: position_state
  label: Projector Position
  type: enum
  values:
    - FT
    - RE
    - RC
    - FC
    - UF
    - DF
  read_command: "*pp=?#"
  query_command: "*pp=?#"
- id: quick_auto_search_state
  label: Quick Auto Search Status
  type: enum
  values:
    - "on"
    - "off"
  read_command: "*QAS=?#"
  query_command: "*QAS=?#"
- id: direct_power_on_state
  label: Direct Power On Status
  type: enum
  values:
    - "on"
    - "off"
  read_command: "*directpower=?#"
  query_command: "*directpower=?#"
- id: autopower_state
  label: Signal Power On Status
  type: enum
  values:
    - "on"
    - "off"
  read_command: "*autopower=?#"
  query_command: "*autopower=?#"
- id: standby_state
  label: Standby Mode
  type: enum
  values:
    - standard
    - eco
    - network
    - "on"
    - "off"
  read_command: "*standbynet=?#"
  query_command: "*standbynet=?#"
- id: standbymic_state
  label: Standby Microphone Status
  type: enum
  values:
    - "on"
    - "off"
  read_command: "*standbymic=?#"
  query_command: "*standbymic=?#"
- id: standbymnt_state
  label: Standby Monitor Out Status
  type: enum
  values:
    - "on"
    - "off"
  read_command: "*standbymnt=?#"
  query_command: "*standbymnt=?#"
- id: baud_state
  label: Current Baud Rate
  type: integer
  read_command: "*baud=?#"
  query_command: "*baud=?#"
- id: lamp1_hours
  label: Lamp 1 Hours
  type: integer
  read_command: "*ltim=?#"
  query_command: "*ltim=?#"
- id: lamp2_hours
  label: Lamp 2 Hours
  type: integer
  read_command: "*ltim2=?#"
  query_command: "*ltim2=?#"
- id: lamp_mode_state
  label: Lamp Mode Status
  type: enum
  values:
    - lnor
    - eco
    - seco
    - seco2
    - seco3
    - dualbr
    - dualre
    - single
    - singleeco
  read_command: "*lampm=?#"
  query_command: "*lampm=?#"
- id: lamp_status_state
  label: Current Lamp Status
  type: enum
  values:
    - num1l
    - num2
    - dual
    - single
  read_command: "*lammd=?#"
  query_command: "*lammd=?#"
- id: model_name_state
  label: Model Name
  type: string
  read_command: "*modelname=?#"
  query_command: "*modelname=?#"
- id: d_3d_state
  label: 3D Sync Status
  type: enum
  values:
    - "off"
    - auto
    - tb
    - fs
    - fp
    - sbs
    - da
    - iv
    - "2d3d"
    - nvidia
  read_command: "*3d=?#"
  query_command: "*3d=?#"
- id: trigger_state
  label: Trigger Status
  type: enum
  values:
    - "on"
    - "off"
  read_command: "*trigger=?#"
  query_command: "*trigger=?#"
- id: high_altitude_state
  label: High Altitude Mode Status
  type: enum
  values:
    - "on"
    - "off"
  read_command: "*Highaltitude=?#"
  query_command: "*Highaltitude=?#"
- id: error_state
  label: Error Code
  type: string
  read_command: "*error=report#"
  query_command: "*error=report#"
- id: keystone_state
  label: Keystone Vertical Status
  type: integer
  read_command: "*keyst=?#"
  query_command: "*keyst=?#"
- id: audiosour_state
  label: Audio Source Status
  type: enum
  values:
    - off
    - RGB
    - RGB2
    - vid
    - ypbr
    - hdmi
    - hdmi2
  read_command: "*audiosour=?#"
  query_command: "*audiosour=?#"
- id: remote_set_state
  label: Remote Set Status
  type: string
  read_command: "*rrset=?#"
  query_command: "*rrset=?#"
- id: remote_receiver_state
  label: Remote Receiver Status
  type: string
  read_command: "*rr=?#"
  query_command: "*rr=?#"
- id: instant_on_state
  label: Instant On Status
  type: enum
  values:
    - "on"
    - "off"
  read_command: "*ins=?#"
  query_command: "*ins=?#"
- id: lamp_saver_state
  label: Lamp Saver Mode Status
  type: enum
  values:
    - "on"
    - "off"
  read_command: "*lpsaver=?#"
  query_command: "*lpsaver=?#"
- id: projection_login_code_state
  label: Projection Log In Code Status
  type: enum
  values:
    - "on"
    - "off"
  read_command: "*prjlogincode=?#"
  query_command: "*prjlogincode=?#"
- id: broadcasting_state
  label: Broadcasting Status
  type: enum
  values:
    - "on"
    - "off"
  read_command: "*broadcasting=?<CR>"
  query_command: "*broadcasting=?<CR>"
- id: amx_device_discovery_state
  label: AMX Device Discovery Status
  type: enum
  values:
    - "on"
    - "off"
  read_command: "*amxdd=?#"
  query_command: "*amxdd=?#"
- id: mac_address_state
  label: Mac Address
  type: string
  read_command: "*macaddr=?#"
  query_command: "*macaddr=?#"
- id: volume_state
  label: Volume Status
  type: integer
  read_command: "*vol=?#"
  query_command: "*vol=?#"
- id: microphone_volume_state
  label: Microphone Volume Status
  type: integer
  read_command: "*micvol=?#"
  query_command: "*micvol=?#"
- id: brilliant_color_state
  label: Brilliant Color Status
  type: string
  read_command: "*BC=?#"
  query_command: "*BC=?#"
```

## Variables
```yaml
# No discrete settable parameters beyond the action commands above.
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event notifications from projector.
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step command macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source.
```

## Notes

**Command format:** All commands are ASCII strings wrapped in `<CR>*cmd=value#<CR>` delimiters. Example: `<CR>*pow=on#<CR>` to power on. Commands are case-insensitive.

**Response behavior:**
- `Illegal format` — command syntax wrong
- `Unsupported item` — command not valid for this model
- `Block item` — command blocked under current condition

**RS-232 via LAN:** When controlling via TCP (port 8000), commands work with or without `<CR>` delimiters. All behavior identical to serial control.

**Baud rate configuration:** Projector baud rate is set via OSD menu — not remotely configurable via command. Supported rates: 2400/4800/9600/14400/19200/38400/57600/115200. Default is not stated in source.

**Volume/mute:** Audio volume and mute commands are marked NO in source — not supported on this model series.

**Auto Sync, Filter Timer, System Reset, Firmware Version, Tint, Keystone value:** Listed in command table with NA/NO support — commands may exist in protocol but are not functional for this projector.

<!-- UNRESOLVED: exact default baud rate not stated. UNRESOLVED: TCP port 8000 confirmed for RS-232 via LAN, but IP address configuration method not described in source. UNRESOLVED: HDBaseT port number not stated. -->

## Provenance

```yaml
source_domains:
  - esupportdownload.benq.com
  - manualslib.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/PU9530/RS232%20Control%20Guide_0_Windows7_Windows8_WinXP.pdf"
  - https://www.manualslib.com/manual/481564/Benq-RS232-Commands.html
  - https://www.manualslib.com/manual/2887673/Benq-Rs232.html
retrieved_at: 2026-05-01T02:09:19.277Z
last_checked_at: 2026-10-07T17:31:35.073Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T17:31:35.073Z
matched_actions: 211
action_count: 211
confidence: medium
summary: "All 211 action units match source command rows with correct shapes, transport values are supported, and the source catalogue (about 210 distinct wire commands) is fully covered. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "official model name \"T-Series\" not explicitly stated in source; inferred from product grouping in document header."
- "projector baud rate configured via OSD menu; source lists supported rates (9600/14400/19200/38400/57600/115200 bps) but does not state a default"
- "source does not describe unsolicited event notifications from projector."
- "source does not describe multi-step command macros."
- "no safety warnings or interlock procedures stated in source."
- "exact default baud rate not stated. UNRESOLVED: TCP port 8000 confirmed for RS-232 via LAN, but IP address configuration method not described in source. UNRESOLVED: HDBaseT port number not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
