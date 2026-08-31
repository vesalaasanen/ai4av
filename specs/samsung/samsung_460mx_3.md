---
spec_id: admin/samsung-460mx-3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Samsung 460MX-3 Control Spec"
manufacturer: Samsung
model_family: "Samsung 460MX-3 (SyncMaster 460MX-3)"
aliases: []
compatible_with:
  manufacturers:
    - Samsung
  models:
    - "Samsung 460MX-3 (SyncMaster 460MX-3)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - github.com
source_urls:
  - https://github.com/vgavro/samsung-mdc/raw/master/MDC-Protocol.pdf
retrieved_at: 2026-08-26T18:33:20.307Z
last_checked_at: 2026-08-26T22:17:32.238Z
generated_at: 2026-08-26T22:17:32.238Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "0x4B Video Picture Position & Size"
  - "the source is Samsung's common MDC protocol document, not a 460MX-3-specific manual; exact subset of commands supported by the 460MX-3 is not stated. Model code table does not list 460MX-3 explicitly (closest: 0x29 SyncMaster 460MX(n)-2)."
  - "firmware version compatibility not stated in source"
  - "source defines no standalone variable abstraction"
  - "no events documented in source"
  - "no macros documented in source"
  - "source contains no operator safety warnings or interlock procedures."
  - "which subset of the common MDC command table the 460MX-3 firmware supports is not stated; verify against device."
  - "white balance gain/offset ranges, Uniformity (0x21.53) enum, ABL mode values, and several 0xD0 LED-product enums are not enumerated in the source."
verification:
  verdict: verified
  checked_at: 2026-08-26T22:17:32.238Z
  matched_actions: 224
  action_count: 224
  confidence: medium
  summary: "All 224 spec action units map1:1 to source command-table tokens; transport ok; only 0x4B uncovered. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-26
---

# Samsung 460MX-3 Control Spec

## Summary
Samsung SyncMaster 460MX-3 large-format display controlled via the Samsung MDC (Multiple Display Control) protocol, Ver 15.0 (2020-11-06). The spec covers control over both RS-232 (9-pin D-SUB, daisy-chainable) and RJ45 Ethernet carrying the same MDC frame inside TCP/IP. The command catalogue is the full common MDC command table; per-model support varies ("Depends on each model spec, a certain command will be supported or not").

<!-- UNRESOLVED: the source is Samsung's common MDC protocol document, not a 460MX-3-specific manual; exact subset of commands supported by the 460MX-3 is not stated. Model code table does not list 460MX-3 explicitly (closest: 0x29 SyncMaster 460MX(n)-2). -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 1515  # default port stated in source; default IP 192.168.0.10
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       inferred: 0x11 Power Control with on/off/reboot
# - routable        inferred: 0x14 Input Source Control, PIP source, video wall routing
# - queryable       inferred: 0x00 Status Control and extensive get commands
# - levelable       inferred: 0x12 Volume, 0x24 Contrast, 0x25 Brightness, 0x58 Lamp, EQ controls
traits:
  - powerable
  - routable
  - queryable
  - levelable
