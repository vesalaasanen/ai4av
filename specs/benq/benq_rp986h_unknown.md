---
spec_id: admin/benq-rp986h
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ RP986h Control Spec"
manufacturer: BenQ
model_family: RP986h
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - RP986h
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esupportdownload.benq.com
  - audiogeneral.com
  - manualslib.com
  - scribd.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - https://www.audiogeneral.com/BenQ/rs232_commands_generic_082613.pdf
  - https://www.manualslib.com/manual/481564/Benq-Rs232-Commands.html
  - https://www.scribd.com/doc/146742986/Benq-Rs232-Commands
  - "https://esupportdownload.benq.com/esupport/PDP/Control%20Protocols/RP840G/PDP_cp_RP840G_20160826_142256_RP_CVT_RS232_command_list_v2.pdf"
retrieved_at: 2026-05-15T03:06:03.129Z
last_checked_at: 2026-06-23T10:12:11.529Z
generated_at: 2026-06-23T10:12:11.529Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source document notes that available features differ by projector specification; commands marked \"No\" in the Support column are included for completeness. Baud rate must be checked from the projector OSD menu."
  - "configurable; check projector OSD - options: 9600/14400/19200/38400/57600/115200 bps"
  - "populate from source, or remove section if not applicable"
  - "no explicit safety warnings or interlock procedures documented in the source."
  - "Response payload formats for query commands (e.g., what string is returned for power status) are not specified in the source. Firmware version compatibility is not stated."
verification:
  verdict: verified
  checked_at: 2026-06-23T10:12:11.529Z
  matched_actions: 187
  action_count: 187
  confidence: medium
  summary: "All 187 spec actions matched source ASCII commands; transport serial/TCP port 8000 verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# BenQ RP986h Control Spec

## Summary
The BenQ RP986h is a projector controlled via RS-232C serial interface. Control is also available over TCP (RS232 via LAN on port 8000) and RS232 via HDBaseT. This spec covers all commands documented in the RS232 command table, including power, source selection, audio, picture settings, and miscellaneous controls.

<!-- UNRESOLVED: The source document notes that available features differ by projector specification; commands marked "No" in the Support column are included for completeness. Baud rate must be checked from the projector OSD menu. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: configurable; check projector OSD - options: 9600/14400/19200/38400/57600/115200 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 8000  # RS232 via LAN TCP port
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from power on/off commands
- routable        # inferred from source selection commands
- queryable       # inferred from query commands returning state
- levelable       # inferred from volume/brightness/contrast/color/sharpness controls
```

## Actions
```yaml
# Power
- id: power_on
  label: Power On
  kind: action
  command: "\r*pow=on#\r"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "\r*pow=off#\r"
  params: []

- id: power_status
  label: Power Status
  kind: query
  command: "\r*pow=?#\r"
  params: []

# Source Selection
- id: source_computer1
  label: Source - COMPUTER/YPbPr
  kind: action
  command: "\r*sour=RGB#\r"
  params: []

- id: source_computer2
  label: Source - COMPUTER 2/YPbPr2
  kind: action
  command: "\r*sour=RGB2#\r"
  params: []

- id: source_computer3
  label: Source - COMPUTER 3/YPbPr3
  kind: action
  command: "\r*sour=RGB3#\r"
  params: []

- id: source_component
  label: Source - Component
  kind: action
  command: "\r*sour=ypbr#\r"
  params: []

- id: source_component2
  label: Source - Component2
  kind: action
  command: "\r*sour=ypbr2#\r"
  params: []

- id: source_dvi_a
  label: Source - DVI-A
  kind: action
  command: "\r*sour=dviA#\r"
  params: []

- id: source_dvi_d
  label: Source - DVI-D
  kind: action
  command: "\r*sour=dvid#\r"
  params: []

- id: source_hdmi
  label: Source - HDMI/MHL
  kind: action
  command: "\r*sour=hdmi#\r"
  params: []

- id: source_hdmi2
  label: Source - HDMI 2/MHL2
  kind: action
  command: "\r*sour=hdmi2#\r"
  params: []

