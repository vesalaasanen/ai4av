---
spec_id: admin/benq-m-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ M-Series Control Spec"
manufacturer: BenQ
model_family: M-Series
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - M-Series
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - benqimage.blob.core.windows.net
  - manualslib.com
source_urls:
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
  - https://www.manualslib.com/manual/481564/Benq-RS232-Commands.html
retrieved_at: 2026-05-04T16:50:27.550Z
last_checked_at: 2026-06-02T22:04:23.253Z
generated_at: 2026-06-02T22:04:23.253Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "numeric range not stated in source"
  - "range not stated"
  - "numeric ranges (min/max/step) for vol, micvol, con, bri, color, sharp not stated in source."
  - "no unsolicited event channel documented in source."
  - "no multi-step macro sequences specified in source."
  - "no explicit safety / interlock procedure stated in source."
  - "firmware version coverage, exact numeric ranges for level controls, per-sub-model command applicability matrix not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T22:04:23.253Z
  matched_actions: 173
  action_count: 173
  confidence: medium
  summary: "All 173 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# BenQ M-Series Control Spec

## Summary
BenQ M-Series projector RS-232C control protocol. ASCII command set wrapped in `<CR>...<CR>` (0x0D) framing using `*key=value#` syntax. Covers power, source selection, audio, picture, lamp, 3D, baud rate, projector position, standby behavior, and miscellaneous OSD/maintenance functions.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # default per source; switchable via *baud=N# to 2400/4800/9600/14400/19200/38400/57600/115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
framing:
  command_prefix: "<CR>"     # 0x0D, see HEX example 0D 2A ... 0D
  command_suffix: "<CR>"     # 0x0D
  payload_pattern: "*key=value#"
  echo: true                 # source: each input character echoed; ready prompt 3E,00 after CR
  idle_timeout: "5s -> echo 0D,0A,00"
```

## Traits
```yaml
- powerable     # inferred from *pow=on/off/? commands
- routable      # inferred from *sour=... input routing commands
- queryable     # inferred from *...=? query commands
- levelable     # inferred from volume/contrast/brightness/color/sharpness +/- commands
```

## Actions
```yaml
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
- id: power_status
  label: Power Status
  kind: query
  command: "<CR>*pow=?#<CR>"
  params: []

# --- Source Selection ---
- id: source_computer_rgb
  label: COMPUTER / YPbPr (RGB)
  kind: action
  command: "<CR>*sour=RGB#<CR>"
  params: []
- id: source_computer2_rgb2
  label: COMPUTER 2 / YPbPr2 (RGB2)
  kind: action
  command: "<CR>*sour=RGB2#<CR>"
  params: []
- id: source_component
  label: Component
  kind: action
  command: "<CR>*sour=ypbr#<CR>"
  params: []
- id: source_component2
  label: Component 2
  kind: action
  command: "<CR>*sour=ypbr2#<CR>"
  params: []
- id: source_dvi_a
  label: DVI-A
  kind: action
  command: "<CR>*sour=dviA#<CR>"
  params: []
- id: source_dvi_d
  label: DVI-D
  kind: action
  command: "<CR>*sour=dvid#<CR>"
  params: []
- id: source_hdmi
  label: HDMI
  kind: action
  command: "<CR>*sour=hdmi#<CR>"
  params: []
- id: source_hdmi2
  label: HDMI 2
  kind: action
  command: "<CR>*sour=hdmi2#<CR>"
  params: []
- id: source_composite
  label: Composite Video
  kind: action
  command: "<CR>*sour=vid#<CR>"
  params: []
- id: source_svideo
  label: S-Video
  kind: action
  command: "<CR>*sour=svid#<CR>"
  params: []
- id: source_network
  label: Network
  kind: action
  command: "<CR>*sour=network#<CR>"
  params: []
- id: source_usb_display
  label: USB Display
  kind: action
  command: "<CR>*sour=usbdisplay#<CR>"
  params: []
- id: source_usb_reader
  label: USB Reader
  kind: action
  command: "<CR>*sour=usbreader#<CR>"
  params: []
- id: source_current_query
  label: Current Source Query
  kind: query
  command: "<CR>*sour=?#<CR>"
  params: []

# --- Audio: Mute & Volume ---
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
- id: mute_status
  label: Mute Status
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
- id: volume_status
  label: Volume Status
  kind: query
  command: "<CR>*vol=?#<CR>"
  params: []
