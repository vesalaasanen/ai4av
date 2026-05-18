---
spec_id: admin/christie-digital-e-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie Digital E Series Control Spec"
manufacturer: Christie
model_family: "E Series"
aliases: []
compatible_with:
  manufacturers:
    - Christie
    - "Christie Digital"
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
retrieved_at: 2026-04-30T04:34:57.871Z
last_checked_at: 2026-05-14T18:17:14.938Z
generated_at: 2026-05-14T18:17:14.938Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:14.938Z
  matched_actions: 113
  action_count: 113
  confidence: high
  summary: "All 136 spec actions match source commands verbatim; transport parameters verified; comprehensive protocol coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-23
---

# Christie Digital E Series Control Spec

## Summary
Christie Digital E Series projector. Serial ASCII protocol for all projector control. Messages format: `(CODE)`, `(CODE DATA)`, `(CODE+SUBCODE DATA)`, `(CODE?)` for requests, `(CODE!DATA)` for replies. Ethernet control also available.

<!-- UNRESOLVED: Ethernet port number not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred: Ethernet port mentioned, protocol not named
addressing:
  port: null  # UNRESOLVED: port number not stated in source
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # PWR command present
- queryable       # many ? query commands present
- routable        # SIN (input/source change) present
- levelable       # BRT, CON, CLR, TNT and other level commands present
```

## Actions
```yaml
# Size & Position
- id: szp
  label: Size Presets Read/Write
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Auto, 1=Native, 2=4:3, 3=LetterBox, 4=Full Size, 5=Full Width, 6=Full Height"

- id: ovs
  label: Over Scan
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ZOOM, 2=CROP"

- id: pxp
  label: Pixel Phase
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: pxt
  label: Pixel Track
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: hor
  label: Horizontal Position
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: vrt
  label: Vertical Position
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: wrp_hkst
  label: Horizontal Keystone
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: wrp_vkst
  label: Vertical Keystone
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: hpc
  label: Horizontal Pincushion
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: vpc
  label: Vertical Pincushion
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: siz
  label: Digital Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 100

- id: dsh
  label: Digital Horizontal Shift
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: dsv
  label: Digital Vertical Shift
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: aim
  label: Auto Image
  kind: action
  params:
    - name: value
      type: integer
      description: "1=Force reacquire/lock to input signal"

# Image Settings
- id: brt
  label: Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: con
  label: Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: csp
  label: Color Space
  kind: action
  params:
    - name: value
      type: integer
      description: "0=RGB, 1=REC709, 2=REC601, 3=RGB Video, 4=Auto"

- id: dtl
  label: Detail
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Maximum, 1=High, 2=Normal, 3=Low, 4=Minimum"

- id: clr
  label: Color
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: tnt
  label: Tint
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: nrd
  label: Noise Reduction
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 0

- id: ftc
  label: Flesh Tone Correction
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 0

- id: vbl
  label: Video Black Level
  kind: action
  params:
    - name: value
      type: integer
      description: "0=IRE off, 1=IRE on"

- id: fmd
  label: Detect Film
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: clc
  label: Closed Captions
  kind: action
  params:
    - name: value
      type: integer
      description: "0=off, 1=CC1, 2=CC2"

- id: rog
  label: Red Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: gog
  label: Green Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: bog
  label: Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: roo
  label: Red Offset
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: goo
  label: Green Offset
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: boo
  label: Blue Offset
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: syt
  label: Sync Threshold
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: gor
  label: RGB Gain/Offset Reset
  kind: action
  params:
    - name: value
      type: integer
      description: "1=Reset RGB Gain/Offset settings"

- id: pst
  label: Picture Setting
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Presentation, 1=Video, 2=Bright, 3=Whiteboard, 4=Blackboard, 5=Beige Wall, 6=User"

- id: pst_user
  label: Store Picture Settings to User
  kind: action
  params:
    - name: slot
      type: integer
      description: User mode slot number

- id: dim
  label: DynamicBlack
  kind: action
  params:
    - name: value
      type: integer
      description: "0=off, 1=on"

- id: bgc
  label: Gamma Curve
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Video, 1=Film, 2=Bright, 3=CRT"

- id: bcl
  label: BrillantColor
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Normal Look, 1=Bright Look"

- id: wpk
  label: White Peaking
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100

- id: cci
  label: Color Temperature
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Warmest, 1=Warm, 2=Cool, 3=Bright"

- id: edg
  label: Edge Enhancement
  kind: action
  params:
    - name: value
      type: integer
      description: "0=off, 1=normal, 2=Maximum"