- id: source_composite
  label: Source - Composite
  kind: action
  command: "\r*sour=vid#\r"
  params: []

- id: source_svideo
  label: Source - S-Video
  kind: action
  command: "\r*sour=svid#\r"
  params: []

- id: source_network
  label: Source - Network
  kind: action
  command: "\r*sour=network#\r"
  params: []

- id: source_usb_display
  label: Source - USB Display
  kind: action
  command: "\r*sour=usbdisplay#\r"
  params: []

- id: source_usb_reader
  label: Source - USB Reader
  kind: action
  command: "\r*sour=usbreader#\r"
  params: []

- id: source_wireless
  label: Source - Wireless
  kind: action
  command: "\r*sour=wireless#\r"
  params: []

- id: source_hdbaset
  label: Source - HDbaseT
  kind: action
  command: "\r*sour=hdbaset#\r"
  params: []

- id: source_displayport
  label: Source - DisplayPort
  kind: action
  command: "\r*sour=dp#\r"
  params: []

- id: source_status
  label: Current Source Query
  kind: query
  command: "\r*sour=?#\r"
  params: []

# Audio Control
- id: mute_on
  label: Mute On
  kind: action
  command: "\r*mute=on#\r"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "\r*mute=off#\r"
  params: []

- id: mute_status
  label: Mute Status
  kind: query
  command: "\r*mute=?#\r"
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  command: "\r*vol=+#\r"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "\r*vol=-#\r"
  params: []

- id: volume_status
  label: Volume Status
  kind: query
  command: "\r*vol=?#\r"
  params: []

- id: mic_volume_up
  label: Mic Volume Up
  kind: action
  command: "\r*micvol=+#\r"
  params: []

- id: mic_volume_down
  label: Mic Volume Down
  kind: action
  command: "\r*micvol=-#\r"
  params: []

- id: mic_volume_status
  label: Mic Volume Status
  kind: query
  command: "\r*micvol=?#\r"
  params: []

# Audio Source Select
- id: audiosource_off
  label: Audio Pass Through Off
  kind: action
  command: "\r*audiosour=off#\r"
  params: []

- id: audiosource_computer1
  label: Audio Source - Computer1
  kind: action
  command: "\r*audiosour=RGB#\r"
  params: []

- id: audiosource_computer2
  label: Audio Source - Computer2
  kind: action
  command: "\r*audiosour=RGB2#\r"
  params: []

- id: audiosource_video_svideo
  label: Audio Source - Video/S-Video
  kind: action
  command: "\r*audiosour=vid#\r"
  params: []

- id: audiosource_component
  label: Audio Source - Component
  kind: action
  command: "\r*audiosour=ypbr#\r"
  params: []

- id: audiosource_hdmi
  label: Audio Source - HDMI
  kind: action
  command: "\r*audiosour=hdmi#\r"
  params: []

- id: audiosource_hdmi2
  label: Audio Source - HDMI2
  kind: action
  command: "\r*audiosour=hdmi2#\r"
  params: []

- id: audiosource_status
  label: Audio Pass Status Query
  kind: query
  command: "\r*audiosour=?#\r"
  params: []

# Picture Mode
- id: picture_mode_dynamic
  label: Picture Mode - Dynamic
  kind: action
  command: "\r*appmod=dynamic#\r"
  params: []

- id: picture_mode_presentation
  label: Picture Mode - Presentation
  kind: action
  command: "\r*appmod=preset#\r"
  params: []

- id: picture_mode_srgb
  label: Picture Mode - sRGB
  kind: action
  command: "\r*appmod=srgb#\r"
  params: []

- id: picture_mode_bright
  label: Picture Mode - Bright
  kind: action
  command: "\r*appmod=bright#\r"
  params: []

- id: picture_mode_livingroom
  label: Picture Mode - Living Room
  kind: action
  command: "\r*appmod=livingroom#\r"
  params: []

- id: picture_mode_game
  label: Picture Mode - Game
  kind: action
  command: "\r*appmod=game#\r"
  params: []