- id: mic_volume_up
  label: Microphone Volume +
  kind: action
  command: "<CR>*micvol=+#<CR>"
  params: []
- id: mic_volume_down
  label: Microphone Volume -
  kind: action
  command: "<CR>*micvol=-#<CR>"
  params: []
- id: mic_volume_status
  label: Microphone Volume Status
  kind: query
  command: "<CR>*micvol=?#<CR>"
  params: []

# --- Audio Source Select ---
- id: audio_passthrough_off
  label: Audio Pass-Through Off
  kind: action
  command: "<CR>*audiosour=off#<CR>"
  params: []
- id: audio_source_computer1
  label: Audio - Computer 1
  kind: action
  command: "<CR>*audiosour=RGB#<CR>"
  params: []
- id: audio_source_computer2
  label: Audio - Computer 2
  kind: action
  command: "<CR>*audiosour=RGB2#<CR>"
  params: []
- id: audio_source_video_svideo
  label: Audio - Video / S-Video
  kind: action
  command: "<CR>*audiosour=vid#<CR>"
  params: []
- id: audio_source_component
  label: Audio - Component
  kind: action
  command: "<CR>*audiosour=ypbr#<CR>"
  params: []
- id: audio_source_hdmi
  label: Audio - HDMI
  kind: action
  command: "<CR>*audiosour=hdmi#<CR>"
  params: []
- id: audio_source_hdmi2
  label: Audio - HDMI 2
  kind: action
  command: "<CR>*audiosour=hdmi2#<CR>"
  params: []
- id: audio_source_status
  label: Audio Pass-Through Status
  kind: query
  command: "<CR>*audiosour=?#<CR>"
  params: []

# --- Picture Mode ---
- id: picmode_dynamic
  label: Picture Mode - Dynamic
  kind: action
  command: "<CR>*appmod=dynamic#<CR>"
  params: []
- id: picmode_presentation
  label: Picture Mode - Presentation
  kind: action
  command: "<CR>*appmod=preset#<CR>"
  params: []
- id: picmode_srgb
  label: Picture Mode - sRGB
  kind: action
  command: "<CR>*appmod=srgb#<CR>"
  params: []
- id: picmode_bright
  label: Picture Mode - Bright
  kind: action
  command: "<CR>*appmod=bright#<CR>"
  params: []
- id: picmode_livingroom
  label: Picture Mode - Living Room
  kind: action
  command: "<CR>*appmod=livingroom#<CR>"
  params: []
- id: picmode_game
  label: Picture Mode - Game
  kind: action
  command: "<CR>*appmod=game#<CR>"
  params: []
- id: picmode_cinema
  label: Picture Mode - Cinema
  kind: action
  command: "<CR>*appmod=cine#<CR>"
  params: []
- id: picmode_standard
  label: Picture Mode - Standard
  kind: action
  command: "<CR>*appmod=std#<CR>"
  params: []
- id: picmode_user1
  label: Picture Mode - User 1
  kind: action
  command: "<CR>*appmod=user1#<CR>"
  params: []
- id: picmode_user2
  label: Picture Mode - User 2
  kind: action
  command: "<CR>*appmod=user2#<CR>"
  params: []
- id: picmode_user3
  label: Picture Mode - User 3
  kind: action
  command: "<CR>*appmod=user3#<CR>"
  params: []
- id: picmode_isf_day
  label: Picture Mode - ISF Day
  kind: action
  command: "<CR>*appmod=isfday#<CR>"
  params: []
- id: picmode_isf_night
  label: Picture Mode - ISF Night
  kind: action
  command: "<CR>*appmod=isfnight#<CR>"
  params: []
- id: picmode_3d
  label: Picture Mode - 3D
  kind: action
  command: "<CR>*appmod=threed#<CR>"
  params: []
- id: picmode_status
  label: Picture Mode Status
  kind: query
  command: "<CR>*appmod=?#<CR>"
  params: []

# --- Picture Setting (Contrast / Brightness / Color / Sharpness) ---
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
- id: contrast_status
  label: Contrast Value
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
- id: brightness_status
  label: Brightness Value
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
- id: color_status
  label: Color Value
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
- id: sharpness_status
  label: Sharpness Value
  kind: query
  command: "<CR>*sharp=?#<CR>"
  params: []

