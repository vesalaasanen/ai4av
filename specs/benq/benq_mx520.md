---
spec_id: admin/benq-mx520
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ MX520 Control Spec"
manufacturer: BenQ
model_family: MX520
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - MX520
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - benqimage.blob.core.windows.net
  - esupportdownload.benq.com
source_urls:
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/PU9530/RS232%20Control%20Guide_0_Windows7_Windows8_WinXP.pdf"
retrieved_at: 2026-05-04T08:14:40.555Z
last_checked_at: 2026-06-01T23:12:27.754Z
generated_at: 2026-06-01T23:12:27.754Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "applicability of every command to MX520 — source note states \"function will vary from model to model\" (ex: source, audio settings, aspect ratio..etc). The MX520-specific applicability of each row is not enumerated in the source."
  - "absolute numeric setpoints for contrast/brightness/color/sharpness"
  - "source does not document unsolicited device-initiated events"
  - "source does not document any multi-step sequences."
  - "firmware version compatibility not stated in source. UNRESOLVED: per-row MX520 applicability not stated in source. UNRESOLVED: network/IP-control command surface not stated in source (only RS-232 documented). UNRESOLVED: continuous numeric setpoints for picture settings not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-01T23:12:27.754Z
  matched_actions: 173
  action_count: 173
  confidence: medium
  summary: "All 173 spec actions matched literally to source commands; all transport parameters (115200 baud, 8-bit, no parity, 1 stop bit, no flow control) verified in source; complete coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# BenQ MX520 Control Spec

## Summary
BenQ MX520 projector with RS-232 serial control using ASCII framed commands of the form `<CR>*cmd=val#<CR>`. Source documents the full command table covering power, source selection, audio, picture mode, picture settings, aspect, 3D, lamp control, baud, and miscellaneous settings plus their query variants.

<!-- UNRESOLVED: applicability of every command to MX520 — source note states "function will vary from model to model" (ex: source, audio settings, aspect ratio..etc). The MX520-specific applicability of each row is not enumerated in the source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # default per source; settable in OSD menu to 2400/4800/9600/14400/19200/38400/57600/115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from power command examples
- routable  # inferred from source-select command examples
- queryable  # inferred from query command examples
- levelable  # inferred from volume + brightness + contrast + color + sharpness control
```

## Actions
```yaml
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

- id: select_computer1_rgb
  label: Source - COMPUTER/YPbPr (RGB)
  kind: action
  command: "\r*sour=RGB#\r"
  params: []

- id: select_computer2_rgb
  label: Source - COMPUTER 2/YPbPr2 (RGB2)
  kind: action
  command: "\r*sour=RGB2#\r"
  params: []

- id: select_component
  label: Source - Component (YPbPr)
  kind: action
  command: "\r*sour=ypbr#\r"
  params: []

- id: select_component2
  label: Source - Component 2 (YPbPr2)
  kind: action
  command: "\r*sour=ypbr2#\r"
  params: []

- id: select_dvi_a
  label: Source - DVI-A
  kind: action
  command: "\r*sour=dviA#\r"
  params: []

- id: select_dvi_d
  label: Source - DVI-D
  kind: action
  command: "\r*sour=dvid#\r"
  params: []

- id: select_hdmi
  label: Source - HDMI
  kind: action
  command: "\r*sour=hdmi#\r"
  params: []

- id: select_hdmi2
  label: Source - HDMI 2
  kind: action
  command: "\r*sour=hdmi2#\r"
  params: []

- id: select_composite
  label: Source - Composite Video
  kind: action
  command: "\r*sour=vid#\r"
  params: []

- id: select_svideo
  label: Source - S-Video
  kind: action
  command: "\r*sour=svid#\r"
  params: []

- id: select_network
  label: Source - Network
  kind: action
  command: "\r*sour=network#\r"
  params: []

- id: select_usb_display
  label: Source - USB Display
  kind: action
  command: "\r*sour=usbdisplay#\r"
  params: []

