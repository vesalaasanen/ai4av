---
spec_id: admin/christie-cp-2210-2215-2230-2000m
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie CP 2210 / CP 2215 / CP 2230 / CP 2000M Control Spec"
manufacturer: Christie
model_family: "CP 2210"
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - "CP 2210"
    - "CP 2215"
    - "CP 2230"
    - "CP 2000M"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
  - manualslib.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-100410-08-christie-lit-man-usr-cp2210.pdf
  - https://www.manualslib.com/manual/816593/Christie-Cp-2210.html
retrieved_at: 2026-05-14T21:23:46.567Z
last_checked_at: 2026-06-02T17:21:52.041Z
generated_at: 2026-06-02T17:21:52.041Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port for the Ethernet interface not stated in source"
  - "TCP port not stated in source"
  - "section kept for spec completeness; no source-supported entries."
  - "source does not document any unsolicited notification messages;"
  - "source does not document any multi-step user-defined sequences."
  - "high-voltage lamp / thermal warnings are not detailed in this protocol"
  - "TCP port for the Ethernet interface is not stated in this document."
  - "firmware version compatibility ranges across CP 2210/2215/2230/2000M not stated."
  - "full set of baud rates the hardware supports beyond those listed for BDR (0..7) not stated."
  - "edge enhancement (EDG) and white peaking (WPK) numeric ranges not explicitly stated."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:52.041Z
  matched_actions: 153
  action_count: 153
  confidence: medium
  summary: "All 153 spec actions matched literal command codes in source; transport parameters (115200 baud, 8N1) verified; bidirectional command coverage complete. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Christie CP 2210 / CP 2215 / CP 2230 / CP 2000M Control Spec

## Summary
ASCII serial protocol for the Christie E Series cinema projectors (CP 2210, CP 2215, CP 2230, CP 2000M). Control and query are performed by sending three-character command codes (optionally with a four-character subcode, parameter, and a leading `#` for full acknowledgement) wrapped in parentheses over RS-232 (default 115200 baud, 8N1, no flow control) or an Ethernet port. Replies use `(CODE!data)` and `(CODE+SUBCODE!data)` formats; errors return `(ITP)- (65535 00000 ERR00005 "ITP: Too Few Parameters")`-style messages.

<!-- UNRESOLVED: TCP port for the Ethernet interface not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source
auth:
  type: none  # inferred: no auth procedure in source. (PIN protect is local UI lock, not network auth.)
```

## Traits
```yaml
- powerable      # inferred: PWR on/off commands present
- routable       # inferred: SIN / SIN+MAIN / SIN+PIIP input switching commands present
- queryable      # inferred: MIF, SIF, LIF, PIF, SST, SIV, LCE, LSE query commands present
- levelable      # inferred: brightness, contrast, color, tint, gain/offset, gamma, etc. present
```

## Actions
```yaml
# Each row corresponds to a command or subcode documented in the source.
# Message format: "(CODE[+SUBCODE][DATA])" for set, "(CODE+SUBCODE?)" for query.
# Optional leading "#" requests full acknowledgement echo.
# Modifiers "n" and "p" mean "next value" and "previous value" where supported.

# --- SIZE & POSITION ---
- id: size_preset
  label: Size Preset
  kind: action
  command: "(SZP{preset})"
  params:
    - name: preset
      type: integer
      description: "0=Auto, 1=Native, 2=4:3, 3=LetterBox, 4=Full Size, 5=Full Width, 6=Full Height"
- id: overscan
  label: Overscan
  kind: action
  command: "(OVS{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=Zoom, 2=Crop"
- id: pixel_phase
  label: Pixel Phase
  kind: action
  command: "(PXP{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 50)"
- id: pixel_track
  label: Pixel Track
  kind: action
  command: "(PXT{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 50)"
- id: horz_position
  label: Horizontal Position
  kind: action
  command: "(HOR{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 50)"
- id: vert_position
  label: Vertical Position
  kind: action
  command: "(VRT{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 50)"
- id: horz_keystone
  label: Horizontal Keystone
  kind: action
  command: "(WRP+HKST{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 50)"
- id: vert_keystone
  label: Vertical Keystone
  kind: action
  command: "(WRP+VKST{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 50)"
- id: horz_pincushion
  label: Horizontal Pincushion
  kind: action
  command: "(HPC{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 50)"
- id: vert_pincushion
  label: Vertical Pincushion
  kind: action
  command: "(VPC{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 50)"
- id: digital_zoom
  label: Digital Zoom
  kind: action
  command: "(SIZ{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (100=normal/unchanged, default 100)"
- id: digital_horz_shift
  label: Digital Horizontal Shift
  kind: action
  command: "(DSH{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 50). Requires Digital Zoom applied first."
- id: digital_vert_shift
  label: Digital Vertical Shift
  kind: action
  command: "(DSV{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 50). Requires Digital Zoom applied first."
