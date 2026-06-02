---
spec_id: admin/christie-e-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie E Series Projector Control Spec"
manufacturer: Christie
model_family: "E Series"
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - "E Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
retrieved_at: 2026-04-30T04:26:22.212Z
last_checked_at: 2026-06-02T21:41:08.679Z
generated_at: 2026-06-02T21:41:08.679Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:08.679Z
  matched_actions: 153
  action_count: 153
  confidence: medium
  summary: "All 153 spec actions have verbatim wire-token matches in the source; transport fully confirmed; coverage ratio 1.00. (1 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Christie E Series Projector Control Spec

## Summary
Serial (RS-232) ASCII command protocol for controlling Christie E Series projectors (e.g. DWU670-E). Messages are wrapped in parentheses, use 3-letter function codes with optional 4-letter subcodes, and support Set, Request, and Reply message types. The protocol also exposes the same commands over Ethernet but the documented message format is identical.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # default; selectable via BDR command (2400/4800/9600/14400/19200/38400/57600/115200)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure for normal commands. Service-mode commands require UID login (see Notes).
```

## Traits
```yaml
- powerable       # inferred from PWR on/off commands
- routable        # inferred from SIN input switching commands
- queryable       # inferred from many (Code?) request commands
- levelable       # inferred from BRT, CON, CLR and other 0-100 commands
```

## Actions
```yaml
# === Size & Position ===
- id: szp
  label: Size Presets
  kind: action
  command: "(SZP{value})"
  params:
    - name: value
      type: integer
      description: "0=Auto, 1=Native, 2=4:3, 3=LetterBox, 4=Full Size, 5=Full Width, 6=Full Height"

- id: ovs
  label: Overscan
  kind: action
  command: "(OVS{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Zoom, 2=Crop"

- id: pxp
  label: Pixel Phase
  kind: action
  command: "(PXP{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: pxt
  label: Pixel Track
  kind: action
  command: "(PXT{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: hor
  label: Horizontal Position
  kind: action
  command: "(HOR{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: vrt
  label: Vertical Position
  kind: action
  command: "(VRT{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: wrp_hkst
  label: Horizontal Keystone
  kind: action
  command: "(WRP+HKST{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: wrp_vkst
  label: Vertical Keystone
  kind: action
  command: "(WRP+VKST{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: hpc
  label: Horizontal Pincushion
  kind: action
  command: "(HPC{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: vpc
  label: Vertical Pincushion
  kind: action
  command: "(VPC{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: siz
  label: Digital Zoom
  kind: action
  command: "(SIZ{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 100"

- id: dsh
  label: Digital Horizontal Shift
  kind: action
  command: "(DSH{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50; requires Digital Zoom to be applied first"

- id: dsv
  label: Digital Vertical Shift
  kind: action
  command: "(DSV{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50; requires Digital Zoom to be applied first"

- id: aim
  label: Auto Image
  kind: action
  command: "(AIM1)"

# === Image Settings ===
- id: brt
  label: Brightness
  kind: action
  command: "(BRT{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: con
  label: Contrast
  kind: action
  command: "(CON{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: csp
  label: Color Space
  kind: action
  command: "(CSP{value})"
  params:
    - name: value
      type: integer
      description: "0=RGB, 1=REC709, 2=REC601, 3=RGB Video, 4=Auto"

- id: dtl
  label: Detail (Sharpness)
  kind: action
  command: "(DTL{value})"
  params:
    - name: value
      type: integer
      description: "0=Maximum, 1=High, 2=Normal, 3=Low, 4=Minimum"

- id: clr
  label: Color (Saturation)
  kind: action
  command: "(CLR{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: tnt
  label: Tint
  kind: action
  command: "(TNT{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50; analog NTSC sources only"

- id: nrd
  label: Noise Reduction
  kind: action
  command: "(NRD{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 0"

- id: ftc
  label: Flesh Tone Correction
  kind: action
  command: "(FTC{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 0"

- id: vbl
  label: Video Black Level
  kind: action
  command: "(VBL{value})"
  params:
    - name: value
      type: integer
      description: "0=IRE off, 1=IRE on"

