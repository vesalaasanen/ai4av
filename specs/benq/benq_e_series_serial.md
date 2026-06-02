---
spec_id: admin/benq-e-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ E-Series Projector Control Spec"
manufacturer: BenQ
model_family: "BenQ E-Series"
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - "BenQ E-Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - benqimage.blob.core.windows.net
  - audiogeneral.com
source_urls:
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
  - https://www.audiogeneral.com/BenQ/rs232_commands_generic_082613.pdf
retrieved_at: 2026-04-29T15:20:31.007Z
last_checked_at: 2026-06-02T21:40:54.515Z
generated_at: 2026-06-02T21:40:54.515Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "feature availability varies by model; source note states \"The above function will be vary from model to model. (ex: source, audio settings, aspect ratio..etc)\""
  - "response format for other status queries not enumerated in source."
  - "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements."
  - "firmware version compatibility not stated in source."
  - "query response formats beyond power (e.g. source, picture mode) not enumerated in source."
  - "voltage, current, power consumption not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T21:40:54.515Z
  matched_actions: 173
  action_count: 173
  confidence: medium
  summary: "All 173 spec actions matched verbatim in source command table; transport parameters verified against interface settings. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# BenQ E-Series Projector Control Spec

## Summary
BenQ E-Series projector RS-232C serial control spec. ASCII command protocol framed by `<CR>...#<CR>`, default 115200 8N1. Covers power, source select, audio, picture mode, picture setting, aspect, operation settings, baud, lamp, 3D, and miscellaneous controls.

<!-- UNRESOLVED: feature availability varies by model; source note states "The above function will be vary from model to model. (ex: source, audio settings, aspect ratio..etc)" -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # default; settable via OSD to 2400/4800/9600/14400/19200/38400/57600/115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from power on/off commands
- routable        # inferred from source selection commands
- queryable       # inferred from query commands
- levelable       # inferred from volume/contrast/brightness/color/sharpness commands
```

## Actions
```yaml
# All commands are ASCII, framed as <CR>*cmd=args#<CR>.
# The <CR> framing is omitted from the `command` field below for readability;
# implementations MUST prepend 0x0D and append 0x0D to each command.
# Source: "Command Table" section.

# --- Power ---
- id: power_on
  label: Power On
  kind: action
  command: "*pow=on#"
  params: []
- id: power_off
  label: Power Off
  kind: action
  command: "*pow=off#"
  params: []
- id: power_status
  label: Power Status
  kind: query
  command: "*pow=?#"
  params: []

# --- Source Selection ---
- id: source_rgb
  label: Source COMPUTER/YPbPr
  kind: action
  command: "*sour=RGB#"
  params: []
- id: source_rgb2
  label: Source COMPUTER 2/YPbPr2
  kind: action
  command: "*sour=RGB2#"
  params: []
- id: source_ypbr
  label: Source Component
  kind: action
  command: "*sour=ypbr#"
  params: []
- id: source_ypbr2
  label: Source Component 2
  kind: action
  command: "*sour=ypbr2#"
  params: []
- id: source_dvia
  label: Source DVI-A
  kind: action
  command: "*sour=dviA#"
  params: []
- id: source_dvid
  label: Source DVI-D
  kind: action
  command: "*sour=dvid#"
  params: []
- id: source_hdmi
  label: Source HDMI
  kind: action
  command: "*sour=hdmi#"
  params: []
- id: source_hdmi2
  label: Source HDMI 2
  kind: action
  command: "*sour=hdmi2#"
  params: []
- id: source_vid
  label: Source Composite
  kind: action
  command: "*sour=vid#"
  params: []
- id: source_svid
  label: Source S-Video
  kind: action
  command: "*sour=svid#"
  params: []
- id: source_network
  label: Source Network
  kind: action
  command: "*sour=network#"
  params: []
- id: source_usbdisplay
  label: Source USB Display
  kind: action
  command: "*sour=usbdisplay#"
  params: []
