---
spec_id: admin/christie-uhd-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie UHD Series Control Spec"
manufacturer: Christie
model_family: "Christie UHD Series"
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - "Christie UHD Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-001853-02-Christie-LIT-TECH-REF-UHD-Panels2-RS232.pdf
retrieved_at: 2026-09-02T21:18:25.327Z
last_checked_at: 2026-09-03T22:23:58.998Z
generated_at: 2026-09-03T22:23:58.998Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - NET+GATE
  - NET+RSET
  - "source document references \"E Series\"; compatibility with UHD Series not confirmed in this document."
  - "device name in input is \"Christie UHD Series\" but source doc is titled \"E Series Serial Commands Technical Reference Information\". Spec generated from protocol commands present in source; UHD-Series-specific applicability not stated."
  - "command-line protocol is parameterised via inline argument values rather than discrete variables"
  - "source does not describe unsolicited notifications distinct from query replies"
  - "source does not define multi-step macro sequences"
  - "source mentions default PIN \"12345\" for projector; no other safety interlocks stated"
  - "TCP/IP port number for Ethernet control not stated in source (source describes RS-232 only with explicit parameters; Ethernet mentioned as transport but no port given)."
verification:
  verdict: verified
  checked_at: 2026-09-03T22:23:58.998Z
  matched_actions: 154
  action_count: 154
  confidence: medium
  summary: "All 154 spec actions match the source verbatim with correct parameters, polarity, and shape; transport matches; only NET+GATE/NET+RSET are subcodes without usage examples. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# Christie UHD Series Control Spec

## Summary
ASCII serial command protocol for controlling Christie projectors over RS-232 and Ethernet. Covers image, geometry, lamp, input routing, configuration, lens, and service commands using a 3-letter code (+ optional 4-letter subcode) framed in parentheses. <!-- UNRESOLVED: source document references "E Series"; compatibility with UHD Series not confirmed in this document. -->

<!-- UNRESOLVED: device name in input is "Christie UHD Series" but source doc is titled "E Series Serial Commands Technical Reference Information". Spec generated from protocol commands present in source; UHD-Series-specific applicability not stated. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no login procedure for normal commands in source (service-mode login via UID is for service functions only)
```

## Traits
```yaml
- powerable       # inferred from PWR power on/off command examples
- routable        # inferred from SIN input/source change command examples
- queryable       # inferred from SST?, LIF+LP1H?, PIF+MDLN? query examples
- levelable       # inferred from BRT/CON/CLR/TNT level-setting command examples
```

## Actions
```yaml
- id: size_preset
  label: Size Preset
  kind: action
  command: "(SZP{value})"
  params:
    - name: value
      type: integer
      description: "0=Auto, 1=Native, 2=4:3, 3=LetterBox, 4=Full Size, 5=Full Width, 6=Full Height"

- id: overscan
  label: Overscan
  kind: action
  command: "(OVS{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Zoom, 2=Crop"

- id: pixel_phase
  label: Pixel Phase
  kind: action
  command: "(PXP{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: pixel_track
  label: Pixel Track
  kind: action
  command: "(PXT{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: horz_position
  label: Horizontal Position
  kind: action
  command: "(HOR{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: vert_position
  label: Vertical Position
  kind: action
  command: "(VRT{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: horz_keystone
  label: Horizontal Keystone
  kind: action
  command: "(WRP+HKST{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: vert_keystone
  label: Vertical Keystone
  kind: action
  command: "(WRP+VKST{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: horz_pincushion
  label: Horizontal Pincushion
  kind: action
  command: "(HPC{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: vert_pincushion
  label: Vertical Pincushion
  kind: action
  command: "(VPC{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: digital_zoom
  label: Digital Zoom
  kind: action
  command: "(SIZ{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 100 (unchanged)"

- id: digital_horz_shift
  label: Digital Horizontal Shift
  kind: action
  command: "(DSH{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: digital_vert_shift
  label: Digital Vertical Shift
  kind: action
  command: "(DSV{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: auto_image
  label: Auto Image
  kind: action
  command: "(AIM1)"
  params: []

- id: brightness
  label: Brightness
  kind: action
  command: "(BRT{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: contrast
  label: Contrast
  kind: action
  command: "(CON{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: color_space
  label: Color Space
  kind: action
  command: "(CSP{value})"
  params:
    - name: value
      type: integer
      description: "0=RGB, 1=REC709, 2=REC601, 3=RGB Video, 4=Auto"