- id: auto_image
  label: Auto Image
  kind: action
  command: "(AIM1)"
  params: []

# --- IMAGE SETTINGS ---
- id: brightness
  label: Brightness
  kind: action
  command: "(BRT{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 50)"
- id: contrast
  label: Contrast
  kind: action
  command: "(CON{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 50)"
- id: color_space
  label: Color Space
  kind: action
  command: "(CSP{mode})"
  params:
    - name: mode
      type: integer
      description: "0=RGB, 1=REC709, 2=REC601, 3=RGB Video, 4=Auto (default)"
- id: detail
  label: Detail (Sharpness)
  kind: action
  command: "(DTL{level})"
  params:
    - name: level
      type: integer
      description: "0=Maximum, 1=High, 2=Normal, 3=Low, 4=Minimum (default 2)"
- id: color
  label: Color Saturation
  kind: action
  command: "(CLR{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 50). Analog video only."
- id: tint
  label: Tint
  kind: action
  command: "(TNT{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 50). Analog NTSC only."
- id: noise_reduction
  label: Noise Reduction
  kind: action
  command: "(NRD{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 0)"
- id: flesh_tone
  label: Flesh Tone Correction
  kind: action
  command: "(FTC{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 0)"
- id: video_black_level
  label: Video Black Level (IRE)
  kind: action
  command: "(VBL{mode})"
  params:
    - name: mode
      type: integer
      description: "0=IRE off, 1=IRE on"
- id: detect_film
  label: Detect Film
  kind: action
  command: "(FMD{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On (default 1)"
- id: closed_captions
  label: Closed Captions
  kind: action
  command: "(CLC{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=CC1, 2=CC2 (default 0)"
- id: red_gain
  label: Red Gain
  kind: action
  command: "(ROG{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 50)"
- id: green_gain
  label: Green Gain
  kind: action
  command: "(GOG{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 50)"
- id: blue_gain
  label: Blue Gain
  kind: action
  command: "(BOG{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 50)"
- id: red_offset
  label: Red Offset
  kind: action
  command: "(ROO{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 50)"
- id: green_offset
  label: Green Offset
  kind: action
  command: "(GOO{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 50)"
- id: blue_offset
  label: Blue Offset
  kind: action
  command: "(BOO{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 50)"
- id: sync_threshold
  label: Sync Threshold (SOG)
  kind: action
  command: "(SYT{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 50). Sync-on-green threshold."
- id: rgb_reset
  label: RGB Gain/Offset Reset
  kind: action
  command: "(GOR1)"
  params: []
- id: picture_setting
  label: Picture Setting
  kind: action
  command: "(PST{preset})"
  params:
    - name: preset
      type: integer
      description: "0=Presentation, 1=Video, 2=Bright, 3=Whiteboard, 4=Blackboard, 5=Beige Wall, 6=User. Use (PST+USER1) to store current settings to User Mode."
- id: dynamicblack
  label: DynamicBlack
  kind: action
  command: "(DIM{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On"
- id: gamma_curve
  label: Gamma Curve
  kind: action
  command: "(BGC{curve})"
  params:
    - name: curve
      type: integer
      description: "0=Video, 1=Film, 2=Bright, 3=CRT"
- id: brilliant_color
  label: BrilliantColor
  kind: action
  command: "(BCL{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Normal Look, 1=Bright Look"
- id: white_peaking
  label: White Peaking
  kind: action
  command: "(WPK{value})"
  params:
    - name: value
      type: integer
      description: "White processing amount (range not specified in source)"
- id: color_temperature
  label: Color Temperature
  kind: action
  command: "(CCI{preset})"
  params:
    - name: preset
      type: integer
      description: "0=Warmest, 1=Warm, 2=Cool, 3=Bright"
- id: edge_enhancement
  label: Edge Enhancement
  kind: action
  command: "(EDG{level})"
  params:
    - name: level
      type: integer
      description: "0=Off, 1=Normal, 2=Maximum"
- id: color_wheel_speed
  label: Color Wheel Speed
  kind: action
  command: "(CWS{speed})"
  params:
    - name: speed
      type: integer
      description: "0=2x, 1=3x"

# --- CONFIGURATION ---
- id: language
  label: OSD Language
  kind: action
  command: "(LOC+LANG{lang})"
  params:
    - name: lang
      type: integer
      description: "0=English, 1=Chinese, 2=French, 3=German, 4=Italian, 5=Japanese, 6=Korean, 7=Russian, 8=Spanish"
- id: focus
  label: Focus
  kind: action
  command: "(FCS{dir})"
  params:
    - name: dir
      type: string
      description: "n=increase by 1, p=decrease by 1"
- id: zoom
  label: Zoom
  kind: action
  command: "(ZOM{dir})"
  params:
    - name: dir
      type: string
      description: "n=increase by 1, p=decrease by 1"