- id: fmd
  label: Detect Film
  kind: action
  command: "(FMD{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: clc
  label: Closed Captions
  kind: action
  command: "(CLC{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=CC1, 2=CC2"

- id: rog
  label: Red Gain
  kind: action
  command: "(ROG{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: gog
  label: Green Gain
  kind: action
  command: "(GOG{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: bog
  label: Blue Gain
  kind: action
  command: "(BOG{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: roo
  label: Red Offset
  kind: action
  command: "(ROO{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: goo
  label: Green Offset
  kind: action
  command: "(GOO{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: boo
  label: Blue Offset
  kind: action
  command: "(BOO{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: syt
  label: Sync Threshold (SOG)
  kind: action
  command: "(SYT{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"

- id: gor
  label: Reset RGB Gain/Offset
  kind: action
  command: "(GOR1)"

- id: pst
  label: Picture Setting
  kind: action
  command: "(PST{value})"
  params:
    - name: value
      type: integer
      description: "0=Presentation, 1=Video, 2=Bright, 3=Whiteboard, 4=Blackboard, 5=Beige Wall, 6=User"

- id: pst_user
  label: Store Picture Settings to User Mode
  kind: action
  command: "(PST+USER1)"

- id: dim
  label: DynamicBlack
  kind: action
  command: "(DIM{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: bgc
  label: Gamma Curve
  kind: action
  command: "(BGC{value})"
  params:
    - name: value
      type: integer
      description: "0=Video, 1=Film, 2=Bright, 3=CRT"

- id: bcl
  label: BrilliantColor
  kind: action
  command: "(BCL{value})"
  params:
    - name: value
      type: integer
      description: "0=Normal Look, 1=Bright Look"

- id: wpk
  label: White Peaking
  kind: action
  command: "(WPK{value})"
  params:
    - name: value
      type: integer
      description: "amount of white processing through data path"

- id: cci
  label: Color Temperature
  kind: action
  command: "(CCI{value})"
  params:
    - name: value
      type: integer
      description: "0=Warmest, 1=Warm, 2=Cool, 3=Bright"

- id: edg
  label: Edge Enhancement
  kind: action
  command: "(EDG{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Normal, 2=Maximum"

- id: cws
  label: Color Wheel Speed
  kind: action
  command: "(CWS{value})"
  params:
    - name: value
      type: integer
      description: "0=2x setting, 1=3x setting"

# === Configuration ===
- id: loc_lang
  label: Language
  kind: action
  command: "(LOC+LANG{value})"
  params:
    - name: value
      type: integer
      description: "0=English, 1=Chinese, 2=French, 3=German, 4=Italian, 5=Japanese, 6=Korean, 7=Russian, 8=Spanish"

- id: fcs
  label: Focus
  kind: action
  command: "(FCS{modifier})"
  params:
    - name: modifier
      type: string
      description: "n=increase by 1, p=decrease by 1, or absolute value"

- id: zom
  label: Zoom
  kind: action
  command: "(ZOM{modifier})"
  params:
    - name: modifier
      type: string
      description: "n=increase by 1, p=decrease by 1, or absolute value"

- id: lvo
  label: Lens Vertical Shift
  kind: action
  command: "(LVO{modifier})"
  params:
    - name: modifier
      type: string
      description: "n=increase by 1, p=decrease by 1, or absolute value"

- id: lho
  label: Lens Horizontal Shift
  kind: action
  command: "(LHO{modifier})"
  params:
    - name: modifier
      type: string
      description: "n=increase by 1, p=decrease by 1, or absolute value"

- id: lcb_lock
  label: Lock Lens Motors
  kind: action
  command: "(LCB+LOCK{value})"
  params:
    - name: value
      type: integer
      description: "0=Allow, 1=Locked"

- id: lcb_home
  label: Lens Center (Calibrate & Home)
  kind: action
  command: "(LCB+HOME1)"

- id: cel
  label: Ceiling Mount
  kind: action
  command: "(CEL{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Auto (G-sensor)"

- id: sor
  label: Rear Projection
  kind: action
  command: "(SOR{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: msh
  label: Menu Shift Horizontal
  kind: action
  command: "(MSH{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 0"