- id: source_usbreader
  label: Source USB Reader
  kind: action
  command: "*sour=usbreader#"
  params: []
- id: source_status
  label: Current Source
  kind: query
  command: "*sour=?#"
  params: []

# --- Audio Control ---
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
- id: mute_status
  label: Mute Status
  kind: query
  command: "*mute=?#"
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
- id: volume_status
  label: Volume Status
  kind: query
  command: "*vol=?#"
  params: []
- id: mic_volume_up
  label: Mic Volume +
  kind: action
  command: "*micvol=+#"
  params: []
- id: mic_volume_down
  label: Mic Volume -
  kind: action
  command: "*micvol=-#"
  params: []
- id: mic_volume_status
  label: Mic Volume Status
  kind: query
  command: "*micvol=?#"
  params: []

# --- Audio Source ---
- id: audio_source_off
  label: Audio Pass Through Off
  kind: action
  command: "*audiosour=off#"
  params: []
- id: audio_source_rgb
  label: Audio-Computer1
  kind: action
  command: "*audiosour=RGB#"
  params: []
- id: audio_source_rgb2
  label: Audio-Computer2
  kind: action
  command: "*audiosour=RGB2#"
  params: []
- id: audio_source_vid
  label: Audio-Video/S-Video
  kind: action
  command: "*audiosour=vid#"
  params: []
- id: audio_source_ypbr
  label: Audio-Component
  kind: action
  command: "*audiosour=ypbr#"
  params: []
- id: audio_source_hdmi
  label: Audio-HDMI
  kind: action
  command: "*audiosour=hdmi#"
  params: []
- id: audio_source_hdmi2
  label: Audio-HDMI2
  kind: action
  command: "*audiosour=hdmi2#"
  params: []
- id: audio_source_status
  label: Audio Pass Status
  kind: query
  command: "*audiosour=?#"
  params: []

# --- Picture Mode ---
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
- id: picture_mode_livingroom
  label: Picture Mode LivingRoom
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
- id: picture_mode_isfday
  label: Picture Mode ISF Day
  kind: action
  command: "*appmod=isfday#"
  params: []
- id: picture_mode_isfnight
  label: Picture Mode ISF Night
  kind: action
  command: "*appmod=isfnight#"
  params: []
- id: picture_mode_3d
  label: Picture Mode 3D
  kind: action
  command: "*appmod=threed#"
  params: []
- id: picture_mode_status
  label: Picture Mode Status
  kind: query
  command: "*appmod=?#"
  params: []

# --- Picture Setting ---
- id: contrast_up
  label: Contrast +
  kind: action
  command: "*con=+#"
  params: []
- id: contrast_down
  label: Contrast -
  kind: action
  command: "*con=-#"
  params: []
- id: contrast_status
  label: Contrast Value
  kind: query
  command: "*con=?#"
  params: []
- id: brightness_up
  label: Brightness +
  kind: action
  command: "*bri=+#"
  params: []
- id: brightness_down
  label: Brightness -
  kind: action
  command: "*bri=-#"
  params: []
- id: brightness_status
  label: Brightness Value
  kind: query
  command: "*bri=?#"
  params: []
- id: color_up
  label: Color +
  kind: action
  command: "*color=+#"
  params: []
- id: color_down
  label: Color -
  kind: action
  command: "*color=-#"
  params: []
- id: color_status
  label: Color Value
  kind: query
  command: "*color=?#"
  params: []
- id: sharpness_up
  label: Sharpness +
  kind: action
  command: "*sharp=+#"
  params: []
- id: sharpness_down
  label: Sharpness -
  kind: action
  command: "*sharp=-#"
  params: []
- id: sharpness_status
  label: Sharpness Value
  kind: query
  command: "*sharp=?#"
  params: []
- id: color_temp_warmer
  label: Color Temperature Warmer
  kind: action
  command: "*ct=warmer#"
  params: []