- id: select_usb_reader
  label: Source - USB Reader
  kind: action
  command: "\r*sour=usbreader#\r"
  params: []

- id: current_source
  label: Current Source
  kind: query
  command: "\r*sour=?#\r"
  params: []

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
  label: Volume +
  kind: action
  command: "\r*vol=+#\r"
  params: []

- id: volume_down
  label: Volume -
  kind: action
  command: "\r*vol=-#\r"
  params: []

- id: volume_status
  label: Volume Status
  kind: query
  command: "\r*vol=?#\r"
  params: []

- id: mic_volume_up
  label: Mic Volume +
  kind: action
  command: "\r*micvol=+#\r"
  params: []

- id: mic_volume_down
  label: Mic Volume -
  kind: action
  command: "\r*micvol=-#\r"
  params: []

- id: mic_volume_status
  label: Mic Volume Status
  kind: query
  command: "\r*micvol=?#\r"
  params: []

- id: audio_source_off
  label: Audio Pass-Through Off
  kind: action
  command: "\r*audiosour=off#\r"
  params: []

- id: audio_source_rgb
  label: Audio - Computer 1
  kind: action
  command: "\r*audiosour=RGB#\r"
  params: []

- id: audio_source_rgb2
  label: Audio - Computer 2
  kind: action
  command: "\r*audiosour=RGB2#\r"
  params: []

- id: audio_source_vid
  label: Audio - Video/S-Video
  kind: action
  command: "\r*audiosour=vid#\r"
  params: []

- id: audio_source_ypbr
  label: Audio - Component
  kind: action
  command: "\r*audiosour=ypbr#\r"
  params: []

- id: audio_source_hdmi
  label: Audio - HDMI
  kind: action
  command: "\r*audiosour=hdmi#\r"
  params: []

- id: audio_source_hdmi2
  label: Audio - HDMI 2
  kind: action
  command: "\r*audiosour=hdmi2#\r"
  params: []

- id: audio_source_status
  label: Audio Pass-Through Status
  kind: query
  command: "\r*audiosour=?#\r"
  params: []

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

- id: picture_mode_living_room
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
  label: Picture Mode - Standard
  kind: action
  command: "\r*appmod=std#\r"
  params: []

- id: picture_mode_user1
  label: Picture Mode - User 1
  kind: action
  command: "\r*appmod=user1#\r"
  params: []

- id: picture_mode_user2
  label: Picture Mode - User 2
  kind: action
  command: "\r*appmod=user2#\r"
  params: []

- id: picture_mode_user3
  label: Picture Mode - User 3
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
  label: Picture Mode Status
  kind: query
  command: "\r*appmod=?#\r"
  params: []

- id: contrast_up
  label: Contrast +
  kind: action
  command: "\r*con=+#\r"
  params: []

- id: contrast_down
  label: Contrast -
  kind: action
  command: "\r*con=-#\r"
  params: []

- id: contrast_status
  label: Contrast Value
  kind: query
  command: "\r*con=?#\r"
  params: []

- id: brightness_up
  label: Brightness +
  kind: action
  command: "\r*bri=+#\r"
  params: []

- id: brightness_down
  label: Brightness -
  kind: action
  command: "\r*bri=-#\r"
  params: []

- id: brightness_status
  label: Brightness Value
  kind: query
  command: "\r*bri=?#\r"
  params: []

- id: color_up
  label: Color +
  kind: action
  command: "\r*color=+#\r"
  params: []

- id: color_down
  label: Color -
  kind: action
  command: "\r*color=-#\r"
  params: []

- id: color_status
  label: Color Value
  kind: query
  command: "\r*color=?#\r"
  params: []

- id: sharpness_up
  label: Sharpness +
  kind: action
  command: "\r*sharp=+#\r"
  params: []

- id: sharpness_down
  label: Sharpness -
  kind: action
  command: "\r*sharp=-#\r"
  params: []

- id: sharpness_status
  label: Sharpness Value
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