# --- Color Temperature ---
- id: color_temp_warmer
  label: Color Temperature - Warmer
  kind: action
  command: "<CR>*ct=warmer#<CR>"
  params: []
- id: color_temp_warm
  label: Color Temperature - Warm
  kind: action
  command: "<CR>*ct=warm#<CR>"
  params: []
- id: color_temp_normal
  label: Color Temperature - Normal
  kind: action
  command: "<CR>*ct=normal#<CR>"
  params: []
- id: color_temp_cool
  label: Color Temperature - Cool
  kind: action
  command: "<CR>*ct=cool#<CR>"
  params: []
- id: color_temp_cooler
  label: Color Temperature - Cooler
  kind: action
  command: "<CR>*ct=cooler#<CR>"
  params: []
- id: color_temp_native
  label: Color Temperature - Lamp Native
  kind: action
  command: "<CR>*ct=native#<CR>"
  params: []
- id: color_temp_status
  label: Color Temperature Status
  kind: query
  command: "<CR>*ct=?#<CR>"
  params: []

# --- Aspect Ratio ---
- id: aspect_4_3
  label: Aspect 4:3
  kind: action
  command: "<CR>*asp=4:3#<CR>"
  params: []
- id: aspect_16_9
  label: Aspect 16:9
  kind: action
  command: "<CR>*asp=16:9#<CR>"
  params: []
- id: aspect_16_10
  label: Aspect 16:10
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
- id: aspect_status
  label: Aspect Status
  kind: query
  command: "<CR>*asp=?#<CR>"
  params: []

# --- Image misc ---
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
- id: auto_adjust
  label: Auto (image adjust)
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
- id: brilliant_color_status
  label: Brilliant Color Status
  kind: query
  command: "<CR>*BC=?#<CR>"
  params: []

# --- Projector Position ---
- id: position_front_table
  label: Projector Position - Front Table
  kind: action
  command: "<CR>*pp=FT#<CR>"
  params: []
- id: position_rear_table
  label: Projector Position - Rear Table
  kind: action
  command: "<CR>*pp=RE#<CR>"
  params: []
- id: position_rear_ceiling
  label: Projector Position - Rear Ceiling
  kind: action
  command: "<CR>*pp=RC#<CR>"
  params: []
- id: position_front_ceiling
  label: Projector Position - Front Ceiling
  kind: action
  command: "<CR>*pp=FC#<CR>"
  params: []
- id: position_status
  label: Projector Position Status
  kind: query
  command: "<CR>*pp=?#<CR>"
  params: []

# --- Operation: Quick auto search / Direct Power / Signal Power / Standby ---
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
- id: quick_auto_search_status
  label: Quick Auto Search Status
  kind: query
  command: "<CR>*QAS=?#<CR>"
  params: []
- id: direct_power_on
  label: Direct Power On - On
  kind: action
  command: "<CR>*directpower=on#<CR>"
  params: []
- id: direct_power_off
  label: Direct Power On - Off
  kind: action
  command: "<CR>*directpower=off#<CR>"
  params: []
- id: direct_power_status
  label: Direct Power On Status
  kind: query
  command: "<CR>*directpower=?#<CR>"
  params: []
- id: signal_power_on
  label: Signal Power On - On
  kind: action
  command: "<CR>*autopower=on#<CR>"
  params: []
- id: signal_power_off
  label: Signal Power On - Off
  kind: action
  command: "<CR>*autopower=off#<CR>"
  params: []
- id: signal_power_status
  label: Signal Power On Status
  kind: query
  command: "<CR>*autopower=?#<CR>"
  params: []
- id: standby_network_on
  label: Standby Settings - Network On
  kind: action
  command: "<CR>*standbynet=on#<CR>"
  params: []
- id: standby_network_off
  label: Standby Settings - Network Off
  kind: action
  command: "<CR>*standbynet=off#<CR>"
  params: []
- id: standby_network_status
  label: Standby Settings - Network Status
  kind: query
  command: "<CR>*standbynet=?#<CR>"
  params: []
- id: standby_mic_on
  label: Standby Settings - Microphone On
  kind: action
  command: "<CR>*standbymic=on#<CR>"
  params: []