- id: lens_shift_vertical
  label: Lens Shift Vertical
  kind: action
  command: "(LVO{dir})"
  params:
    - name: dir
      type: string
      description: "n=increase by 1, p=decrease by 1"
- id: lens_shift_horizontal
  label: Lens Shift Horizontal
  kind: action
  command: "(LHO{dir})"
  params:
    - name: dir
      type: string
      description: "n=increase by 1, p=decrease by 1"
- id: lock_lens_motors
  label: Lock Lens Motors
  kind: action
  command: "(LCB+LOCK{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Allow, 1=Locked"
- id: lens_center
  label: Lens Center
  kind: action
  command: "(LCB+HOME1)"
  params: []
- id: ceiling_mount
  label: Ceiling Mount
  kind: action
  command: "(CEL{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On, 2=Auto (G-sensor)"
- id: rear_projection
  label: Rear Projection
  kind: action
  command: "(SOR{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On"
- id: menu_shift_horizontal
  label: Menu Shift Horizontal
  kind: action
  command: "(MSH{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 0)"
- id: menu_shift_vertical
  label: Menu Shift Vertical
  kind: action
  command: "(MSV{value})"
  params:
    - name: value
      type: integer
      description: "0-100 (default 0)"
- id: show_messages
  label: Show Messages (OSD)
  kind: action
  command: "(MBE+USER{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On (default 1)"
- id: menu_transparency
  label: Menu Transparency
  kind: action
  command: "(OST{value})"
  params:
    - name: value
      type: integer
      description: "0-90 (default 0=not transparent)"
- id: splash_screen
  label: Splash Screen Select
  kind: action
  command: "(SPS+SLCT{choice})"
  params:
    - name: choice
      type: integer
      description: "0=Factory Logo, 1=Blue, 2=Black, 3=White (default 0)"
- id: pin_protect
  label: PIN Protect
  kind: action
  command: '(PIV"{pin}")'
  params:
    - name: pin
      type: string
      description: "5-digit PIN (each digit 0-9). Toggle on/off when PIN is correct."
- id: change_pin
  label: Change PIN
  kind: action
  command: '(PCG"{old_pin},{new_pin}")'
  params:
    - name: old_pin
      type: string
      description: "Current 5-digit PIN (default 12345)"
    - name: new_pin
      type: string
      description: "New 5-digit PIN"
- id: standby_mode
  label: Standby Mode
  kind: action
  command: "(PWR+STBM{mode})"
  params:
    - name: mode
      type: integer
      description: "0=1W mode (no UART/WEB/USB wake), 1=Communication mode (~20W, supports wake)"
- id: auto_power_on
  label: Auto Power On
  kind: action
  command: "(APW{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On (default 0). On = skip standby on AC applied."
- id: auto_shutdown
  label: Auto Shutdown
  kind: action
  command: "(ASH{interval})"
  params:
    - name: interval
      type: integer
      description: "0=Never (default), 1=5min, 2=10min, 3=15min, 4=20min, 5=25min, 6=30min"
- id: sleep_timer
  label: Sleep Timer
  kind: action
  command: "(SLP{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off (default), 1=2Hrs, 2=4Hrs, 3=6Hrs"
- id: high_altitude
  label: High Altitude
  kind: action
  command: "(HAT{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On (modifies fan speeds). Not compatible with Whisper mode."
- id: net_dhcp
  label: Network DHCP
  kind: action
  command: "(NET+DHCP{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On"
- id: net_ip_address
  label: Network IP Address
  kind: action
  command: '(NET+ETH0"{ip}")'
  params:
    - name: ip
      type: string
      description: "Dotted-quad IP, e.g. 192.168.000.001"
- id: net_subnet
  label: Network Subnet Mask
  kind: action
  command: '(NET+SUB0"{mask}")'
  params:
    - name: mask
      type: string
      description: "Dotted-quad subnet mask, e.g. 255.255.255.000"
- id: net_gateway
  label: Network Default Gateway
  kind: action
  command: '(NET+GATE"{gw}")'
  params:
    - name: gw
      type: string
      description: "Dotted-quad gateway IP"
- id: net_hostname
  label: Network Projector Name
  kind: action
  command: '(NET+HOST"{name}")'
  params:
    - name: name
      type: string
      description: "Projector hostname (e.g. DWU670-E)"
- id: net_mac
  label: Network MAC Address
  kind: action
  command: '(NET+MAC0"{mac}")'
  params:
    - name: mac
      type: string
      description: "MAC address, e.g. 00:E0:47:01:02:3C"
- id: net_show_messages
  label: Network Show Messages
  kind: action
  command: "(NET+SHOW{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On"
- id: net_restart
  label: Network Restart
  kind: action
  command: "(NET+RSTR1)"
  params: []