- id: color_temp_lamp_native
  label: Color Temperature - Lamp Native
  kind: action
  command: "\r*ct=native#\r"
  params: []

- id: color_temp_status
  label: Color Temperature Status
  kind: query
  command: "\r*ct=?#\r"
  params: []

- id: aspect_4_3
  label: Aspect - 4:3
  kind: action
  command: "\r*asp=4:3#\r"
  params: []

- id: aspect_16_9
  label: Aspect - 16:9
  kind: action
  command: "\r*asp=16:9#\r"
  params: []

- id: aspect_16_10
  label: Aspect - 16:10
  kind: action
  command: "\r*asp=16:10#\r"
  params: []

- id: aspect_auto
  label: Aspect - Auto
  kind: action
  command: "\r*asp=AUTO#\r"
  params: []

- id: aspect_real
  label: Aspect - Real
  kind: action
  command: "\r*asp=REAL#\r"
  params: []

- id: aspect_letterbox
  label: Aspect - Letterbox
  kind: action
  command: "\r*asp=LBOX#\r"
  params: []

- id: aspect_wide
  label: Aspect - Wide
  kind: action
  command: "\r*asp=WIDE#\r"
  params: []

- id: aspect_anamorphic
  label: Aspect - Anamorphic
  kind: action
  command: "\r*asp=ANAM#\r"
  params: []

- id: aspect_status
  label: Aspect Status
  kind: query
  command: "\r*asp=?#\r"
  params: []

- id: digital_zoom_in
  label: Digital Zoom In
  kind: action
  command: "\r*zoomI#\r"
  params: []

- id: digital_zoom_out
  label: Digital Zoom Out
  kind: action
  command: "\r*zoomO#\r"
  params: []

- id: auto_adjust
  label: Auto Adjust
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
  label: Brilliant Color Status
  kind: query
  command: "\r*BC=?#\r"
  params: []

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

- id: projector_position_status
  label: Projector Position Status
  kind: query
  command: "\r*pp=?#\r"
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
  label: Quick Auto Search Status
  kind: query
  command: "\r*QAS=?#\r"
  params: []

- id: direct_power_on
  label: Direct Power On
  kind: action
  command: "\r*directpower=on#\r"
  params: []

- id: direct_power_off
  label: Direct Power Off
  kind: action
  command: "\r*directpower=off#\r"
  params: []

- id: direct_power_status
  label: Direct Power Status
  kind: query
  command: "\r*directpower=?#\r"
  params: []

- id: signal_power_on
  label: Signal Power On
  kind: action
  command: "\r*autopower=on#\r"
  params: []

- id: signal_power_off
  label: Signal Power Off
  kind: action
  command: "\r*autopower=off#\r"
  params: []

- id: signal_power_status
  label: Signal Power Status
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
  label: Standby Settings - Network Status
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
  label: Standby Settings - Microphone Status
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
  label: Standby Settings - Monitor Out Status
  kind: query
  command: "\r*standbymnt=?#\r"
  params: []

- id: baud_2400
  label: Baud Rate - 2400
  kind: action
  command: "\r*baud=2400#\r"
  params: []

- id: baud_4800
  label: Baud Rate - 4800
  kind: action
  command: "\r*baud=4800#\r"
  params: []

- id: baud_9600
  label: Baud Rate - 9600
  kind: action
  command: "\r*baud=9600#\r"
  params: []

- id: baud_14400
  label: Baud Rate - 14400
  kind: action
  command: "\r*baud=14400#\r"
  params: []

- id: baud_19200
  label: Baud Rate - 19200
  kind: action
  command: "\r*baud=19200#\r"
  params: []

- id: baud_38400
  label: Baud Rate - 38400
  kind: action
  command: "\r*baud=38400#\r"
  params: []

- id: baud_57600
  label: Baud Rate - 57600
  kind: action
  command: "\r*baud=57600#\r"
  params: []

- id: baud_115200
  label: Baud Rate - 115200
  kind: action
  command: "\r*baud=115200#\r"
  params: []