- id: color_temp_warm
  label: Color Temperature Warm
  kind: action
  command: "*ct=warm#"
  params: []
- id: color_temp_normal
  label: Color Temperature Normal
  kind: action
  command: "*ct=normal#"
  params: []
- id: color_temp_cool
  label: Color Temperature Cool
  kind: action
  command: "*ct=cool#"
  params: []
- id: color_temp_cooler
  label: Color Temperature Cooler
  kind: action
  command: "*ct=cooler#"
  params: []
- id: color_temp_native
  label: Color Temperature Lamp Native
  kind: action
  command: "*ct=native#"
  params: []
- id: color_temp_status
  label: Color Temperature Status
  kind: query
  command: "*ct=?#"
  params: []

# --- Aspect ---
- id: aspect_4_3
  label: Aspect 4:3
  kind: action
  command: "*asp=4:3#"
  params: []
- id: aspect_16_9
  label: Aspect 16:9
  kind: action
  command: "*asp=16:9#"
  params: []
- id: aspect_16_10
  label: Aspect 16:10
  kind: action
  command: "*asp=16:10#"
  params: []
- id: aspect_auto
  label: Aspect Auto
  kind: action
  command: "*asp=AUTO#"
  params: []
- id: aspect_real
  label: Aspect Real
  kind: action
  command: "*asp=REAL#"
  params: []
- id: aspect_lbox
  label: Aspect Letterbox
  kind: action
  command: "*asp=LBOX#"
  params: []
- id: aspect_wide
  label: Aspect Wide
  kind: action
  command: "*asp=WIDE#"
  params: []
- id: aspect_anam
  label: Aspect Anamorphic
  kind: action
  command: "*asp=ANAM#"
  params: []
- id: aspect_status
  label: Aspect Status
  kind: query
  command: "*asp=?#"
  params: []

# --- Zoom / Auto / Brilliant Color ---
- id: zoom_in
  label: Digital Zoom In
  kind: action
  command: "*zoomI#"
  params: []
- id: zoom_out
  label: Digital Zoom Out
  kind: action
  command: "*zoomO#"
  params: []
- id: auto
  label: Auto
  kind: action
  command: "*auto#"
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
- id: brilliant_color_status
  label: Brilliant Color Status
  kind: query
  command: "*BC=?#"
  params: []

# --- Operation Settings: Projector Position ---
- id: projector_position_front_table
  label: Projector Position Front Table
  kind: action
  command: "*pp=FT#"
  params: []
- id: projector_position_rear_table
  label: Projector Position Rear Table
  kind: action
  command: "*pp=RE#"
  params: []
- id: projector_position_rear_ceiling
  label: Projector Position Rear Ceiling
  kind: action
  command: "*pp=RC#"
  params: []
- id: projector_position_front_ceiling
  label: Projector Position Front Ceiling
  kind: action
  command: "*pp=FC#"
  params: []
- id: projector_position_status
  label: Projector Position Status
  kind: query
  command: "*pp=?#"
  params: []

# --- Operation Settings: Quick Auto Search ---
- id: quick_auto_search_on
  label: Quick Auto Search On
  kind: action
  command: "*QAS=on#"
  params: []
- id: quick_auto_search_off
  label: Quick Auto Search Off
  kind: action
  command: "*QAS=off#"
  params: []
- id: quick_auto_search_status
  label: Quick Auto Search Status
  kind: query
  command: "*QAS=?#"
  params: []

# --- Operation Settings: Direct Power On ---
- id: direct_power_on_on
  label: Direct Power On On
  kind: action
  command: "*directpower=on#"
  params: []
- id: direct_power_on_off
  label: Direct Power On Off
  kind: action
  command: "*directpower=off#"
  params: []
- id: direct_power_on_status
  label: Direct Power On Status
  kind: query
  command: "*directpower=?#"
  params: []