- id: msv
  label: Menu Shift Vertical
  kind: action
  command: "(MSV{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 0"

- id: mbe_user
  label: Show Messages (Message Box Enable)
  kind: action
  command: "(MBE+USER{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: ost
  label: Menu Transparency
  kind: action
  command: "(OST{value})"
  params:
    - name: value
      type: integer
      description: "0-90, default 0"

- id: sps_slct
  label: Splash Screen
  kind: action
  command: "(SPS+SLCT{value})"
  params:
    - name: value
      type: integer
      description: "0=Factory Logo, 1=Blue, 2=Black, 3=White"

- id: piv
  label: PIN Protect
  kind: action
  command: '(PIV"XXXXX")'
  params:
    - name: XXXXX
      type: string
      description: "5-digit PIN; toggles PIN protect when correct"

- id: pcg
  label: Change PIN
  kind: action
  command: '(PCG"OOOOO,NNNNN")'
  params:
    - name: OOOOO
      type: string
      description: "5-digit old password"
    - name: NNNNN
      type: string
      description: "5-digit new password"

- id: pwr_stbm
  label: Standby Mode
  kind: action
  command: "(PWR+STBM{value})"
  params:
    - name: value
      type: integer
      description: "0=1W Mode, 1=Communication"

- id: apw
  label: Auto Power On
  kind: action
  command: "(APW{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: ash
  label: Auto Shutdown
  kind: action
  command: "(ASH{value})"
  params:
    - name: value
      type: integer
      description: "0=Off/Never, 1=5min, 2=10min, 3=15min, 4=20min, 5=25min, 6=30min"

- id: slp
  label: Sleep Timer
  kind: action
  command: "(SLP{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=2 Hrs, 2=4 Hrs, 3=6 Hrs"

- id: hat
  label: High Altitude
  kind: action
  command: "(HAT{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: net_dhcp
  label: Network DHCP
  kind: action
  command: "(NET+DHCP{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: net_eth0
  label: Network IP Address
  kind: action
  command: '(NET+ETH0"X.X.X.X")'
  params:
    - name: ip
      type: string
      description: "IP address, e.g. 192.168.000.001"

- id: net_sub0
  label: Network Subnet Mask
  kind: action
  command: '(NET+SUB0"X.X.X.X")'

- id: net_gate
  label: Network Default Gateway
  kind: action
  command: '(NET+GATE"X.X.X.X")'

- id: net_host
  label: Network Projector Name
  kind: action
  command: '(NET+HOST"name")'

- id: net_mac0
  label: Network MAC Address
  kind: action
  command: '(NET+MAC0"XX:XX:XX:XX:XX:XX")'

- id: net_show
  label: Network Show Messages
  kind: action
  command: "(NET+SHOW{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: net_rstr
  label: Network Restart
  kind: action
  command: "(NET+RSTR1)"

- id: net_rset
  label: Network Factory Reset
  kind: action
  command: "(NET+RSET)"

- id: bdr
  label: Serial Port Baud Rate
  kind: action
  command: "(BDR{value})"
  params:
    - name: value
      type: integer
      description: "0=2400, 1=4800, 2=9600, 3=14400, 4=19200, 5=38400, 6=57600, 7=115200"

- id: sec
  label: Serial Port Echo
  kind: action
  command: "(SEC{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: vtt
  label: 12V Trigger
  kind: action
  command: "(VTT{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: hks
  label: Hot-Key Settings
  kind: action
  command: "(HKS{value})"
  params:
    - name: value
      type: integer
      description: "0=Blank Screen, 1=Aspect Ratio, 2=Freeze Screen, 3=Projector Info, 4=Overscan, 5=Closed Captions"

# === Lamp ===
- id: lpm
  label: Lamp Power
  kind: action
  command: "(LPM{value})"
  params:
    - name: value
      type: integer
      description: "0-10 (280W, 285W, 290W, 295W, 300W, 305W, 310W, 315W, 320W, 325W, 330W)"

- id: lop
  label: Current Lamp
  kind: action
  command: "(LOP{value})"
  params:
    - name: value
      type: integer
      description: "1=Only Lamp 1, 2=Only Lamp 2, 3=Both Lamps"