- id: net_factory_reset
  label: Network Factory Reset
  kind: action
  command: "(NET+RSET1)"
  params: []
- id: serial_baud_rate
  label: Serial Port Baud Rate
  kind: action
  command: "(BDR{rate})"
  params:
    - name: rate
      type: integer
      description: "0=2400, 1=4800, 2=9600, 3=14400, 4=19200, 5=38400, 6=57600, 7=115200 (default)"
- id: serial_echo
  label: Serial Port Echo
  kind: action
  command: "(SEC{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off (default), 1=On"
- id: trigger_12v
  label: 12V Trigger
  kind: action
  command: "(VTT{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On (drives a connected screen)"
- id: hotkey_assign
  label: Hot-Key Assignment
  kind: action
  command: "(HKS{function})"
  params:
    - name: function
      type: integer
      description: "0=Blank Screen, 1=Aspect Ratio, 2=Freeze Screen, 3=Projector Info, 4=Overscan, 5=Closed Captions"

# --- LAMP ---
- id: lamp_power
  label: Lamp Power
  kind: action
  command: "(LPM{level})"
  params:
    - name: level
      type: integer
      description: "0=280W .. 10=330W in 5W steps (default 10=330W)"
- id: current_lamp
  label: Current Lamp
  kind: action
  command: "(LOP{lamp})"
  params:
    - name: lamp
      type: integer
      description: "1=Only Lamp 1, 2=Only Lamp 2, 3=Both Lamps"
- id: whisper_mode
  label: Whisper Mode
  kind: action
  command: "(WSP{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=Lamp1, 2=Lamp2, 3=Auto. Not compatible with High Altitude."
- id: lamp_auto_switch
  label: Lamp Auto Switch Mode
  kind: action
  command: "(LSF{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Only on lamp fail, 1=Switch on every power-on (+ on fail), 2=Switch after N hours (+ on fail)"
- id: lamp_auto_switch_hours
  label: Lamp Auto Switch Hours
  kind: action
  command: "(LSF+TIME{hours})"
  params:
    - name: hours
      type: integer
      description: "Hours threshold for the 'After N Hours' mode (e.g. (LSF+TIME120))"
- id: lamp_life_warning
  label: Lamp Life Warning
  kind: action
  command: "(LPL{hours})"
  params:
    - name: hours
      type: integer
      description: "Hours at which a lamp-replace warning is shown. 0 disables (default 0)."
- id: reset_lamp1_hours
  label: Reset Lamp 1 Hours
  kind: action
  command: "(LPC+LMP11)"
  params: []
- id: reset_lamp2_hours
  label: Reset Lamp 2 Hours
  kind: action
  command: "(LPC+LAMP21)"
  params: []
- id: reset_both_lamp_hours
  label: Reset Both Lamp Hours
  kind: action
  command: "(LPC+BOTH1)"
  params: []

# --- INPUT SWITCHING & PIP ---
- id: select_source
  label: Select Source (Main)
  kind: action
  command: "(SIN{source})"
  params:
    - name: source
      type: integer
      description: "0=VGA1, 1=VGA2, 2=RGBHV (BNC), 3=HDMI1, 4=HDMI2, 5=Component, 6=S-Video, 7=Composite"
- id: set_main_source
  label: Set Main Source
  kind: action
  command: "(SIN+MAIN{source})"
  params:
    - name: source
      type: integer
      description: "0=VGA1, 1=VGA2, 2=RGBHV, 3=HDMI1, 4=HDMI2, 5=Component, 6=S-Video, 7=Composite"
- id: set_pip_source
  label: Set PIP Source
  kind: action
  command: "(SIN+PIIP{source})"
  params:
    - name: source
      type: integer
      description: "0=VGA1, 1=VGA2, 2=RGBHV, 3=HDMI1, 4=HDMI2, 5=Component, 6=S-Video, 7=Composite"
- id: pip_enable
  label: PIP/PBP Enable
  kind: action
  command: "(PIP{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Disable, 1=Enable (default 0)"
- id: pip_swap
  label: PIP/PBP Swap
  kind: action
  command: "(PPS1)"
  params: []
- id: pip_size
  label: PIP/PBP Size
  kind: action
  command: "(PHS{size})"
  params:
    - name: size
      type: integer
      description: "0=Small, 1=Medium, 2=Large"
- id: pip_layout
  label: PIP/PBP Layout
  kind: action
  command: "(PPP{layout})"
  params:
    - name: layout
      type: integer
      description: "0=POP-Bigger Left, 1=Over-Under Bigger Upper, 2=POP-Bigger Right, 3=Over-Under Bigger Lower, 4=PIP-Bottom Right, 5=PIP-Bottom Left, 6=PIP-Top Left, 7=PIP-Top Right"
- id: timing_detect
  label: Timing Detect Mode
  kind: action
  command: "(TMG{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Normal, 1=Wide"