# --- Operation Settings: Signal Power On ---
- id: signal_power_on_on
  label: Signal Power On On
  kind: action
  command: "*autopower=on#"
  params: []
- id: signal_power_on_off
  label: Signal Power On Off
  kind: action
  command: "*autopower=off#"
  params: []
- id: signal_power_on_status
  label: Signal Power On Status
  kind: query
  command: "*autopower=?#"
  params: []

# --- Standby Settings: Network ---
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
- id: standby_network_status
  label: Standby Network Status
  kind: query
  command: "*standbynet=?#"
  params: []

# --- Standby Settings: Microphone ---
- id: standby_mic_on
  label: Standby Microphone On
  kind: action
  command: "*standbymic=on#"
  params: []
- id: standby_mic_off
  label: Standby Microphone Off
  kind: action
  command: "*standbymic=off#"
  params: []
- id: standby_mic_status
  label: Standby Microphone Status
  kind: query
  command: "*standbymic=?#"
  params: []

# --- Standby Settings: Monitor Out ---
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
- id: standby_monitor_out_status
  label: Standby Monitor Out Status
  kind: query
  command: "*standbymnt=?#"
  params: []

# --- Baud Rate ---
- id: baud_2400
  label: Baud 2400
  kind: action
  command: "*baud=2400#"
  params: []
- id: baud_4800
  label: Baud 4800
  kind: action
  command: "*baud=4800#"
  params: []
- id: baud_9600
  label: Baud 9600
  kind: action
  command: "*baud=9600#"
  params: []
- id: baud_14400
  label: Baud 14400
  kind: action
  command: "*baud=14400#"
  params: []
- id: baud_19200
  label: Baud 19200
  kind: action
  command: "*baud=19200#"
  params: []
- id: baud_38400
  label: Baud 38400
  kind: action
  command: "*baud=38400#"
  params: []
- id: baud_57600
  label: Baud 57600
  kind: action
  command: "*baud=57600#"
  params: []
- id: baud_115200
  label: Baud 115200
  kind: action
  command: "*baud=115200#"
  params: []
- id: baud_status
  label: Current Baud Rate
  kind: query
  command: "*baud=?#"
  params: []

# --- Lamp ---
- id: lamp_hours
  label: Lamp Hours
  kind: query
  command: "*ltim=?#"
  params: []
- id: lamp2_hours
  label: Lamp 2 Hours
  kind: query
  command: "*ltim2=?#"
  params: []
- id: lamp_mode_normal
  label: Lamp Mode Normal
  kind: action
  command: "*lampm=lnor#"
  params: []
- id: lamp_mode_eco
  label: Lamp Mode Eco
  kind: action
  command: "*lampm=eco#"
  params: []
- id: lamp_mode_smart_eco
  label: Lamp Mode Smart Eco
  kind: action
  command: "*lampm=seco#"
  params: []
- id: lamp_mode_dual_brightest
  label: Lamp Mode Dual Brightest
  kind: action
  command: "* lampm =dualbr#"
  params: []
- id: lamp_mode_dual_reliable
  label: Lamp Mode Dual Reliable
  kind: action
  command: "* lampm =dualre#"
  params: []
- id: lamp_mode_single_alternative
  label: Lamp Mode Single Alternative
  kind: action
  command: "* lampm =single#"
  params: []
- id: lamp_mode_single_alternative_eco
  label: Lamp Mode Single Alternative Eco
  kind: action
  command: "* lampm =singleeco#"
  params: []
- id: lamp_mode_status
  label: Lamp Mode Status
  kind: query
  command: "*lampm=?#"
  params: []
- id: model_name
  label: Model Name
  kind: query
  command: "*modelname=?#"
  params: []

# --- Blank / Freeze / Menu ---
- id: blank_on
  label: Blank On
  kind: action
  command: "*blank=on#"
  params: []