- id: wsp
  label: Whisper Mode
  kind: action
  command: "(WSP{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Lamp1, 2=Lamp2, 3=Auto"

- id: lsf
  label: Lamp Auto Switch Mode
  kind: action
  command: "(LSF{value})"
  params:
    - name: value
      type: integer
      description: "0=Switch on lamp fail only, 1=Switch every power on, 2=Switch after N hours"

- id: lsf_time
  label: Lamp Auto Switch Hours
  kind: action
  command: "(LSF+TIME{hours})"
  params:
    - name: hours
      type: integer
      description: "Number of hours before lamp auto-switch"

- id: lif_lp1h
  label: Get Lamp 1 Hours
  kind: query
  command: "(LIF+LP1H?)"

- id: lif_lp2h
  label: Get Lamp 2 Hours
  kind: query
  command: "(LIF+LP2H?)"

- id: lif_lpth
  label: Get Total Lamp Hours
  kind: query
  command: "(LIF+LPTH?)"

- id: lif_lp1r
  label: Get Lamp 1 Reset Times
  kind: query
  command: "(LIF+LP1R?)"

- id: lif_lp2r
  label: Get Lamp 2 Reset Times
  kind: query
  command: "(LIF+LP2R?)"

- id: lpl
  label: Lamp Life Warning
  kind: action
  command: "(LPL{hours})"
  params:
    - name: hours
      type: integer
      description: "Number of hours at which to warn; 0=feature off (default)"

- id: lpc_lmp1
  label: Reset Lamp 1 Hours
  kind: action
  command: "(LPC+LMP11)"

- id: lpc_lmp2
  label: Reset Lamp 2 Hours
  kind: action
  command: "(LPC+LMP21)"

- id: lpc_both
  label: Reset Both Lamp Hours
  kind: action
  command: "(LPC+BOTH1)"

# === Input Switching & PIP ===
- id: sin
  label: Select Source (Main, by index)
  kind: action
  command: "(SIN{value})"
  params:
    - name: value
      type: integer
      description: "0=VGA1, 1=VGA2, 2=RGBHV (5-wire BNC), 3=HDMI 1, 4=HDMI 2, 5=Component, 6=S-Video, 7=Composite"

- id: sin_main
  label: Set Main Source by name
  kind: action
  command: "(SIN+MAIN{value})"
  params:
    - name: value
      type: integer
      description: "input number for main image"

- id: sin_piip
  label: Set PIP Source
  kind: action
  command: "(SIN+PIIP{value})"
  params:
    - name: value
      type: integer
      description: "input number for PIP image"

- id: pip
  label: PIP/PBP Enable
  kind: action
  command: "(PIP{value})"
  params:
    - name: value
      type: integer
      description: "0=Disable, 1=Enable"

- id: pps
  label: PIP/PBP Swap
  kind: action
  command: "(PPS1)"

- id: phs
  label: PIP/PBP Size
  kind: action
  command: "(PHS{value})"
  params:
    - name: value
      type: integer
      description: "0=Small, 1=Medium, 2=Large"

- id: ppp
  label: PIP/PBP Layout
  kind: action
  command: "(PPP{value})"
  params:
    - name: value
      type: integer
      description: "0=POP Bigger Left, 1=Over-Under Bigger Upper, 2=POP Bigger Right, 3=Over-Under Bigger Lower, 4=PIP-Bottom Right, 5=PIP-Bottom Left, 6=PIP-Top Left, 7=PIP-Top Right"

- id: tmg
  label: Timing Detect Mode
  kind: action
  command: "(TMG{value})"
  params:
    - name: value
      type: integer
      description: "0=Normal, 1=Wide"

- id: mif_acts
  label: Get Main Active Source
  kind: query
  command: "(MIF+ACTS?)"

- id: mif_sgft
  label: Get Main Signal Format
  kind: query
  command: "(MIF+SGFT?)"

- id: mif_aprt
  label: Get Main Aspect Ratio
  kind: query
  command: "(MIF+APRT?)"

- id: mif_resl
  label: Get Main Resolution
  kind: query
  command: "(MIF+RESL?)"

- id: mif_vref
  label: Get Main Vert Refresh
  kind: query
  command: "(MIF+VREF?)"