- id: detail
  label: Detail (Sharpness)
  kind: action
  command: "(DTL{value})"
  params:
    - name: value
      type: integer
      description: "0=Maximum, 1=High, 2=Normal, 3=Low, 4=Minimum"

- id: color
  label: Color
  kind: action
  command: "(CLR{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: tint
  label: Tint
  kind: action
  command: "(TNT{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: noise_reduction
  label: Noise Reduction
  kind: action
  command: "(NRD{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 0"

- id: flesh_tone_correction
  label: Flesh Tone Correction
  kind: action
  command: "(FTC{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 0"

- id: video_black_level
  label: Video Black Level (IRE)
  kind: action
  command: "(VBL{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: detect_film
  label: Detect Film
  kind: action
  command: "(FMD{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: closed_captions
  label: Closed Captions
  kind: action
  command: "(CLC{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=CC1, 2=CC2"

- id: red_gain
  label: Red Gain
  kind: action
  command: "(ROG{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: green_gain
  label: Green Gain
  kind: action
  command: "(GOG{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: blue_gain
  label: Blue Gain
  kind: action
  command: "(BOG{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: red_offset
  label: Red Offset
  kind: action
  command: "(ROO{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: green_offset
  label: Green Offset
  kind: action
  command: "(GOO{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: blue_offset
  label: Blue Offset
  kind: action
  command: "(BOO{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: sync_threshold
  label: Sync Threshold
  kind: action
  command: "(SYT{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: rgb_gain_offset_reset
  label: Reset RGB Gain/Offset
  kind: action
  command: "(GOR1)"
  params: []

- id: picture_setting
  label: Picture Setting
  kind: action
  command: "(PST{value})"
  params:
    - name: value
      type: integer
      description: "0=Presentation, 1=Video, 2=Bright, 3=Whiteboard, 4=Blackboard, 5=Beige Wall, 6=User"

- id: picture_setting_store_user
  label: Store Current Settings to User Mode
  kind: action
  command: "(PST+USER1)"
  params: []

- id: dynamic_black
  label: DynamicBlack
  kind: action
  command: "(DIM{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: gamma_curve
  label: Gamma Curve
  kind: action
  command: "(BGC{value})"
  params:
    - name: value
      type: integer
      description: "0=Video, 1=Film, 2=Bright, 3=CRT"

- id: brilliant_color
  label: BrilliantColor
  kind: action
  command: "(BCL{value})"
  params:
    - name: value
      type: integer
      description: "0=Normal Look, 1=Bright Look"

- id: white_peaking
  label: White Peaking
  kind: action
  command: "(WPK{value})"
  params:
    - name: value
      type: integer
      description: "Adjusts white processing through data path"

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "(CCI{value})"
  params:
    - name: value
      type: integer
      description: "0=Warmest, 1=Warm, 2=Cool, 3=Bright"

- id: edge_enhancement
  label: Edge Enhancement
  kind: action
  command: "(EDG{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Normal, 2=Maximum"

- id: color_wheel_speed
  label: Color Wheel Speed
  kind: action
  command: "(CWS{value})"
  params:
    - name: value
      type: integer
      description: "0=2x, 1=3x"

- id: language
  label: OSD Language
  kind: action
  command: "(LOC+LANG{value})"
  params:
    - name: value
      type: integer
      description: "0=English, 1=Chinese, 2=French, 3=German, 4=Italian, 5=Japanese, 6=Korean, 7=Russian, 8=Spanish"

- id: focus_increment
  label: Focus Increase by 1
  kind: action
  command: "(FCS n)"
  params: []

- id: focus_decrement
  label: Focus Decrease by 1
  kind: action
  command: "(FCS p)"
  params: []

- id: zoom_increment
  label: Zoom Increase by 1
  kind: action
  command: "(ZOM n)"
  params: []

- id: zoom_decrement
  label: Zoom Decrease by 1
  kind: action
  command: "(ZOM p)"
  params: []

- id: lens_vert_increment
  label: Lens Vertical Shift Increase by 1
  kind: action
  command: "(LVO n)"
  params: []

- id: lens_horz_decrement
  label: Lens Horizontal Shift Decrease by 1
  kind: action
  command: "(LHO p)"
  params: []