```

## Actions
```yaml
# MDC frame: AA <cmd> <id> <data_len> [<subcmd>] [<data...>] <checksum>
# - <id>: display ID 0x00-0xFD; 0xFE = broadcast (all sets obey, no ACK returned)
# - {checksum}: sum of all bytes AFTER the 0xAA header (cmd+id+len+subcmd+data),
#   discarding the carry if the sum exceeds 0xFF (source example: 11+FE+01+01=111 -> 0x11)
# - Data length 0x00 form = Get (query); with data = Set.
# Each action below = one distinct command-table row (opcode, or opcode+sub-command).
actions:
  # --- Common status / info ---
  - id: status_control
    label: "Status Control (0x00)"
    kind: query
    command: "AA 00 {id} 00 {checksum}"
    params: []
    notes: "Ack returns Power, Volume, Mute, Input, Aspect, N/F Time NF fields"
  - id: video_control
    label: "Video Control (0x04)"
    kind: query
    command: "AA 04 {id} 00 {checksum}"
    params: []
    notes: "Returns Contrast, Brightness, Sharpness, Color, Tint, ColorTone, ColorTemp (video sources)"
  - id: rgb_control
    label: "RGB Control (0x06)"
    kind: query
    command: "AA 06 {id} 00 {checksum}"
    params: []
    notes: "Returns Contrast, Brightness, ColorTone, ColorTemp, R/G/B Gain (PC/BNC/DVI only)"
  - id: pip_status_control
    label: "PIP Status Control (0x07)"
    kind: query
    command: "AA 07 {id} 00 {checksum}"
    params: []
    notes: "Returns P.Size and P.Source; set not supported"
  - id: maintenance_control
    label: "Maintenance Control (0x08)"
    kind: query
    command: "AA 08 {id} 00 {checksum}"
    params: []
    notes: "Returns power, PIP size/source, lamp schedule, safety screen timer, video wall state; ack length 0x15 or 0x19 depending on model"
  - id: sound_control
    label: "Sound Control (0x09)"
    kind: query
    command: "AA 09 {id} 00 {checksum}"
    params: []
    notes: "Returns Vol, Balance, EQ bands, SRS (Type1 len 0x0D / Type2 len 0x0C)"
  - id: serial_number_control
    label: "Serial Number Control (0x0B)"
    kind: query
    command: "AA 0B {id} 00 {checksum}"
    params: []
    notes: "Returns 15-byte serial number string"
  - id: display_status_control
    label: "Display Status Control (0x0D)"
    kind: query
    command: "AA 0D {id} 00 {checksum}"
    params: []
    notes: "Returns Lamp Error, Temperature Error, Bright Sensor Error, No_Sync Error, Cur_Temp (-60~125 C), FAN Error"
  - id: sw_version_control
    label: "SW Version Control (0x0E)"
    kind: query
    command: "AA 0E {id} 00 {checksum}"
    params: []
    notes: "Returns project info (Val1-12) + software version string; ack length variable up to 0x34"
  - id: model_number_control
    label: "Model Number Control (0x10)"
    kind: query
    command: "AA 10 {id} 00 {checksum}"
    params: []
    notes: "Returns Species (panel type 0x01 PDP..0x06 OLED), Model code (0x01-0x72 table), TV support flag"
  - id: screen_size_control
    label: "Screen Size Control (0x19)"
    kind: query
    command: "AA 19 {id} 00 {checksum}"
    params: []
    notes: "Returns screen size in inches (0-255); set not supported"
  - id: panel_on_time
    label: "Panel On Time (0x83)"
    kind: query
    command: "AA 83 {id} 00 {checksum}"
    params: []
    notes: "Returns Ptime_H/Ptime_L; value increments every 10 minutes; set not supported"
  - id: model_name_control
    label: "Model Name (0x8A)"
    kind: query
    command: "AA 8A {id} 00 {checksum}"
    params: []
    notes: "Returns model name as ASCII string"
  - id: pc_module_detect
    label: "PC Module Detect (0x66)"
    kind: query
    command: "AA 66 {id} 00 {checksum}"
    params: []
    notes: "Returns 0x00 Not Detected / 0x01 MagicInfo / 0x02 Plug In Module; set not supported"

  # --- Power / basic ---
  - id: power_control
    label: "Power Control (0x11)"
    kind: action
    command: "AA 11 {id} 01 {power} {checksum}"
    params:
      - name: power
        type: integer
        description: "0x00=Power OFF, 0x01=Power ON, 0x02=Reboot"
    notes: "Retry 3x every 2 sec until ACK on power on/off; see Notes for RJ45 power-on behavior"
  - id: volume_control
    label: "Volume Control (0x12)"
    kind: action
    command: "AA 12 {id} 01 {volume} {checksum}"
    params:
      - name: volume
        type: integer
        description: "Volume 0-100"
  - id: mute_control
    label: "Mute Control (0x13)"
    kind: action
    command: "AA 13 {id} 01 {mute} {checksum}"
    params:
      - name: mute
        type: integer
        description: "0x00=Mute OFF, 0x01=Mute ON"
  - id: input_source_control
    label: "Input Source Control (0x14)"
    kind: action
    command: "AA 14 {id} 01 {input} {checksum}"
    params:
      - name: input
        type: integer
        description: "0x04 S-Video, 0x08 Component, 0x0C AV1, 0x0D AV2, 0x0E Ext(SCART1), 0x14 PC, 0x18 DVI, 0x1E BNC, 0x1F DVI_VIDEO(get only), 0x20 Magicinfo, 0x21 HDMI1, 0x22 HDMI1_PC(get only), 0x23 HDMI2, 0x24 HDMI2_PC(get only), 0x25 DisplayPort1, 0x26 DisplayPort2, 0x27 DisplayPort3, 0x31 HDMI3, 0x32 HDMI3_PC(get only), 0x33 HDMI4, 0x34 HDMI4_PC(get only), 0x40 TV(DTV), 0x50 Plug In Module, 0x55 HDBaseT, 0x56 OCM, 0x60 Media/MagicInfo S, 0x61 WiDi/Screen Mirroring, 0x62 Internal/USB, 0x63 URL Launcher, 0x64 IWB(get only), 0x65 Web Browser, 0x66 Remote Workspace"
  - id: volume_up_down
    label: "Volume Up/Down (0x62)"
    kind: action
    command: "AA 62 {id} 01 {direction} {checksum}"
    params:
      - name: direction
        type: integer
        description: "0x00=Up, 0x01=Down"
  - id: auto_power
    label: "Auto Power (0x33)"
    kind: action
    command: "AA 33 {id} 01 {auto_power} {checksum}"
    params:
      - name: auto_power
        type: integer
        description: "0x00=Auto Power Off, 0x01=Auto Power On (on AC attach)"
  - id: network_standby_control
    label: "Network Standby Control (0xB5)"
    kind: action
    command: "AA B5 {id} 01 {network_standby} {checksum}"
    params:
      - name: network_standby
        type: integer
        description: "0x00=Off, 0x01=On"
  - id: standby_control
    label: "Standby Control (0x4A)"
    kind: action
    command: "AA 4A {id} 01 {standby} {checksum}"
    params:
      - name: standby
        type: integer
        description: "DPMS standby on no-signal: 0x00=Off, 0x01=On, 0x02=Auto (external input only)"
  - id: panel_on_off
    label: "Panel On Off (0xF9)"
    kind: action
    command: "AA F9 {id} 01 {panel} {checksum}"
    params:
      - name: panel
        type: integer
        description: "0x00=Panel Off, 0x01=Panel On"

  # --- Picture ---
  - id: contrast_control
    label: "Contrast Control (0x24)"
    kind: action
    command: "AA 24 {id} 01 {contrast} {checksum}"
    params:
      - name: contrast
        type: integer
        description: "0-100"
  - id: brightness_control
    label: "Brightness Control (0x25)"
    kind: action
    command: "AA 25 {id} 01 {brightness} {checksum}"
    params:
      - name: brightness
        type: integer
        description: "0-100"
  - id: sharpness_control
    label: "Sharpness Control (0x26)"
    kind: action
    command: "AA 26 {id} 01 {sharpness} {checksum}"
    params:
      - name: sharpness
        type: integer
        description: "0-100"
  - id: color_control
    label: "Color Control (0x27)"
    kind: action
    command: "AA 27 {id} 01 {color} {checksum}"
    params:
      - name: color
        type: integer
        description: "Color saturation 0-100"
  - id: tint_control
    label: "Tint Control (0x28)"
    kind: action
    command: "AA 28 {id} 01 {tint} {checksum}"
    params:
      - name: tint
        type: integer
        description: "R=tint, G=(100-tint); settable only in steps of 2 (0,2,4...100)"
  - id: rgb_contrast_control
    label: "RGB Contrast Control (0x37)"
    kind: action
    command: "AA 37 {id} 01 {contrast} {checksum}"
    params:
      - name: contrast
        type: integer
        description: "0-100; PC/BNC/DVI only; works same as 0x24"
  - id: rgb_brightness_control
    label: "RGB Brightness Control (0x38)"
    kind: action
    command: "AA 38 {id} 01 {brightness} {checksum}"
    params:
      - name: brightness
        type: integer
        description: "0-100; PC/BNC/DVI only; works same as 0x25"
  - id: picture_size_control
    label: "Picture Size Control (0x15)"
    kind: action
    command: "AA 15 {id} 01 {aspect} {checksum}"
    params:
      - name: aspect
        type: integer
        description: "PC mode: 0x10 16:9, 0x18 4:3, 0x20 Original Ratio, 0x21 21:9, 0x22 Custom; Video mode: 0x00 Auto Wide, 0x01 16:9, 0x04 Zoom, 0x05 Zoom1, 0x06 Zoom2, 0x09 Just Scan, 0x0B 4:3, 0x0C Wide Fit, 0x0D Custom, 0x0E Smart View 1, 0x0F Smart View 2, 0x31 Wide Zoom, 0x32 21:9; not work with Video Wall On"
  - id: screen_mode_control
    label: "Screen Mode Control (0x18)"
    kind: action
    command: "AA 18 {id} 01 {scrmode} {checksum}"
    params:
      - name: scrmode
        type: integer
        description: "0x01 16:9, 0x04 Zoom, 0x0B 4:3, 0x31 Wide Zoom; video wall off + landscape/Auto Wide only"
  - id: color_tone_control
    label: "Color Tone Control (0x3E)"
    kind: action
    command: "AA 3E {id} 01 {color_tone} {checksum}"
    params:
      - name: color_tone
        type: integer
        description: "0x00 Cool2, 0x01 Cool1, 0x02 Normal, 0x03 Warm1, 0x04 Warm2, 0x05 Natural, 0x50 Off"
  - id: pc_color_tone_control
    label: "PC Color Tone Control (0x75)"
    kind: action
    command: "AA 75 {id} 01 {color_tone} {checksum}"
    params:
      - name: color_tone
        type: integer
        description: "0x00 Custom, 0x01 Cool, 0x02 Normal, 0x03 Warm, 0x05 Natural, 0x50 Off; PC/BNC/DVI only"
  - id: color_temperature_control
    label: "Color Temperature Control (0x3F)"
    kind: action
    command: "AA 3F {id} 01 {c_temp} {checksum}"
    params:
      - name: c_temp
        type: integer
        description: "0x00-0x0A = 5000K-15000K; 0xFD 2800K, 0xFE 3000K, 0xFF 4000K; extended: 28(0x1C)-160(0xA0) = 2800K-16000K in 500K steps; works when color tone is off"
  - id: gamma_control
    label: "Gamma Control (0x96)"
    kind: action
    command: "AA 96 {id} 01 {gamma} {checksum}"
    params:
      - name: gamma
        type: integer
        description: "0x00 Natural(0), 0x01-0x05 Mode1-5, 0x11-0x15 -1..-5, 0x20 Custom"
  - id: color_space_control
    label: "Color Space Control (0x9D)"
    kind: action
    command: "AA 9D {id} 01 {color_space} {checksum}"
    params:
      - name: color_space
        type: integer
        description: "0x00 Auto, 0x01 Native, 0x02 Custom, 0x03 DCI-P3, 0x04 Adobe RGB, 0x05 BT-709"
  - id: xvync_control
    label: "xvYCC Control (0x9E)"
    kind: action
    command: "AA 9E {id} 01 {xvycc} {checksum}"
    params:
      - name: xvycc
        type: integer
        description: "0x00=Off, 0x01=On"
  - id: dynamic_contrast
    label: "Dynamic Contrast (0x87)"
    kind: action
    command: "AA 87 {id} 01 {dy_cont} {checksum}"
    params:
      - name: dy_cont
        type: integer
        description: "0x00 Off, 0x01 Low(On), 0x02 Medium, 0x03 High"
  - id: black_adjust_control
    label: "Black Adjust Control (0x95)"
    kind: action
    command: "AA 95 {id} 01 {b_adj} {checksum}"
    params:
      - name: b_adj
        type: integer
        description: "0x00 Off, 0x01 Low/Dark, 0x02 Medium/Darker, 0x03 High/Darkest"
  - id: hdmi_black_level
    label: "HDMI Black Level (0x94)"
    kind: action
    command: "AA 94 {id} 01 {level} {checksum}"
    params:
      - name: level
        type: integer
        description: "0x00 Normal, 0x01 Low, 0x02 Auto"
  - id: edge_enhancement_control
    label: "Edge Enhancement Control (0x9C)"
    kind: action
    command: "AA 9C {id} 01 {edge} {checksum}"
    params:
      - name: edge
        type: integer
        description: "0x00=Off, 0x01=On"
  - id: digital_nr_control
    label: "Digital NR Control (0x73)"
    kind: action
    command: "AA 73 {id} 01 {nr_mode} {checksum}"
    params:
      - name: nr_mode
        type: integer
        description: "0x00 Off, 0x01 Low(On), 0x02 Medium, 0x03 High, 0x04 Auto, 0x05 Auto Visualization"
  - id: film_mode_control
    label: "Film Mode Control (0x79)"
    kind: action
    command: "AA 79 {id} 01 {fmode} {checksum}"
    params:
      - name: fmode
        type: integer
        description: "0x00 Off, 0x01 Auto1, 0x02 Auto2, 0x03 Cinema Smooth"
  - id: auto_motion_plus
    label: "Auto Motion Plus (0x0F)"
    kind: action
    command: "AA 0F {id} 03 {mode} {blur} {judder} {checksum}"
    params:
      - name: mode
        type: integer
        description: "0x00 Off, 0x01 Clear, 0x02 Standard, 0x03 Smooth, 0x04 Custom, 0x05 Demo, 0x06 Auto"
      - name: blur
        type: integer
        description: "Blur reduction 0-10 (Custom mode only)"
      - name: judder
        type: integer
        description: "Judder reduction 0-10 (Custom mode only)"
  - id: picture_mode_control
    label: "P.Mode Control (0x71)"
    kind: action
    command: "AA 71 {id} 01 {pmode} {checksum}"
    params:
      - name: pmode
        type: integer
        description: "Source-based: 0x00 Dynamic, 0x01 Standard, 0x02 Movie, 0x03 Custom, 0x04 Natural, 0x05 Calibration, 0x10 Entertain, 0x11 Internet, 0x12 Text, 0x13 Custom, 0x14 Advertisement, 0x15 Information, 0x16 Calibration, 0x50 Off; Common: 0x01 Live, 0x20-0x27 Shop& Mall/Videowall presets, 0x30 HDR+(get only)"
  - id: game_mode_control
    label: "Game Mode Control (0x90)"
    kind: action
    command: "AA 90 {id} 01 {game_mode} {checksum}"
    params:
      - name: game_mode
        type: integer
        description: "0x00=Off, 0x01=On"
  - id: energy_saving_lfd
    label: "Energy Saving_LFD (0x56)"
    kind: action
    command: "AA 56 {id} 01 {energy_saving} {checksum}"
    params:
      - name: energy_saving
        type: integer
        description: "0x00=Off, 0x01=On (max power saving)"
  - id: energy_saving_control
    label: "Energy Saving Control (0x92)"
    kind: action
    command: "AA 92 {id} 01 {e_sav} {checksum}"
    params:
      - name: e_sav
        type: integer
        description: "0x00 Off, 0x01 Low(On), 0x02 Medium, 0x03 High, 0x04 Picture Off"
  - id: reset_control
    label: "Reset Control (0x9F)"
    kind: action
    command: "AA 9F {id} 01 {rst} {checksum}"
    params:
      - name: rst
        type: integer
        description: "0x00 Picture, 0x01 Sound, 0x02 Setup(System), 0x03 All, 0x04 Screen Display"

  # --- Picture Control (0x21) sub-commands ---
  - id: led_picture_size
    label: "Picture Control - LED Picture Size (0x21.01)"
    kind: action
    command: "AA 21 {id} 02 01 {size} {checksum}"
    params:
      - name: size
        type: integer
        description: "0x00=Original, 0x01=Custom"
  - id: picture_size_custom_fit_size
    label: "Picture Control - Custom Fit Size (0x21.02)"
    kind: action
    command: "AA 21 {id} 05 02 {width_hi} {width_lo} {height_hi} {height_lo} {checksum}"
    params:
      - name: width
        type: integer
        description: "Custom width (16-bit, 2-byte); product-spec min/max limits apply"
      - name: height
        type: integer
        description: "Custom height (16-bit, 2-byte); product-spec min/max limits apply"
  - id: hdr_inverse_tone_mapping
    label: "Picture Control - HDR Inverse Tone Mapping (0x21.03)"
    kind: action
    command: "AA 21 {id} 02 03 {itm} {checksum}"
    params:
      - name: itm
        type: integer
        description: "0x00=Off, 0x01=On"
  - id: hdr_dynamic_peaking
    label: "Picture Control - HDR Dynamic Peaking (0x21.04)"
    kind: action
    command: "AA 21 {id} 02 04 {peaking} {checksum}"
    params:
      - name: peaking
        type: integer
        description: "0x00=Off, 0x01=On"
  - id: hdr_color_mapping
    label: "Picture Control - HDR Color Mapping (0x21.05)"
    kind: action
    command: "AA 21 {id} 02 05 {mapping} {checksum}"
    params:
      - name: mapping
        type: integer
        description: "0x00=Off, 0x01=On"
  - id: picture_size_fit_to_screen
    label: "Picture Control - Picture Size Fit To Screen (0x21.06)"
    kind: action
    command: "AA 21 {id} 02 06 {fit} {checksum}"
    params:
      - name: fit
        type: integer
        description: "0x00=Off, 0x01=On"
  - id: hdmi_uhd_color
    label: "Picture Control - HDMI UHD Color (0x21.07)"
    kind: action
    command: "AA 21 {id} {len} 07 {source1} {value1} ... {sourceN} {valueN} {checksum}"
    params:
      - name: pairs
        type: string
        description: "Variable-length source/value pairs; source codes as 0x14; value 0x00=Off 0x01=On; device reboots on change"
  - id: fhd_uhd_out_control
    label: "Picture Control - FHD/UHD Out (0x21.08)"
    kind: action
    command: "AA 21 {id} 02 08 {output} {checksum}"
    params:
      - name: output
        type: integer
        description: "0x00=FHD, 0x01=UHD; device reboots on change"
  - id: live_mode_control
    label: "Picture Control - Live Mode (0x21.09)"
    kind: action
    command: "AA 21 {id} 02 09 {live_mode} {checksum}"
    params:
      - name: live_mode
        type: integer
        description: "0x00=Normal, 0x01=Live; device reboots on change"
  - id: hdr_dynamic_range_extension
    label: "Picture Control - HDR Dynamic Range Extension (0x21.0A)"
    kind: action
    command: "AA 21 {id} 02 0A {dre} {checksum}"
    params:
      - name: dre
        type: integer
        description: "0x00 Off, 0x01 Low, 0x02 Medium, 0x03 High; device reboots on change"
  - id: screen_position_control
    label: "Picture Control - Screen Position (0x21.0B)"
    kind: action
    command: "AA 21 {id} 05 0B {posx_hi} {posx_lo} {posy_hi} {posy_lo} {checksum}"
    params:
      - name: pos_x
        type: integer
        description: "Screen X position (16-bit)"
      - name: pos_y
        type: integer
        description: "Screen Y position (16-bit)"
  - id: hdr_multilink_hdr
    label: "Picture Control - HDR MultiLink HDR (0x21.0C)"
    kind: action
    command: "AA 21 {id} 04 0C {mlhdr} {total_devices} {device_id} {checksum}"
    params:
      - name: mlhdr
        type: integer
        description: "0x00=Off, 0x01=On, 0xFF=do not change"
      - name: total_devices
        type: integer
        description: "Device count for multi link HDR"
      - name: device_id
        type: integer
        description: "Device ID under multi link HDR"
  - id: color_enhancement
    label: "Picture Control - Color Enhancement (0x21.50)"
    kind: action
    command: "AA 21 {id} 02 50 {enhance} {checksum}"
    params:
      - name: enhance
        type: integer
        description: "0x00=Off, 0x01=On"
  - id: dynamic_backlight
    label: "Picture Control - Dynamic Backlight (0x21.51)"
    kind: action
    command: "AA 21 {id} 02 51 {backlight} {checksum}"
    params:
      - name: backlight
        type: integer
        description: "0x00 Off, 0x01 On(Low), 0x02 Standard, 0x03 High; may act as Local Dimming on some models"
  - id: fit_to_screen
    label: "Picture Control - Fit To Screen (0x21.52)"
    kind: action
    command: "AA 21 {id} 02 52 {fit} {checksum}"
    params:
      - name: fit
        type: integer
        description: "0x02=Auto"
  - id: uniformity_control
    label: "Picture Control - Uniformity (0x21.53)"
    kind: action
    command: "AA 21 {id} 02 53 {uniformity} {checksum}"
    params:
      - name: uniformity
        type: integer
        description: "Uniformity mode; device reboots on change (enum values not listed in source)"
  - id: gamma_mode_control
    label: "Picture Control - Gamma Mode (0x21.54)"
    kind: action
    command: "AA 21 {id} 02 54 {gamma_mode} {checksum}"
    params:
      - name: gamma_mode
        type: integer
        description: "0x00 HLG, 0x01 ST.2084, 0x02 BT.1886, 0x03 S Curve"
  - id: black_equalizer_control
    label: "Picture Control - Black Equalizer (0x21.55)"
    kind: action
    command: "AA 21 {id} 02 55 {black_eq} {checksum}"
    params:
      - name: black_eq
        type: integer
        description: "0x00=Off, 0x01=Low, 0x02=High"
  - id: hdr_plus_control
    label: "Picture Control - HDR+ (0x21.56)"
    kind: action
    command: "AA 21 {id} 02 56 {hdr_plus} {checksum}"
    params:
      - name: hdr_plus
        type: integer
        description: "0x00=Off, 0x01=On"

  # --- White balance (0xFE) ---
  - id: white_balance_mode
    label: "White Balance Mode (0xFE.62)"
    kind: action
    command: "AA FE {id} 02 62 {mode} {checksum}"
    params:
      - name: mode
        type: integer
        description: "White balance mode (enum values not listed in source)"
  - id: white_balance_red_gain
    label: "White Balance Red Gain (0xFE.81)"
    kind: action
    command: "AA FE {id} 02 81 {red_gain} {checksum}"
    params:
      - name: red_gain
        type: integer
        description: "Red gain value (range model-dependent, not stated in source)"
  - id: white_balance_green_gain
    label: "White Balance Green Gain (0xFE.91)"
    kind: action
    command: "AA FE {id} 02 91 {green_gain} {checksum}"
    params:
      - name: green_gain
        type: integer
        description: "Green gain value (range model-dependent, not stated in source)"
  - id: white_balance_blue_gain
    label: "White Balance Blue Gain (0xFE.A1)"
    kind: action
    command: "AA FE {id} 02 A1 {blue_gain} {checksum}"
    params:
      - name: blue_gain
        type: integer
        description: "Blue gain value (range model-dependent, not stated in source)"
  - id: white_balance_red_offset
    label: "White Balance Red Offset (0xFE.B1)"
    kind: action
    command: "AA FE {id} 02 B1 {red_offset} {checksum}"
    params:
      - name: red_offset
        type: integer
        description: "Red offset value (range model-dependent, not stated in source)"
  - id: white_balance_green_offset
    label: "White Balance Green Offset (0xFE.C1)"
    kind: action
    command: "AA FE {id} 02 C1 {green_offset} {checksum}"
    params:
      - name: green_offset
        type: integer
        description: "Green offset value (range model-dependent, not stated in source)"
  - id: white_balance_blue_offset
    label: "White Balance Blue Offset (0xFE.D1)"
    kind: action
    command: "AA FE {id} 02 D1 {blue_offset} {checksum}"
    params:
      - name: blue_offset
        type: integer
        description: "Blue offset value (range model-dependent, not stated in source)"

  # --- PC position / adjustment ---
  - id: coarse_control
    label: "Coarse Control (0x2F)"
    kind: action
    command: "AA 2F {id} 01 {coarse} {checksum}"
    params:
      - name: coarse
        type: integer
        description: "0x00=Decrease, 0x01=Increase; PC source + video wall on only"
  - id: fine_control
    label: "Fine Control (0x30)"
    kind: action
    command: "AA 30 {id} 01 {fine} {checksum}"
    params:
      - name: fine
        type: integer
        description: "0x00=Decrease, 0x01=Increase; PC source + video wall on only"
  - id: h_position_control
    label: "H-Position Control (0x31)"
    kind: action
    command: "AA 31 {id} 01 {h_pos} {checksum}"
    params:
      - name: h_pos
        type: integer
        description: "0x00=Move Left, 0x01=Move Right; PC/BNC only"
  - id: v_position_control
    label: "V-Position Control (0x32)"
    kind: action
    command: "AA 32 {id} 01 {v_pos} {checksum}"
    params:
      - name: v_pos
        type: integer
        description: "0x00=Move Up, 0x01=Move Down; PC/BNC only"
  - id: auto_adjustment_control
    label: "Auto Adjustment Control (0x3D)"
    kind: action
    command: "AA 3D {id} 01 00 {checksum}"
    params: []
    notes: "Trigger picture auto adjustment; data always 0x00; PC(D-Sub)/BNC only"
  - id: auto_auto_adjustment
    label: "Auto AutoAdjustment (0x76)"
    kind: action
    command: "AA 76 {id} 01 {a_adjust} {checksum}"
    params:
      - name: a_adjust
        type: integer
        description: "0x00=Disable, 0x01=Enable"
  - id: user_auto_color
    label: "User Auto Color (0x45)"
    kind: action
    command: "AA 45 {id} 01 {cmd} {checksum}"
    params:
      - name: cmd
        type: integer
        description: "0x00=Reset, 0x01=Auto Color; PC(D-Sub) only; set only (get not supported)"

  # --- PIP ---
  - id: pip_on_off_control
    label: "PIP On/Off Control (0x3C)"
    kind: action
    command: "AA 3C {id} 01 {pip} {checksum}"
    params:
      - name: pip
        type: integer
        description: "0x00=Off, 0x01=On; not in MagicNet / video wall on"
  - id: pip_source_control
    label: "PIP Source Control (0x40)"
    kind: action
    command: "AA 40 {id} 01 {p_source} {checksum}"
    params:
      - name: p_source
        type: integer
        description: "Input source code (see 0x14 table); PIP must be on"
  - id: pip_size_control
    label: "PIP Size Control (0x42)"
    kind: action
    command: "AA 42 {id} 01 {p_size} {checksum}"
    params:
      - name: p_size
        type: integer
        description: "0x00 Off(get only), 0x04 Double1, 0x05 Double2, 0x06 Medium, 0x07 Large, 0x08 Small, 0x09 Double3(POP), 0x10 Custom"
  - id: pip_locate_control
    label: "PIP Locate Control (0x43)"
    kind: action
    command: "AA 43 {id} 01 {p_locate} {checksum}"
    params:
      - name: p_locate
        type: integer
        description: "0x00 Off(get only), 0x01 Upper Left, 0x02 Upper Right, 0x03 Lower Right, 0x04 Lower Left"
  - id: custom_pip_control
    label: "Custom PIP Control (0xB7)"
    kind: action
    command: "AA B7 {id} 08 {h_pos} {h_pos} {v_pos} {v_pos} {h_size} {h_size} {v_size} {v_size} {checksum}"
    params:
      - name: h_position
        type: integer
        description: "16-bit custom PIP horizontal start position; interval 10 pixel"
      - name: v_position
        type: integer
        description: "16-bit custom PIP vertical start position; interval 10 pixel"
      - name: h_size
        type: integer
        description: "16-bit; sizes 512-1632 step 160 pixel"
      - name: v_size
        type: integer
        description: "16-bit; sizes 288-918 step 90 pixel"
  - id: net_pip_command
    label: "Net PIP Command (0xE0)"
    kind: action
    command: "AA E0 {id} {len} {data} {checksum}"
    params:
      - name: data
        type: string
        description: "Multi-param Net PIP data (detailed format in source p.194 area; data 15-19 channel bytes, last-memory channel when fixed value)"
  - id: three_four_screen_mode
    label: "3Screen/4Screen Mode Control (0xB2)"
    kind: action
    command: "AA B2 {id} {len} {on_off} {sound_select} {screen_size} {screens...} {checksum}"
    params:
      - name: on_off
        type: integer
        description: "0x00 Off, 0x01 3Screen On, 0x02 4Screen On"
      - name: sound_select
        type: integer
        description: "0x00 Main, 0x01 Sub1, 0x02 Sub2, 0x03 Sub3"
      - name: screen_size
        type: integer
        description: "0x00 Mode1..0x03 Mode4(960:960), 0x04 Mode5(1440:480), 0x05 Mode6(1280:640)"
      - name: screens
        type: string
        description: "Sub-screen source/picture-size pairs (sources per 0x14; sizes 0x09 Full / 0x20 Original); Type1 len 0x08, Type2 len 0x0A, Type3 len 0x06"

  # --- Sound ---
  - id: sound_select_control_0x47
    label: "Sound Select Control (0x47)"
    kind: action
    command: "AA 47 {id} 01 {s_select} {checksum}"
    params:
      - name: s_select
        type: integer
        description: "0x00=Sub, 0x01=Main; PIP on only"
  - id: sound_select_control_0x65
    label: "Sound Select Control (0x65)"
    kind: action
    command: "AA 65 {id} 01 {s_select} {checksum}"
    params:
      - name: s_select
        type: integer
        description: "0x00=Sub, 0x01=Main; same function as 0x47"
  - id: auto_volume
    label: "Auto Volume (0x48)"
    kind: action
    command: "AA 48 {id} 01 {a_vol} {checksum}"
    params:
      - name: a_vol
        type: integer
        description: "0x00=Off, 0x01=Normal(On), 0x02=Night"
  - id: sound_mode_control
    label: "S.Mode Control (0x72)"
    kind: action
    command: "AA 72 {id} 01 {smode} {checksum}"
    params:
      - name: smode
        type: integer
        description: "0x00 Standard, 0x01 Music, 0x02 Movie, 0x03 Speech, 0x04 Custom, 0x05 Amplify, 0x06 Optimized"
  - id: speaker_select
    label: "Speaker Select (0x68)"
    kind: action
    command: "AA 68 {id} 01 {speaker} {checksum}"
    params:
      - name: speaker
        type: integer
        description: "0x00=Internal, 0x01=External"
  - id: srs_tsxt_control
    label: "SRS TSXT Control (0x78)"
    kind: action
    command: "AA 78 {id} 01 {srs} {checksum}"
    params:
      - name: srs
        type: integer
        description: "0x00=Off, 0x01=On"
  - id: eq_100hz_control
    label: "EQ 100Hz Control (0x51)"
    kind: action
    command: "AA 51 {id} 01 {eq} {checksum}"
    params:
      - name: eq
        type: integer
        description: "0-20 (menu 0 = 0x0A, menu -10 = 0x00)"
  - id: eq_300hz_control
    label: "EQ 300Hz Control (0x52)"
    kind: action
    command: "AA 52 {id} 01 {eq} {checksum}"
    params:
      - name: eq
        type: integer
        description: "0-20 (menu 0 = 0x0A, menu -10 = 0x00)"
  - id: eq_1khz_control
    label: "EQ 1kHz Control (0x53)"
    kind: action
    command: "AA 53 {id} 01 {eq} {checksum}"
    params:
      - name: eq
        type: integer
        description: "0-20 (menu 0 = 0x0A, menu -10 = 0x00)"
  - id: eq_3khz_control
    label: "EQ 3kHz Control (0x54)"
    kind: action
    command: "AA 54 {id} 01 {eq} {checksum}"
    params:
      - name: eq
        type: integer
        description: "0-20 (menu 0 = 0x0A, menu -10 = 0x00)"
  - id: eq_10khz_control
    label: "EQ 10kHz Control (0x55)"
    kind: action
    command: "AA 55 {id} 01 {eq} {checksum}"
    params:
      - name: eq
        type: integer
        description: "0-20 (menu 0 = 0x0A, menu -10 = 0x00)"
  - id: hdmi_sound_control
    label: "Sound Menu - HDMI Sound (0xC9.81)"
    kind: action
    command: "AA C9 {id} 02 81 {hdmi_sound} {checksum}"
    params:
      - name: hdmi_sound
        type: integer
        description: "0x00=HDMI Signal Sound, 0x01=Audio In Sound"
  - id: eq_200hz_control
    label: "Sound Menu - EQ 200Hz (0xC9.82)"
    kind: action
    command: "AA C9 {id} 02 82 {eq} {checksum}"
    params:
      - name: eq
        type: integer
        description: "0-20 (menu -10 = 0x00, 0 = 0x0A, +10 = 0x14)"
  - id: eq_500hz_control
    label: "Sound Menu - EQ 500Hz (0xC9.83)"
    kind: action
    command: "AA C9 {id} 02 83 {eq} {checksum}"
    params:
      - name: eq
        type: integer
        description: "0-20 (menu -10 = 0x00, 0 = 0x0A, +10 = 0x14)"
  - id: eq_2khz_control
    label: "Sound Menu - EQ 2kHz (0xC9.84)"
    kind: action
    command: "AA C9 {id} 02 84 {eq} {checksum}"
    params:
      - name: eq
        type: integer
        description: "0-20 (menu -10 = 0x00, 0 = 0x0A, +10 = 0x14)"
  - id: eq_5khz_control
    label: "Sound Menu - EQ 5kHz (0xC9.85)"
    kind: action
    command: "AA C9 {id} 02 85 {eq} {checksum}"
    params:
      - name: eq
        type: integer
        description: "0-20 (menu -10 = 0x00, 0 = 0x0A, +10 = 0x14)"
  - id: video_conference_sound_mode
    label: "Video Conference Sound Mode Control (0xB3)"
    kind: action
    command: "AA B3 {id} 01 {conf_sound} {checksum}"
    params:
      - name: conf_sound
        type: integer
        description: "0x00=Off, 0x01=On"

  # --- Lamp / backlight / sensors ---
  - id: auto_lamp_control
    label: "Auto Lamp Control (0x57)"
    kind: action
    command: "AA 57 {id} 08 {lmax_h} {lmax_m} {lmax_ap} {lmax_val} {lmin_h} {lmin_m} {lmin_ap} {lmin_val} {checksum}"
    params:
      - name: lmax_h
        type: integer
        description: "Max time hour 1-12"
      - name: lmax_m
        type: integer
        description: "Max time minute 0-59"
      - name: lmax_ap
        type: integer
        description: "AM=1 / PM=0"
      - name: lmax_val
        type: integer
        description: "Max lamp value 0-100"
      - name: lmin_h
        type: integer
        description: "Min time hour 1-12"
      - name: lmin_m
        type: integer
        description: "Min time minute 0-59"
      - name: lmin_ap
        type: integer
        description: "AM=1 / PM=0"
      - name: lmin_val
        type: integer
        description: "Min lamp value 0-100 (0xFF = auto lamp off)"
  - id: manual_lamp_control
    label: "Manual Lamp Control (0x58)"
    kind: action
    command: "AA 58 {id} 01 {lamp_value} {checksum}"
    params:
      - name: lamp_value
        type: integer
        description: "Backlight value 0-100; 0xFF = invalid/off; no effect when dynamic contrast on"
  - id: brightness_sensor
    label: "Brightness Sensor (0x86)"
    kind: action
    command: "AA 86 {id} 01 {br_sensor} {checksum}"
    params:
      - name: br_sensor
        type: integer
        description: "0x00=Off, 0x01=On (Eco Sensor on some models)"
  - id: ambient_brightness_mode
    label: "Ambient Brightness Mode (0xA1)"
    kind: action
    command: "AA A1 {id} 03 {ab_mode} {valid_lamp} {lamp_value} {checksum}"
    params:
      - name: ab_mode
        type: integer
        description: "0x00=Off, 0x01=On"
      - name: valid_lamp
        type: integer
        description: "0x00=don't apply lamp value, 0x01=apply"
      - name: lamp_value
        type: integer
        description: "Lamp value 0-100"
  - id: light_sensor
    label: "Sensor Control - Light Sensor (0x50.00)"
    kind: query
    command: "AA 50 {id} 01 00 {checksum}"
    params: []
    notes: "Returns light sensor lux value (Data H/L)"
  - id: heatex_temperature
    label: "Sensor Control - HeatEx Temperature (0x50.01)"
    kind: query
    command: "AA 50 {id} 01 01 {checksum}"
    params: []
    notes: "Returns heat exchanger temperature -60~125 C"
  - id: led_plate_temperature
    label: "Sensor Control - LED Plate Temperature (0x50.02)"
    kind: query
    command: "AA 50 {id} 01 02 {checksum}"
    params: []
    notes: "Returns LED plate temperature -60~125 C"
  - id: final_duty
    label: "Sensor Control - Final Duty (0x50.03)"
    kind: query
    command: "AA 50 {id} 01 03 {checksum}"
    params: []
    notes: "Returns final duty 0-1023 (16-bit)"
  - id: temperature_control
    label: "Temperature Control (0x85)"
    kind: action
    command: "AA 85 {id} 01 {temperature} {checksum}"
    params:
      - name: temperature
        type: integer
        description: "Auto power-off threshold 75-124 (degrees C)"
  - id: inverse_control
    label: "Inverse Control (0x5A)"
    kind: action
    command: "AA 5A {id} 01 {inverse} {checksum}"
    params:
      - name: inverse
        type: integer
        description: "0x00=Off, 0x01=On (inverter/panel control depending on model)"
  - id: fan_speed_setting
    label: "Fan Speed Setting (0x44)"
    kind: action
    command: "AA 44 {id} 01 {fan_speed} {checksum}"
    params:
      - name: fan_speed
        type: integer
        description: "0-100; setting this switches Fan Control to Manual"
  - id: fan_control
    label: "Fan Control (0x8F)"
    kind: action
    command: "AA 8F {id} 01 {fan} {checksum}"
    params:
      - name: fan
        type: integer
        description: "0x00 Manual, 0x01 Auto, 0x02 Off, 0x03 On"

  # --- Screen burn protection ---
  - id: safety_screen_run
    label: "Safety Screen Run Control (0x59)"
    kind: action
    command: "AA 59 {id} 01 {type} {checksum}"
    params:
      - name: type
        type: integer
        description: "0x00 Off, 0x01 Signal Pattern(PDP), 0x02 All White(PDP), 0x03 Scroll, 0x04 Bar, 0x06 Eraser, 0x07 Pixel, 0x10 Rolling Bar, 0x11 Fading Screen; runs immediately regardless of timer"
  - id: safety_screen_control
    label: "Safety Screen Control (0x5B)"
    kind: action
    command: "AA 5B {id} {len} {type} {timer_data} {checksum}"
    params:
      - name: type
        type: integer
        description: "Repeat: 0x03 Scroll, 0x04 Pixel, 0x05 Bar, 0x06 Eraser, 0x09 All White, 0x0A Pattern, 0x10 Rolling Bar, 0x11 Fading Screen; Interval = same +0x80 (0x83..0x91); 0x00=off"
      - name: timer_data
        type: string
        description: "Repeat mode (len 0x03): T.Period 1-10 hr, T.Time 10-50 sec (0x01=10s..0x05=50s); Interval mode (len 0x07): start h/m/am-pm, end h/m/am-pm"
  - id: pixel_shift_control
    label: "Pixel Shift Control (0x4C)"
    kind: action
    command: "AA 4C {id} 04 {shift} {h_dot} {v_line} {s_time} {checksum}"
    params:
      - name: shift
        type: integer
        description: "0x00=Off, 0x01=On"
      - name: h_dot
        type: integer
        description: "Horizontal dot 0-4"
      - name: v_line
        type: integer
        description: "Vertical line 0-4"
      - name: s_time
        type: integer
        description: "Shift time 1-4"

  # --- Video wall ---
  - id: video_wall_on
    label: "Video Wall On (0x84)"
    kind: action
    command: "AA 84 {id} 01 {v_wall} {checksum}"
    params:
      - name: v_wall
        type: integer
        description: "0x00=Off, 0x01=On; not in MagicNet source"
  - id: video_wall_mode_control
    label: "Video Wall Mode Control (0x5C)"
    kind: action
    command: "AA 5C {id} 01 {wall_mode} {checksum}"
    params:
      - name: wall_mode
        type: integer
        description: "0x00=Natural, 0x01=Full"
  - id: video_wall_user_control
    label: "Video Wall User Control (0x89)"
    kind: action
    command: "AA 89 {id} 02 {wall_div} {wall_sno} {checksum}"
    params:
      - name: wall_div
        type: integer
        description: "Divider code high-nibble/low-nibble = V/H split 1-15 (e.g. 0x11=1x1 .. 0xFF=15x15); 0x00=off"
      - name: wall_sno
        type: integer
        description: "Device number in wall: 1-25 (5x5), 1-100 (10x10), 1-225 (15x15)"
  - id: video_wall_direct_user_control
    label: "Video Wall Direct User Control (0x8B)"
    kind: action
    command: "AA 8B {id} 05 {v_wall_on} {wall_mode} {wall_div} {wall_sno} {input} {checksum}"
    params:
      - name: v_wall_on
        type: integer
        description: "0x00=Off, 0x01=On"
      - name: wall_mode
        type: integer
        description: "0x00=Natural, 0x01=Full"
      - name: wall_div
        type: integer
        description: "See 0x89 Wall_Div table"
      - name: wall_sno
        type: integer
        description: "See 0x89 Wall_Sno ranges"
      - name: input
        type: integer
        description: "Input source code per 0x14 table"
  - id: video_wall_frame_alignment
    label: "Video Wall Feature - Frame Alignment (0x8C.81)"
    kind: action
    command: "AA 8C {id} 02 81 {alignment} {checksum}"
    params:
      - name: alignment
        type: integer
        description: "0x00=Off, 0x01=On, 0x02=Auto"
  - id: display_port_daisy_chain
    label: "Display Port Daisy Chain (0xB1)"
    kind: action
    command: "AA B1 {id} 01 {value} {checksum}"
    params:
      - name: value
        type: integer
        description: "0x00=Clone, 0x01=Expand"

  # --- OSD / menus / keys ---
  - id: osd_on_off
    label: "OSD Off/On (0x70)"
    kind: action
    command: "AA 70 {id} 01 {osd} {checksum}"
    params:
      - name: osd
        type: integer
        description: "0x00=Off, 0x01=On; HKIA option models invert ACK/NAK"
  - id: osd_display_type_on_off
    label: "OSD Display Type On/Off (0xA3)"
    kind: action
    command: "AA A3 {id} 02 {osd_type} {osd_on_off} {checksum}"
    params:
      - name: osd_type
        type: integer
        description: "0x00 Source, 0x01 Not Optimum Mode, 0x02 No Signal, 0x03 MDC, 0x04 Schedule Channel Info"
      - name: osd_on_off
        type: integer
        description: "0x00=Off, 0x01=On"
  - id: clear_menu_control
    label: "Clear Menu Control (0x34)"
    kind: action
    command: "AA 34 {id} 01 00 {checksum}"
    params: []
    notes: "Clear displayed menu; data always 0x00; set only"
  - id: menu_orientation
    label: "OSD Menu - Menu Orientation (0xC8.81)"
    kind: action
    command: "AA C8 {id} 02 81 {orientation} {checksum}"
    params:
      - name: orientation
        type: integer
        description: "0x00 Landscape(0), 0x01 Portrait(270), 0x02 180, 0x03 90"
  - id: source_content_orientation
    label: "OSD Menu - Source Orientation (0xC8.82)"
    kind: action
    command: "AA C8 {id} 02 82 {orientation} {checksum}"
    params:
      - name: orientation
        type: integer
        description: "Orientation mode (values per 0xC8.81: 0/270/180/90)"
  - id: aspect_ratio_rotated
    label: "OSD Menu - Aspect Ratio Rotated (0xC8.83)"
    kind: action
    command: "AA C8 {id} 02 83 {aspect} {checksum}"
    params:
      - name: aspect
        type: integer
        description: "0x00=Full Screen, 0x01=Original (portrait mode)"
  - id: pip_orientation
    label: "OSD Menu - PIP Orientation (0xC8.84)"
    kind: action
    command: "AA C8 {id} 02 84 {orientation} {checksum}"
    params:
      - name: orientation
        type: integer
        description: "PIP orientation (values per 0xC8.81: 0/270/180/90)"
  - id: menu_size
    label: "OSD Menu - Menu Size (0xC8.85)"
    kind: action
    command: "AA C8 {id} 02 85 {menu_size} {checksum}"
    params:
      - name: menu_size
        type: integer
        description: "0x00=Original, 0x01=Medium, 0x02=Small"
  - id: remote_control_mode
    label: "Remote Control Mode (0x36)"
    kind: action
    command: "AA 36 {id} 01 {rmc} {checksum}"
    params:
      - name: rmc
        type: integer
        description: "0x00=Remocon Disable, 0x01=Remocon Enable; works regardless of power state"
  - id: virtual_remote_control
    label: "Virtual Remote Control (0xB0)"
    kind: action
    command: "AA B0 {id} 01 {key_code} {checksum}"
    params:
      - name: key_code
        type: integer
        description: "e.g. 0x01 SOURCE, 0x02 POWER, 0x07 VOLUME_UP, 0x0B VOLUME_DOWN, 0x0F MUTE, 0x10 CH_DOWN, 0x12 CH_UP, 0x1A MENU, 0x1F DISPLAY/INFO, 0x2D EXIT, 0x30 Magicinfo, 0x45 REW, 0x46 STOP, 0x47 PLAY, 0x48 FF, 0x4A PAUSE, 0x4B TOOLS, 0x58 RETURN, 0x60-0x65 CURSOR, 0x68 ENTER, 0x6C RED, 0x77 LOCK, 0x79 CONTENT, 0x98 DISCRET_POWER_OFF, 0x9F 3D; full table in source 2.1.B0"
  - id: key_lock_control
    label: "Key Lock Control (0x5F)"
    kind: action
    command: "AA 5F {id} 01 {button_lock} {checksum}"
    params:
      - name: button_lock
        type: integer
        description: "0x00=Unlock, 0x01=Lock (panel keys); works regardless of power state"
  - id: all_keys_lock
    label: "All Keys Lock (0x77)"
    kind: action
    command: "AA 77 {id} 01 {akl} {checksum}"
    params:
      - name: akl
        type: integer
        description: "0x00=Off, 0x01=On (remote + buttons); works regardless of power state"
  - id: safety_lock
    label: "Safety Lock (0x5D)"
    kind: action
    command: "AA 5D {id} 01 {lock} {checksum}"
    params:
      - name: lock
        type: integer
        description: "0x00=Off, 0x01=On; works regardless of power state"
  - id: display_id_information
    label: "Display ID Information (0xB9)"
    kind: action
    command: "AA B9 {id} 01 {display} {checksum}"
    params:
      - name: display
        type: integer
        description: "0x00=Monitor ID Display Off, 0x01=On; set only"
  - id: edit_name_control
    label: "Edit Name Control (0xAF)"
    kind: action
    command: "AA AF {id} 01 {ename} {checksum}"
    params:
      - name: ename
        type: integer
        description: "Source device type: 0x00 NONE, 0x01 VCR, 0x02 DVD, 0x03 Cable STB, 0x04 Satellite STB, 0x05 PVR STB, 0x06 AV Receiver, 0x07 Game, 0x08 Camcorder, 0x09 PC, 0x0A DVI PC, 0x0B DVI Devices, 0x0C TV, 0x0D IPTV, 0x0E Blu-ray, 0x0F HD DVD, 0x10 DMA, 0x11 DVD Receiver, 0x12 HD STB, 0x13 DVD Combo, 0x14 DHR"

  # --- Timers / clock / holidays ---
  - id: timer1_control
    label: "Timer 1 Control_MFM (0xA4)"
    kind: action
    command: "AA A4 {id} 0F {on_h} {on_m} {on_ap} {on_act} {off_h} {off_m} {off_ap} {off_act} {repeat_on} {weekday_on} {repeat_off} {weekday_off} {volume} {source} {holiday} {checksum}"
    params:
      - name: schedule
        type: string
        description: "On/Off timer (h 1-12, m 0-59, AM=1/PM=0, act 0-1), repeat 0x00 Once..0x05 Manual Weekday, manual weekday bitmask, on-volume 0-100, on-source (0x14 codes; no 0x61), holiday apply 0-3; 0xFF h/m = unset; len 0x0D variant = on-timer only"
  - id: timer2_control
    label: "Timer 2 Control_MFM (0xA5)"
    kind: action
    command: "AA A5 {id} 0F {timer2_data} {checksum}"
    params:
      - name: schedule
        type: string
        description: "Same 15-byte layout as 0xA4 for timer 2"
  - id: timer3_control
    label: "Timer 3 Control_MFM (0xA6)"
    kind: action
    command: "AA A6 {id} 0F {timer3_data} {checksum}"
    params:
      - name: schedule
        type: string
        description: "Same 15-byte layout as 0xA4 for timer 3"
  - id: timer4_control
    label: "Timer4 Control (0xAB)"
    kind: action
    command: "AA AB {id} 0F {timer4_data} {checksum}"
    params:
      - name: schedule
        type: string
        description: "Same 15-byte layout as 0xA4 for timer 4"
  - id: timer5_control
    label: "Timer5 Control (0xAC)"
    kind: action
    command: "AA AC {id} 0F {timer5_data} {checksum}"
    params:
      - name: schedule
        type: string
        description: "Same 15-byte layout as 0xA4 for timer 5"
  - id: timer6_control
    label: "Timer6 Control (0xAD)"
    kind: action
    command: "AA AD {id} 0F {timer6_data} {checksum}"
    params:
      - name: schedule
        type: string
        description: "Same 15-byte layout as 0xA4 for timer 6"
  - id: timer7_control
    label: "Timer7 Control (0xAE)"
    kind: action
    command: "AA AE {id} 0F {timer7_data} {checksum}"
    params:
      - name: schedule
        type: string
        description: "Same 15-byte layout as 0xA4 for timer 7"
  - id: clock_control_mfm
    label: "Clock Control_MFM (0xA7)"
    kind: action
    command: "AA A7 {id} 07 {day} {h_time} {m_time} {month} {year1} {year2} {ap_time} {checksum}"
    params:
      - name: day
        type: integer
        description: "Day 1-31"
      - name: h_time
        type: integer
        description: "Hour 1-12"
      - name: m_time
        type: integer
        description: "Minute 0-59"
      - name: month
        type: integer
        description: "Month 1-12"
      - name: year
        type: integer
        description: "16-bit year, e.g. 2010 = 0x07DA (hi/lo bytes)"
      - name: ap_time
        type: integer
        description: "0x00=PM, 0x01=AM"
  - id: clock_control_mfm_seconds
    label: "Clock Control_MFM with seconds (0xC5)"
    kind: action
    command: "AA C5 {id} 08 {day} {h_time} {m_time} {s_time} {month} {year} {ap_time} {checksum}"
    params:
      - name: day
        type: integer
        description: "Day 1-31"
      - name: h_time
        type: integer
        description: "Hour 1-12"
      - name: m_time
        type: integer
        description: "Minute 0-59"
      - name: s_time
        type: integer
        description: "Second 0-59"
      - name: month
        type: integer
        description: "Month 1-12"
      - name: year
        type: integer
        description: "Year value"
      - name: ap_time
        type: integer
        description: "0x00=PM, 0x01=AM"
  - id: holiday_add_delete
    label: "Holiday Add/Delete Control (0xA8)"
    kind: action
    command: "AA A8 {id} 05 {mgmt} {month1} {day1} {month2} {day2} {checksum}"
    params:
      - name: mgmt
        type: integer
        description: "0x00=Add, 0x01=Delete, 0x02=Delete All (dates must be 0)"
      - name: range
        type: string
        description: "Holiday range Month1/Day1 ~ Month2/Day2"
  - id: holiday_get
    label: "Holiday Get Control (0xA9)"
    kind: query
    command: "AA A9 {id} 00 {checksum}"
    params: []
    notes: "len 0x00 = total holiday count; len 0x01 + Index = per-index schedule"
  - id: dst_control
    label: "DST Control (0xB6)"
    kind: action
    command: "AA B6 {id} 0C {dst_data} {checksum}"
    params:
      - name: dst_data
        type: string
        description: "12 bytes: On/Off (tunerless 0x02=On; tuner 0x01 Auto / 0x02 Manual), start/end month (0x00-0x0B), week order (0x00 1st..0x04 Last), weekday (0x00 Mon..0x06 Sun), start/end time h (0-23) m (0-59), offset 0x00=+1:00 0x01=+2:00"
  - id: weekly_restart
    label: "System Config - Weekly Restart (0x1B.A2)"
    kind: action
    command: "AA 1B {id} 04 A2 {weekday_bitmask} {time} {min} {checksum}"
    params:
      - name: weekday_bitmask
        type: integer
        description: "Mon-Sun bits: 0=no restart, 1=restart"
      - name: time
        type: integer
        description: "Restart hour 0-23 (0xFF invalid)"
      - name: min
        type: integer
        description: "Restart minute 0-59 (0xFF invalid)"

  # --- Network / system ---
  - id: network_configuration
    label: "System Config - Network Configuration (0x1B.82)"
    kind: action
    command: "AA 1B {id} 11 82 {ip4} {mask4} {gw4} {dns4} {checksum}"
    params:
      - name: network
        type: string
        description: "16 bytes: IP, subnet mask, gateway, DNS server (4 bytes each, MSB first)"
  - id: network_ip_mode
    label: "System Config - Network IP Mode (0x1B.85)"
    kind: action
    command: "AA 1B {id} 02 85 {ip_mode} {checksum}"
    params:
      - name: ip_mode
        type: integer
        description: "0x00=Dynamic, 0x01=Static"
  - id: network_access_point_configuration
    label: "System Config - Network Access Point Configuration (0x1B.8A)"
    kind: action
    command: "AA 1B {id} {len} 8A {code} {data} {checksum}"
    params:
      - name: entries
        type: string
        description: "Code 0x00=SSID, 0x01=Password; each = size byte + string; set only (get not supported)"
  - id: check_software_version
    label: "System Config - Check Software Version (0x1B.A4)"
    kind: query
    command: "AA 1B {id} 01 A4 {checksum}"
    params: []
    notes: "Returns per-HW-module SW versions (Cabinet Main/FPGA FW, calibration data, SBOX FW, peripherals)"
  - id: magicinfo_channel
    label: "MagicInfo - Channel Control (0x1C.81)"
    kind: action
    command: "AA 1C {id} 03 81 {ch_hi} {ch_lo} {checksum}"
    params:
      - name: channel
        type: integer
        description: "MagicInfo S Player channel number (16-bit); set only"
  - id: magicinfo_server_settings
    label: "MagicInfo - Server Settings (0x1C.82)"
    kind: action
    command: "AA 1C {id} {len} 82 {url_string} {checksum}"
    params:
      - name: url
        type: string
        description: "Server URL string e.g. http://10.88.8.73:7001; max 252 bytes"
  - id: magicinfo_content_orientation
    label: "MagicInfo - Content Orientation (0x1C.83)"
    kind: action
    command: "AA 1C {id} 02 83 {orientation} {checksum}"
    params:
      - name: orientation
        type: integer
        description: "MagicInfo S Player content orientation mode"
  - id: mdc_connection_type
    label: "MDC Connection Type (0x1D)"
    kind: action
    command: "AA 1D {id} 01 {connection} {checksum}"
    params:
      - name: connection
        type: integer
        description: "0x00=RS232C MDC, 0x01=RJ45 MDC; when RJ45 set, serial MDC stops working"
  - id: still_control
    label: "Still Control (0x1F)"
    kind: action
    command: "AA 1F {id} 01 {still} {checksum}"
    params:
      - name: still
        type: integer
        description: "0x00=Off, 0x01=On; external input sources only"
  - id: ticker_control
    label: "Ticker (0x63)"
    kind: action
    command: "AA 63 {id} {len} {on_off} {start_h} {start_m} {start_ap} {end_h} {end_m} {end_ap} {pos_h} {pos_v} {motion_on} {motion_dir} {motion_speed} {font_size} {fg_color} {bg_color} {fg_opacity} {bg_opacity} {message} {checksum}"
    params:
      - name: ticker
        type: string
        description: "Ticker On/Off 0-1; times 1-12 h / 0-59 m / AM=1 PM=0; pos H 0 Center 1 Left 2 Right, pos V 0 Middle 1 Top 2 Bottom; motion dir 0 L 1 R 2 U 3 D; speed 0 Normal 1 Slow 2 Fast; font 0 Standard 1 Small 2 Large; colors 0-7 (Black/White/Red/Green/Blue/Yellow/Magenta/Cyan); fg opacity 0x03 Flashing 0x04 Flash All 0x05 Off, bg opacity 0 Solid 1 Transparent 2 Translucent; message hex bytes up to 232"
  - id: device_name
    label: "Device Name (0x67)"
    kind: action
    command: "AA 67 {id} {len} {device_name} {checksum}"
    params:
      - name: device_name
        type: string
        description: "Device name shown on MagicInfo server; max 15 chars"
  - id: direct_channel_control
    label: "Direct Channel Control DTV (0x17)"
    kind: action
    command: "AA 17 {id} 08 {country} {atv_dtv} {air_cable} {ch_hi} {ch_lo} {sel_minor} {minor_hi} {minor_lo} {checksum}"
    params:
      - name: country
        type: integer
        description: "0=Korea, 1=USA, ..."
      - name: atv_dtv
        type: integer
        description: "0=Analog TV, 1=Digital TV"
      - name: air_cable
        type: integer
        description: "0=general(air), 1=cable"
      - name: ch_num
        type: integer
        description: "ATV 1-135, DTV 0-999"
      - name: minor
        type: string
        description: "Sel_Minor 0/1 + Minor_CH 0-999 (DTV only)"
    notes: "Only works with models that include TV"
  - id: channel_up_down
    label: "Channel Up/Down (0x61)"
    kind: action
    command: "AA 61 {id} 01 {direction} {checksum}"
    params:
      - name: direction
        type: integer
        description: "0x00=Up, 0x01=Down; TV models only"
  - id: auto_id_setting
    label: "Auto ID (0xFD)"
    kind: action
    command: "AA FD {id} {len} {data} {checksum}"
    params:
      - name: data
        type: string
        description: "Auto ID setting multi-param data (MDC ID range extended 0-253)"
  - id: auto_id_setting_status
    label: "Auto ID Setting Status Control (0xB8)"
    kind: action
    command: "AA B8 {id} 01 {status} {checksum}"
    params:
      - name: status
        type: integer
        description: "0x00=Auto ID Setting START, 0x01=END"
  - id: apply_to_control
    label: "Apply To Control (0xE4)"
    kind: action
    command: "AA E4 {id} 01 {apply_to} {checksum}"
    params:
      - name: apply_to
        type: integer
        description: "0/1 apply target selection"

  # --- Eco / system menu (0xCA) ---
  - id: sbox_mode
    label: "System Menu - SBOX Mode (0xCA.60)"
    kind: query
    command: "AA CA {id} 01 60 {checksum}"
    params: []
    notes: "Returns 0x00=Indoor, 0x01=Outdoor; set not supported"
  - id: dimming_mode
    label: "System Menu - Dimming Mode (0xCA.61)"
    kind: action
    command: "AA CA {id} 02 61 {mode} {checksum}"
    params:
      - name: mode
        type: integer
        description: "0x00 Auto, 0x01 Light Sensor, 0x02 Sun Rise/Sun Set, 0x03 Off"
  - id: night_time_constant_brightness
    label: "System Menu - Night Time Constant Brightness (0xCA.62)"
    kind: action
    command: "AA CA {id} 02 62 {mode} {checksum}"
    params:
      - name: mode
        type: integer
        description: "Constant brightness on/off (0/1)"
  - id: brightness_change_period
    label: "System Menu - Brightness Change Period (0xCA.63)"
    kind: action
    command: "AA CA {id} 02 63 {period} {checksum}"
    params:
      - name: period
        type: integer
        description: "10-70 minutes; location dimming mode only"
  - id: light_sensor_effective_range
    label: "System Menu - Light Sensor Effective Range (0xCA.64)"
    kind: action
    command: "AA CA {id} {len} 64 {data_type} {data} {checksum}"
    params:
      - name: data_type
        type: integer
        description: "0x00=Minimum, 0x01=Maximum effective range"
      - name: data
        type: integer
        description: "Lux value"
  - id: brightness_output_range
    label: "System Menu - Brightness Output Range & Default (0xCA.65)"
    kind: action
    command: "AA CA {id} {len} 65 {data_type} {data} {checksum}"
    params:
      - name: data_type
        type: integer
        description: "0x00=Min output, 0x01=Max output, 0x02=Default output"
      - name: data
        type: integer
        description: "Percent value"
  - id: latitude_longitude_info
    label: "System Menu - Latitude/Longitude Info (0xCA.66)"
    kind: action
    command: "AA CA {id} {len} 66 {data_type} {len_byte} {string_data} {checksum}"
    params:
      - name: data_type
        type: integer
        description: "0x00=Latitude, 0x01=Longitude"
      - name: string_data
        type: string
        description: "String data with length byte"
  - id: cec_on_off
    label: "System Menu - CEC On/Off (0xCA.70)"
    kind: action
    command: "AA CA {id} 02 70 {cec} {checksum}"
    params:
      - name: cec
        type: integer
        description: "0x00=Off, 0x01=On"
  - id: multi_device_grouping
    label: "System Menu - Multi Device Grouping (0xCA.71)"
    kind: action
    command: "AA CA {id} 03 71 {group_mode} {role} {checksum}"
    params:
      - name: group_mode
        type: integer
        description: "0x00=Off, 0x01-0x0N=Group 1..N"
      - name: role
        type: integer
        description: "0x00=Sub, 0x01=Main"
  - id: auto_source_switch_on_off
    label: "System Menu - Auto Source Switch On/Off (0xCA.81)"
    kind: action
    command: "AA CA {id} 02 81 {auto_switch} {checksum}"
    params:
      - name: auto_switch
        type: integer
        description: "0x00=Off, 0x01=On (Preset Input)"
  - id: auto_source_switch_control
    label: "System Menu - Auto Source Switch Control (0xCA.82)"
    kind: action
    command: "AA CA {id} 04 82 {recovery} {primary} {secondary} {checksum}"
    params:
      - name: recovery
        type: integer
        description: "Primary source recovery 0x00=Off, 0x01=On"
      - name: primary
        type: integer
        description: "Primary source (0x14 codes; 0x00=All)"
      - name: secondary
        type: integer
        description: "Secondary source (0x14 codes)"
  - id: power_on_delay
    label: "System Menu - Power On Delay (0xCA.83)"
    kind: action
    command: "AA CA {id} 02 83 {delay} {checksum}"
    params:
      - name: delay
        type: integer
        description: "Power-on delay in seconds (range per device menu)"
  - id: synced_power_on
    label: "System Menu - Synced Power On (0xCA.84)"
    kind: action
    command: "AA CA {id} 02 84 {synced} {checksum}"
    params:
      - name: synced
        type: integer
        description: "0x00=Off, 0x01=On (PC module powers on with display)"
  - id: synced_power_off
    label: "System Menu - Synced Power Off (0xCA.85)"
    kind: action
    command: "AA CA {id} 02 85 {synced} {checksum}"
    params:
      - name: synced
        type: integer
        description: "0x00=Off, 0x01=On (PC module powers off with display)"
  - id: power_button_mode
    label: "System Menu - Power Button (0xCA.91)"
    kind: action
    command: "AA CA {id} 02 91 {mode} {checksum}"
    params:
      - name: mode
        type: integer
        description: "0x00=Power On Only, 0x01=Power On/Off"
  - id: touch_control_admin_lock
    label: "System Menu - Touch Control Admin Lock (0xCA.92)"
    kind: action
    command: "AA CA {id} 02 92 {admin_lock} {checksum}"
    params:
      - name: admin_lock
        type: integer
        description: "Admin menu lock 0/1"
  - id: dicom_mode
    label: "System Menu - DICOM Mode (0xCA.93)"
    kind: action
    command: "AA CA {id} 02 93 {dicom} {checksum}"
    params:
      - name: dicom
        type: integer
        description: "DICOM mode on/off (0/1)"
  - id: no_signal_power_off
    label: "System Menu - No Signal Power Off (0xCA.A1)"
    kind: action
    command: "AA CA {id} 02 A1 {mode} {checksum}"
    params:
      - name: mode
        type: integer
        description: "0x00 Off, 0x01 15min, 0x02 30min, 0x03 60min, 0x04 10min"
  - id: eco_sensor_minimal_backlight
    label: "System Menu - Eco Sensor Minimal Backlight (0xCA.B0)"
    kind: action
    command: "AA CA {id} 02 B0 {minimal_backlight} {checksum}"
    params:
      - name: minimal_backlight
        type: integer
        description: "Minimum backlight limit for eco sensor control"

  # --- Eco solution (0xC6) / launcher (0xC7) ---
  - id: auto_power_off
    label: "Eco Solution - Auto Power Off (0xC6.81)"
    kind: action
    command: "AA C6 {id} 02 81 {mode} {checksum}"
    params:
      - name: mode
        type: integer
        description: "0x00 Off, 0x01 4 Hour(On), 0x02 6 Hour, 0x03 8 Hour, 0x04 16 Hour (On/Off-only models: 0=Off 1=On)"
  - id: brightness_limit
    label: "Eco Solution - Brightness Limit (0xC6.82)"
    kind: action
    command: "AA C6 {id} 02 82 {limit} {checksum}"
    params:
      - name: limit
        type: integer
        description: "Brightness limit value"
  - id: launcher_mode
    label: "Execute Launcher - Play Via Mode (0xC7.81)"
    kind: action
    command: "AA C7 {id} 02 81 {mode} {checksum}"
    params:
      - name: mode
        type: integer
        description: "0x00 MagicInfo, 0x01 URL Launcher, 0x02 MagicIWB"
  - id: launcher_url_address
    label: "Execute Launcher - URL Address (0xC7.82)"
    kind: action
    command: "AA C7 {id} {len} 82 {url_string} {checksum}"
    params:
      - name: url
        type: string
        description: "URL launcher address; ASCII, up to 200 characters"

  # --- Outdoor (0x1A) ---
  - id: outdoor_mode
    label: "Outdoor Mode (0x1A.81)"
    kind: action
    command: "AA 1A {id} 02 81 {outdoor} {checksum}"
    params:
      - name: outdoor
        type: integer
        description: "0x00=Off, 0x01=On; keeps backlight on under power-off to protect device"
  - id: internal_heatex_fan_speed
    label: "Internal HeatEx Fan Speed Control (0x1A.82)"
    kind: action
    command: "AA 1A {id} 02 82 {fan_speed} {checksum}"
    params:
      - name: fan_speed
        type: integer
        description: "0-100"

  # --- LED product feature (0xD0) ---
  - id: led_information
    label: "LED Product - Get LED Info (0xD0.78)"
    kind: query
    command: "AA D0 {id} 01 78 {checksum}"
    params: []
    notes: "Returns gamut, backlight, CC on/off, seam correction, dynamic peaking, SW versions"
  - id: led_device_type
    label: "LED Product - Device Type (0xD0.81)"
    kind: query
    command: "AA D0 {id} 01 81 {checksum}"
    params: []
    notes: "Returns 0x01 SendBox, 0x02-0x06 Cabinet IS/IFH/IFJ/IWJ/IWR/IER, 0x07 WALL 2.0"
  - id: led_input_source_info
    label: "LED Product - Input Source Info (0xD0.82)"
    kind: query
    command: "AA D0 {id} 01 82 {checksum}"
    params: []
    notes: "Returns source list, connection status bitmaps, current source, resolution W/H"
  - id: led_product_info
    label: "LED Product - Product Info (0xD0.83)"
    kind: query
    command: "AA D0 {id} 01 83 {checksum}"
    params: []
    notes: "Returns pitch, resolution, phy size, aspect ratio, modules"
  - id: led_monitoring
    label: "LED Product - Monitoring (0xD0.84)"
    kind: query
    command: "AA D0 {id} 01 84 {checksum}"
    params: []
    notes: "Returns power&IC, HDBT status, temperature, illuminance, per-module LED error data"
  - id: led_abl_mode
    label: "LED Product - ABL Mode (0xD0.85)"
    kind: action
    command: "AA D0 {id} 02 85 {abl} {checksum}"
    params:
      - name: abl
        type: integer
        description: "ABL mode value"
  - id: led_scanning_rate_mode
    label: "LED Product - Scanning Rate mode (0xD0.86)"
    kind: action
    command: "AA D0 {id} 02 86 {mode} {checksum}"
    params:
      - name: mode
        type: integer
        description: "XOR output activation / scanning rate 0/1; set only"
  - id: led_lod_recheck
    label: "LED Product - LOD ReCheck (0xD0.87)"
    kind: action
    command: "AA D0 {id} 02 87 00 {checksum}"
    params: []
    notes: "Trigger LOD re-check; data 0x00"
  - id: led_module_wb_control
    label: "LED Product - Module WB(RGB) Control (0xD0.92)"
    kind: action
    command: "AA D0 {id} 02 92 {value} {checksum}"
    params:
      - name: value
        type: integer
        description: "Module white balance RGB control 0/1"
  - id: led_cabinet_wb_control_93
    label: "LED Product - Cabinet WB(RGB) Control (0xD0.93)"
    kind: action
    command: "AA D0 {id} {len} 93 {wb_data} {checksum}"
    params:
      - name: wb_data
        type: string
        description: "Cabinet white balance multi-param data"
  - id: led_cabinet_backlight
    label: "LED Product - Cabinet Backlight (0xD0.94)"
    kind: action
    command: "AA D0 {id} {len} 94 {backlight} {checksum}"
    params:
      - name: backlight
        type: integer
        description: "Cabinet backlight value"
  - id: led_cabinet_pixel_wb_cc
    label: "LED Product - Cabinet Pixel WB(RGB) CC on/off (0xD0.95)"
    kind: action
    command: "AA D0 {id} 02 95 {cc} {checksum}"
    params:
      - name: cc
        type: integer
        description: "0/1"
  - id: led_gamut_control
    label: "LED Product - Gamut Control (0xD0.96)"
    kind: action
    command: "AA D0 {id} {len} 96 {gamut} {checksum}"
    params:
      - name: gamut
        type: integer
        description: "Gamut option value"
  - id: led_cabinet_seam_correction
    label: "LED Product - Cabinet Seam Correction (0xD0.97)"
    kind: action
    command: "AA D0 {id} {len} 97 {correction} {checksum}"
    params:
      - name: correction
        type: integer
        description: "Seam correction value"
  - id: led_cabinet_seam_correction_on_off
    label: "LED Product - Cabinet Seam Correction on/off (0xD0.98)"
    kind: action
    command: "AA D0 {id} 02 98 {on_off} {checksum}"
    params:
      - name: on_off
        type: integer
        description: "0/1"
  - id: led_module_wb_on_off
    label: "LED Product - Module WB(RGB) on/off (0xD0.99)"
    kind: action
    command: "AA D0 {id} 02 99 {on_off} {checksum}"
    params:
      - name: on_off
        type: integer
        description: "0/1"
  - id: led_data_reload
    label: "LED Product - Pixel RGB Data Reload (0xD0.9A)"
    kind: action
    command: "AA D0 {id} 02 9A {type} {checksum}"
    params:
      - name: type
        type: integer
        description: "Reload type (0x04 = RM data per v15.0)"
  - id: led_block_wb_control
    label: "LED Product - Block WB (RGB) Control (0xD0.9B)"
    kind: action
    command: "AA D0 {id} {len} 9B {wb_data} {checksum}"
    params:
      - name: wb_data
        type: string
        description: "Block white balance multi-param data"
  - id: led_cabinet_wb_control_9c
    label: "LED Product - Cabinet WB (RGB) Control (0xD0.9C)"
    kind: action
    command: "AA D0 {id} {len} 9C {wb_data} {checksum}"
    params:
      - name: wb_data
        type: string
        description: "Cabinet white balance multi-param data"
  - id: led_block_wb_on_off
    label: "LED Product - Block WB(RGB) on/off (0xD0.9D)"
    kind: action
    command: "AA D0 {id} 02 9D {on_off} {checksum}"
    params:
      - name: on_off
        type: integer
        description: "0/1"
  - id: led_cabinet_wb_on_off
    label: "LED Product - Cabinet WB(RGB) on/off (0xD0.9E)"
    kind: action
    command: "AA D0 {id} 02 9E {on_off} {checksum}"
    params:
      - name: on_off
        type: integer
        description: "0/1"
  - id: led_multiple_edge_offset
    label: "LED Product - Multiple Edge Offset Control (0xD0.9F)"
    kind: action
    command: "AA D0 {id} {len} 9F {offset_data} {checksum}"
    params:
      - name: offset_data
        type: string
        description: "Multi-param edge offset data"
  - id: led_block_gradation_control
    label: "LED Product - Block Gradation Control (0xD0.A2)"
    kind: action
    command: "AA D0 {id} {len} A2 {gradation} {checksum}"
    params:
      - name: gradation
        type: string
        description: "Block gradation multi-param data"
  - id: led_block_gradation_on_off
    label: "LED Product - Block Gradation On/Off (0xD0.A3)"
    kind: action
    command: "AA D0 {id} {len} A3 {on_off} {checksum}"
    params:
      - name: on_off
        type: string
        description: "Block gradation on/off multi-param data"
  - id: led_get_diagnosis_info
    label: "LED Product - Get Diagnosis Info (0xD0.C2)"
    kind: query
    command: "AA D0 {id} {len} C2 {checksum}"
    params: []
    notes: "Returns diagnosis information"
  - id: led_auto_id
    label: "LED Product - Auto ID (0xD0.C3)"
    kind: action
    command: "AA D0 {id} {len} C3 {data} {checksum}"
    params:
      - name: data
        type: string
        description: "Auto ID multi-param data"
  - id: file_download_install
    label: "Large Sized Data - File Download & Install (0xD2.20)"
    kind: action
    command: "AA D2 {id} {len} 20 {data} {checksum}"
    params:
      - name: data
        type: string
        description: "File download & install multi-param data"