- id: picture_mode_cinema
  label: Picture Mode - Cinema
  kind: action
  command: "\r*appmod=cine#\r"
  params: []

- id: picture_mode_standard
  label: Picture Mode - Standard/Vivid
  kind: action
  command: "\r*appmod=std#\r"
  params: []

- id: picture_mode_football
  label: Picture Mode - Football
  kind: action
  command: "\r*appmod=football#\r"
  params: []

- id: picture_mode_dicom
  label: Picture Mode - DICOM
  kind: action
  command: "\r*appmod=dicom#\r"
  params: []

- id: picture_mode_user1
  label: Picture Mode - User1
  kind: action
  command: "\r*appmod=user1#\r"
  params: []

- id: picture_mode_user2
  label: Picture Mode - User2
  kind: action
  command: "\r*appmod=user2#\r"
  params: []

- id: picture_mode_user3
  label: Picture Mode - User3
  kind: action
  command: "\r*appmod=user3#\r"
  params: []

- id: picture_mode_isf_day
  label: Picture Mode - ISF Day
  kind: action
  command: "\r*appmod=isfday#\r"
  params: []

- id: picture_mode_isf_night
  label: Picture Mode - ISF Night
  kind: action
  command: "\r*appmod=isfnight#\r"
  params: []

- id: picture_mode_3d
  label: Picture Mode - 3D
  kind: action
  command: "\r*appmod=threed#\r"
  params: []

- id: picture_mode_status
  label: Picture Mode Query
  kind: query
  command: "\r*appmod=?#\r"
  params: []

# Picture Settings
- id: contrast_up
  label: Contrast Up
  kind: action
  command: "\r*con=+#\r"
  params: []

- id: contrast_down
  label: Contrast Down
  kind: action
  command: "\r*con=-#\r"
  params: []

- id: contrast_status
  label: Contrast Value Query
  kind: query
  command: "\r*con=?#\r"
  params: []

- id: brightness_up
  label: Brightness Up
  kind: action
  command: "\r*bri=+#\r"
  params: []

- id: brightness_down
  label: Brightness Down
  kind: action
  command: "\r*bri=-#\r"
  params: []

- id: brightness_status
  label: Brightness Value Query
  kind: query
  command: "\r*bri=?#\r"
  params: []

- id: color_up
  label: Color Up
  kind: action
  command: "\r*color=+#\r"
  params: []

- id: color_down
  label: Color Down
  kind: action
  command: "\r*color=-#\r"
  params: []

- id: color_status
  label: Color Value Query
  kind: query
  command: "\r*color=?#\r"
  params: []

- id: sharpness_up
  label: Sharpness Up
  kind: action
  command: "\r*sharp=+#\r"
  params: []

- id: sharpness_down
  label: Sharpness Down
  kind: action
  command: "\r*sharp=-#\r"
  params: []

- id: sharpness_status
  label: Sharpness Value Query
  kind: query
  command: "\r*sharp=?#\r"
  params: []

- id: color_temp_warmer
  label: Color Temperature - Warmer
  kind: action
  command: "\r*ct=warmer#\r"
  params: []

- id: color_temp_warm
  label: Color Temperature - Warm
  kind: action
  command: "\r*ct=warm#\r"
  params: []

- id: color_temp_normal
  label: Color Temperature - Normal
  kind: action
  command: "\r*ct=normal#\r"
  params: []

- id: color_temp_cool
  label: Color Temperature - Cool
  kind: action
  command: "\r*ct=cool#\r"
  params: []

- id: color_temp_cooler
  label: Color Temperature - Cooler
  kind: action
  command: "\r*ct=cooler#\r"
  params: []

- id: color_temp_native
  label: Color Temperature - Lamp Native
  kind: action
  command: "\r*ct=native#\r"
  params: []

- id: color_temp_status
  label: Color Temperature Status Query
  kind: query
  command: "\r*ct=?#\r"
  params: []

- id: aspect_4_3
  label: Aspect Ratio - 4:3
  kind: action
  command: "\r*asp=4:3#\r"
  params: []