- id: standby_mic_off
  label: Standby Settings - Microphone Off
  kind: action
  command: "<CR>*standbymic=off#<CR>"
  params: []
- id: standby_mic_status
  label: Standby Settings - Microphone Status
  kind: query
  command: "<CR>*standbymic=?#<CR>"
  params: []
- id: standby_monitor_out_on
  label: Standby Settings - Monitor Out On
  kind: action
  command: "<CR>*standbymnt=on#<CR>"
  params: []
- id: standby_monitor_out_off
  label: Standby Settings - Monitor Out Off
  kind: action
  command: "<CR>*standbymnt=off#<CR>"
  params: []
- id: standby_monitor_out_status
  label: Standby Settings - Monitor Out Status
  kind: query
  command: "<CR>*standbymnt=?#<CR>"
  params: []

# --- Baud Rate ---
- id: baud_2400
  label: Baud Rate 2400
  kind: action
  command: "<CR>*baud=2400#<CR>"
  params: []
- id: baud_4800
  label: Baud Rate 4800
  kind: action
  command: "<CR>*baud=4800#<CR>"
  params: []
- id: baud_9600
  label: Baud Rate 9600
  kind: action
  command: "<CR>*baud=9600#<CR>"
  params: []
- id: baud_14400
  label: Baud Rate 14400
  kind: action
  command: "<CR>*baud=14400#<CR>"
  params: []
- id: baud_19200
  label: Baud Rate 19200
  kind: action
  command: "<CR>*baud=19200#<CR>"
  params: []
- id: baud_38400
  label: Baud Rate 38400
  kind: action
  command: "<CR>*baud=38400#<CR>"
  params: []
- id: baud_57600
  label: Baud Rate 57600
  kind: action
  command: "<CR>*baud=57600#<CR>"
  params: []
- id: baud_115200
  label: Baud Rate 115200
  kind: action
  command: "<CR>*baud=115200#<CR>"
  params: []
- id: baud_status
  label: Current Baud Rate
  kind: query
  command: "<CR>*baud=?#<CR>"
  params: []

# --- Lamp ---
- id: lamp_hour_query
  label: Lamp Hour
  kind: query
  command: "<CR>*ltim=?#<CR>"
  params: []
- id: lamp2_hour_query
  label: Lamp 2 Hour
  kind: query
  command: "<CR>*ltim2=?#<CR>"
  params: []
- id: lamp_mode_normal
  label: Lamp Mode - Normal
  kind: action
  command: "<CR>*lampm=lnor#<CR>"
  params: []
- id: lamp_mode_eco
  label: Lamp Mode - Eco
  kind: action
  command: "<CR>*lampm=eco#<CR>"
  params: []
- id: lamp_mode_smart_eco
  label: Lamp Mode - Smart Eco
  kind: action
  command: "<CR>*lampm=seco#<CR>"
  params: []
- id: lamp_mode_dual_brightest
  label: Lamp Mode - Dual Brightest (dual-lamp)
  kind: action
  command: "<CR>*lampm=dualbr#<CR>"
  params: []
- id: lamp_mode_dual_reliable
  label: Lamp Mode - Dual Reliable (dual-lamp)
  kind: action
  command: "<CR>*lampm=dualre#<CR>"
  params: []
- id: lamp_mode_single_alternative
  label: Lamp Mode - Single Alternative (dual-lamp)
  kind: action
  command: "<CR>*lampm=single#<CR>"
  params: []
- id: lamp_mode_single_alternative_eco
  label: Lamp Mode - Single Alternative Eco (dual-lamp)
  kind: action
  command: "<CR>*lampm=singleeco#<CR>"
  params: []
- id: lamp_mode_status
  label: Lamp Mode Status
  kind: query
  command: "<CR>*lampm=?#<CR>"
  params: []
- id: model_name_query
  label: Model Name
  kind: query
  command: "<CR>*modelname=?#<CR>"
  params: []

# --- Blank / Freeze / Menu / Navigation ---
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
- id: blank_status
  label: Blank Status
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
- id: freeze_status
  label: Freeze Status
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
  label: Navigation Up
  kind: action
  command: "<CR>*up#<CR>"
  params: []
- id: nav_down
  label: Navigation Down
  kind: action
  command: "<CR>*down#<CR>"
  params: []
- id: nav_right
  label: Navigation Right
  kind: action
  command: "<CR>*right#<CR>"
  params: []