```

## Feedbacks
```yaml
feedbacks:
  - id: ack_nak
    type: enum
    values: [ack, nak]
    description: "All commands answered with AA FF {id} {len} 'A' {r-cmd} ... (ACK) or AA FF {id} 03 'N' {r-cmd} ERR {checksum} (NAK); ERR codes are internal, vary by command and model; broadcast ID 0xFE gets no reply"
  - id: power_state
    type: enum
    values: [off, on, reboot]
    description: "From 0x11 ack / 0x00 status: 0x00=Off, 0x01=On, 0x02=Reboot"
  - id: volume
    type: integer
    description: "0-100, from 0x00 Status / 0x12 ack; 0xFF on no-audio models"
  - id: mute_state
    type: enum
    values: [off, on]
    description: "From 0x00 status / 0x13 ack; 0xFF on no-audio models"
  - id: input_source
    type: enum
    values: [s_video, component, av1, av2, ext_scart1, pc, dvi, bnc, dvi_video, magicinfo, hdmi1, hdmi1_pc, hdmi2, hdmi2_pc, displayport1, displayport2, displayport3, hdmi3, hdmi3_pc, hdmi4, hdmi4_pc, tv_dtv, plug_in_module, hdbaset, ocm, media, widi, internal_usb, url_launcher, iwb, web_browser, remote_workspace]
    description: "Current input source code (0x14 table) from 0x00 status / 0x14 ack"
  - id: picture_size
    type: enum
    description: "Aspect ratio code from 0x00 status / 0x15 ack (see 0x15 PC/Video mode tables)"
  - id: current_temperature
    type: integer
    description: "Device temperature -60~125 C from 0x0D Display Status; 0xFF = read fail"
  - id: fan_error
    type: enum
    values: [normal, error, not_supported]
    description: "From 0x0D Display Status FAN Error field"
  - id: lamp_error
    type: enum
    values: [normal, error]
    description: "From 0x0D Display Status"