- id: blank_off
  label: Blank Off
  kind: action
  command: "*blank=off#"
  params: []
- id: blank_status
  label: Blank Status
  kind: query
  command: "*blank=?#"
  params: []
- id: freeze_on
  label: Freeze On
  kind: action
  command: "*freeze=on#"
  params: []
- id: freeze_off
  label: Freeze Off
  kind: action
  command: "*freeze=off#"
  params: []
- id: freeze_status
  label: Freeze Status
  kind: query
  command: "*freeze=?#"
  params: []
- id: menu_on
  label: Menu On
  kind: action
  command: "*menu=on#"
  params: []
- id: menu_off
  label: Menu Off
  kind: action
  command: "*menu=off#"
  params: []

# --- OSD Navigation ---
- id: osd_up
  label: Up
  kind: action
  command: "*up#"
  params: []
- id: osd_down
  label: Down
  kind: action
  command: "*down#"
  params: []
- id: osd_right
  label: Right
  kind: action
  command: "*right#"
  params: []
- id: osd_left
  label: Left
  kind: action
  command: "*left#"
  params: []
- id: osd_enter
  label: Enter
  kind: action
  command: "*enter#"
  params: []

# --- 3D ---
- id: threed_off
  label: 3D Sync Off
  kind: action
  command: "*3d=off#"
  params: []
- id: threed_auto
  label: 3D Auto
  kind: action
  command: "*3d=auto#"
  params: []
- id: threed_tb
  label: 3D Sync TopBottom
  kind: action
  command: "*3d=tb#"
  params: []
- id: threed_fs
  label: 3D Sync Frame Sequential
  kind: action
  command: "*3d=fs#"
  params: []
- id: threed_fp
  label: 3D Framepacking
  kind: action
  command: "*3d=fp#"
  params: []
- id: threed_sbs
  label: 3D Side by Side
  kind: action
  command: "*3d=sbs#"
  params: []
- id: threed_inverter_disable
  label: 3D Inverter Disable
  kind: action
  command: "*3d=da#"
  params: []
- id: threed_inverter
  label: 3D Inverter
  kind: action
  command: "*3d=iv#"
  params: []
- id: threed_2d_to_3d
  label: 2D to 3D
  kind: action
  command: "*3d=2d3d#"
  params: []
- id: threed_nvidia
  label: 3D nVIDIA
  kind: action
  command: "*3d=nvidia#"
  params: []
- id: threed_status
  label: 3D Sync Status
  kind: query
  command: "*3d=?#"
  params: []

# --- Remote Receiver ---
- id: remote_receiver_front_rear
  label: Remote Receiver Front+Rear
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
- id: remote_receiver_status
  label: Remote Receiver Status
  kind: query
  command: "*rr=?#"
  params: []

# --- Instant On ---
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
- id: instant_on_status
  label: Instant On Status
  kind: query
  command: "*ins=?#"
  params: []

# --- Lamp Saver ---
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
- id: lamp_saver_status
  label: Lamp Saver Mode Status
  kind: query
  command: "*lpsaver=?#"
  params: []

# --- Projection Log In Code ---
- id: prj_login_code_on
  label: Projection Log In Code On
  kind: action
  command: "*prjlogincode=on#"
  params: []
- id: prj_login_code_off
  label: Projection Log In Code Off
  kind: action
  command: "*prjlogincode=off#"
  params: []
- id: prj_login_code_status
  label: Projection Log In Code Status
  kind: query
  command: "*prjlogincode=?#"
  params: []

# --- Broadcasting ---
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
- id: broadcasting_status
  label: Broadcasting Status
  kind: query
  command: "*broadcasting=?#"
  params: []

# --- AMX Device Discovery ---
- id: amx_discovery_on
  label: AMX Device Discovery On
  kind: action
  command: "*amxdd=on#"
  params: []
- id: amx_discovery_off
  label: AMX Device Discovery Off
  kind: action
  command: "*amxdd=off#"
  params: []