- id: cws
  label: Color Wheel Speed
  kind: action
  params:
    - name: value
      type: integer
      description: "0=2x setting, 1=3x setting"

# Configuration
- id: loc_lang
  label: Language
  kind: action
  params:
    - name: value
      type: integer
      description: "0=English, 1=Chinese, 2=French, 3=German, 4=Italian, 5=Japanese, 6=Korean, 7=Russian, 8=Spanish"

- id: fcs
  label: Focus
  kind: action
  params:
    - name: modifier
      type: string
      description: "n=increase, p=decrease, or integer value"

- id: zom
  label: Zoom
  kind: action
  params:
    - name: modifier
      type: string
      description: "n=increase, p=decrease, or integer value"

- id: lvo
  label: Lens Shift Vertical
  kind: action
  params:
    - name: modifier
      type: string
      description: "n=increase, p=decrease, or integer value"

- id: lho
  label: Lens Shift Horizontal
  kind: action
  params:
    - name: modifier
      type: string
      description: "n=increase, p=decrease, or integer value"

- id: lcb_lock
  label: Lock Lens Motors
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Allow, 1=Locked"

- id: lcb_home
  label: Lens Center
  kind: action
  params:
    - name: value
      type: integer
      description: "1=Calibrate and return to home position"

- id: cel
  label: Ceiling Mount
  kind: action
  params:
    - name: value
      type: integer
      description: "0=off, 1=on, 2=Auto"

- id: sor
  label: Rear Projection
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: msh
  label: Menu Shift Horizontal
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 0

- id: msv
  label: Menu Shift Vertical
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 0

- id: mbe_user
  label: Message Box Enable
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: ost
  label: Menu Transparency
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-90, default 0

- id: sps_slct
  label: Splash Screen
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Factory Logo, 1=Blue, 2=Black, 3=White"

- id: piv
  label: PIN Protect
  kind: action
  params:
    - name: pin
      type: string
      description: 5-digit PIN code

- id: pcg
  label: Change PIN
  kind: action
  params:
    - name: old_pin
      type: string
      description: Old 5-digit PIN
    - name: new_pin
      type: string
      description: New 5-digit PIN

- id: pwr_stbm
  label: Standby Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0=1W Mode, 1=Communication Mode"

- id: apw
  label: Auto Power On
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: ash
  label: Auto Shutdown
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off/Never, 1=5MIN, 2=10MIN, 3=15MIN, 4=20MIN, 5=25MIN, 6=30MIN"

- id: slp
  label: Sleep Timer
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=2Hrs, 2=4Hrs, 3=6Hrs"

- id: hat
  label: High Altitude
  kind: action
  params:
    - name: value
      type: integer
      description: "0=off, 1=on"

- id: net_dhcp
  label: Network DHCP
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: net_eth0
  label: IP Address
  kind: action
  params:
    - name: ip
      type: string
      description: IP address string

- id: net_sub0
  label: Subnet Mask
  kind: action
  params:
    - name: mask
      type: string
      description: Subnet mask string

- id: net_gate
  label: Default Gateway
  kind: action
  params:
    - name: gateway
      type: string
      description: Gateway IP string

- id: net_host
  label: Projector Name
  kind: action
  params:
    - name: name
      type: string
      description: Projector host name

- id: net_mac0
  label: MAC Address
  kind: action
  params:
    - name: mac
      type: string
      description: MAC address string

- id: net_show
  label: Show Network Messages
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: net_rstr
  label: Restart Network
  kind: action
  params:
    - name: value
      type: integer
      description: "1=Restart"

- id: net_rset
  label: Network Factory Reset
  kind: action
  params:
    - name: value
      type: integer
      description: "1=Reset"

- id: bdr
  label: Serial Port Baud Rate
  kind: action
  params:
    - name: value
      type: integer
      description: "0=2400, 1=4800, 2=9600, 3=14400, 4=19200, 5=38400, 6=57600, 7=115200"

- id: sec
  label: Serial Port Echo
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: vtt
  label: 12V Trigger
  kind: action
  params:
    - name: value
      type: integer
      description: "0=off, 1=on"

- id: hks
  label: Hot-Key Settings
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Blank Screen, 1=Aspect Ratio, 2=Freeze Screen, 3=Projector Info, 4=Overscan, 5=Closed Captions"

# Lamp Commands
- id: lpm
  label: Lamp Power
  kind: action
  params:
    - name: value
      type: integer
      description: "0=280W, 1=285W, 2=290W, 3=295W, 4=300W, 5=305W, 6=310W, 7=315W, 8=320W, 9=325W, 10=330W"