```

## Variables
```yaml
# All settable parameters are represented as Actions above (MDC get/set share one opcode);
# no separate variable set is defined by the source.
# UNRESOLVED: source defines no standalone variable abstraction
variables: []
```

## Events
```yaml
# Source documents no unsolicited notifications; device only replies to polls (ACK/NAK).
# UNRESOLVED: no events documented in source
events: []
```

## Macros
```yaml
# Source documents no multi-step sequences (power-on retry pattern documented in Notes only).
# UNRESOLVED: no macros documented in source
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no operator safety warnings or interlock procedures.
# Screen burn protection (0x59/0x5B) and thermal auto power-off (0x85) are device features, not control-system interlocks.
```

## Notes
- Frame format (both RS-232 and TCP): `AA <cmd> <id> <data_len> <data...> <checksum>`. Checksum = sum of all bytes after 0xAA header, discarding carry beyond one byte (source example: 11+FE+01+01 = 0x111 -> 0x11). All communication is hexadecimal.
- Display IDs: 0-253, unique on RS-232 daisy chain; order of assignment is free. ID 0xFE = broadcast: all sets execute but none ACK. On RJ45, each display needs an IP address and protocol ID must equal display ID; IP IDs may duplicate across sets.
- RS-232: DB-9, only pins 2 (RxD), 3 (TxD), 5 (GND) used; inter-device distance limited to under 4 m; daisy-chain via RS-232 Out.
- RJ45: MDC protocol carried in TCP/IP data area, same frame as RS-232. Default IP 192.168.0.10, port 1515. Mixed RJ45+RS-232C topology supported (first display on Ethernet, rest daisy-chained).
- RJ45 power control: after RJ45 power-on you must reconnect the socket after 10 sec. When monitor is power-off and connected by RJ45, WOL protocol must be used instead of MDC for power-on (Network Standby: Off condition on DMD/DBD/DHD/UED/DMD-S, and always on other models). Power on/off commands must be retried 3 times every 2 seconds until ACK; no ACK within 3 tries = failure.
- Not-supported fields return 0xFF (get); set data on unsupported fields is ignored. NAK error codes are internal and vary by command and model.
- Support per command/option varies by model: "Depends on each model spec, a certain command will be supported or not."
- Some commands force an automatic device reboot on value change: 0x21.07 HDMI UHD Color, 0x21.08 FHD/UHD out, 0x21.09 Live Mode, 0x21.0A Dynamic Range Extension, 0x21.53 Uniformity.
- When MDC Connection Type (0x1D) is set to RJ45, serial MDC stops working.
- Hong Kong airport (HKIA) option models: OSD On/Off (0x70) ACK/NAK semantics inverted; see source Annex A.
<!-- UNRESOLVED: which subset of the common MDC command table the 460MX-3 firmware supports is not stated; verify against device. -->
<!-- UNRESOLVED: white balance gain/offset ranges, Uniformity (0x21.53) enum, ABL mode values, and several 0xD0 LED-product enums are not enumerated in the source. -->

## Provenance

```yaml
source_domains:
  - github.com
source_urls:
  - https://github.com/vgavro/samsung-mdc/raw/master/MDC-Protocol.pdf
retrieved_at: 2026-08-26T18:33:20.307Z
last_checked_at: 2026-08-26T22:17:32.238Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-26T22:17:32.238Z
matched_actions: 224
action_count: 224
confidence: medium
summary: "All 224 spec action units map1:1 to source command-table tokens; transport ok; only 0x4B uncovered. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "0x4B Video Picture Position & Size"
- "the source is Samsung's common MDC protocol document, not a 460MX-3-specific manual; exact subset of commands supported by the 460MX-3 is not stated. Model code table does not list 460MX-3 explicitly (closest: 0x29 SyncMaster 460MX(n)-2)."
- "firmware version compatibility not stated in source"
- "source defines no standalone variable abstraction"
- "no events documented in source"
- "no macros documented in source"
- "source contains no operator safety warnings or interlock procedures."
- "which subset of the common MDC command table the 460MX-3 firmware supports is not stated; verify against device."
- "white balance gain/offset ranges, Uniformity (0x21.53) enum, ABL mode values, and several 0xD0 LED-product enums are not enumerated in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