- id: amx_discovery_status
  label: AMX Device Discovery Status
  kind: query
  command: "*amxdd=?#"
  params: []

# --- MAC Address ---
- id: mac_address
  label: MAC Address
  kind: query
  command: "*macaddr=?#"
  params: []

# --- High Altitude ---
- id: high_altitude_on
  label: High Altitude Mode On
  kind: action
  command: "*Highaltitude=on#"
  params: []
- id: high_altitude_off
  label: High Altitude Mode Off
  kind: action
  command: "*Highaltitude=off#"
  params: []
- id: high_altitude_status
  label: High Altitude Mode Status
  kind: query
  command: "*Highaltitude=?#"
  params: []
```

## Feedbacks
```yaml
# Source describes an echo protocol: each input character is echoed.
# Standby prompt: "> \r\n" (hex 3E 00). 5s idle: "0D 0A 00".
# Error responses: "Illegal format", "Unsupported item", "Block item".
# Power status responses (echo examples): "*POW=ON#", "*POW=OFF#".
# UNRESOLVED: response format for other status queries not enumerated in source.
- id: prompt_ready
  type: string
  description: Standby prompt indicating ready to accept RS-232 command (hex 3E 00 / "> \r\n")
- id: error_illegal_format
  type: string
  description: "Returned when command format is illegal"
- id: error_unsupported_item
  type: string
  description: "Returned when command format is correct but invalid for this model"
- id: error_block_item
  type: string
  description: "Returned when command is correct but cannot execute in current condition"
```

## Variables
```yaml
# None documented as settable parameters distinct from the discrete action set.
# All settings in the source are addressed by discrete write commands, not free-form parameter sets.
```

## Events
```yaml
# Source describes unsolicited echo behavior only; no event subscription model documented.
```

## Macros
```yaml
# No multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- Commands are ASCII framed as `<CR>*cmd=args#<CR>`. Implementations must prepend 0x0D and append 0x0D to each command string.
- Echo behavior: each input character is echoed; on Enter (0x0D) the projector replies with `>` `0x00` (ready prompt).
- Idle timeout: after 5s with no command, the projector echoes `0x0D 0x0A 0x00`.
- "Unsupported item" and "Block item" responses are not emitted in power saving mode (standby power < 1W).
- Status and power-on commands are still functional in low power mode (< 0.5W).
- Both upper- and lower-case input characters are accepted.
- Volume bar display is supported.
- If the system has Lan-over-RS232, the RS-232 command set remains supported.
- Feature availability varies by model — sources, audio settings, and aspect ratios differ across E-Series variants.
- `* lampm =dual*` and similar dual-lamp commands contain literal spaces as written in source; preserve verbatim.
- Default baud 115200; can be changed via OSD or via the `*baud=...#` command (and may need to be re-matched on the host afterward).

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: query response formats beyond power (e.g. source, picture mode) not enumerated in source. -->
<!-- UNRESOLVED: voltage, current, power consumption not stated in source. -->

## Provenance

```yaml
source_domains:
  - benqimage.blob.core.windows.net
  - audiogeneral.com
source_urls:
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
  - https://www.audiogeneral.com/BenQ/rs232_commands_generic_082613.pdf
retrieved_at: 2026-04-29T15:20:31.007Z
last_checked_at: 2026-06-02T21:40:54.515Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:40:54.515Z
matched_actions: 173
action_count: 173
confidence: medium
summary: "All 173 spec actions matched verbatim in source command table; transport parameters verified against interface settings. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "feature availability varies by model; source note states \"The above function will be vary from model to model. (ex: source, audio settings, aspect ratio..etc)\""
- "response format for other status queries not enumerated in source."
- "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements."
- "firmware version compatibility not stated in source."
- "query response formats beyond power (e.g. source, picture mode) not enumerated in source."
- "voltage, current, power consumption not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