- id: nav_left
  label: Navigation Left
  kind: action
  command: "<CR>*left#<CR>"
  params: []
- id: nav_enter
  label: Navigation Enter
  kind: action
  command: "<CR>*enter#<CR>"
  params: []

# --- 3D ---
- id: threed_sync_off
  label: 3D Sync Off
  kind: action
  command: "<CR>*3d=off#<CR>"
  params: []
- id: threed_auto
  label: 3D Auto
  kind: action
  command: "<CR>*3d=auto#<CR>"
  params: []
- id: threed_top_bottom
  label: 3D Sync Top-Bottom
  kind: action
  command: "<CR>*3d=tb#<CR>"
  params: []
- id: threed_frame_sequential
  label: 3D Sync Frame Sequential
  kind: action
  command: "<CR>*3d=fs#<CR>"
  params: []
- id: threed_frame_packing
  label: 3D Frame Packing
  kind: action
  command: "<CR>*3d=fp#<CR>"
  params: []
- id: threed_side_by_side
  label: 3D Side-by-Side
  kind: action
  command: "<CR>*3d=sbs#<CR>"
  params: []
- id: threed_inverter_disable
  label: 3D Inverter Disable
  kind: action
  command: "<CR>*3d=da#<CR>"
  params: []
- id: threed_inverter
  label: 3D Inverter
  kind: action
  command: "<CR>*3d=iv#<CR>"
  params: []
- id: threed_2d_to_3d
  label: 2D to 3D
  kind: action
  command: "<CR>*3d=2d3d#<CR>"
  params: []
- id: threed_nvidia
  label: 3D nVIDIA
  kind: action
  command: "<CR>*3d=nvidia#<CR>"
  params: []
- id: threed_status
  label: 3D Sync Status
  kind: query
  command: "<CR>*3d=?#<CR>"
  params: []

# --- Remote Receiver ---
- id: remote_receiver_front_rear
  label: Remote Receiver - Front + Rear
  kind: action
  command: "<CR>*rr=fr#<CR>"
  params: []
- id: remote_receiver_front
  label: Remote Receiver - Front
  kind: action
  command: "<CR>*rr=f#<CR>"
  params: []
- id: remote_receiver_rear
  label: Remote Receiver - Rear
  kind: action
  command: "<CR>*rr=r#<CR>"
  params: []
- id: remote_receiver_status
  label: Remote Receiver Status
  kind: query
  command: "<CR>*rr=?#<CR>"
  params: []

# --- Instant On ---
- id: instant_on_enable
  label: Instant On - On
  kind: action
  command: "<CR>*ins=on#<CR>"
  params: []
- id: instant_on_disable
  label: Instant On - Off
  kind: action
  command: "<CR>*ins=off#<CR>"
  params: []
- id: instant_on_status
  label: Instant On Status
  kind: query
  command: "<CR>*ins=?#<CR>"
  params: []

# --- Lamp Saver ---
- id: lamp_saver_on
  label: Lamp Saver Mode - On
  kind: action
  command: "<CR>*lpsaver=on#<CR>"
  params: []
- id: lamp_saver_off
  label: Lamp Saver Mode - Off
  kind: action
  command: "<CR>*lpsaver=off#<CR>"
  params: []
- id: lamp_saver_status
  label: Lamp Saver Mode Status
  kind: query
  command: "<CR>*lpsaver=?#<CR>"
  params: []

# --- Projection Log-In Code ---
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
- id: projection_login_code_status
  label: Projection Log In Code Status
  kind: query
  command: "<CR>*prjlogincode=?#<CR>"
  params: []

# --- Broadcasting ---
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
- id: broadcasting_status
  label: Broadcasting Status
  kind: query
  command: "<CR>*broadcasting=?<CR>"
  params: []

# --- AMX Device Discovery ---
- id: amx_dd_on
  label: AMX Device Discovery On
  kind: action
  command: "<CR>*amxdd=on#<CR>"
  params: []
- id: amx_dd_off
  label: AMX Device Discovery Off
  kind: action
  command: "<CR>*amxdd=off#<CR>"
  params: []
- id: amx_dd_status
  label: AMX Device Discovery Status
  kind: query
  command: "<CR>*amxdd=?#<CR>"
  params: []