- id: baud_status
  label: Current Baud Rate
  kind: query
  command: "\r*baud=?#\r"
  params: []

- id: lamp_hour
  label: Lamp Hour
  kind: query
  command: "\r*ltim=?#\r"
  params: []

- id: lamp2_hour
  label: Lamp 2 Hour
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

- id: lamp_mode_smart_eco
  label: Lamp Mode - Smart Eco
  kind: action
  command: "\r*lampm=seco#\r"
  params: []

- id: lamp_mode_dual_brightest
  label: Lamp Mode - Dual Brightest (dual-lamp)
  kind: action
  command: "\r*lampm=dualbr#\r"
  params: []

- id: lamp_mode_dual_reliable
  label: Lamp Mode - Dual Reliable (dual-lamp)
  kind: action
  command: "\r*lampm=dualre#\r"
  params: []

- id: lamp_mode_single_alternative
  label: Lamp Mode - Single Alternative (dual-lamp)
  kind: action
  command: "\r*lampm=single#\r"
  params: []

- id: lamp_mode_single_alternative_eco
  label: Lamp Mode - Single Alternative Eco (dual-lamp)
  kind: action
  command: "\r*lampm=singleeco#\r"
  params: []

- id: lamp_mode_status
  label: Lamp Mode Status
  kind: query
  command: "\r*lampm=?#\r"
  params: []

- id: model_name
  label: Model Name
  kind: query
  command: "\r*modelname=?#\r"
  params: []

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
  label: Blank Status
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
  label: Freeze Status
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

- id: menu_up
  label: Menu - Up
  kind: action
  command: "\r*up#\r"
  params: []

- id: menu_down
  label: Menu - Down
  kind: action
  command: "\r*down#\r"
  params: []

- id: menu_right
  label: Menu - Right
  kind: action
  command: "\r*right#\r"
  params: []

- id: menu_left
  label: Menu - Left
  kind: action
  command: "\r*left#\r"
  params: []

- id: menu_enter
  label: Menu - Enter
  kind: action
  command: "\r*enter#\r"
  params: []

- id: threed_off
  label: 3D Sync - Off
  kind: action
  command: "\r*3d=off#\r"
  params: []

- id: threed_auto
  label: 3D Sync - Auto
  kind: action
  command: "\r*3d=auto#\r"
  params: []

- id: threed_top_bottom
  label: 3D Sync - Top-Bottom
  kind: action
  command: "\r*3d=tb#\r"
  params: []

- id: threed_frame_sequential
  label: 3D Sync - Frame Sequential
  kind: action
  command: "\r*3d=fs#\r"
  params: []

- id: threed_framepacking
  label: 3D - Frame Packing
  kind: action
  command: "\r*3d=fp#\r"
  params: []

- id: threed_side_by_side
  label: 3D - Side by Side
  kind: action
  command: "\r*3d=sbs#\r"
  params: []

- id: threed_inverter_disable
  label: 3D - Inverter Disable
  kind: action
  command: "\r*3d=da#\r"
  params: []

- id: threed_inverter
  label: 3D - Inverter
  kind: action
  command: "\r*3d=iv#\r"
  params: []

- id: threed_2d_to_3d
  label: 3D - 2D to 3D
  kind: action
  command: "\r*3d=2d3d#\r"
  params: []

- id: threed_nvidia
  label: 3D - nVIDIA
  kind: action
  command: "\r*3d=nvidia#\r"
  params: []

- id: threed_status
  label: 3D Sync Status
  kind: query
  command: "\r*3d=?#\r"
  params: []

- id: remote_receiver_front_rear
  label: Remote Receiver - Front + Rear
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

- id: remote_receiver_status
  label: Remote Receiver Status
  kind: query
  command: "\r*rr=?#\r"
  params: []

- id: instant_on
  label: Instant On
  kind: action
  command: "\r*ins=on#\r"
  params: []

- id: instant_off
  label: Instant Off
  kind: action
  command: "\r*ins=off#\r"
  params: []