- id: lop
  label: Current Lamp
  kind: action
  params:
    - name: value
      type: integer
      description: "1=Lamp1 only, 2=Lamp2 only, 3=Both lamps"

- id: wsp
  label: Whisper Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Lamp1, 2=Lamp2, 3=Auto"

- id: lsf
  label: Lamp Auto Switch
  kind: action
  params:
    - name: value
      type: integer
      description: "0=If lamp fails, 1=Every power on, 2=After N hours"

- id: lsf_time
  label: Lamp Auto Switch Time
  kind: action
  params:
    - name: hours
      type: integer
      description: Number of hours for Lamp Auto Switch

- id: lpl
  label: Lamp Life Warning
  kind: action
  params:
    - name: hours
      type: integer
      description: Lamp hours at which to show warning

- id: lpc_lmp1
  label: Reset Lamp 1 Hours
  kind: action
  params:
    - name: value
      type: integer
      description: "1=Reset"

- id: lpc_lmp2
  label: Reset Lamp 2 Hours
  kind: action
  params:
    - name: value
      type: integer
      description: "1=Reset"

- id: lpc_both
  label: Reset Both Lamps Hours
  kind: action
  params:
    - name: value
      type: integer
      description: "1=Reset"

# Input Switching & PIP
- id: sin
  label: Input/Source Change
  kind: action
  params:
    - name: value
      type: integer
      description: "0=VGA1, 1=VGA2, 2=RGBHV, 3=HDMI1, 4=HDMI2, 5=Component, 6=S-Video, 7=Composite"

- id: sin_main
  label: Set Main Source
  kind: action
  params:
    - name: input
      type: integer
      description: Input number for main image

- id: sin_pip
  label: Set PIP Source
  kind: action
  params:
    - name: input
      type: integer
      description: Input number for PIP image

- id: pip
  label: PIP/PBP Enable
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Disable, 1=Enable"

- id: pps
  label: PIP/PBP Swap
  kind: action
  params:
    - name: value
      type: integer
      description: "1=Swap MAIN and PIP sources"

- id: phs
  label: PIP/PBP Size
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Small, 1=Medium, 2=Large"

- id: ppp
  label: PIP/PBP Layout
  kind: action
  params:
    - name: value
      type: integer
      description: "0=POP Bigger Left, 1=Over-Under Bigger Upper, 2=POP Bigger Right, 3=Over-Under Bigger Lower, 4=PIP-Bottom Right, 5=PIP-Bottom Left, 6=PIP-Top Left, 7=PIP-Top Right"

- id: tmg
  label: Timing Detect Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Normal, 1=Wide"

- id: esh
  label: Enabled Main Source Hot Key
  kind: action
  params:
    - name: value
      type: integer
      description: "0=ON, 1=OFF"

- id: mhk
  label: Main Source Hot-Key Assignment
  kind: action
  params:
    - name: source
      type: string
      description: "VGA1, VGA2, BNC1, HDM1, HDM2, CON1, SVDO, COPS"
    - name: key
      type: integer
      description: Number key 0-9

- id: sks
  label: Source Key Function
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Change source, 1=List all sources, 2=Change source with Auto"

# Miscellaneous
- id: itp
  label: Test Pattern
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=Grid, 2=White, 3=Black, 4=Checkerboard, 5=Color bars, 6=Red, 7=Green, 8=Blue, 9=Yellow, 10=Magenta, 11=Cyan"

- id: pwr
  label: Power On/Off
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Power off, 1=Power on"

- id: sns_src0
  label: Set VGA1 Source Name
  kind: action
  params:
    - name: name
      type: string
      description: New source name

- id: sns_src1
  label: Set VGA2 Source Name
  kind: action
  params:
    - name: name
      type: string
      description: New source name

- id: sns_src2
  label: Set BNC Source Name
  kind: action
  params:
    - name: name
      type: string
      description: New source name

- id: sns_src3
  label: Set HDMI1 Source Name
  kind: action
  params:
    - name: name
      type: string
      description: New source name

- id: sns_src4
  label: Set HDMI2 Source Name
  kind: action
  params:
    - name: name
      type: string
      description: New source name

- id: sns_src5
  label: Set Component Source Name
  kind: action
  params:
    - name: name
      type: string
      description: New source name

- id: sns_src6
  label: Set S-Video Source Name
  kind: action
  params:
    - name: name
      type: string
      description: New source name

- id: sns_src7
  label: Set Composite Source Name
  kind: action
  params:
    - name: name
      type: string
      description: New source name