- id: aspect_16_6
  label: Aspect Ratio - 16:6
  kind: action
  command: "\r*asp=16:6#\r"
  params: []

- id: aspect_16_9
  label: Aspect Ratio - 16:9
  kind: action
  command: "\r*asp=16:9#\r"
  params: []

- id: aspect_16_10
  label: Aspect Ratio - 16:10
  kind: action
  command: "\r*asp=16:10#\r"
  params: []

- id: aspect_auto
  label: Aspect Ratio - Auto
  kind: action
  command: "\r*asp=AUTO#\r"
  params: []

- id: aspect_real
  label: Aspect Ratio - Real
  kind: action
  command: "\r*asp=REAL#\r"
  params: []

- id: aspect_letterbox
  label: Aspect Ratio - Letterbox
  kind: action
  command: "\r*asp=LBOX#\r"
  params: []

- id: aspect_wide
  label: Aspect Ratio - Wide
  kind: action
  command: "\r*asp=WIDE#\r"
  params: []

- id: aspect_anamorphic
  label: Aspect Ratio - Anamorphic
  kind: action
  command: "\r*asp=ANAM#\r"
  params: []

- id: aspect_status
  label: Aspect Ratio Status Query
  kind: query
  command: "\r*asp=?#\r"
  params: []

- id: zoom_in
  label: Digital Zoom In
  kind: action
  command: "\r*zoomI#\r"
  params: []

- id: zoom_out
  label: Digital Zoom Out
  kind: action
  command: "\r*zoomO#\r"
  params: []

- id: auto
  label: Auto
  kind: action
  command: "\r*auto#\r"
  params: []

- id: brilliant_color_on
  label: Brilliant Color On
  kind: action
  command: "\r*BC=on#\r"
  params: []

- id: brilliant_color_off
  label: Brilliant Color Off
  kind: action
  command: "\r*BC=off#\r"
  params: []

- id: brilliant_color_status
  label: Brilliant Color Status Query
  kind: query
  command: "\r*BC=?#\r"
  params: []

# Operation Settings
- id: projector_position_front_table
  label: Projector Position - Front Table
  kind: action
  command: "\r*pp=FT#\r"
  params: []

- id: projector_position_rear_table
  label: Projector Position - Rear Table
  kind: action
  command: "\r*pp=RE#\r"
  params: []

- id: projector_position_rear_ceiling
  label: Projector Position - Rear Ceiling
  kind: action
  command: "\r*pp=RC#\r"
  params: []

- id: projector_position_front_ceiling
  label: Projector Position - Front Ceiling
  kind: action
  command: "\r*pp=FC#\r"
  params: []

- id: quick_auto_search_on
  label: Quick Auto Search On
  kind: action
  command: "\r*QAS=on#\r"
  params: []

- id: quick_auto_search_off
  label: Quick Auto Search Off
  kind: action
  command: "\r*QAS=off#\r"
  params: []

- id: quick_auto_search_status
  label: Quick Auto Search Status Query
  kind: query
  command: "\r*QAS=?#\r"
  params: []

- id: projector_position_status
  label: Projector Position Status Query
  kind: query
  command: "\r*pp=?#\r"
  params: []

- id: direct_power_on_enable
  label: Direct Power On - Enable
  kind: action
  command: "\r*directpower=on#\r"
  params: []

- id: direct_power_on_disable
  label: Direct Power On - Disable
  kind: action
  command: "\r*directpower=off#\r"
  params: []

- id: direct_power_on_status
  label: Direct Power On Status Query
  kind: query
  command: "\r*directpower=?#\r"
  params: []

- id: signal_power_on_enable
  label: Signal Power On - Enable
  kind: action
  command: "\r*autopower=on#\r"
  params: []

- id: signal_power_on_disable
  label: Signal Power On - Disable
  kind: action
  command: "\r*autopower=off#\r"
  params: []

- id: signal_power_on_status
  label: Signal Power On Status Query
  kind: query
  command: "\r*autopower=?#\r"
  params: []