- id: mif_href
  label: Get Main Horz Refresh
  kind: query
  command: "(MIF+HREF?)"

- id: mif_pixc
  label: Get Main Pixel Clock
  kind: query
  command: "(MIF+PIXC?)"

- id: mif_sync
  label: Get Main Sync Type
  kind: query
  command: "(MIF+SYNC?)"

- id: mif_clsp
  label: Get Main Color Space
  kind: query
  command: "(MIF+CLSP?)"

- id: sif_acts
  label: Get PIP/PBP Active Source
  kind: query
  command: "(SIF+ACTS?)"

- id: sif_sgft
  label: Get PIP/PBP Signal Format
  kind: query
  command: "(SIF+SGFT?)"

- id: sif_aprt
  label: Get PIP/PBP Aspect Ratio
  kind: query
  command: "(SIF+APRT?)"

- id: sif_resl
  label: Get PIP/PBP Resolution
  kind: query
  command: "(SIF+RESL?)"

- id: sif_vref
  label: Get PIP/PBP Vert Refresh
  kind: query
  command: "(SIF+VREF?)"

- id: sif_href
  label: Get PIP/PBP Horz Refresh
  kind: query
  command: "(SIF+HREF?)"

- id: sif_pixc
  label: Get PIP/PBP Pixel Clock
  kind: query
  command: "(SIF+PIXC?)"

- id: sif_sync
  label: Get PIP/PBP Sync Type
  kind: query
  command: "(SIF+SYNC?)"

- id: sif_clsp
  label: Get PIP/PBP Color Space
  kind: query
  command: "(SIF+CLSP?)"

- id: esh
  label: Main Source Hot-Key Enable
  kind: action
  command: "(ESH{value})"
  params:
    - name: value
      type: integer
      description: "0=On, 1=Off"

- id: mhk_vga1
  label: Hot-Key for VGA1
  kind: action
  command: "(MHK+VGA1{key})"
  params:
    - name: key
      type: integer
      description: "number-key digit to assign"

- id: mhk_vga2
  label: Hot-Key for VGA2
  kind: action
  command: "(MHK+VGA2{key})"
  params:
    - name: key
      type: integer
      description: "number-key digit to assign"

- id: mhk_bnc1
  label: Hot-Key for BNC
  kind: action
  command: "(MHK+BNC1{key})"
  params:
    - name: key
      type: integer
      description: "number-key digit to assign"

- id: mhk_hdm1
  label: Hot-Key for HDMI1
  kind: action
  command: "(MHK+HDM1{key})"
  params:
    - name: key
      type: integer
      description: "number-key digit to assign"

- id: mhk_hdm2
  label: Hot-Key for HDMI2
  kind: action
  command: "(MHK+HDM2{key})"
  params:
    - name: key
      type: integer
      description: "number-key digit to assign"

- id: mhk_con1
  label: Hot-Key for Component
  kind: action
  command: "(MHK+CON1{key})"
  params:
    - name: key
      type: integer
      description: "number-key digit to assign"

- id: mhk_svdo
  label: Hot-Key for S-Video
  kind: action
  command: "(MHK+SVDO{key})"
  params:
    - name: key
      type: integer
      description: "number-key digit to assign"

- id: mhk_cops
  label: Hot-Key for Composite
  kind: action
  command: "(MHK+COPS{key})"
  params:
    - name: key
      type: integer
      description: "number-key digit to assign"

- id: sks
  label: Source Key Function
  kind: action
  command: "(SKS{value})"
  params:
    - name: value
      type: integer
      description: "0=Change source, 1=List all sources, 2=Change source with Auto"

# === Miscellaneous ===
- id: itp
  label: Test Pattern
  kind: action
  command: "(ITP{value})"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Grid, 2=White, 3=Black, 4=Checkerboard, 5=Color bars, 6=Red (Service), 7=Green (Service), 8=Blue (Service), 9=Yellow (Service), 10=Magenta (Service), 11=Cyan (Service)"

