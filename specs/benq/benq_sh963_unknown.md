---
spec_id: admin/benq-sh963
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ SH963 Control Spec"
manufacturer: BenQ
model_family: "BenQ SH963"
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - "BenQ SH963"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - benqimage.blob.core.windows.net
  - manualslib.com
source_urls:
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
  - https://www.manualslib.com/manual/550936/Benq-Dx819st.html
  - https://www.manualslib.com/manual/3088967/Benq-Sh963.html
retrieved_at: 2026-08-16T18:18:36.805Z
last_checked_at: 2026-08-19T08:59:26.494Z
generated_at: 2026-08-19T08:59:26.494Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a shared BenQ RS232 doc, not SH963-exclusive; per-model command availability varies (\"The above function will be vary from model to model\"). Firmware compatibility, physical/electrical specs beyond serial settings, and network control details are not stated."
  - "exact response strings for non-power queries (sour=?, vol=?, etc.) not shown in source"
  - "numeric range not stated in source"
  - "no events stated in source"
  - "no multi-step sequences described in source"
  - "source contains no safety warnings, interlock procedures, or power-on"
  - "firmware version compatibility not stated in source"
  - "numeric ranges/steps for volume, contrast, brightness, color, sharpness not stated"
  - "response formats for most query commands (only power query response shown)"
  - "whether SH963 is dual-lamp; dual-lamp rows marked 雙燈 (dual lamp) in source"
verification:
  verdict: verified
  checked_at: 2026-08-19T08:59:26.494Z
  matched_actions: 173
  action_count: 173
  confidence: medium
  summary: "All 173 spec command literals appear verbatim in the source command table and transport parameters match exactly; bidirectional coverage is 1.00. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-16
---

# BenQ SH963 Control Spec

## Summary
BenQ SH963 projector controlled over RS-232 serial using ASCII command strings framed as `<CR>*command#<CR>`. Spec covers power, source selection, audio, picture modes/settings, lamp control, and miscellaneous settings commands, plus query commands for status readback. Source is the generic BenQ RS-232 command document that lists SH963 as a supported model.

<!-- UNRESOLVED: source is a shared BenQ RS232 doc, not SH963-exclusive; per-model command availability varies ("The above function will be vary from model to model"). Firmware compatibility, physical/electrical specs beyond serial settings, and network control details are not stated. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # default; changeable via OSD menu and *baud= command (2400/4800/9600/14400/19200/38400/57600/115200)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       - *pow=on / *pow=off present
# - routable        - *sour= source selection present
# - queryable       - *pow=?, *sour=?, *ltim=?, etc. present
# - levelable       - *vol=+/-, *con=+/-, *bri=+/- present
traits:
  - powerable
  - routable
  - queryable
  - levelable
```

## Actions
```yaml
# Framing: every command is wrapped as <CR>*command#<CR> - hex 0D before and after.
# Example: "<CR>*pow=on#<CR>" = 0D 2A 70 6F 77 3D 6F 6E 23 0D

# --- Power ---
- id: power_on
  label: Power On
  kind: action
  command: "<CR>*pow=on#<CR>"
  params: []
- id: power_off
  label: Power Off
  kind: action
  command: "<CR>*pow=off#<CR>"
  params: []
- id: power_status_query
  label: Power Status Query
  kind: query
  command: "<CR>*pow=?#<CR>"
  params: []

# --- Source selection ---
- id: select_source_computer_ypbpr
  label: "Select Source COMPUTER/YPbPr"
  kind: action
  command: "<CR>*sour=RGB#<CR>"
  params: []
- id: select_source_computer2_ypbpr2
  label: "Select Source COMPUTER 2/YPbPr2"
  kind: action
  command: "<CR>*sour=RGB2#<CR>"
  params: []
- id: select_source_component
  label: Select Source Component
  kind: action
  command: "<CR>*sour=ypbr#<CR>"
  params: []
- id: select_source_component2
  label: Select Source Component2
  kind: action
  command: "<CR>*sour=ypbr2#<CR>"
  params: []
- id: select_source_dvi_a
  label: Select Source DVI-A
  kind: action
  command: "<CR>*sour=dviA#<CR>"
  params: []
- id: select_source_dvi_d
  label: Select Source DVI-D
  kind: action
  command: "<CR>*sour=dvid#<CR>"
  params: []
- id: select_source_hdmi
  label: Select Source HDMI
  kind: action
  command: "<CR>*sour=hdmi#<CR>"
  params: []
- id: select_source_hdmi2
  label: Select Source HDMI 2
  kind: action
  command: "<CR>*sour=hdmi2#<CR>"
  params: []
- id: select_source_composite
  label: Select Source Composite
  kind: action
  command: "<CR>*sour=vid#<CR>"
  params: []
- id: select_source_svideo
  label: Select Source S-Video
  kind: action
  command: "<CR>*sour=svid#<CR>"
  params: []
- id: select_source_network
  label: Select Source Network
  kind: action
  command: "<CR>*sour=network#<CR>"
  params: []
- id: select_source_usb_display
  label: Select Source USB Display
  kind: action
  command: "<CR>*sour=usbdisplay#<CR>"
  params: []
- id: select_source_usb_reader
  label: Select Source USB Reader
  kind: action
  command: "<CR>*sour=usbreader#<CR>"
  params: []
- id: current_source_query
  label: Current Source Query
  kind: query
  command: "<CR>*sour=?#<CR>"
  params: []

# --- Audio control ---
- id: mute_on
  label: Mute On
  kind: action
  command: "<CR>*mute=on#<CR>"
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  command: "<CR>*mute=off#<CR>"
  params: []
- id: mute_status_query
  label: Mute Status Query
  kind: query
  command: "<CR>*mute=?#<CR>"
  params: []
- id: volume_up
  label: Volume +
  kind: action
  command: "<CR>*vol=+#<CR>"
  params: []
- id: volume_down
  label: Volume -
  kind: action
  command: "<CR>*vol=-#<CR>"
  params: []
- id: volume_status_query
  label: Volume Status Query
  kind: query
  command: "<CR>*vol=?#<CR>"
  params: []
- id: mic_volume_up
  label: Mic. Volume +
  kind: action
  command: "<CR>*micvol=+#<CR>"
  params: []
- id: mic_volume_down
  label: Mic. Volume -
  kind: action
  command: "<CR>*micvol=-#<CR>"
  params: []
- id: mic_volume_status_query
  label: Mic. Volume Status Query
  kind: query
  command: "<CR>*micvol=?#<CR>"
  params: []

# --- Audio source select ---
- id: audio_passthrough_off
  label: Audio Pass Through Off
  kind: action
  command: "<CR>*audiosour=off#<CR>"
  params: []
- id: select_audio_computer1
  label: Audio Computer1
  kind: action
  command: "<CR>*audiosour=RGB#<CR>"
  params: []
- id: select_audio_computer2
  label: Audio Computer2
  kind: action
  command: "<CR>*audiosour=RGB2#<CR>"
  params: []
- id: select_audio_video_svideo
  label: "Audio Video/S-Video"
  kind: action
  command: "<CR>*audiosour=vid#<CR>"
  params: []
- id: select_audio_component
  label: Audio Component
  kind: action
  command: "<CR>*audiosour=ypbr#<CR>"
  params: []
- id: select_audio_hdmi
  label: Audio HDMI
  kind: action
  command: "<CR>*audiosour=hdmi#<CR>"
  params: []
- id: select_audio_hdmi2
  label: Audio HDMI2
  kind: action
  command: "<CR>*audiosour=hdmi2#<CR>"
  params: []
- id: audio_passthrough_status_query
  label: Audio Pass Status Query
  kind: query
  command: "<CR>*audiosour=?#<CR>"
  params: []

# --- Picture mode ---
- id: picture_mode_dynamic
  label: "Picture Mode Dynamic"
  kind: action
  command: "<CR>*appmod=dynamic#<CR>"
  params: []
- id: picture_mode_presentation
  label: "Picture Mode Presentation"
  kind: action
  command: "<CR>*appmod=preset#<CR>"
  params: []
- id: picture_mode_srgb
  label: "Picture Mode sRGB"
  kind: action
  command: "<CR>*appmod=srgb#<CR>"
  params: []
- id: picture_mode_bright
  label: "Picture Mode Bright"
  kind: action
  command: "<CR>*appmod=bright#<CR>"
  params: []
- id: picture_mode_livingroom
  label: "Picture Mode LivingRoom"
  kind: action
  command: "<CR>*appmod=livingroom#<CR>"
  params: []
- id: picture_mode_game
  label: "Picture Mode Game"
  kind: action
  command: "<CR>*appmod=game#<CR>"
  params: []
- id: picture_mode_cinema
  label: "Picture Mode Cinema"
  kind: action
  command: "<CR>*appmod=cine#<CR>"
  params: []
- id: picture_mode_standard
  label: "Picture Mode Standard"
  kind: action
  command: "<CR>*appmod=std#<CR>"
  params: []
- id: picture_mode_user1
  label: "Picture Mode User1"
  kind: action
  command: "<CR>*appmod=user1#<CR>"
  params: []
- id: picture_mode_user2
  label: "Picture Mode User2"
  kind: action
  command: "<CR>*appmod=user2#<CR>"
  params: []
- id: picture_mode_user3
  label: "Picture Mode User3"
  kind: action
  command: "<CR>*appmod=user3#<CR>"
  params: []
- id: picture_mode_isf_day
  label: "Picture Mode ISF Day"
  kind: action
  command: "<CR>*appmod=isfday#<CR>"
  params: []
- id: picture_mode_isf_night
  label: "Picture Mode ISF Night"
  kind: action
  command: "<CR>*appmod=isfnight#<CR>"
  params: []
- id: picture_mode_3d
  label: "Picture Mode 3D"
  kind: action
  command: "<CR>*appmod=threed#<CR>"
  params: []
- id: picture_mode_query
  label: Picture Mode Query
  kind: query
  command: "<CR>*appmod=?#<CR>"
  params: []

# --- Picture settings ---
- id: contrast_up
  label: Contrast +
  kind: action
  command: "<CR>*con=+#<CR>"
  params: []
- id: contrast_down
  label: Contrast -
  kind: action
  command: "<CR>*con=-#<CR>"
  params: []
- id: contrast_query
  label: Contrast Value Query
  kind: query
  command: "<CR>*con=?#<CR>"
  params: []
- id: brightness_up
  label: Brightness +
  kind: action
  command: "<CR>*bri=+#<CR>"
  params: []
- id: brightness_down
  label: Brightness -
  kind: action
  command: "<CR>*bri=-#<CR>"
  params: []
- id: brightness_query
  label: Brightness Value Query
  kind: query
  command: "<CR>*bri=?#<CR>"
  params: []
- id: color_up
  label: Color +
  kind: action
  command: "<CR>*color=+#<CR>"
  params: []
- id: color_down
  label: Color -
  kind: action
  command: "<CR>*color=-#<CR>"
  params: []
- id: color_query
  label: Color Value Query
  kind: query
  command: "<CR>*color=?#<CR>"
  params: []
- id: sharpness_up
  label: Sharpness +
  kind: action
  command: "<CR>*sharp=+#<CR>"
  params: []
- id: sharpness_down
  label: Sharpness -
  kind: action
  command: "<CR>*sharp=-#<CR>"
  params: []
- id: sharpness_query
  label: Sharpness Value Query
  kind: query
  command: "<CR>*sharp=?#<CR>"
  params: []
- id: color_temperature_warmer
  label: "Color Temperature Warmer"
  kind: action
  command: "<CR>*ct=warmer#<CR>"
  params: []
- id: color_temperature_warm
  label: "Color Temperature Warm"
  kind: action
  command: "<CR>*ct=warm#<CR>"
  params: []
- id: color_temperature_normal
  label: "Color Temperature Normal"
  kind: action
  command: "<CR>*ct=normal#<CR>"
  params: []
- id: color_temperature_cool
  label: "Color Temperature Cool"
  kind: action
  command: "<CR>*ct=cool#<CR>"
  params: []
- id: color_temperature_cooler
  label: "Color Temperature Cooler"
  kind: action
  command: "<CR>*ct=cooler#<CR>"
  params: []
- id: color_temperature_lamp_native
  label: "Color Temperature Lamp Native"
  kind: action
  command: "<CR>*ct=native#<CR>"
  params: []
- id: color_temperature_query
  label: Color Temperature Status Query
  kind: query
  command: "<CR>*ct=?#<CR>"
  params: []
- id: aspect_4_3
  label: "Aspect 4:3"
  kind: action
  command: "<CR>*asp=4:3#<CR>"
  params: []
- id: aspect_16_9
  label: "Aspect 16:9"
  kind: action
  command: "<CR>*asp=16:9#<CR>"
  params: []
- id: aspect_16_10
  label: "Aspect 16:10"
  kind: action
  command: "<CR>*asp=16:10#<CR>"
  params: []
- id: aspect_auto
  label: Aspect Auto
  kind: action
  command: "<CR>*asp=AUTO#<CR>"
  params: []
- id: aspect_real
  label: Aspect Real
  kind: action
  command: "<CR>*asp=REAL#<CR>"
  params: []
- id: aspect_letterbox
  label: Aspect Letterbox
  kind: action
  command: "<CR>*asp=LBOX#<CR>"
  params: []
- id: aspect_wide
  label: Aspect Wide
  kind: action
  command: "<CR>*asp=WIDE#<CR>"
  params: []
- id: aspect_anamorphic
  label: Aspect Anamorphic
  kind: action
  command: "<CR>*asp=ANAM#<CR>"
  params: []
- id: aspect_query
  label: Aspect Status Query
  kind: query
  command: "<CR>*asp=?#<CR>"
  params: []
- id: digital_zoom_in
  label: Digital Zoom In
  kind: action
  command: "<CR>*zoomI#<CR>"
  params: []
- id: digital_zoom_out
  label: Digital Zoom Out
  kind: action
  command: "<CR>*zoomO#<CR>"
  params: []
- id: auto_setup
  label: Auto
  kind: action
  command: "<CR>*auto#<CR>"
  params: []
- id: brilliant_color_on
  label: Brilliant Color On
  kind: action
  command: "<CR>*BC=on#<CR>"
  params: []
- id: brilliant_color_off
  label: Brilliant Color Off
  kind: action
  command: "<CR>*BC=off#<CR>"
  params: []
- id: brilliant_color_query
  label: Brilliant Color Status Query
  kind: query
  command: "<CR>*BC=?#<CR>"
  params: []

# --- Operation settings ---
- id: projector_position_front_table
  label: "Projector Position Front Table"
  kind: action
  command: "<CR>*pp=FT#<CR>"
  params: []
- id: projector_position_rear_table
  label: "Projector Position Rear Table"
  kind: action
  command: "<CR>*pp=RE#<CR>"
  params: []
- id: projector_position_rear_ceiling
  label: "Projector Position Rear Ceiling"
  kind: action
  command: "<CR>*pp=RC#<CR>"
  params: []
- id: projector_position_front_ceiling
  label: "Projector Position Front Ceiling"
  kind: action
  command: "<CR>*pp=FC#<CR>"
  params: []
- id: projector_position_query
  label: Projector Position Status Query
  kind: query
  command: "<CR>*pp=?#<CR>"
  params: []
- id: quick_auto_search_on
  label: Quick Auto Search On
  kind: action
  command: "<CR>*QAS=on#<CR>"
  params: []
- id: quick_auto_search_off
  label: Quick Auto Search Off
  kind: action
  command: "<CR>*QAS=off#<CR>"
  params: []
- id: quick_auto_search_query
  label: Quick Auto Search Status Query
  kind: query
  command: "<CR>*QAS=?#<CR>"
  params: []
- id: direct_power_on_on
  label: Direct Power On On
  kind: action
  command: "<CR>*directpower=on#<CR>"
  params: []
- id: direct_power_on_off
  label: Direct Power On Off
  kind: action
  command: "<CR>*directpower=off#<CR>"
  params: []
- id: direct_power_on_query
  label: Direct Power On Status Query
  kind: query
  command: "<CR>*directpower=?#<CR>"
  params: []
- id: signal_power_on_on
  label: Signal Power On On
  kind: action
  command: "<CR>*autopower=on#<CR>"
  params: []
- id: signal_power_on_off
  label: Signal Power On Off
  kind: action
  command: "<CR>*autopower=off#<CR>"
  params: []
- id: signal_power_on_query
  label: Signal Power On Status Query
  kind: query
  command: "<CR>*autopower=?#<CR>"
  params: []
- id: standby_network_on
  label: Standby Network On
  kind: action
  command: "<CR>*standbynet=on#<CR>"
  params: []
- id: standby_network_off
  label: Standby Network Off
  kind: action
  command: "<CR>*standbynet=off#<CR>"
  params: []
- id: standby_network_query
  label: Standby Network Status Query
  kind: query
  command: "<CR>*standbynet=?#<CR>"
  params: []
- id: standby_microphone_on
  label: Standby Microphone On
  kind: action
  command: "<CR>*standbymic=on#<CR>"
  params: []
- id: standby_microphone_off
  label: Standby Microphone Off
  kind: action
  command: "<CR>*standbymic=off#<CR>"
  params: []
- id: standby_microphone_query
  label: Standby Microphone Status Query
  kind: query
  command: "<CR>*standbymic=?#<CR>"
  params: []
- id: standby_monitor_out_on
  label: Standby Monitor Out On
  kind: action
  command: "<CR>*standbymnt=on#<CR>"
  params: []
- id: standby_monitor_out_off
  label: Standby Monitor Out Off
  kind: action
  command: "<CR>*standbymnt=off#<CR>"
  params: []
- id: standby_monitor_out_query
  label: Standby Monitor Out Status Query
  kind: query
  command: "<CR>*standbymnt=?#<CR>"
  params: []

# --- Baud rate ---
- id: set_baud_2400
  label: Set Baud Rate 2400
  kind: action
  command: "<CR>*baud=2400#<CR>"
  params: []
- id: set_baud_4800
  label: Set Baud Rate 4800
  kind: action
  command: "<CR>*baud=4800#<CR>"
  params: []
- id: set_baud_9600
  label: Set Baud Rate 9600
  kind: action
  command: "<CR>*baud=9600#<CR>"
  params: []
- id: set_baud_14400
  label: Set Baud Rate 14400
  kind: action
  command: "<CR>*baud=14400#<CR>"
  params: []
- id: set_baud_19200
  label: Set Baud Rate 19200
  kind: action
  command: "<CR>*baud=19200#<CR>"
  params: []
- id: set_baud_38400
  label: Set Baud Rate 38400
  kind: action
  command: "<CR>*baud=38400#<CR>"
  params: []
- id: set_baud_57600
  label: Set Baud Rate 57600
  kind: action
  command: "<CR>*baud=57600#<CR>"
  params: []
- id: set_baud_115200
  label: Set Baud Rate 115200
  kind: action
  command: "<CR>*baud=115200#<CR>"
  params: []
- id: baud_rate_query
  label: Current Baud Rate Query
  kind: query
  command: "<CR>*baud=?#<CR>"
  params: []

# --- Lamp control ---
- id: lamp_hour_query
  label: Lamp Hour Query
  kind: query
  command: "<CR>*ltim=?#<CR>"
  params: []
- id: lamp2_hour_query
  label: Lamp2 Hour Query
  kind: query
  command: "<CR>*ltim2=?#<CR>"
  params: []
- id: lamp_mode_normal
  label: "Lamp Mode Normal"
  kind: action
  command: "<CR>*lampm=lnor#<CR>"
  params: []
- id: lamp_mode_eco
  label: "Lamp Mode Eco"
  kind: action
  command: "<CR>*lampm=eco#<CR>"
  params: []
- id: lamp_mode_smart_eco
  label: "Lamp Mode Smart Eco"
  kind: action
  command: "<CR>*lampm=seco#<CR>"
  params: []
- id: lamp_mode_dual_brightest
  label: "Lamp Mode Dual Brightest (dual-lamp)"
  kind: action
  command: "<CR>* lampm =dualbr#<CR>"  # verbatim from source incl. spaces; canonical form likely *lampm=dualbr#
  params: []
- id: lamp_mode_dual_reliable
  label: "Lamp Mode Dual Reliable (dual-lamp)"
  kind: action
  command: "<CR>* lampm =dualre#<CR>"  # verbatim from source incl. spaces
  params: []
- id: lamp_mode_single_alternative
  label: "Lamp Mode Single Alternative (dual-lamp)"
  kind: action
  command: "<CR>* lampm =single#<CR>"  # verbatim from source incl. spaces
  params: []
- id: lamp_mode_single_alternative_eco
  label: "Lamp Mode Single Alternative Eco (dual-lamp)"
  kind: action
  command: "<CR>* lampm =singleeco#<CR>"  # verbatim from source incl. spaces
  params: []
- id: lamp_mode_query
  label: Lamp Mode Status Query
  kind: query
  command: "<CR>*lampm=?#<CR>"
  params: []

# --- Miscellaneous ---
- id: model_name_query
  label: Model Name Query
  kind: query
  command: "<CR>*modelname=?#<CR>"
  params: []
- id: blank_on
  label: Blank On
  kind: action
  command: "<CR>*blank=on#<CR>"
  params: []
- id: blank_off
  label: Blank Off
  kind: action
  command: "<CR>*blank=off#<CR>"
  params: []
- id: blank_query
  label: Blank Status Query
  kind: query
  command: "<CR>*blank=?#<CR>"
  params: []
- id: freeze_on
  label: Freeze On
  kind: action
  command: "<CR>*freeze=on#<CR>"
  params: []
- id: freeze_off
  label: Freeze Off
  kind: action
  command: "<CR>*freeze=off#<CR>"
  params: []
- id: freeze_query
  label: Freeze Status Query
  kind: query
  command: "<CR>*freeze=?#<CR>"
  params: []
- id: menu_on
  label: Menu On
  kind: action
  command: "<CR>*menu=on#<CR>"
  params: []
- id: menu_off
  label: Menu Off
  kind: action
  command: "<CR>*menu=off#<CR>"
  params: []
- id: nav_up
  label: Up
  kind: action
  command: "<CR>*up#<CR>"
  params: []
- id: nav_down
  label: Down
  kind: action
  command: "<CR>*down#<CR>"
  params: []
- id: nav_right
  label: Right
  kind: action
  command: "<CR>*right#<CR>"
  params: []
- id: nav_left
  label: Left
  kind: action
  command: "<CR>*left#<CR>"
  params: []
- id: nav_enter
  label: Enter
  kind: action
  command: "<CR>*enter#<CR>"
  params: []
- id: three_d_sync_off
  label: 3D Sync Off
  kind: action
  command: "<CR>*3d=off#<CR>"
  params: []
- id: three_d_auto
  label: 3D Auto
  kind: action
  command: "<CR>*3d=auto#<CR>"
  params: []
- id: three_d_sync_top_bottom
  label: 3D Sync TopBottom
  kind: action
  command: "<CR>*3d=tb#<CR>"
  params: []
- id: three_d_sync_frame_sequential
  label: 3D Sync Frame Sequential
  kind: action
  command: "<CR>*3d=fs#<CR>"
  params: []
- id: three_d_frame_packing
  label: 3D Framepacking
  kind: action
  command: "<CR>*3d=fp#<CR>"
  params: []
- id: three_d_side_by_side
  label: 3D Side by Side
  kind: action
  command: "<CR>*3d=sbs#<CR>"
  params: []
- id: three_d_inverter_disable
  label: 3D Inverter Disable
  kind: action
  command: "<CR>*3d=da#<CR>"
  params: []
- id: three_d_inverter
  label: 3D Inverter
  kind: action
  command: "<CR>*3d=iv#<CR>"
  params: []
- id: two_d_to_three_d
  label: 2D to 3D
  kind: action
  command: "<CR>*3d=2d3d#<CR>"
  params: []
- id: three_d_nvidia
  label: 3D nVIDIA
  kind: action
  command: "<CR>*3d=nvidia#<CR>"
  params: []
- id: three_d_sync_query
  label: 3D Sync Status Query
  kind: query
  command: "<CR>*3d=?#<CR>"
  params: []
- id: remote_receiver_front_rear
  label: "Remote Receiver Front+Rear"
  kind: action
  command: "<CR>*rr=fr#<CR>"
  params: []
- id: remote_receiver_front
  label: Remote Receiver Front
  kind: action
  command: "<CR>*rr=f#<CR>"
  params: []
- id: remote_receiver_rear
  label: Remote Receiver Rear
  kind: action
  command: "<CR>*rr=r#<CR>"
  params: []
- id: remote_receiver_query
  label: Remote Receiver Status Query
  kind: query
  command: "<CR>*rr=?#<CR>"
  params: []
- id: instant_on_on
  label: Instant On On
  kind: action
  command: "<CR>*ins=on#<CR>"
  params: []
- id: instant_on_off
  label: Instant On Off
  kind: action
  command: "<CR>*ins=off#<CR>"
  params: []
- id: instant_on_query
  label: Instant On Status Query
  kind: query
  command: "<CR>*ins=?#<CR>"
  params: []
- id: lamp_saver_on
  label: LampSaver Mode On
  kind: action
  command: "<CR>*lpsaver=on#<CR>"
  params: []
- id: lamp_saver_off
  label: LampSaver Mode Off
  kind: action
  command: "<CR>*lpsaver=off#<CR>"
  params: []
- id: lamp_saver_query
  label: LampSaver Mode Status Query
  kind: query
  command: "<CR>*lpsaver=?#<CR>"
  params: []
- id: projection_login_code_on
  label: Projection Log In Code On
  kind: action
  command: "<CR>*prjlogincode=on#<CR>"
  params: []
- id: projection_login_code_off
  label: Projection Log In Code Off
  kind: action
  command: "<CR>*prjlogincode=off#<CR>"
  params: []
- id: projection_login_code_query
  label: Projection Log In Code Status Query
  kind: query
  command: "<CR>*prjlogincode=?#<CR>"
  params: []
- id: broadcasting_on
  label: Broadcasting On
  kind: action
  command: "<CR>*broadcasting=on#<CR>"
  params: []
- id: broadcasting_off
  label: Broadcasting Off
  kind: action
  command: "<CR>*broadcasting=off#<CR>"
  params: []
- id: broadcasting_query
  label: Broadcasting Status Query
  kind: query
  command: "<CR>*broadcasting=?<CR>"  # verbatim from source; '#' terminator missing in source (likely typo)
  params: []
- id: amx_device_discovery_on
  label: AMX Device Discovery On
  kind: action
  command: "<CR>*amxdd=on#<CR>"
  params: []
- id: amx_device_discovery_off
  label: AMX Device Discovery Off
  kind: action
  command: "<CR>*amxdd=off#<CR>"
  params: []
- id: amx_device_discovery_query
  label: AMX Device Discovery Status Query
  kind: query
  command: "<CR>*amxdd=?#<CR>"
  params: []
- id: mac_address_query
  label: Mac Address Query
  kind: query
  command: "<CR>*macaddr=?#<CR>"
  params: []
- id: high_altitude_on
  label: High Altitude Mode On
  kind: action
  command: "<CR>*Highaltitude=on#<CR>"
  params: []
- id: high_altitude_off
  label: High Altitude Mode Off
  kind: action
  command: "<CR>*Highaltitude=off#<CR>"
  params: []
- id: high_altitude_query
  label: High Altitude Mode Status Query
  kind: query
  command: "<CR>*Highaltitude=?#<CR>"
  params: []
```

## Feedbacks
```yaml
# Device echoes each input character; echo text equals the command executed (uppercase),
# except queries which return the value instead.
- id: command_echo
  type: string
  description: >-
    Echo of executed command, e.g. send "*pow=on#" -> "> *pow=on#" then "*POW=ON#".
    Hex for power-on echo: 3E 2A 70 6F 77 3D 6F 6E 23 0D 0D 0A 2A 50 4F 57 3D 4F 4E 23 0D 0A
- id: power_state
  type: enum
  values: [on, off, cooling, standby]
  description: 'Response to *pow=?# - e.g. "*POW=ON#" / "*POW=OFF#"; states noted: standby, power on, cooling'
- id: ready_prompt
  type: fixed
  description: 'On Enter (ASCII 13) with no command, echoes 3E,00 - projector ready to accept RS-232 command'
- id: timeout_echo
  type: fixed
  description: 'If no command within 5 seconds, echoes 0D,0A,00 (5 sec timeout)'
- id: error_illegal_format
  type: fixed
  description: 'Echoes "Illegal format" when command format is illegal'
- id: error_unsupported_item
  type: fixed
  description: 'Echoes "Unsupported item" when format correct but not valid for this model'
- id: error_block_item
  type: fixed
  description: 'Echoes "Block item" when format correct but cannot execute in current condition'
# UNRESOLVED: exact response strings for non-power queries (sour=?, vol=?, etc.) not shown in source
```

## Variables
```yaml
- id: volume
  type: integer
  description: Speaker volume; stepped via *vol=+/-, read via *vol=?
  # UNRESOLVED: numeric range not stated in source
- id: mic_volume
  type: integer
  description: Microphone volume; stepped via *micvol=+/-, read via *micvol=?
  # UNRESOLVED: numeric range not stated in source
- id: contrast
  type: integer
  description: Contrast; stepped via *con=+/-, read via *con=?
  # UNRESOLVED: numeric range not stated in source
- id: brightness
  type: integer
  description: Brightness; stepped via *bri=+/-, read via *bri=?
  # UNRESOLVED: numeric range not stated in source
- id: color
  type: integer
  description: Color; stepped via *color=+/-, read via *color=?
  # UNRESOLVED: numeric range not stated in source
- id: sharpness
  type: integer
  description: Sharpness; stepped via *sharp=+/-, read via *sharp=?
  # UNRESOLVED: numeric range not stated in source
- id: lamp_hours
  type: integer
  description: Lamp 1 hours; read via *ltim=?
- id: lamp2_hours
  type: integer
  description: Lamp 2 hours (dual-lamp models); read via *ltim2=?
- id: baud_rate
  type: enum
  values: [2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200]
  description: RS-232 baud rate; default 115200; set via *baud=<n>#, read via *baud=?
```

## Events
```yaml
# No unsolicited notifications documented; device only responds to commands (echo/timeout behavior).
# UNRESOLVED: no events stated in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on
# sequencing requirements. Power off during cooling behavior not described.
```

## Notes
- Command framing: every command wrapped as `<CR>*command#<CR>` (hex 0D ... 23 0D). Worked example from source: `<CR>*pow=on#<CR>` = `0D 2A 70 6F 77 3D 6F 6E 23 0D`.
- RS232 pin assignment (D-sub 9): 1 NC, 2 RXD, 3 TXD, 4 NC, 5 GND, 6 NC, 7 RTS, 8 CTS, 9 NC.
- Each input character echoed; upper- and lower-case input both acted on.
- "Unsupported item" and "Block item" responses not supported in power saving mode (standby power < 1W); all status commands and power on command work in low power mode (< 0.5W).
- Sending power on/off when already in that state re-echoes the same response (no error).
- Volume bar display supported on device.
- If system has LAN over RS232 function, RS232 commands are supported over it.
- Dual-lamp commands (`* lampm =dualbr#` etc.) printed with spaces in source; copied verbatim — canonical form likely without spaces.
- Broadcasting status query printed in source without `#` terminator; copied verbatim.
- Source is the shared BenQ RS-232 command document listing SH963 as suitable; per-model command availability varies (source, audio settings, aspect ratio, etc.).
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: numeric ranges/steps for volume, contrast, brightness, color, sharpness not stated -->
<!-- UNRESOLVED: response formats for most query commands (only power query response shown) -->
<!-- UNRESOLVED: whether SH963 is dual-lamp; dual-lamp rows marked 雙燈 (dual lamp) in source -->

## Provenance

```yaml
source_domains:
  - benqimage.blob.core.windows.net
  - manualslib.com
source_urls:
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
  - https://www.manualslib.com/manual/550936/Benq-Dx819st.html
  - https://www.manualslib.com/manual/3088967/Benq-Sh963.html
retrieved_at: 2026-08-16T18:18:36.805Z
last_checked_at: 2026-08-19T08:59:26.494Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:59:26.494Z
matched_actions: 173
action_count: 173
confidence: medium
summary: "All 173 spec command literals appear verbatim in the source command table and transport parameters match exactly; bidirectional coverage is 1.00. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a shared BenQ RS232 doc, not SH963-exclusive; per-model command availability varies (\"The above function will be vary from model to model\"). Firmware compatibility, physical/electrical specs beyond serial settings, and network control details are not stated."
- "exact response strings for non-power queries (sour=?, vol=?, etc.) not shown in source"
- "numeric range not stated in source"
- "no events stated in source"
- "no multi-step sequences described in source"
- "source contains no safety warnings, interlock procedures, or power-on"
- "firmware version compatibility not stated in source"
- "numeric ranges/steps for volume, contrast, brightness, color, sharpness not stated"
- "response formats for most query commands (only power query response shown)"
- "whether SH963 is dual-lamp; dual-lamp rows marked 雙燈 (dual lamp) in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