- id: instant_status
  label: Instant On Status
  kind: query
  command: "\r*ins=?#\r"
  params: []

- id: lamp_saver_on
  label: Lamp Saver Mode - On
  kind: action
  command: "\r*lpsaver=on#\r"
  params: []

- id: lamp_saver_off
  label: Lamp Saver Mode - Off
  kind: action
  command: "\r*lpsaver=off#\r"
  params: []

- id: lamp_saver_status
  label: Lamp Saver Mode Status
  kind: query
  command: "\r*lpsaver=?#\r"
  params: []

- id: prj_login_code_on
  label: Projection Log In Code - On
  kind: action
  command: "\r*prjlogincode=on#\r"
  params: []

- id: prj_login_code_off
  label: Projection Log In Code - Off
  kind: action
  command: "\r*prjlogincode=off#\r"
  params: []

- id: prj_login_code_status
  label: Projection Log In Code Status
  kind: query
  command: "\r*prjlogincode=?#\r"
  params: []

- id: broadcasting_on
  label: Broadcasting - On
  kind: action
  command: "\r*broadcasting=on#\r"
  params: []

- id: broadcasting_off
  label: Broadcasting - Off
  kind: action
  command: "\r*broadcasting=off#\r"
  params: []

- id: broadcasting_status
  label: Broadcasting Status
  kind: query
  command: "\r*broadcasting=?#\r"
  params: []

- id: amx_discovery_on
  label: AMX Device Discovery - On
  kind: action
  command: "\r*amxdd=on#\r"
  params: []

- id: amx_discovery_off
  label: AMX Device Discovery - Off
  kind: action
  command: "\r*amxdd=off#\r"
  params: []

- id: amx_discovery_status
  label: AMX Device Discovery Status
  kind: query
  command: "\r*amxdd=?#\r"
  params: []

- id: mac_address
  label: MAC Address
  kind: query
  command: "\r*macaddr=?#\r"
  params: []

- id: high_altitude_on
  label: High Altitude Mode - On
  kind: action
  command: "\r*Highaltitude=on#\r"
  params: []

- id: high_altitude_off
  label: High Altitude Mode - Off
  kind: action
  command: "\r*Highaltitude=off#\r"
  params: []

- id: high_altitude_status
  label: High Altitude Mode Status
  kind: query
  command: "\r*Highaltitude=?#\r"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
- id: mute_state
  type: enum
  values: [on, off]
- id: volume_state
  type: integer
  description: "Returned by *vol=?#"
- id: mic_volume_state
  type: integer
  description: "Returned by *micvol=?#"
- id: audio_source_state
  type: string
  description: "Returned by *audiosour=?#"
- id: source_state
  type: string
  description: "Returned by *sour=?#"
- id: picture_mode_state
  type: string
  description: "Returned by *appmod=?#"
- id: contrast_state
  type: integer
  description: "Returned by *con=?#"
- id: brightness_state
  type: integer
  description: "Returned by *bri=?#"
- id: color_state
  type: integer
  description: "Returned by *color=?#"
- id: sharpness_state
  type: integer
  description: "Returned by *sharp=?#"
- id: color_temp_state
  type: string
  description: "Returned by *ct=?#"
- id: aspect_state
  type: string
  description: "Returned by *asp=?#"
- id: brilliant_color_state
  type: enum
  values: [on, off]
- id: projector_position_state
  type: string
  description: "Returned by *pp=?#"
- id: quick_auto_search_state
  type: enum
  values: [on, off]
- id: direct_power_state
  type: enum
  values: [on, off]
- id: signal_power_state
  type: enum
  values: [on, off]
- id: standby_network_state
  type: enum
  values: [on, off]
- id: standby_mic_state
  type: enum
  values: [on, off]
- id: standby_monitor_out_state
  type: enum
  values: [on, off]
- id: baud_rate_state
  type: integer
  description: "Returned by *baud=?#"
- id: lamp_hour
  type: integer
  description: "Returned by *ltim=?#"