- id: sst
  label: Projector Status
  kind: query
  command: "(SST?)"
  # Returns a series of (SST!NNN "value" "label") replies, index 000..022 (model, serial, native res, main input, main signal format, main pixel, main sync, main h-refresh, main v-refresh, PIP input, PIP signal format, PIP pixel, PIP sync, PIP h-refresh, PIP v-refresh, lamp power, current lamp, lamp1 hours, lamp2 hours, standby mode, lens lock, IP, DHCP)

# === Service ===
- id: cwi_spx2
  label: Color Wheel Index 2x (Service)
  kind: action
  command: "(CWI+SPX2{index})"
  params:
    - name: index
      type: integer
      description: "service mode only"

- id: cwi_spx3
  label: Color Wheel Index 3x (Service)
  kind: action
  command: "(CWI+SPX3{index})"
  params:
    - name: index
      type: integer
      description: "service mode only"

- id: pif_mdln
  label: Get Model Name (Service)
  kind: query
  command: "(PIF+MDLN?)"

- id: pif_snum
  label: Get Serial Number (Service)
  kind: query
  command: "(PIF+SNUM?)"

- id: pif_ners
  label: Get Native Resolution (Service)
  kind: query
  command: "(PIF+NERS?)"

- id: pif_fwvs
  label: Get Firmware Version (Service)
  kind: query
  command: "(PIF+FWVS?)"

- id: pif_cfvs
  label: Get Configuration Version (Service)
  kind: query
  command: "(PIF+CFVS?)"

- id: pif_bcvs
  label: Get Boot Code Version (Service)
  kind: query
  command: "(PIF+BCVS?)"

- id: def
  label: Factory Defaults (Service)
  kind: action
  command: "(DEF 111)"
  # requires service mode login

- id: uid
  label: Enter Service Code
  kind: action
  command: '(UID"username,password")'
  params:
    - name: username
      type: string
      description: "service username"
    - name: password
      type: string
      description: "service password"
  # Service mode auto-disables on power off

# === Functions used only by serial ===
- id: siv
  label: Get Serial Command Version
  kind: query
  command: "(SIV?)"

- id: lce
  label: Get Last Serial Command Error
  kind: query
  command: "(LCE?)"

- id: lse
  label: Get Last System Error
  kind: query
  command: "(LSE?)"
  # Returns: 1=lamp did not strike after 5 attempts, 3=lamp went out unexpectedly, 4=fan failure, 5=over temperature

- id: pwr
  label: Power On/Off
  kind: action
  command: "(PWR{value})"
  params:
    - name: value
      type: integer
      description: "0=Off (Standby), 1=On (Lamps On)"

- id: sns_src0
  label: Rename Source VGA1
  kind: action
  command: '(SNS+SRC0"name")'
  params:
    - name: name
      type: string
      description: "new user-defined source name"

- id: sns_src1
  label: Rename Source VGA2
  kind: action
  command: '(SNS+SRC1"name")'
  params:
    - name: name
      type: string
      description: "new user-defined source name"

- id: sns_src2
  label: Rename Source BNC
  kind: action
  command: '(SNS+SRC2"name")'
  params:
    - name: name
      type: string
      description: "new user-defined source name"

- id: sns_src3
  label: Rename Source HDMI1
  kind: action
  command: '(SNS+SRC3"name")'
  params:
    - name: name
      type: string
      description: "new user-defined source name"

- id: sns_src4
  label: Rename Source HDMI2
  kind: action
  command: '(SNS+SRC4"name")'
  params:
    - name: name
      type: string
      description: "new user-defined source name"

- id: sns_src5
  label: Rename Source Component
  kind: action
  command: '(SNS+SRC5"name")'
  params:
    - name: name
      type: string
      description: "new user-defined source name"

- id: sns_src6
  label: Rename Source S-Video
  kind: action
  command: '(SNS+SRC6"name")'
  params:
    - name: name
      type: string
      description: "new user-defined source name"

- id: sns_src7
  label: Rename Source Video (Composite)
  kind: action
  command: '(SNS+SRC7"name")'
  params:
    - name: name
      type: string
      description: "new user-defined source name"