- id: standby_network_on
  label: Standby Settings - Network On
  kind: action
  command: "\r*standbynet=on#\r"
  params: []

- id: standby_network_off
  label: Standby Settings - Network Off
  kind: action
  command: "\r*standbynet=off#\r"
  params: []

- id: standby_network_status
  label: Standby Settings - Network Status Query
  kind: query
  command: "\r*standbynet=?#\r"
  params: []

- id: standby_mic_on
  label: Standby Settings - Microphone On
  kind: action
  command: "\r*standbymic=on#\r"
  params: []

- id: standby_mic_off
  label: Standby Settings - Microphone Off
  kind: action
  command: "\r*standbymic=off#\r"
  params: []

- id: standby_mic_status
  label: Standby Settings - Microphone Status Query
  kind: query
  command: "\r*standbymic=?#\r"
  params: []

- id: standby_monitor_out_on
  label: Standby Settings - Monitor Out On
  kind: action
  command: "\r*standbymnt=on#\r"
  params: []

- id: standby_monitor_out_off
  label: Standby Settings - Monitor Out Off
  kind: action
  command: "\r*standbymnt=off#\r"
  params: []

- id: standby_monitor_out_status
  label: Standby Settings - Monitor Out Status Query
  kind: query
  command: "\r*standbymnt=?#\r"
  params: []

# Baud Rate
- id: baud_rate_2400
  label: Set Baud Rate 2400
  kind: action
  command: "\r*baud=2400#\r"
  params: []

- id: baud_rate_4800
  label: Set Baud Rate 4800
  kind: action
  command: "\r*baud=4800#\r"
  params: []

- id: baud_rate_9600
  label: Set Baud Rate 9600
  kind: action
  command: "\r*baud=9600#\r"
  params: []

- id: baud_rate_14400
  label: Set Baud Rate 14400
  kind: action
  command: "\r*baud=14400#\r"
  params: []

- id: baud_rate_19200
  label: Set Baud Rate 19200
  kind: action
  command: "\r*baud=19200#\r"
  params: []

- id: baud_rate_38400
  label: Set Baud Rate 38400
  kind: action
  command: "\r*baud=38400#\r"
  params: []

- id: baud_rate_57600
  label: Set Baud Rate 57600
  kind: action
  command: "\r*baud=57600#\r"
  params: []

- id: baud_rate_115200
  label: Set Baud Rate 115200
  kind: action
  command: "\r*baud=115200#\r"
  params: []

- id: baud_rate_status
  label: Current Baud Rate Query
  kind: query
  command: "\r*baud=?#\r"
  params: []

# Lamp Control
- id: lamp_hour_query
  label: Lamp Hour Query
  kind: query
  command: "\r*ltim=?#\r"
  params: []

- id: lamp2_hour_query
  label: Lamp 2 Hour Query
  kind: query
  command: "\r*ltim2=?#\r"
  params: []

- id: lamp_mode_normal
  label: Lamp Mode - Normal
  kind: action
  command: "\r*lampm=lnor#\r"
  params: []

- id: lamp_mode_eco
  label: Lamp Mode - Eco
  kind: action
  command: "\r*lampm=eco#\r"
  params: []

- id: lamp_mode_smart_eco_imagecare
  label: Lamp Mode - Smart Eco (ImageCare)
  kind: action
  command: "\r*lampm=seco#\r"
  params: []

- id: lamp_mode_smart_eco_lampcare
  label: Lamp Mode - Smart Eco (LampCare)
  kind: action
  command: "\r*lampm=seco2#\r"
  params: []

- id: lamp_mode_smart_eco_lumencare
  label: Lamp Mode - Smart Eco (LumenCare)
  kind: action
  command: "\r*lampm=seco3#\r"
  params: []

- id: lamp_mode_dimming
  label: Lamp Mode - Dimming
  kind: action
  command: "\r*lampm=dimming#\r"
  params: []

- id: lamp_mode_custom
  label: Lamp Mode - Custom
  kind: action
  command: "\r*lampm=custom#\r"
  params: []