- id: lens_motor_lock
  label: Lens Motor Lock
  kind: action
  command: "(LCB+LOCK{value})"
  params:
    - name: value
      type: integer
      description: "0=Allow, 1=Locked"

- id: lens_center
  label: Lens Center (Calibrate & Home)
  kind: action
  command: "(LCB+HOME1)"
  params: []

- id: ceiling_mount
  label: Ceiling Mount
  kind: action
  command: "(CEL{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Auto (G-sensor)"

- id: rear_projection
  label: Rear Projection
  kind: action
  command: "(SOR{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: menu_shift_horz
  label: Menu Shift Horizontal
  kind: action
  command: "(MSH{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 0"

- id: menu_shift_vert
  label: Menu Shift Vertical
  kind: action
  command: "(MSV{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 0"

- id: message_box_enable
  label: Show Messages
  kind: action
  command: "(MBE+USER{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: menu_transparency
  label: Menu Transparency
  kind: action
  command: "(OST{value})"
  params:
    - name: value
      type: integer
      description: "0-90, default 0"

- id: splash_screen
  label: Splash Screen Setup
  kind: action
  command: "(SPS+SLCT{value})"
  params:
    - name: value
      type: integer
      description: "0=Factory Logo, 1=Blue, 2=Black, 3=White"

- id: pin_protect
  label: PIN Protect Toggle
  kind: action
  command: '(PIV"{pin}")'
  params:
    - name: pin
      type: string
      description: "5-digit PIN (0-9). Toggles pin-protect if correct."

- id: change_pin
  label: Change PIN
  kind: action
  command: '(PCG"{old},{new}")'
  params:
    - name: old
      type: string
      description: "Old 5-digit PIN (default 12345)"
    - name: new
      type: string
      description: "New 5-digit PIN"

- id: standby_mode
  label: Standby Mode
  kind: action
  command: "(PWR+STBM{value})"
  params:
    - name: value
      type: integer
      description: "0=1W Mode, 1=Communication"

- id: auto_power_on
  label: Auto Power On
  kind: action
  command: "(APW{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: auto_shutdown
  label: Auto Shutdown
  kind: action
  command: "(ASH{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=5min, 2=10min, 3=15min, 4=20min, 5=25min, 6=30min"

- id: sleep_timer
  label: Sleep Timer
  kind: action
  command: "(SLP{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=2Hrs, 2=4Hrs, 3=6Hrs"

- id: high_altitude
  label: High Altitude
  kind: action
  command: "(HAT{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: network_dhcp
  label: Network DHCP
  kind: action
  command: "(NET+DHCP{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: network_hostname
  label: Network Projector Name
  kind: action
  command: '(NET+HOST"{name}")'
  params:
    - name: name
      type: string
      description: "Projector hostname"

- id: network_mac
  label: Network MAC Address
  kind: action
  command: '(NET+MAC0"{mac}")'
  params:
    - name: mac
      type: string
      description: "MAC address"

- id: network_show_messages
  label: Network Show Messages
  kind: action
  command: "(NET+SHOW{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: network_ip
  label: Network IP Address
  kind: action
  command: '(NET+ETH0"{ip}")'
  params:
    - name: ip
      type: string
      description: "IP address (e.g. 192.168.000.001)"

- id: network_restart
  label: Network Restart
  kind: action
  command: "(NET+RSTR1)"
  params: []

- id: network_subnet
  label: Network Subnet Mask
  kind: action
  command: '(NET+SUB0"{mask}")'
  params:
    - name: mask
      type: string
      description: "Subnet mask (e.g. 255.255.255.000)"

- id: serial_baud_rate
  label: Serial Port Baud Rate
  kind: action
  command: "(BDR{value})"
  params:
    - name: value
      type: integer
      description: "0=2400, 1=4800, 2=9600, 3=14400, 4=19200, 5=38400, 6=57600, 7=115200"

- id: serial_echo
  label: Serial Port Echo
  kind: action
  command: "(SEC{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: trigger_12v
  label: 12V Trigger
  kind: action
  command: "(VTT{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: hotkey_setting
  label: Hot-Key Setting
  kind: action
  command: "(HKS{value})"
  params:
    - name: value
      type: integer
      description: "0=Blank, 1=Aspect, 2=Freeze, 3=Info, 4=Overscan, 5=Closed Captions"