- id: enable_main_hotkey
  label: Enable Main Source Hot-Key
  kind: action
  command: "(ESH{mode})"
  params:
    - name: mode
      type: integer
      description: "0=On, 1=Off (0/9 hotkeys to select source directly)"
- id: hotkey_vga1
  label: Set Hot-Key for VGA1
  kind: action
  command: "(MHK+VGA1{key})"
  params:
    - name: key
      type: integer
      description: "Number key (0-9) to assign. Example: (MHK+VGA18)"
- id: hotkey_vga2
  label: Set Hot-Key for VGA2
  kind: action
  command: "(MHK+VGA2{key})"
  params:
    - name: key
      type: integer
      description: "Number key (0-9) to assign"
- id: hotkey_bnc
  label: Set Hot-Key for BNC
  kind: action
  command: "(MHK+BNC1{key})"
  params:
    - name: key
      type: integer
      description: "Number key (0-9) to assign"
- id: hotkey_hdmi1
  label: Set Hot-Key for HDMI1
  kind: action
  command: "(MHK+HDM1{key})"
  params:
    - name: key
      type: integer
      description: "Number key (0-9) to assign"
- id: hotkey_hdmi2
  label: Set Hot-Key for HDMI2
  kind: action
  command: "(MHK+HDM2{key})"
  params:
    - name: key
      type: integer
      description: "Number key (0-9) to assign"
- id: hotkey_component
  label: Set Hot-Key for Component
  kind: action
  command: "(MHK+CON1{key})"
  params:
    - name: key
      type: integer
      description: "Number key (0-9) to assign"
- id: hotkey_svideo
  label: Set Hot-Key for S-Video
  kind: action
  command: "(MHK+SVDO{key})"
  params:
    - name: key
      type: integer
      description: "Number key (0-9) to assign"
- id: hotkey_composite
  label: Set Hot-Key for Composite
  kind: action
  command: "(MHK+COPS{key})"
  params:
    - name: key
      type: integer
      description: "Number key (0-9) to assign"
- id: source_key_function
  label: Source Key Function
  kind: action
  command: "(SKS{function})"
  params:
    - name: function
      type: integer
      description: "0=Change source, 1=List all sources (default), 2=Change source with Auto"

# --- MISC ---
- id: test_pattern
  label: Test Pattern
  kind: action
  command: "(ITP{pattern})"
  params:
    - name: pattern
      type: integer
      description: "0=Off, 1=Grid, 2=White, 3=Black, 4=Checkerboard, 5=Color Bars, 6=Red (Service), 7=Green (Service), 8=Blue (Service), 9=Yellow (Service), 10=Magenta (Service), 11=Cyan (Service). Grid/Color Bars may take up to 18s to leave."
- id: projector_status
  label: Projector Status
  kind: query
  command: "(SST?)"
  params: []
- id: color_wheel_index_2x
  label: Color Wheel Index 2x
  kind: action
  command: "(CWI+SPX2{index})"
  params:
    - name: index
      type: integer
      description: "Color wheel index for 2x speed. Service mode only."
- id: color_wheel_index_3x
  label: Color Wheel Index 3x
  kind: action
  command: "(CWI+SPX3{index})"
  params:
    - name: index
      type: integer
      description: "Color wheel index for 3x speed. Service mode only."
- id: factory_defaults
  label: Factory Defaults
  kind: action
  command: "(DEF 111)"
  params: []
- id: enter_service_code
  label: Enter Service Code
  kind: action
  command: '(UID"{username},{password}")'
  params:
    - name: username
      type: string
      description: "Service username (default: service)"
    - name: password
      type: string
      description: "Service password (default: service)"

# --- SERIAL-ONLY QUERIES ---
- id: serial_command_version
  label: Serial Command Version
  kind: query
  command: "(SIV?)"
  params: []
- id: last_serial_command_error
  label: Last Serial Command Error
  kind: query
  command: "(LCE?)"
  params: []
- id: last_system_error
  label: Last System Error
  kind: query
  command: "(LSE?)"
  params: []
- id: main_active_source
  label: Main Active Source
  kind: query
  command: "(MIF+ACTS?)"
  params: []
- id: main_signal_format
  label: Main Signal Format
  kind: query
  command: "(MIF+SGFT?)"
  params: []
- id: main_aspect_ratio
  label: Main Aspect Ratio
  kind: query
  command: "(MIF+APRT?)"
  params: []
- id: main_resolution
  label: Main Resolution
  kind: query
  command: "(MIF+RESL?)"
  params: []
- id: main_vert_refresh
  label: Main Vertical Refresh
  kind: query
  command: "(MIF+VREF?)"
  params: []
- id: main_horz_refresh
  label: Main Horizontal Refresh
  kind: query
  command: "(MIF+HREF?)"
  params: []