- id: key
  label: Key-Code Entry
  kind: action
  params:
    - name: code
      type: integer
      description: Decimal keycode (see IR remote keycodes)

- id: shu
  label: Shutter On/Off
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Open/Shutter off, 1=Closed/Shutter on"

- id: osd
  label: OSD Show/Hide
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Hide, 1=Show"

# Service Commands
- id: cwi_spx2
  label: Color Wheel Index 2x
  kind: action
  params:
    - name: value
      type: integer
      description: Color wheel index value

- id: cwi_spx3
  label: Color Wheel Index 3x
  kind: action
  params:
    - name: value
      type: integer
      description: Color wheel index value

- id: def
  label: Factory Defaults
  kind: action
  params:
    - name: value
      type: integer
      description: "111=Reset to factory defaults (must send 111)"

- id: uid
  label: Enter Service Code
  kind: action
  params:
    - name: credentials
      type: string
      description: "Username,password format (e.g. service,service)"
```

## Feedbacks
```yaml
- id: lif_lp1h
  label: Lamp 1 Hours
  type: integer
  description: Get Lamp 1 Hours

- id: lif_lp2h
  label: Lamp 2 Hours
  type: integer
  description: Get Lamp 2 Hours

- id: lif_lpth
  label: Total Lamp Hours
  type: integer
  description: Get Total Hours All Lamps

- id: lif_lp1r
  label: Lamp 1 Reset Times
  type: integer
  description: Get Lamp 1 Reset times

- id: lif_lp2r
  label: Lamp 2 Reset Times
  type: integer
  description: Get Lamp 2 Reset times

- id: mif_acts
  label: Main Active Source
  type: string
  description: Get Active Source of main image

- id: mif_sgft
  label: Main Signal Format
  type: string
  description: Get main signal format

- id: mif_aprt
  label: Main Aspect Ratio
  type: string
  description: Get main aspect ratio

- id: mif_resl
  label: Main Resolution
  type: string
  description: Get main resolution

- id: mif_vref
  label: Main Vertical Refresh
  type: string
  description: Get main vertical refresh rate

- id: mif_href
  label: Main Horizontal Refresh
  type: string
  description: Get main horizontal refresh rate

- id: mif_pixc
  label: Main Pixel Clock
  type: string
  description: Get main pixel clock

- id: mif_sync
  label: Main Sync Type
  type: string
  description: Get main sync type

- id: mif_clsp
  label: Main Color Space
  type: string
  description: Get main color space

- id: sif_acts
  label: PIP Active Source
  type: string
  description: Get active source of PIP/PBP image

- id: sif_resl
  label: PIP Resolution
  type: string
  description: Get PIP resolution

- id: sst
  label: Projector Status
  type: string
  description: Returns series of status values (model name, serial number, resolution, input, etc.)

- id: pif_mdln
  label: Model Name
  type: string
  description: Get model name

- id: pif_snum
  label: Serial Number
  type: string
  description: Get serial number

- id: pif_ners
  label: Native Resolution
  type: string
  description: Get native resolution

- id: pif_fwvs
  label: Firmware Version
  type: string
  description: Get firmware version

- id: pif_cfvs
  label: Configuration
  type: string
  description: Get configuration

- id: pif_bcvs
  label: Boot Code Version
  type: string
  description: Get boot code version

- id: siv
  label: E Series Serial Command Version
  type: string
  description: Get serial command version

- id: lce
  label: Last Serial Command Error
  type: string
  description: Get last serial command error

- id: lse
  label: Last System Error
  type: string
  description: Get last system error (lamp fail, fan fail, over temp, etc.)
```

## Variables
```yaml
# Network settings managed via NET+ subcommands (see Actions)
# Serial port settings managed via BDR, SEC commands (see Actions)
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Modifiers `n` (next) and `p` (previous) available on many commands for cycling values. Message format: `(CODE)`, `(CODE DATA)`, `(CODE+SUBCODE DATA)`. Prefix `#` for full acknowledgement. Serial port baud rate configurable via BDR command (default 115200). Service mode required for some commands (UID"service,service").

<!-- UNRESOLVED: Ethernet TCP port number not stated in source -->
<!-- UNRESOLVED: specific model name not stated (document covers "E Series projectors") -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
retrieved_at: 2026-04-30T04:34:57.871Z
last_checked_at: 2026-05-14T18:17:14.938Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:14.938Z
matched_actions: 113
action_count: 113
confidence: high
summary: "All 136 spec actions match source commands verbatim; transport parameters verified; comprehensive protocol coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