- id: lamp_power
  label: Lamp Power
  kind: action
  command: "(LPM{value})"
  params:
    - name: value
      type: integer
      description: "0=280W, 1=285W, 2=290W, 3=295W, 4=300W, 5=305W, 6=310W, 7=315W, 8=320W, 9=325W, 10=330W"

- id: current_lamp
  label: Current Lamp
  kind: action
  command: "(LOP{value})"
  params:
    - name: value
      type: integer
      description: "1=Lamp1, 2=Lamp2, 3=Both"

- id: whisper_mode
  label: Whisper Mode
  kind: action
  command: "(WSP{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Lamp1, 2=Lamp2, 3=Auto"

- id: lamp_auto_switch
  label: Lamp Auto Switch
  kind: action
  command: "(LSF{value})"
  params:
    - name: value
      type: integer
      description: "0=On-fail-only, 1=Every power-on, 2=After N hours"

- id: lamp_auto_switch_time
  label: Lamp Auto Switch Hours
  kind: action
  command: "(LSF+TIME{hours})"
  params:
    - name: hours
      type: integer
      description: "Number of hours for auto-switch"

- id: lamp_life_warning
  label: Lamp Life Warning Hours
  kind: action
  command: "(LPL{hours})"
  params:
    - name: hours
      type: integer
      description: "Hours at which to warn (0=off)"

- id: reset_lamp1
  label: Reset Lamp 1 Hours
  kind: action
  command: "(LPC+LMP11)"
  params: []

- id: reset_lamp2
  label: Reset Lamp 2 Hours
  kind: action
  command: "(LPC+LAMP21)"
  params: []

- id: reset_both_lamps
  label: Reset Both Lamps Hours
  kind: action
  command: "(LPC+BOTH1)"
  params: []

- id: input_change
  label: Change Source
  kind: action
  command: "(SIN{value})"
  params:
    - name: value
      type: integer
      description: "0=VGA1, 1=VGA2, 2=RGBHV(BNC), 3=HDMI1, 4=HDMI2, 5=Component, 6=S-Video, 7=Composite"

- id: main_source
  label: Set Main Source
  kind: action
  command: "(SIN+MAIN{value})"
  params:
    - name: value
      type: integer
      description: "0=VGA1, 1=VGA2, 2=RGBHV(BNC), 3=HDMI1, 4=HDMI2, 5=Component, 6=S-Video, 7=Composite"

- id: pip_source
  label: Set PIP Source
  kind: action
  command: "(SIN+PIIP{value})"
  params:
    - name: value
      type: integer
      description: "Same input numbering as SIN"

- id: pip_enable
  label: PIP/PBP Enable
  kind: action
  command: "(PIP{value})"
  params:
    - name: value
      type: integer
      description: "0=Disable, 1=Enable"

- id: pip_swap
  label: PIP/PBP Swap
  kind: action
  command: "(PPS1)"
  params: []

- id: pip_size
  label: PIP/PBP Size
  kind: action
  command: "(PHS{value})"
  params:
    - name: value
      type: integer
      description: "0=Small, 1=Medium, 2=Large"

- id: pip_layout
  label: PIP/PBP Layout
  kind: action
  command: "(PPP{value})"
  params:
    - name: value
      type: integer
      description: "0=POP-Bigger-Left, 1=Over-Under-Bigger-Upper, 2=POP-Bigger-Right, 3=Over-Under-Bigger-Lower, 4=PIP-Bottom-Right, 5=PIP-Bottom-Left, 6=PIP-Top-Left, 7=PIP-Top-Right"

- id: timing_detect
  label: Timing Detect Mode
  kind: action
  command: "(TMG{value})"
  params:
    - name: value
      type: integer
      description: "0=Normal, 1=Wide"

- id: enabled_main_source_hotkey
  label: Enable Main Source Hot-Key
  kind: action
  command: "(ESH{value})"
  params:
    - name: value
      type: integer
      description: "0=On, 1=Off"

- id: main_source_hotkey_vga1
  label: Hot-Key Number for VGA1
  kind: action
  command: "(MHK+VGA1{n})"
  params:
    - name: n
      type: integer
      description: "Remote key number to assign"

- id: main_source_hotkey_vga2
  label: Hot-Key Number for VGA2
  kind: action
  command: "(MHK+VGA2{n})"
  params:
    - name: n
      type: integer
      description: "Remote key number to assign"