- id: key
  label: Key-Code Entry (IR emulation)
  kind: action
  command: "(KEY{keycode})"
  params:
    - name: keycode
      type: integer
      description: "decimal keycode (0=Power, 19=Menu, 20=Exit, 38=Up, 39=Left, 40=Enter, 41=Right, 42=Down, 48=Input, see Appendix 2)"

- id: shu
  label: Shutter
  kind: action
  command: "(SHU{value})"
  params:
    - name: value
      type: integer
      description: "0=Open (shutter off), 1=Closed (shutter on, black screen)"

- id: osd
  label: OSD Show/Hide
  kind: action
  command: "(OSD{value})"
  params:
    - name: value
      type: integer
      description: "0=Hide, 1=Show"
```

## Feedbacks
```yaml
# Replies mirror the request form: (Code+Subcode!value) or (Code Data) for set confirms.
# Example full SST status stream (000..022) is documented in the source. Single-status
# replies are described per-action above.
- id: szp_reply
  type: integer
  notes: "(SZP!value) - current size preset (0-6)"
- id: pwr_state
  type: enum
  values: [on, standby]
  notes: "inferred from PWR command semantics; source uses (PWR1)/(PWR0) only"
- id: sst_status
  type: object
  notes: "SST? returns ordered (SST!NNN \"value\" \"label\") rows 000-022 (model, serial, native res, main input, main signal format, main pixel clock, main sync, main h-refresh, main v-refresh, PIP input, PIP signal format, PIP pixel, PIP sync, PIP h-refresh, PIP v-refresh, lamp power, current lamp, lamp1 hours, lamp2 hours, standby mode, lens lock, IP, DHCP)"
- id: lse_code
  type: enum
  values: ["1=lamp did not strike after 5 attempts", "3=lamp went out unexpectedly", "4=fan failure", "5=over temperature"]
```

## Variables
```yaml
# All 0-100 level/image parameters and enums are exposed as action parameters (above)
# rather than settable Variables, per AI4AV convention. No continuous analog
# variables are defined in the source.
[]
```

## Events
```yaml
# The source does not describe unsolicited notifications. Status is query-only via (SST?) and per-field (Code?) requests.
[]
```

## Macros
```yaml
# No multi-step sequences are explicitly defined in the source.
[]
```

## Safety
```yaml
# No safety warnings, interlocks, or power-on sequencing requirements stated in source.
# Standby-mode selection (PWR+STBM) affects wake-on-serial capability, but the source
# does not characterize this as a safety interlock.
[]
```

## Notes
- Message format: every command is wrapped in parentheses, e.g. `(PWR1)`. A space between code and parameter is optional (`(PWR 1)`). Modifiers `n` and `p` mean "next value" / "previous value" for commands that list a discrete set.
- Subcode syntax: code+subcode separated by `+`, e.g. `(NET+DHCP0)`, `(LIF+LP1H?)`. If no subcode, the `+` is omitted.
- Request/reply symbols: `?` for query (controller), `!` for reply (projector). Set messages have neither.
- Acknowledgement: prefix `#` before the function code to request a full acknowledgement echo.
- The same ASCII command set also works over Ethernet (TCP); the document explicitly mentions ETHERNET as an alternative port.
- Default baud 115200, but selectable at runtime via `(BDR0..7)`. The serial port can echo its own characters back when `(SEC1)` is set.
- "Service Mode" is required for some commands (DEF, PIF, CWI, some ITP patterns, red/green/blue/yellow/magenta/cyan test patterns). Enter with `(UID"service,service")` (or service credentials). Service Mode auto-disables on power off.
- `(ITP)` Grid and Color Bars test patterns take up to 18 seconds to switch away from.
- `(KEY)` command emulates IR remote; keycodes are decimal. Two known quirks: Enter does not select items in a drop-down; Exit closes a drop-down rather than the parent menu.
- Multiple baud rates are listed in the BDR command examples (2400..115200), all selectable at runtime.
- Default PIN is `12345` (used by PIV/PCG).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
retrieved_at: 2026-04-30T04:26:22.212Z
last_checked_at: 2026-06-02T21:41:08.679Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:08.679Z
matched_actions: 153
action_count: 153
confidence: medium
summary: "All 153 spec actions have verbatim wire-token matches in the source; transport fully confirmed; coverage ratio 1.00. (1 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