- id: main_pixel_clock
  label: Main Pixel Clock
  kind: query
  command: "(MIF+PIXC?)"
  params: []
- id: main_sync_type
  label: Main Sync Type
  kind: query
  command: "(MIF+SYNC?)"
  params: []
- id: main_color_space
  label: Main Color Space
  kind: query
  command: "(MIF+CLSP?)"
  params: []
- id: sec_active_source
  label: PIP Active Source
  kind: query
  command: "(SIF+ACTS?)"
  params: []
- id: sec_signal_format
  label: PIP Signal Format
  kind: query
  command: "(SIF+SGFT?)"
  params: []
- id: sec_aspect_ratio
  label: PIP Aspect Ratio
  kind: query
  command: "(SIF+APRT?)"
  params: []
- id: sec_resolution
  label: PIP Resolution
  kind: query
  command: "(SIF+RESL?)"
  params: []
- id: sec_vert_refresh
  label: PIP Vertical Refresh
  kind: query
  command: "(SIF+VREF?)"
  params: []
- id: sec_horz_refresh
  label: PIP Horizontal Refresh
  kind: query
  command: "(SIF+HREF?)"
  params: []
- id: sec_pixel_clock
  label: PIP Pixel Clock
  kind: query
  command: "(SIF+PIXC?)"
  params: []
- id: sec_sync_type
  label: PIP Sync Type
  kind: query
  command: "(SIF+SYNC?)"
  params: []
- id: sec_color_space
  label: PIP Color Space
  kind: query
  command: "(SIF+CLSP?)"
  params: []
- id: lamp1_hours
  label: Lamp 1 Hours
  kind: query
  command: "(LIF+LP1H?)"
  params: []
- id: lamp2_hours
  label: Lamp 2 Hours
  kind: query
  command: "(LIF+LP2H?)"
  params: []
- id: total_lamp_hours
  label: Total Lamp Hours
  kind: query
  command: "(LIF+LPTH?)"
  params: []
- id: lamp1_reset_count
  label: Lamp 1 Reset Count
  kind: query
  command: "(LIF+LP1R?)"
  params: []
- id: lamp2_reset_count
  label: Lamp 2 Reset Count
  kind: query
  command: "(LIF+LP2R?)"
  params: []
- id: model_name
  label: Model Name (Service)
  kind: query
  command: "(PIF+MDLN?)"
  params: []
- id: serial_number
  label: Serial Number (Service)
  kind: query
  command: "(PIF+SNUM?)"
  params: []
- id: native_resolution
  label: Native Resolution (Service)
  kind: query
  command: "(PIF+NERS?)"
  params: []
- id: firmware_version
  label: Firmware Version (Service)
  kind: query
  command: "(PIF+FWVS?)"
  params: []
- id: configuration_version
  label: Configuration Version (Service)
  kind: query
  command: "(PIF+CFVS?)"
  params: []
- id: boot_code_version
  label: Boot Code Version (Service)
  kind: query
  command: "(PIF+BCVS?)"
  params: []

# --- FUNCTIONS USED ONLY BY SERIAL COMMAND ---
- id: power_on
  label: Power On
  kind: action
  command: "(PWR1)"
  params: []
- id: power_off
  label: Power Off
  kind: action
  command: "(PWR0)"
  params: []
- id: rename_source_vga1
  label: Rename Source VGA1
  kind: action
  command: '(SNS+SRC0"{name}")'
  params:
    - name: name
      type: string
      description: "User-defined source name"
- id: rename_source_vga2
  label: Rename Source VGA2
  kind: action
  command: '(SNS+SRC1"{name}")'
  params:
    - name: name
      type: string
      description: "User-defined source name"
- id: rename_source_bnc
  label: Rename Source BNC
  kind: action
  command: '(SNS+SRC2"{name}")'
  params:
    - name: name
      type: string
      description: "User-defined source name"
- id: rename_source_hdmi1
  label: Rename Source HDMI1
  kind: action
  command: '(SNS+SRC3"{name}")'
  params:
    - name: name
      type: string
      description: "User-defined source name"
- id: rename_source_hdmi2
  label: Rename Source HDMI2
  kind: action
  command: '(SNS+SRC4"{name}")'
  params:
    - name: name
      type: string
      description: "User-defined source name"
- id: rename_source_component
  label: Rename Source Component
  kind: action
  command: '(SNS+SRC5"{name}")'
  params:
    - name: name
      type: string
      description: "User-defined source name"
- id: rename_source_svideo
  label: Rename Source S-Video
  kind: action
  command: '(SNS+SRC6"{name}")'
  params:
    - name: name
      type: string
      description: "User-defined source name"
- id: rename_source_composite
  label: Rename Source Video
  kind: action
  command: '(SNS+SRC7"{name}")'
  params:
    - name: name
      type: string
      description: "User-defined source name"