- id: lamp_mode_dual_brightest
  label: Lamp Mode - Dual Brightest (Dual Lamp)
  kind: action
  command: "\r* lampm =dualbr#\r"
  params: []

- id: lamp_mode_dual_reliable
  label: Lamp Mode - Dual Reliable (Dual Lamp)
  kind: action
  command: "\r* lampm =dualre#\r"
  params: []

- id: lamp_mode_single_alternative
  label: Lamp Mode - Single Alternative (Dual Lamp)
  kind: action
  command: "\r* lampm =single#\r"
  params: []

- id: lamp_mode_single_alternative_eco
  label: Lamp Mode - Single Alternative Eco (Dual Lamp)
  kind: action
  command: "\r* lampm =singleeco#\r"
  params: []

- id: lamp_mode_status
  label: Lamp Mode Status Query
  kind: query
  command: "\r*lampm=?#\r"
  params: []

- id: model_name_query
  label: Model Name Query
  kind: query
  command: "\r*modelname=?#\r"
  params: []

# Miscellaneous
- id: blank_on
  label: Blank On
  kind: action
  command: "\r*blank=on#\r"
  params: []

- id: blank_off
  label: Blank Off
  kind: action
  command: "\r*blank=off#\r"
  params: []

- id: blank_status
  label: Blank Status Query
  kind: query
  command: "\r*blank=?#\r"
  params: []

- id: freeze_on
  label: Freeze On
  kind: action
  command: "\r*freeze=on#\r"
  params: []

- id: freeze_off
  label: Freeze Off
  kind: action
  command: "\r*freeze=off#\r"
  params: []

- id: freeze_status
  label: Freeze Status Query
  kind: query
  command: "\r*freeze=?#\r"
  params: []

- id: menu_on
  label: Menu On
  kind: action
  command: "\r*menu=on#\r"
  params: []

- id: menu_off
  label: Menu Off
  kind: action
  command: "\r*menu=off#\r"
  params: []

- id: nav_up
  label: Navigation Up
  kind: action
  command: "\r*up#\r"
  params: []

- id: nav_down
  label: Navigation Down
  kind: action
  command: "\r*down#\r"
  params: []

- id: nav_right
  label: Navigation Right
  kind: action
  command: "\r*right#\r"
  params: []

- id: nav_left
  label: Navigation Left
  kind: action
  command: "\r*left#\r"
  params: []

- id: nav_enter
  label: Navigation Enter
  kind: action
  command: "\r*enter#\r"
  params: []

- id: 3d_sync_off
  label: 3D Sync Off
  kind: action
  command: "\r*3d=off#\r"
  params: []

- id: 3d_auto
  label: 3D Auto
  kind: action
  command: "\r*3d=auto#\r"
  params: []

- id: 3d_top_bottom
  label: 3D Sync Top-Bottom
  kind: action
  command: "\r*3d=tb#\r"
  params: []

- id: 3d_frame_sequential
  label: 3D Sync Frame Sequential
  kind: action
  command: "\r*3d=fs#\r"
  params: []

- id: 3d_framepacking
  label: 3D Framepacking
  kind: action
  command: "\r*3d=fp#\r"
  params: []

- id: 3d_side_by_side
  label: 3D Side by Side
  kind: action
  command: "\r*3d=sbs#\r"
  params: []

- id: 3d_inverter_disable
  label: 3D Inverter Disable
  kind: action
  command: "\r*3d=da#\r"
  params: []

- id: 3d_inverter
  label: 3D Inverter
  kind: action
  command: "\r*3d=iv#\r"
  params: []

- id: 3d_2d_to_3d
  label: 2D to 3D
  kind: action
  command: "\r*3d=2d3d#\r"
  params: []

- id: 3d_nvidia
  label: 3D nVIDIA
  kind: action
  command: "\r*3d=nvidia#\r"
  params: []

- id: 3d_sync_status
  label: 3D Sync Status Query
  kind: query
  command: "\r*3d=?#\r"
  params: []

- id: remote_receiver_front_rear
  label: Remote Receiver - Front+Rear
  kind: action
  command: "\r*rr=fr#\r"
  params: []