- id: main_source_hotkey_bnc
  label: Hot-Key Number for BNC
  kind: action
  command: "(MHK+BNC1{n})"
  params:
    - name: n
      type: integer
      description: "Remote key number to assign"

- id: main_source_hotkey_hdmi1
  label: Hot-Key Number for HDMI1
  kind: action
  command: "(MHK+HDM1{n})"
  params:
    - name: n
      type: integer
      description: "Remote key number to assign"

- id: main_source_hotkey_hdmi2
  label: Hot-Key Number for HDMI2
  kind: action
  command: "(MHK+HDM2{n})"
  params:
    - name: n
      type: integer
      description: "Remote key number to assign"

- id: main_source_hotkey_component
  label: Hot-Key Number for Component
  kind: action
  command: "(MHK+CON1{n})"
  params:
    - name: n
      type: integer
      description: "Remote key number to assign"

- id: main_source_hotkey_svideo
  label: Hot-Key Number for S-Video
  kind: action
  command: "(MHK+SVDO{n})"
  params:
    - name: n
      type: integer
      description: "Remote key number to assign"

- id: main_source_hotkey_composite
  label: Hot-Key Number for Composite
  kind: action
  command: "(MHK+COPS{n})"
  params:
    - name: n
      type: integer
      description: "Remote key number to assign"

- id: source_key_function
  label: Source Key Function
  kind: action
  command: "(SKS{value})"
  params:
    - name: value
      type: integer
      description: "0=Change source, 1=List all sources, 2=Change source with Auto"

- id: test_pattern
  label: Test Pattern
  kind: action
  command: "(ITP{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Grid, 2=White, 3=Black, 4=Checkerboard, 5=Color bars, 6=Red(svc), 7=Green(svc), 8=Blue(svc), 9=Yellow(svc), 10=Magenta(svc), 11=Cyan(svc)"

- id: color_wheel_index_2x
  label: Color Wheel Index 2x (Service)
  kind: action
  command: "(CWI+SPX2{index})"
  params:
    - name: index
      type: integer
      description: "Color wheel index for 2x speed"

- id: color_wheel_index_3x
  label: Color Wheel Index 3x (Service)
  kind: action
  command: "(CWI+SPX3{index})"
  params:
    - name: index
      type: integer
      description: "Color wheel index for 3x speed"

- id: factory_defaults
  label: Factory Defaults (Service)
  kind: action
  command: "(DEF 111)"
  params: []

- id: enter_service_code
  label: Enter Service Mode
  kind: action
  command: '(UID"{username},{password}")'
  params:
    - name: username
      type: string
      description: "Service username (e.g. 'service')"
    - name: password
      type: string
      description: "Service password"

- id: source_name_vga1
  label: Set Source Name VGA1
  kind: action
  command: '(SNS+SRC0"{name}")'
  params:
    - name: name
      type: string
      description: "New source name"

- id: source_name_vga2
  label: Set Source Name VGA2
  kind: action
  command: '(SNS+SRC1"{name}")'
  params:
    - name: name
      type: string
      description: "New source name"

- id: source_name_bnc
  label: Set Source Name BNC
  kind: action
  command: '(SNS+SRC2"{name}")'
  params:
    - name: name
      type: string
      description: "New source name"

- id: source_name_hdmi1
  label: Set Source Name HDMI1
  kind: action
  command: '(SNS+SRC3"{name}")'
  params:
    - name: name
      type: string
      description: "New source name"

- id: source_name_hdmi2
  label: Set Source Name HDMI2
  kind: action
  command: '(SNS+SRC4"{name}")'
  params:
    - name: name
      type: string
      description: "New source name"

- id: source_name_component
  label: Set Source Name Component
  kind: action
  command: '(SNS+SRC5"{name}")'
  params:
    - name: name
      type: string
      description: "New source name"

- id: source_name_svideo
  label: Set Source Name S-Video
  kind: action
  command: '(SNS+SRC6"{name}")'
  params:
    - name: name
      type: string
      description: "New source name"

- id: source_name_video
  label: Set Source Name Composite Video
  kind: action
  command: '(SNS+SRC7"{name}")'
  params:
    - name: name
      type: string
      description: "New source name"

- id: ir_keycode
  label: IR Key-Code Send
  kind: action
  command: "(KEY{code})"
  params:
    - name: code
      type: integer
      description: "Decimal IR keycode (see Appendix-2 table)"