- id: key_code_entry
  label: Key-Code Entry
  kind: action
  command: "(KEY{code})"
  params:
    - name: code
      type: integer
      description: "Decimal IR keycode (POWER=0, MENU=19, ENTER=40, etc.; see Appendix-2 table)"
- id: shutter
  label: Shutter
  kind: action
  command: "(SHU{state})"
  params:
    - name: state
      type: integer
      description: "0=Open (Shutter off), 1=Closed (Shutter on, black screen)"
- id: osd_show
  label: OSD Show/Hide
  kind: action
  command: "(OSD{state})"
  params:
    - name: state
      type: integer
      description: "0=Hide, 1=Show"
```

## Feedbacks
```yaml
# Observed via SST! multi-line response. Each line returns (SST!NNN  "value"  "label").
# Individual subcode queries (MIF+RESL?, SIF+RESL?, etc.) return the same field directly.
- id: model_name
  type: string
  description: "SST!000 / PIF+MDLN? - model name string"
- id: serial_number
  type: string
  description: "SST!001 / PIF+SNUM? - projector serial number"
- id: native_resolution
  type: string
  description: "SST!002 / PIF+NERS? - native panel resolution"
- id: main_input
  type: string
  description: "SST!003 - currently selected main input name"
- id: main_signal_format
  type: string
  description: "SST!004 / MIF+SGFT? - e.g. Digital / Analog"
- id: main_pixel_clock
  type: string
  description: "SST!005 / MIF+PIXC? - pixel clock with MHz unit"
- id: main_sync_type
  type: string
  description: "SST!006 / MIF+SYNC? - Separate / Composite / SOG / etc."
- id: main_horz_refresh
  type: string
  description: "SST!007 / MIF+HREF? - horizontal refresh with kHz unit"
- id: main_vert_refresh
  type: string
  description: "SST!008 / MIF+VREF? - vertical refresh with Hz unit"
- id: pip_input
  type: string
  description: "SST!009 - currently selected PIP/PBP input name"
- id: pip_signal_format
  type: string
  description: "SST!010 / SIF+SGFT?"
- id: pip_pixel_clock
  type: string
  description: "SST!011 / SIF+PIXC?"
- id: pip_sync_type
  type: string
  description: "SST!012 / SIF+SYNC?"
- id: pip_horz_refresh
  type: string
  description: "SST!013 / SIF+HREF?"
- id: pip_vert_refresh
  type: string
  description: "SST!014 / SIF+VREF?"
- id: lamp_power_setting
  type: string
  description: "SST!015 - e.g. \"330 W\""
- id: current_lamp
  type: string
  description: "SST!016 - \"Lamp 1\" / \"Lamp 2\" / \"Both\""
- id: lamp1_hours
  type: string
  description: "SST!017 / LIF+LP1H? - with \"Hours\" unit"
- id: lamp2_hours
  type: string
  description: "SST!018 / LIF+LP2H? - with \"Hours\" unit"
- id: standby_mode
  type: string
  description: "SST!019 - \"1W Mode\" / \"Communication\""
- id: lens_lock_setting
  type: string
  description: "SST!020 - \"Allow\" / \"Locked\""
- id: ip_address
  type: string
  description: "SST!021 - current IP"
- id: dhcp_state
  type: string
  description: "SST!022 - \"On\" / \"Off\""
- id: main_color_space
  type: string
  description: "MIF+CLSP? - current color space"
- id: main_resolution
  type: string
  description: "MIF+RESL? - e.g. \"1920x1200\""
- id: main_aspect_ratio
  type: string
  description: "MIF+APRT?"
- id: main_active_source
  type: string
  description: "MIF+ACTS?"
- id: pip_color_space
  type: string
  description: "SIF+CLSP?"
- id: pip_resolution
  type: string
  description: "SIF+RESL?"
- id: pip_aspect_ratio
  type: string
  description: "SIF+APRT?"
- id: pip_active_source
  type: string
  description: "SIF+ACTS?"
- id: total_lamp_hours
  type: string
  description: "LIF+LPTH? - sum of all lamp hours"
- id: lamp1_reset_count
  type: string
  description: "LIF+LP1R? - number of times Lamp 1 hours have been reset"
- id: lamp2_reset_count
  type: string
  description: "LIF+LP2R? - number of times Lamp 2 hours have been reset"
- id: firmware_version
  type: string
  description: "PIF+FWVS? - service-mode only"
- id: configuration_version
  type: string
  description: "PIF+CFVS? - service-mode only"
- id: boot_code_version
  type: string
  description: "PIF+BCVS? - service-mode only"
- id: serial_command_version
  type: string
  description: "SIV? - E Series protocol version"
- id: last_serial_command_error
  type: string
  description: "LCE? - error text from the most recent failed serial command"