- id: remote_receiver_front
  label: Remote Receiver - Front
  kind: action
  command: "\r*rr=f#\r"
  params: []

- id: remote_receiver_rear
  label: Remote Receiver - Rear
  kind: action
  command: "\r*rr=r#\r"
  params: []

- id: remote_receiver_top
  label: Remote Receiver - Top
  kind: action
  command: "\r*rr=t#\r"
  params: []

- id: remote_receiver_top_front
  label: Remote Receiver - Top+Front
  kind: action
  command: "\r*rr=tf#\r"
  params: []

- id: remote_receiver_top_rear
  label: Remote Receiver - Top+Rear
  kind: action
  command: "\r*rr=tr#\r"
  params: []

- id: remote_receiver_status
  label: Remote Receiver Status Query
  kind: query
  command: "\r*rr=?#\r"
  params: []

- id: instant_on_enable
  label: Instant On - Enable
  kind: action
  command: "\r*ins=on#\r"
  params: []

- id: instant_on_disable
  label: Instant On - Disable
  kind: action
  command: "\r*ins=off#\r"
  params: []

- id: instant_on_status
  label: Instant On Status Query
  kind: query
  command: "\r*ins=?#\r"
  params: []

- id: lamp_saver_on
  label: Lamp Saver Mode On
  kind: action
  command: "\r*lpsaver=on#\r"
  params: []

- id: lamp_saver_off
  label: Lamp Saver Mode Off
  kind: action
  command: "\r*lpsaver=off#\r"
  params: []

- id: lamp_saver_status
  label: Lamp Saver Mode Status Query
  kind: query
  command: "\r*lpsaver=?#\r"
  params: []

- id: projection_login_code_on
  label: Projection Login Code On
  kind: action
  command: "\r*prjlogincode=on#\r"
  params: []

- id: projection_login_code_off
  label: Projection Login Code Off
  kind: action
  command: "\r*prjlogincode=off#\r"
  params: []

- id: projection_login_code_status
  label: Projection Login Code Status Query
  kind: query
  command: "\r*prjlogincode=?#\r"
  params: []

- id: broadcasting_on
  label: Broadcasting On
  kind: action
  command: "\r*broadcasting=on#\r"
  params: []

- id: broadcasting_off
  label: Broadcasting Off
  kind: action
  command: "\r*broadcasting=off#\r"
  params: []

- id: broadcasting_status
  label: Broadcasting Status Query
  kind: query
  command: "\r*broadcasting=?#\r"
  params: []

- id: amx_dd_on
  label: AMX Device Discovery On
  kind: action
  command: "\r*amxdd=on#\r"
  params: []

- id: amx_dd_off
  label: AMX Device Discovery Off
  kind: action
  command: "\r*amxdd=off#\r"
  params: []

- id: amx_dd_status
  label: AMX Device Discovery Status Query
  kind: query
  command: "\r*amxdd=?#\r"
  params: []

- id: mac_address_query
  label: MAC Address Query
  kind: query
  command: "\r*macaddr=?#\r"
  params: []

- id: high_altitude_on
  label: High Altitude Mode On
  kind: action
  command: "\r*Highaltitude=on#\r"
  params: []

- id: high_altitude_off
  label: High Altitude Mode Off
  kind: action
  command: "\r*Highaltitude=off#\r"
  params: []

- id: high_altitude_status
  label: High Altitude Mode Status Query
  kind: query
  command: "\r*Highaltitude=?#\r"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  command: "\r*pow=?#\r"

- id: source_state
  type: string
  description: Current input source identifier
  command: "\r*sour=?#\r"

- id: mute_state
  type: enum
  values: [on, off]
  command: "\r*mute=?#\r"

- id: volume_level
  type: integer
  description: Current volume level
  command: "\r*vol=?#\r"

- id: picture_mode_state
  type: string
  description: Current picture mode
  command: "\r*appmod=?#\r"

- id: contrast_value
  type: integer
  description: Current contrast value
  command: "\r*con=?#\r"