- id: shutter
  label: Shutter On/Off
  kind: action
  command: "(SHU{value})"
  params:
    - name: value
      type: integer
      description: "0=Open, 1=Closed"

- id: osd_show
  label: OSD Show/Hide
  kind: action
  command: "(OSD{value})"
  params:
    - name: value
      type: integer
      description: "0=Hide, 1=Show"

- id: power
  label: Power On/Off
  kind: action
  command: "(PWR{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

# Query actions
- id: contrast_query
  label: Contrast Query
  kind: query
  command: "(CON?)"
  params: []

- id: lamp1_hours_query
  label: Lamp 1 Hours Query
  kind: query
  command: "(LIF+LP1H?)"
  params: []

- id: lamp2_hours_query
  label: Lamp 2 Hours Query
  kind: query
  command: "(LIF+LP2H?)"
  params: []

- id: lamp_total_hours_query
  label: Lamp Total Hours Query
  kind: query
  command: "(LIF+LPTH?)"
  params: []

- id: lamp1_reset_query
  label: Lamp 1 Reset Count Query
  kind: query
  command: "(LIF+LP1R?)"
  params: []

- id: lamp2_reset_query
  label: Lamp 2 Reset Count Query
  kind: query
  command: "(LIF+LP2R?)"
  params: []

- id: main_active_source_query
  label: Main Active Source Query
  kind: query
  command: "(MIF+ACTS?)"
  params: []

- id: main_signal_format_query
  label: Main Signal Format Query
  kind: query
  command: "(MIF+SGFT?)"
  params: []

- id: main_aspect_ratio_query
  label: Main Aspect Ratio Query
  kind: query
  command: "(MIF+APRT?)"
  params: []

- id: main_resolution_query
  label: Main Resolution Query
  kind: query
  command: "(MIF+RESL?)"
  params: []

- id: main_vert_refresh_query
  label: Main Vert Refresh Query
  kind: query
  command: "(MIF+VREF?)"
  params: []

- id: main_horz_refresh_query
  label: Main Horz Refresh Query
  kind: query
  command: "(MIF+HREF?)"
  params: []

- id: main_pixel_clock_query
  label: Main Pixel Clock Query
  kind: query
  command: "(MIF+PIXC?)"
  params: []

- id: main_sync_type_query
  label: Main Sync Type Query
  kind: query
  command: "(MIF+SYNC?)"
  params: []

- id: main_color_space_query
  label: Main Color Space Query
  kind: query
  command: "(MIF+CLSP?)"
  params: []

- id: pip_active_source_query
  label: PIP Active Source Query
  kind: query
  command: "(SIF+ACTS?)"
  params: []

- id: pip_signal_format_query
  label: PIP Signal Format Query
  kind: query
  command: "(SIF+SGFT?)"
  params: []

- id: pip_aspect_ratio_query
  label: PIP Aspect Ratio Query
  kind: query
  command: "(SIF+APRT?)"
  params: []

- id: pip_resolution_query
  label: PIP Resolution Query
  kind: query
  command: "(SIF+RESL?)"
  params: []

- id: pip_vert_refresh_query
  label: PIP Vert Refresh Query
  kind: query
  command: "(SIF+VREF?)"
  params: []

- id: pip_horz_refresh_query
  label: PIP Horz Refresh Query
  kind: query
  command: "(SIF+HREF?)"
  params: []

- id: pip_pixel_clock_query
  label: PIP Pixel Clock Query
  kind: query
  command: "(SIF+PIXC?)"
  params: []

- id: pip_sync_type_query
  label: PIP Sync Type Query
  kind: query
  command: "(SIF+SYNC?)"
  params: []

- id: pip_color_space_query
  label: PIP Color Space Query
  kind: query
  command: "(SIF+CLSP?)"
  params: []

- id: status_query
  label: Projector Status Query
  kind: query
  command: "(SST?)"
  params: []

- id: model_name_query
  label: Model Name Query
  kind: query
  command: "(PIF+MDLN?)"
  params: []

- id: serial_number_query
  label: Serial Number Query
  kind: query
  command: "(PIF+SNUM?)"
  params: []

- id: native_resolution_query
  label: Native Resolution Query
  kind: query
  command: "(PIF+NERS?)"
  params: []

- id: firmware_version_query
  label: Firmware Version Query
  kind: query
  command: "(PIF+FWVS?)"
  params: []