# --- Network / Altitude ---
- id: mac_address_query
  label: MAC Address
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
- id: high_altitude_status
  label: High Altitude Mode Status
  kind: query
  command: "<CR>*Highaltitude=?#<CR>"
  params: []
```

## Feedbacks
```yaml
# Echo / response pattern documented in source:
# - On <CR>: prompt "3E,00" (>\0) indicates ready for command
# - Each input echoed back; for queries the response is the UPPERCASE form of the command tail,
#   e.g. *pow=?# -> *POW=ON# or *POW=OFF#
# - On illegal format: "Illegal format"
# - On unsupported command: "Unsupported item"
# - On valid but currently inhibited: "Block item"
# - On idle 5s: "0D,0A,00" timeout marker

- id: ready_prompt
  type: literal
  payload_hex: "3E 00"
  meaning: Projector ready to accept RS-232 command (echoed after CR)
- id: idle_timeout
  type: literal
  payload_hex: "0D 0A 00"
  meaning: 5-second idle timeout marker
- id: error_illegal_format
  type: string
  value: "Illegal format"
- id: error_unsupported_item
  type: string
  value: "Unsupported item"
- id: error_block_item
  type: string
  value: "Block item"
- id: power_state
  type: enum
  source_query: power_status
  response_template: "*POW=ON#" or "*POW=OFF#"
  values: [ON, OFF]
- id: source_current
  type: enum
  source_query: source_current_query
  response_template: "*SOUR=<value>#"
  # values mirror Actions input set: RGB, RGB2, ypbr, ypbr2, dviA, dvid, hdmi, hdmi2, vid, svid, network, usbdisplay, usbreader
- id: mute_state
  type: enum
  source_query: mute_status
  values: [ON, OFF]
- id: volume_value
  type: integer
  source_query: volume_status
  # UNRESOLVED: numeric range not stated in source
- id: mic_volume_value
  type: integer
  source_query: mic_volume_status
  # UNRESOLVED: numeric range not stated in source
- id: contrast_value
  type: integer
  source_query: contrast_status
  # UNRESOLVED: range not stated
- id: brightness_value
  type: integer
  source_query: brightness_status
  # UNRESOLVED: range not stated
- id: color_value
  type: integer
  source_query: color_status
  # UNRESOLVED: range not stated
- id: sharpness_value
  type: integer
  source_query: sharpness_status
  # UNRESOLVED: range not stated
- id: picture_mode
  type: enum
  source_query: picmode_status
  values: [dynamic, preset, srgb, bright, livingroom, game, cine, std, user1, user2, user3, isfday, isfnight, threed]
- id: color_temperature
  type: enum
  source_query: color_temp_status
  values: [warmer, warm, normal, cool, cooler, native]
- id: aspect_ratio
  type: enum
  source_query: aspect_status
  values: ["4:3", "16:9", "16:10", AUTO, REAL, LBOX, WIDE, ANAM]
- id: brilliant_color
  type: enum
  source_query: brilliant_color_status
  values: [ON, OFF]
- id: projector_position
  type: enum
  source_query: position_status
  values: [FT, RE, RC, FC]
- id: quick_auto_search
  type: enum
  source_query: quick_auto_search_status
  values: [ON, OFF]
- id: direct_power_on_setting
  type: enum
  source_query: direct_power_status
  values: [ON, OFF]
- id: signal_power_on_setting
  type: enum
  source_query: signal_power_status
  values: [ON, OFF]
- id: standby_network_setting
  type: enum
  source_query: standby_network_status
  values: [ON, OFF]
- id: standby_mic_setting
  type: enum
  source_query: standby_mic_status
  values: [ON, OFF]
- id: standby_monitor_out_setting
  type: enum
  source_query: standby_monitor_out_status
  values: [ON, OFF]
- id: current_baud_rate
  type: enum
  source_query: baud_status
  values: [2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200]
- id: lamp_hour
  type: integer
  source_query: lamp_hour_query
  unit: hours
- id: lamp2_hour
  type: integer
  source_query: lamp2_hour_query
  unit: hours
- id: lamp_mode
  type: enum
  source_query: lamp_mode_status
  values: [lnor, eco, seco, dualbr, dualre, single, singleeco]
- id: model_name
  type: string
  source_query: model_name_query