- id: lamp2_hour
  type: integer
  description: "Returned by *ltim2=?#"
- id: lamp_mode_state
  type: string
  description: "Returned by *lampm=?#"
- id: model_name
  type: string
  description: "Returned by *modelname=?#"
- id: blank_state
  type: enum
  values: [on, off]
- id: freeze_state
  type: enum
  values: [on, off]
- id: threed_state
  type: string
  description: "Returned by *3d=?#"
- id: remote_receiver_state
  type: string
  description: "Returned by *rr=?#"
- id: instant_state
  type: enum
  values: [on, off]
- id: lamp_saver_state
  type: enum
  values: [on, off]
- id: prj_login_code_state
  type: enum
  values: [on, off]
- id: broadcasting_state
  type: enum
  values: [on, off]
- id: amx_discovery_state
  type: enum
  values: [on, off]
- id: mac_address
  type: string
  description: "Returned by *macaddr=?#"
- id: high_altitude_state
  type: enum
  values: [on, off]
```

## Variables
```yaml
# No continuous / non-discrete parameters documented beyond +/- step commands above.
# UNRESOLVED: absolute numeric setpoints for contrast/brightness/color/sharpness
# not stated in source; only +/- relative steps are documented.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited device-initiated events
# over RS-232; all examples in the source are command/echo pairs.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# No safety warnings, interlock procedures, or power-on sequencing requirements
# are stated in the source.
```

## Notes
- Every command is bracketed by `<CR>` (ASCII 0x0D); the source's hex example for Power On is `0D 2A 70 6F 77 3D 6F 6E 23 0D`.
- Each input character is echoed; for query commands the device additionally echoes `<CR>` (0x0D) followed by the response, e.g. `> *pow=?#*POW=ON#`.
- Idle prompt: pressing Enter returns `3E,00` ("projector ready to accept RS-232 command"); after 5 s of no traffic, device returns `0D,0A,00`.
- Error responses: `Illegal format`, `Unsupported item`, `Block item`. Items 5/6 are not supported in power saving (standby <1W).
- Baud rate default 115200, settable in OSD to 2400/4800/9600/14400/19200/38400/57600/115200. Once baud is changed via RS-232 (`*baud=...#`), host must reconnect at the new rate.
- Source note: "The above function will be vary from model to model" — applicability of every enumerated row to MX520 specifically is not confirmed in the source. Treat as a generic BenQ projector command set; per-model applicability requires verification.
- Case-insensitive for input characters (per source note 2).

<!-- UNRESOLVED: firmware version compatibility not stated in source. UNRESOLVED: per-row MX520 applicability not stated in source. UNRESOLVED: network/IP-control command surface not stated in source (only RS-232 documented). UNRESOLVED: continuous numeric setpoints for picture settings not stated in source. -->

## Provenance

```yaml
source_domains:
  - benqimage.blob.core.windows.net
  - esupportdownload.benq.com
source_urls:
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/PU9530/RS232%20Control%20Guide_0_Windows7_Windows8_WinXP.pdf"
retrieved_at: 2026-05-04T08:14:40.555Z
last_checked_at: 2026-06-01T23:12:27.754Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T23:12:27.754Z
matched_actions: 173
action_count: 173
confidence: medium
summary: "All 173 spec actions matched literally to source commands; all transport parameters (115200 baud, 8-bit, no parity, 1 stop bit, no flow control) verified in source; complete coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "applicability of every command to MX520 — source note states \"function will vary from model to model\" (ex: source, audio settings, aspect ratio..etc). The MX520-specific applicability of each row is not enumerated in the source."
- "absolute numeric setpoints for contrast/brightness/color/sharpness"
- "source does not document unsolicited device-initiated events"
- "source does not document any multi-step sequences."
- "firmware version compatibility not stated in source. UNRESOLVED: per-row MX520 applicability not stated in source. UNRESOLVED: network/IP-control command surface not stated in source (only RS-232 documented). UNRESOLVED: continuous numeric setpoints for picture settings not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