- id: configuration_version_query
  label: Configuration Version Query
  kind: query
  command: "(PIF+CFVS?)"
  params: []

- id: boot_code_version_query
  label: Boot Code Version Query
  kind: query
  command: "(PIF+BCVS?)"
  params: []

- id: serial_command_version_query
  label: Serial Command Version Query
  kind: query
  command: "(SIV?)"
  params: []

- id: last_command_error_query
  label: Last Serial Command Error Query
  kind: query
  command: "(LCE?)"
  params: []

- id: last_system_error_query
  label: Last System Error Query
  kind: query
  command: "(LSE?)"
  params: []
```

## Feedbacks
```yaml
- id: reply_contrast
  type: string
  description: "Format: (CON!{value})"
- id: reply_lamp_hours
  type: string
  description: "Format: (LIF+LP1H!{hours})"
- id: reply_status_block
  type: string
  description: "Series of (SST!NNN \"value\" \"label\") lines covering model, serial, native res, main input, lamp hours, IP, DHCP, etc."
- id: reply_model
  type: string
  description: "Format: (PIF+MDLN!{model})"
- id: reply_serial
  type: string
  description: "Format: (PIF+SNUM!{serial})"
- id: reply_system_error
  type: enum
  description: "Last system error code (Lamp fail, Fan fail, Over temp, etc.)"
  values:
    - "1=lamp did not strike after 5 attempts"
    - "3=lamp went out unexpectedly"
    - "4=fan failure"
    - "5=over temperature"
- id: reply_command_error
  type: string
  description: "Format: (ITP) - (65535 00000 ERR00005 \"ITP: Too Few Parameters\")"
```

## Variables
```yaml
# UNRESOLVED: command-line protocol is parameterised via inline argument values rather than discrete variables
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited notifications distinct from query replies
```

## Macros
```yaml
# UNRESOLVED: source does not define multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for:
  - factory_defaults  # requires literal "111" to prevent accidental use
interlocks:
  - standby_mode_1w  # in 1W standby mode, system cannot power on via UART/WEB/USB (only keypad)
  - service_mode  # many service commands (factory defaults, color wheel index, projector info) only work in service mode
<!-- UNRESOLVED: source mentions default PIN "12345" for projector; no other safety interlocks stated -->
```

## Notes
Message framing: every message begins with "(" and ends with ")". A space between code and parameter is optional. Optional "#" prefix requests full acknowledgement echo. Modifiers "n" and "p" step through enum values without specifying an absolute value.

Network commands (NET+) configure the Ethernet port; the same ASCII serial commands can be sent over RS-232 or over the ETHERNET port.

Source document is titled "E Series Serial Commands Technical Reference Information". User-stated device name is "Christie UHD Series"; applicability to UHD Series is not confirmed in this source.

Test patterns 6-11 (Red, Green, Blue, Yellow, Magenta, Cyan) require service-mode login. Grid and Color Bars test patterns take up to 18 seconds to switch away from.

<!-- UNRESOLVED: TCP/IP port number for Ethernet control not stated in source (source describes RS-232 only with explicit parameters; Ethernet mentioned as transport but no port given). -->

## Provenance

```yaml
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-001853-02-Christie-LIT-TECH-REF-UHD-Panels2-RS232.pdf
retrieved_at: 2026-09-02T21:18:25.327Z
last_checked_at: 2026-09-03T22:23:58.998Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-03T22:23:58.998Z
matched_actions: 154
action_count: 154
confidence: medium
summary: "All 154 spec actions match the source verbatim with correct parameters, polarity, and shape; transport matches; only NET+GATE/NET+RSET are subcodes without usage examples. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- NET+GATE
- NET+RSET
- "source document references \"E Series\"; compatibility with UHD Series not confirmed in this document."
- "device name in input is \"Christie UHD Series\" but source doc is titled \"E Series Serial Commands Technical Reference Information\". Spec generated from protocol commands present in source; UHD-Series-specific applicability not stated."
- "command-line protocol is parameterised via inline argument values rather than discrete variables"
- "source does not describe unsolicited notifications distinct from query replies"
- "source does not define multi-step macro sequences"
- "source mentions default PIN \"12345\" for projector; no other safety interlocks stated"
- "TCP/IP port number for Ethernet control not stated in source (source describes RS-232 only with explicit parameters; Ethernet mentioned as transport but no port given)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