- id: blank_state
  type: enum
  source_query: blank_status
  values: [ON, OFF]
- id: freeze_state
  type: enum
  source_query: freeze_status
  values: [ON, OFF]
- id: threed_state
  type: enum
  source_query: threed_status
  values: [off, auto, tb, fs, fp, sbs, da, iv, 2d3d, nvidia]
- id: remote_receiver
  type: enum
  source_query: remote_receiver_status
  values: [fr, f, r]
- id: instant_on_state
  type: enum
  source_query: instant_on_status
  values: [ON, OFF]
- id: lamp_saver_state
  type: enum
  source_query: lamp_saver_status
  values: [ON, OFF]
- id: projection_login_code_state
  type: enum
  source_query: projection_login_code_status
  values: [ON, OFF]
- id: broadcasting_state
  type: enum
  source_query: broadcasting_status
  values: [ON, OFF]
- id: amx_dd_state
  type: enum
  source_query: amx_dd_status
  values: [ON, OFF]
- id: mac_address
  type: string
  source_query: mac_address_query
- id: high_altitude_state
  type: enum
  source_query: high_altitude_status
  values: [ON, OFF]
```

## Variables
```yaml
# Settable numeric ranges (contrast / brightness / color / sharpness / volume / mic volume) are
# accessed via +/- step commands listed in Actions; absolute range bounds are not stated in source.
# UNRESOLVED: numeric ranges (min/max/step) for vol, micvol, con, bri, color, sharp not stated in source.
```

## Events
```yaml
# Source documents synchronous echoes and error replies (see Feedbacks), but does not
# describe unsolicited push notifications.
# UNRESOLVED: no unsolicited event channel documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences specified in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes operational constraints rather than safety interlocks:
# - "Unsupported item" / "Block item" replies are suppressed in power-saving mode (<1W standby)
# - Only status queries and *pow=on# are honored when projector is in low-power mode (<0.5W)
# - High Altitude mode (*Highaltitude=on/off) is exposed but no thermal-safety procedure stated
# UNRESOLVED: no explicit safety / interlock procedure stated in source.
```

## Notes
- Command framing: every command is bracketed by `<CR>` (0x0D) on both sides, e.g. `0D 2A 70 6F 77 3D 6F 6E 23 0D` for `*pow=on#`.
- Echo behavior: input characters echo verbatim; query replies use uppercase command tail (e.g. `*POW=ON#`). Ready prompt `3E 00` (`> \0`) is emitted after a bare CR; idle timeout marker `0D 0A 00` after 5 s of silence.
- Error replies are bare strings (`Illegal format`, `Unsupported item`, `Block item`) — no framing.
- RS-232 DE-9 pinout per source: pin 2 = RXD, pin 3 = TXD, pin 5 = GND, pin 7 = RTS, pin 8 = CTS, pins 1/4/6/9 = NC.
- Both upper- and lower-case input accepted; case in echoed reply follows the source rule (query reply uppercased).
- Dual-lamp lamp modes (`dualbr`, `dualre`, `single`, `singleeco`) only apply to dual-lamp variants — included for spec coverage; will return `Unsupported item` on single-lamp models.
- Per the source: "The above function will be vary from model to model. (ex: source, audio settings, aspect ratio..etc)" — some commands may return `Unsupported item` on specific M-Series sub-models.
- LAN-over-RS232 implementations forward the same command set when supported.
<!-- UNRESOLVED: firmware version coverage, exact numeric ranges for level controls, per-sub-model command applicability matrix not stated in source. -->

## Provenance

```yaml
source_domains:
  - benqimage.blob.core.windows.net
  - manualslib.com
source_urls:
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
  - https://www.manualslib.com/manual/481564/Benq-RS232-Commands.html
retrieved_at: 2026-05-04T16:50:27.550Z
last_checked_at: 2026-06-02T22:04:23.253Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:04:23.253Z
matched_actions: 173
action_count: 173
confidence: medium
summary: "All 173 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "numeric range not stated in source"
- "range not stated"
- "numeric ranges (min/max/step) for vol, micvol, con, bri, color, sharp not stated in source."
- "no unsolicited event channel documented in source."
- "no multi-step macro sequences specified in source."
- "no explicit safety / interlock procedure stated in source."
- "firmware version coverage, exact numeric ranges for level controls, per-sub-model command applicability matrix not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