- id: brightness_value
  type: integer
  description: Current brightness value
  command: "\r*bri=?#\r"

- id: color_value
  type: integer
  description: Current color value
  command: "\r*color=?#\r"

- id: sharpness_value
  type: integer
  description: Current sharpness value
  command: "\r*sharp=?#\r"

- id: color_temp_state
  type: string
  description: Current color temperature
  command: "\r*ct=?#\r"

- id: aspect_state
  type: string
  description: Current aspect ratio
  command: "\r*asp=?#\r"

- id: blank_state
  type: enum
  values: [on, off]
  command: "\r*blank=?#\r"

- id: freeze_state
  type: enum
  values: [on, off]
  command: "\r*freeze=?#\r"

- id: lamp_hours
  type: integer
  description: Lamp hours used
  command: "\r*ltim=?#\r"

- id: lamp_mode_state
  type: string
  description: Current lamp mode
  command: "\r*lampm=?#\r"

- id: model_name
  type: string
  description: Projector model name
  command: "\r*modelname=?#\r"

- id: baud_rate_state
  type: integer
  description: Current baud rate
  command: "\r*baud=?#\r"

- id: 3d_sync_state
  type: string
  description: Current 3D sync mode
  command: "\r*3d=?#\r"

- id: brilliant_color_state
  type: enum
  values: [on, off]
  command: "\r*BC=?#\r"

- id: projector_position_state
  type: string
  description: Current projector position
  command: "\r*pp=?#\r"

- id: instant_on_state
  type: enum
  values: [on, off]
  command: "\r*ins=?#\r"

- id: high_altitude_state
  type: enum
  values: [on, off]
  command: "\r*Highaltitude=?#\r"
```

## Variables
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Events
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Macros
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures documented in the source.
```

## Notes
Commands follow the pattern `<CR>*<command>#<CR>` where `<CR>` is a carriage return (0x0D). The source confirms that uppercase, lowercase, and mixed-case characters are all accepted. Error responses from the device: "Illegal format" for malformed commands, "Unsupported item" for valid format but unsupported feature, "Block item" for valid format but command not executable under current conditions. When using RS232 via LAN (TCP port 8000), the CR prefix/suffix is optional — commands work with or without the leading/trailing `<CR>`. The baud rate for RS-232 serial connections is configurable (2400–115200 bps); the actual baud rate must be confirmed from the projector OSD before connecting. The dual-lamp variant commands (dualbr, dualre, single, singleeco) use a command string with spaces around `lampm` (` lampm `) as documented in the source.

<!-- UNRESOLVED: Response payload formats for query commands (e.g., what string is returned for power status) are not specified in the source. Firmware version compatibility is not stated. -->

## Provenance

```yaml
source_domains:
  - esupportdownload.benq.com
  - audiogeneral.com
  - manualslib.com
  - scribd.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - https://www.audiogeneral.com/BenQ/rs232_commands_generic_082613.pdf
  - https://www.manualslib.com/manual/481564/Benq-Rs232-Commands.html
  - https://www.scribd.com/doc/146742986/Benq-Rs232-Commands
  - "https://esupportdownload.benq.com/esupport/PDP/Control%20Protocols/RP840G/PDP_cp_RP840G_20160826_142256_RP_CVT_RS232_command_list_v2.pdf"
retrieved_at: 2026-05-15T03:06:03.129Z
last_checked_at: 2026-06-23T10:12:11.529Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T10:12:11.529Z
matched_actions: 187
action_count: 187
confidence: medium
summary: "All 187 spec actions matched source ASCII commands; transport serial/TCP port 8000 verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source document notes that available features differ by projector specification; commands marked \"No\" in the Support column are included for completeness. Baud rate must be checked from the projector OSD menu."
- "configurable; check projector OSD - options: 9600/14400/19200/38400/57600/115200 bps"
- "populate from source, or remove section if not applicable"
- "no explicit safety warnings or interlock procedures documented in the source."
- "Response payload formats for query commands (e.g., what string is returned for power status) are not specified in the source. Firmware version compatibility is not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