- id: last_system_error
  type: integer
  description: "LSE? - coded: 1=lamp did not strike (5 attempts), 3=lamp went out, 4=fan failure, 5=over temperature"
```

## Variables
```yaml
# Source documents settings as discrete command-parameter actions rather than free
# variables; no separately settable parameters that are not already an action.
# UNRESOLVED: section kept for spec completeness; no source-supported entries.
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited notification messages;
# all status flows are pull (request/reply). Section kept for spec completeness.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step user-defined sequences.
# The serial protocol itself is stateless per-message; sequencing is the
# responsibility of the controller.
```

## Safety
```yaml
confirmation_required_for:
  - factory_defaults      # DEF 111 - full factory wipe, requires the literal "111" guard
  - reset_lamp1_hours
  - reset_lamp2_hours
  - reset_both_lamp_hours
interlocks:
  - digital_horz_shift_requires_digital_zoom   # source: DSH disabled until SIZ applied
  - digital_vert_shift_requires_digital_zoom   # source: DSV disabled until SIZ applied
  - whisper_mode_incompatible_with_high_altitude  # source: WSP not compatible with HAT
# UNRESOLVED: high-voltage lamp / thermal warnings are not detailed in this protocol
# document; they would normally appear in the projector safety manual, not here.
```

## Notes

- **Message wrapper:** every command and reply is enclosed in parentheses. Leading `#` (e.g. `#(PWR1)`) requests a full-acknowledgement echo from the projector; acknowledgement is redundant on requests that already produce a reply.
- **Modifiers:** for any command allowing `n`/`p`, `n` advances to the next defined value and `p` goes to the previous one (e.g. `(OVS n)` from Off goes to Zoom; `(OVS p)` from Crop goes to Zoom).
- **Request format:** `(CODE?)` or `(CODE+SUBCODE?)` for queries; reply format is `(CODE!data)` or `(CODE+SUBCODE!data)`.
- **Errors:** a syntax or parameter error returns `(ITP)- (65535 00000 ERR00005 "ITP: Too Few Parameters")` style messages — `ITP` is the example code, the format applies to any rejected command.
- **Service mode:** `PIF*`, `CWI*`, and `DEF` are only available after `UID` login with a service credential. Service mode clears on power-off.
- **Partial messages:** if a new start character `(` is received before the previous message's end character `)`, the previous (partial) message is discarded.
- **Cable pinout for RS-232:** null standard, 9-pin female on both ends. Pin 2↔3 crossed, pin 5↔5 straight.
- **Test pattern caveat:** switching away from the Grid (ITP1) or Color Bars (ITP5) test patterns can take up to 18 seconds.
- **Standby interaction:** when `PWR+STBM` is `0` (1W mode), the projector cannot be powered on via UART/WEB/USB. Set standby to `1` (Communication mode, ~20W) to allow serial power-on.
- **Auth:** this document describes a local-protocol serial surface; there is no network login, no API key, and no token. The PIN (PIV/PCG) is a local UI lockout, not a network authentication mechanism.
- **Default subnet / gateway / hostname values:** the source's example values (`192.168.000.001` / `255.255.255.000` / `DWU670-E`) appear to be illustrative of a typical install rather than factory defaults; they should be read as examples of payload format, not as the projector's own defaults.

<!-- UNRESOLVED: TCP port for the Ethernet interface is not stated in this document. -->
<!-- UNRESOLVED: firmware version compatibility ranges across CP 2210/2215/2230/2000M not stated. -->
<!-- UNRESOLVED: full set of baud rates the hardware supports beyond those listed for BDR (0..7) not stated. -->
<!-- UNRESOLVED: edge enhancement (EDG) and white peaking (WPK) numeric ranges not explicitly stated. -->

## Provenance

```yaml
source_domains:
  - christiedigital.com
  - manualslib.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-100410-08-christie-lit-man-usr-cp2210.pdf
  - https://www.manualslib.com/manual/816593/Christie-Cp-2210.html
retrieved_at: 2026-05-14T21:23:46.567Z
last_checked_at: 2026-06-02T17:21:52.041Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:52.041Z
matched_actions: 153
action_count: 153
confidence: medium
summary: "All 153 spec actions matched literal command codes in source; transport parameters (115200 baud, 8N1) verified; bidirectional command coverage complete. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port for the Ethernet interface not stated in source"
- "TCP port not stated in source"
- "section kept for spec completeness; no source-supported entries."
- "source does not document any unsolicited notification messages;"
- "source does not document any multi-step user-defined sequences."
- "high-voltage lamp / thermal warnings are not detailed in this protocol"
- "TCP port for the Ethernet interface is not stated in this document."
- "firmware version compatibility ranges across CP 2210/2215/2230/2000M not stated."
- "full set of baud rates the hardware supports beyond those listed for BDR (0..7) not stated."
- "edge enhancement (EDG) and white peaking (WPK) numeric ranges not explicitly stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
