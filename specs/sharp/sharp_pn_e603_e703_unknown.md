---
spec_id: admin/sharp-pn-e603-e703
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp PN E603 E703 Control Spec"
manufacturer: Sharp
model_family: PN-E603
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - PN-E603
    - PN-E703
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - business.sharpusa.com
source_urls:
  - https://business.sharpusa.com/Portals/0/downloads/Manuals/PN_E603_703_Operation_Manual.pdf
retrieved_at: 2026-05-13T20:34:55.553Z
last_checked_at: 2026-06-10T00:48:02.188Z
generated_at: 2026-06-10T00:48:02.188Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "DHCP client behavior, LAN port number not stated in source"
  - "TCP port number not stated in source (factory preset IP: 192.168.150.2)"
  - "no unsolicited event notifications documented"
  - "no multi-step macros documented"
  - "LAN TCP port number not stated in source"
  - "firmware version not stated in source"
  - "gamma data transfer read responses not documented in detail"
  - "repeater control response format for multi-monitor reads not fully specified"
verification:
  verdict: verified
  checked_at: 2026-06-10T00:48:02.188Z
  matched_actions: 196
  action_count: 196
  confidence: medium
  summary: "All 196 spec actions matched literally in source; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-13
---

# Sharp PN E603 E703 Control Spec

## Summary
Professional LCD monitor supporting RS-232C serial and LAN (TCP/IP) control. Commands identical across both transports. Daisy chain up to 25 monitors via RS-232C. RS-232C and LAN cannot be used simultaneously.

<!-- UNRESOLVED: DHCP client behavior, LAN port number not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # also supports 19200, 38400 - source states BAUD RATE setting
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  # UNRESOLVED: TCP port number not stated in source (factory preset IP: 192.168.150.2)
auth:
  type: none  # inferred: RS-232C has no auth procedure in source
  # Note: LAN control requires username/password - see Notes
```

## Traits
```yaml
# powerable: POWR command present
# routable: INPS command present
# queryable: multiple R-direction commands present
# levelable: VOLM, VLMP, CONT, BLVL, TINT, COLR, SHRP, TREBLE, BASS, BALANCE present
```

## Actions
```yaml
# Power control
- id: POWR
  label: Power Control
  kind: action
  params:
    - name: state
      type: integer
      description: "0=standby, 1=normal"
  direction: W

# Input mode selection
- id: INPS
  label: Input Mode Selection
  kind: action
  params:
    - name: input
      type: integer
      description: "1=DVI-I, 2=D-SUB[RGB], 3=D-SUB[COMPONENT], 4=D-SUB[VIDEO], 9=HDMI1[AV], 10=HDMI1[PC], 12=HDMI2[AV], 13=HDMI2[PC], 14=DisplayPort"
  direction: W

# SCREEN menu
- id: ASNC
  label: Auto Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: "1=execute"
  direction: W
- id: CLCK
  label: Clock
  kind: action
  params:
    - name: value
      type: integer
      description: "0-1200"
  direction: WR
- id: PHSE
  label: Phase
  kind: action
  params:
    - name: value
      type: integer
      description: "0-63"
  direction: WR
- id: HPOS
  label: H Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
  direction: WR
- id: VPOS
  label: V Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
  direction: WR
- id: HSIZ
  label: H Size
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
  direction: WR
- id: VSIZ
  label: V Size
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
  direction: WR
- id: HRES
  label: H Resolution
  kind: action
  params:
    - name: value
      type: integer
      description: "300-1920"
  direction: WR
- id: VRES
  label: V Resolution
  kind: action
  params:
    - name: value
      type: integer
      description: "200-1200"
  direction: WR
- id: PXCK
  label: Resolution Check
  kind: query
  params: []
  direction: R
- id: PXSL
  label: Pixel Setting
  kind: action
  params:
    - name: mode
      type: integer
      description: "1-10"
  direction: WR
- id: RESO
  label: Resolution Check (AV)
  kind: query
  params: []
  direction: R
- id: Z2SP
  label: Zoom2 Special Setting
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: ARST
  label: Reset
  kind: action
  params:
    - name: value
      type: integer
      description: "1=SCREEN reset, 2=PICTURE reset, 3=AUDIO reset"
  direction: W

# PICTURE menu
- id: VLMP
  label: Bright
  kind: action
  params:
    - name: value
      type: integer
      description: "0-31"
  direction: WR
- id: CONT
  label: Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "0-60"
  direction: WR
- id: BLVL
  label: Black Level
  kind: action
  params:
    - name: value
      type: integer
      description: "0-60"
  direction: WR
- id: TINT
  label: Tint
  kind: action
  params:
    - name: value
      type: integer
      description: "0-60"
  direction: WR
- id: COLR
  label: Colors
  kind: action
  params:
    - name: value
      type: integer
      description: "0-60"
  direction: WR
- id: SHRP
  label: Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: "0-24"
  direction: WR
- id: BMOD
  label: Color Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0=STD, 2=VIVID, 3=sRGB, 4=HIGH ILLUMINANCE"
  direction: WR
- id: CTMP
  label: Color Temp
  kind: action
  params:
    - name: value
      type: integer
      description: "0=PC, 1-28=preset, 99=USER"
  direction: WR
- id: CRTR
  label: R-Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "0-256"
  direction: WR
- id: CRTG
  label: G-Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "0-256"
  direction: WR
- id: CRTB
  label: B-Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "0-256"
  direction: WR
- id: OFSR
  label: R-Offset
  kind: action
  params:
    - name: value
      type: integer
      description: "-127-127"
  direction: WR
- id: OFSG
  label: G-Offset
  kind: action
  params:
    - name: value
      type: integer
      description: "-127-127"
  direction: WR
- id: OFSB
  label: B-Offset
  kind: action
  params:
    - name: value
      type: integer
      description: "-127-127"
  direction: WR
- id: CPTU
  label: Copy To User
  kind: action
  params:
    - name: value
      type: integer
      description: "0=execute"
  direction: W
- id: GAMM
  label: Gamma
  kind: action
  params:
    - name: value
      type: integer
      description: "0-6"
  direction: WR
- id: FLES
  label: Flesh Tone
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=LOW, 2=HIGH"
  direction: WR
- id: CMHR
  label: C.M.S.-Hue R
  kind: action
  params:
    - name: value
      type: integer
      description: "-10-10"
  direction: WR
- id: CMHY
  label: C.M.S.-Hue Y
  kind: action
  params:
    - name: value
      type: integer
      description: "-10-10"
  direction: WR
- id: CMHG
  label: C.M.S.-Hue G
  kind: action
  params:
    - name: value
      type: integer
      description: "-10-10"
  direction: WR
- id: CMHC
  label: C.M.S.-Hue C
  kind: action
  params:
    - name: value
      type: integer
      description: "-10-10"
  direction: WR
- id: CMHB
  label: C.M.S.-Hue B
  kind: action
  params:
    - name: value
      type: integer
      description: "-10-10"
  direction: WR
- id: CMHM
  label: C.M.S.-Hue M
  kind: action
  params:
    - name: value
      type: integer
      description: "-10-10"
  direction: WR
- id: CMSR
  label: C.M.S.-Saturation R
  kind: action
  params:
    - name: value
      type: integer
      description: "-10-10"
  direction: WR
- id: CMSY
  label: C.M.S.-Saturation Y
  kind: action
  params:
    - name: value
      type: integer
      description: "-10-10"
  direction: WR
- id: CMSG
  label: C.M.S.-Saturation G
  kind: action
  params:
    - name: value
      type: integer
      description: "-10-10"
  direction: WR
- id: CMSC
  label: C.M.S.-Saturation C
  kind: action
  params:
    - name: value
      type: integer
      description: "-10-10"
  direction: WR
- id: CMSB
  label: C.M.S.-Saturation B
  kind: action
  params:
    - name: value
      type: integer
      description: "-10-10"
  direction: WR
- id: CMSM
  label: C.M.S.-Saturation M
  kind: action
  params:
    - name: value
      type: integer
      description: "-10-10"
  direction: WR
- id: CMVR
  label: C.M.S.-Value R
  kind: action
  params:
    - name: value
      type: integer
      description: "-10-10"
  direction: WR
- id: CMVY
  label: C.M.S.-Value Y
  kind: action
  params:
    - name: value
      type: integer
      description: "-10-10"
  direction: WR
- id: CMVG
  label: C.M.S.-Value G
  kind: action
  params:
    - name: value
      type: integer
      description: "-10-10"
  direction: WR
- id: CMVC
  label: C.M.S.-Value C
  kind: action
  params:
    - name: value
      type: integer
      description: "-10-10"
  direction: WR
- id: CMVB
  label: C.M.S.-Value B
  kind: action
  params:
    - name: value
      type: integer
      description: "-10-10"
  direction: WR
- id: CMVM
  label: C.M.S.-Value M
  kind: action
  params:
    - name: value
      type: integer
      description: "-10-10"
  direction: WR
- id: AGIN
  label: Advanced Auto
  kind: action
  params:
    - name: value
      type: integer
      description: "1=execute"
  direction: W
- id: ANGA
  label: Analog Gain
  kind: action
  params:
    - name: value
      type: integer
      description: "0-127"
  direction: WR
- id: ANOF
  label: Analog Offset
  kind: action
  params:
    - name: value
      type: integer
      description: "0-127"
  direction: WR
- id: TDNR
  label: 3D-NR
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=LOW, 2=HIGH"
  direction: WR
- id: MPNR
  label: MPEG-NR
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: YCSP
  label: 3D-Y/C
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: AHDR
  label: RGB Input Range HDMI1[AV]
  kind: action
  params:
    - name: value
      type: integer
      description: "0=AUTO, 1=FULL, 2=LIMITED"
  direction: WR
- id: PHDR
  label: RGB Input Range HDMI1[PC]
  kind: action
  params:
    - name: value
      type: integer
      description: "0=AUTO, 1=FULL, 2=LIMITED"
  direction: WR
- id: AH2R
  label: RGB Input Range HDMI2[AV]
  kind: action
  params:
    - name: value
      type: integer
      description: "0=AUTO, 1=FULL, 2=LIMITED"
  direction: WR
- id: PH2R
  label: RGB Input Range HDMI2[PC]
  kind: action
  params:
    - name: value
      type: integer
      description: "0=AUTO, 1=FULL, 2=LIMITED"
  direction: WR
- id: PDVR
  label: RGB Input Range DVI-I
  kind: action
  params:
    - name: value
      type: integer
      description: "1=FULL, 2=LIMITED"
  direction: WR
- id: PDSR
  label: RGB Input Range D-SUB
  kind: action
  params:
    - name: value
      type: integer
      description: "1=FULL, 2=LIMITED"
  direction: WR
- id: PDPR
  label: RGB Input Range DisplayPort
  kind: action
  params:
    - name: value
      type: integer
      description: "0=AUTO, 1=FULL, 2=LIMITED"
  direction: WR
- id: ACNT
  label: Active Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: PTDF
  label: Display Color Pattern
  kind: action
  params:
    - name: value
      type: integer
      description: "0=none, 1=white, 2=red, 3=green, 4=blue, 99=RGB mixed"
  direction: WR
- id: PTDR
  label: Display Color Pattern R
  kind: action
  params:
    - name: value
      type: integer
      description: "0-15"
  direction: WR
- id: PTDG
  label: Display Color Pattern G
  kind: action
  params:
    - name: value
      type: integer
      description: "0-15"
  direction: WR
- id: PTDB
  label: Display Color Pattern B
  kind: action
  params:
    - name: value
      type: integer
      description: "0-15"
  direction: WR

# AUDIO menu
- id: AUTR
  label: Treble
  kind: action
  params:
    - name: value
      type: integer
      description: "-5-5"
  direction: WR
- id: AUBS
  label: Bass
  kind: action
  params:
    - name: value
      type: integer
      description: "-5-5"
  direction: WR
- id: AUBL
  label: Balance
  kind: action
  params:
    - name: value
      type: integer
      description: "-10-10"
  direction: WR
- id: VOLM
  label: Volume
  kind: action
  params:
    - name: value
      type: integer
      description: "0-31"
  direction: WR
- id: MUTE
  label: Mute
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR

# SETUP menu
- id: DATE
  label: Date/Time Setting
  kind: action
  params:
    - name: value
      type: string
      description: "AABBCCDDEE format (Year/Month/Day/Hour/Minute)"
  direction: WR
- id: DTFT
  label: Date Display Format
  kind: action
  params:
    - name: value
      type: integer
      description: "0=YYYY/MM/DD, 1=MM/DD/YYYY, 2=DD/MM/YYYY"
  direction: WR
- id: TMFT
  label: Time Display Format
  kind: action
  params:
    - name: value
      type: integer
      description: "0=24-hour, 1=12-hour"
  direction: WR
- id: SC01
  label: Schedule 1
  kind: action
  params:
    - name: value
      type: string
      description: "ABCDEFFGGH format"
  direction: WR
- id: SC02
  label: Schedule 2
  kind: action
  params:
    - name: value
      type: string
      description: "ABCDEFFGGH format"
  direction: WR
- id: SC03
  label: Schedule 3
  kind: action
  params:
    - name: value
      type: string
      description: "ABCDEFFGGH format"
  direction: WR
- id: SC04
  label: Schedule 4
  kind: action
  params:
    - name: value
      type: string
      description: "ABCDEFFGGH format"
  direction: WR
- id: SC05
  label: Schedule 5
  kind: action
  params:
    - name: value
      type: string
      description: "ABCDEFFGGH format"
  direction: WR
- id: SC06
  label: Schedule 6
  kind: action
  params:
    - name: value
      type: string
      description: "ABCDEFFGGH format"
  direction: WR
- id: SC07
  label: Schedule 7
  kind: action
  params:
    - name: value
      type: string
      description: "ABCDEFFGGH format"
  direction: WR
- id: SC08
  label: Schedule 8
  kind: action
  params:
    - name: value
      type: string
      description: "ABCDEFFGGH format"
  direction: WR
- id: SB01
  label: Schedule Brightness 1
  kind: action
  params:
    - name: value
      type: integer
      description: "0-31 or 99=disable"
  direction: WR
- id: SB02
  label: Schedule Brightness 2
  kind: action
  params:
    - name: value
      type: integer
      description: "0-31 or 99=disable"
  direction: WR
- id: SB03
  label: Schedule Brightness 3
  kind: action
  params:
    - name: value
      type: integer
      description: "0-31 or 99=disable"
  direction: WR
- id: SB04
  label: Schedule Brightness 4
  kind: action
  params:
    - name: value
      type: integer
      description: "0-31 or 99=disable"
  direction: WR
- id: SB05
  label: Schedule Brightness 5
  kind: action
  params:
    - name: value
      type: integer
      description: "0-31 or 99=disable"
  direction: WR
- id: SB06
  label: Schedule Brightness 6
  kind: action
  params:
    - name: value
      type: integer
      description: "0-31 or 99=disable"
  direction: WR
- id: SB07
  label: Schedule Brightness 7
  kind: action
  params:
    - name: value
      type: integer
      description: "0-31 or 99=disable"
  direction: WR
- id: SB08
  label: Schedule Brightness 8
  kind: action
  params:
    - name: value
      type: integer
      description: "0-31 or 99=disable"
  direction: WR
- id: LANG
  label: Language
  kind: action
  params:
    - name: value
      type: integer
      description: "0=ENGLISH, 1=DEUTSCH, 2=FRANCAIS, 3=ITALIANO, 4=ESPANOL, 5=РУССКИЙ, 6=additional"
  direction: WR
- id: HDSL
  label: HDMI1 Input Select
  kind: action
  params:
    - name: value
      type: integer
      description: "0=PC, 1=AV"
  direction: WR
- id: H2SL
  label: HDMI2 Input Select
  kind: action
  params:
    - name: value
      type: integer
      description: "0=PC, 1=AV"
  direction: WR
- id: SLDS
  label: D-SUB Input Select
  kind: action
  params:
    - name: value
      type: integer
      description: "0=RGB, 1=COMPONENT, 2=VIDEO"
  direction: WR
- id: HDAW
  label: HDMI1 Auto View
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: H2AW
  label: HDMI2 Auto View
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: HPCT
  label: Hot Plug Control DVI-I
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: HPCH
  label: Hot Plug Control HDMI1
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: HPH2
  label: Hot Plug Control HDMI2
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: DVED
  label: EDID Select DVI-I
  kind: action
  params:
    - name: value
      type: integer
      description: "0=AUTO, 1=DIGITAL, 2=ANALOG"
  direction: WR
- id: ASDP
  label: Audio Select DVI-I
  kind: action
  params:
    - name: value
      type: integer
      description: "1=AUDIO1, 2=AUDIO2"
  direction: WR
- id: ASAP
  label: Audio Select D-SUB RGB
  kind: action
  params:
    - name: value
      type: integer
      description: "1=AUDIO1, 2=AUDIO2"
  direction: WR
- id: ASHP
  label: Audio Select HDMI1 PC
  kind: action
  params:
    - name: value
      type: integer
      description: "0=HDMI, 1=AUDIO1, 2=AUDIO2"
  direction: WR
- id: ASHA
  label: Audio Select HDMI1 AV
  kind: action
  params:
    - name: value
      type: integer
      description: "0=HDMI, 1=AUDIO1, 2=AUDIO2"
  direction: WR
- id: AH2P
  label: Audio Select HDMI2 PC
  kind: action
  params:
    - name: value
      type: integer
      description: "0=HDMI, 1=AUDIO1, 2=AUDIO2"
  direction: WR
- id: AH2A
  label: Audio Select HDMI2 AV
  kind: action
  params:
    - name: value
      type: integer
      description: "0=HDMI, 1=AUDIO1, 2=AUDIO2"
  direction: WR
- id: ASC2
  label: Audio Select D-SUB Component
  kind: action
  params:
    - name: value
      type: integer
      description: "1=AUDIO1, 2=AUDIO2"
  direction: WR
- id: ASV2
  label: Audio Select D-SUB Video
  kind: action
  params:
    - name: value
      type: integer
      description: "1=AUDIO1, 2=AUDIO2"
  direction: WR
- id: ASDI
  label: Audio Select DisplayPort
  kind: action
  params:
    - name: value
      type: integer
      description: "1=AUDIO1, 2=AUDIO2, 3=DisplayPort"
  direction: WR
- id: AOUT
  label: Audio Output
  kind: action
  params:
    - name: value
      type: integer
      description: "0=VARIABLE1, 1=FIXED, 2=VARIABLE2"
  direction: WR
- id: AIVP
  label: Audio Input Level1
  kind: action
  params:
    - name: value
      type: integer
      description: "0=1.0Vrms, 1=0.5Vrms"
  direction: WR
- id: AIV2
  label: Audio Input Level2
  kind: action
  params:
    - name: value
      type: integer
      description: "0=1.0Vrms, 1=0.5Vrms"
  direction: WR
- id: MONO
  label: Monaural Audio
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: CTLS
  label: RS-232C/LAN Select
  kind: action
  params:
    - name: value
      type: integer
      description: "0=RS-232C, 1=LAN"
  direction: WR
- id: BAUD
  label: Baud Rate
  kind: action
  params:
    - name: value
      type: integer
      description: "0=9600bps, 1=19200bps, 2=38400bps"
  direction: WR
- id: IDST
  label: ID No. Setting
  kind: action
  params:
    - name: value
      type: integer
      description: "0-255 (0=no ID)"
  direction: W
- id: IDSL
  label: ID No. Setting (Once)
  kind: action
  params:
    - name: value
      type: integer
      description: "1-255=set ID, 0=clear"
  direction: W
- id: IDLK
  label: ID No. Setting (Subsequent)
  kind: action
  params:
    - name: value
      type: integer
      description: "1-255=set ID, 0=clear"
  direction: W
- id: IDCK
  label: ID Check
  kind: action
  params:
    - name: value
      type: integer
      description: "0"
  direction: W
- id: IDDP
  label: ID Display
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON, 2=ON (4sec)"
  direction: W
- id: CPMD
  label: Setting Copy Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0=all monitors, 1-255=monitor with ID"
  direction: WR
- id: CPTG
  label: Setting Copy Target
  kind: action
  params:
    - name: value
      type: integer
      description: "0=PICTURE menu, 1=all settings"
  direction: WR

# MONITOR menu
- id: STDR
  label: Monitor Orientation
  kind: action
  params:
    - name: value
      type: integer
      description: "0=LANDSCAPE, 1=PORTRAIT"
  direction: WR
- id: OSDH
  label: OSD H-Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
  direction: WR
- id: OSDV
  label: OSD V-Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
  direction: WR
- id: STBM
  label: Standby Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0=STANDARD, 1=LOW POWER"
  direction: WR
- id: ATOF
  label: Off If No Operation
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: PODS
  label: Power On Delay Set
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: PWOD
  label: Power On Delay Interval
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1-60 seconds"
  direction: WR
- id: AADJ
  label: Self Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: AADD
  label: Self Adjust Start Timing
  kind: action
  params:
    - name: value
      type: integer
      description: "10-200 (1-20 seconds)"
  direction: WR

# MULTI/PIP menu
- id: ENLG
  label: Enlarge
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: EMAG
  label: Enlarge Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "1=2x2, 2=3x3, 3=4x4, 4=5x5"
  direction: WR
- id: EMHV
  label: Enlarge H/V Setting
  kind: action
  params:
    - name: value
      type: integer
      description: "12(21)-55"
  direction: WR
- id: EPHV
  label: Image Position MxN
  kind: action
  params:
    - name: value
      type: integer
      description: "11-55"
  direction: WR
- id: EPOS
  label: Image Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0-3 (2x2), 0-8 (3x3), 0-15 (4x4), 0-24 (5x5)"
  direction: WR
- id: EPSH
  label: Enlarged Screen H Position
  kind: action
  params:
    - name: value
      type: integer
      description: "-99-999"
  direction: WR
- id: EPSV
  label: Enlarged Screen V Position
  kind: action
  params:
    - name: value
      type: integer
      description: "-99-999"
  direction: WR
- id: BZCO
  label: Bezel Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: BZCT
  label: Bezel Top
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: BZCB
  label: Bezel Bottom
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: BZCR
  label: Bezel Right
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: BZCL
  label: Bezel Left
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: BZWT
  label: Bezel Width Top
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
  direction: WR
- id: BZWB
  label: Bezel Width Bottom
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
  direction: WR
- id: BZWR
  label: Bezel Width Right
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
  direction: WR
- id: BZWL
  label: Bezel Width Left
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
  direction: WR
- id: ESTG
  label: Enlarge/Image Position Setting
  kind: action
  params:
    - name: value
      type: string
      description: "XXYY format (EMAG+EPOS)"
  direction: WR
- id: ESHV
  label: Enlarge H/V Setting Write
  kind: action
  params:
    - name: value
      type: string
      description: "XXYY format (EMHV+EPHV)"
  direction: WR
- id: MWIN
  label: PIP Modes
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=PIP, 2=PbyP, 3=PbyP2"
  direction: WR
- id: MPSZ
  label: PIP Size
  kind: action
  params:
    - name: value
      type: integer
      description: "1-64"
  direction: WR
- id: MHPS
  label: PIP H Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
  direction: WR
- id: MVPS
  label: PIP V Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
  direction: WR
- id: MPOS
  label: PIP Position Batch
  kind: action
  params:
    - name: value
      type: string
      description: "xxxyyy format (0-100,0-100)"
  direction: WR
- id: MWBL
  label: PIP Blend
  kind: action
  params:
    - name: value
      type: integer
      description: "0-15"
  direction: WR
- id: MWIP
  label: PIP Source
  kind: action
  params:
    - name: value
      type: integer
      description: "1=DVI-I, 2=D-SUB[RGB], 3=D-SUB[COMPONENT], 4=D-SUB[VIDEO], 9=HDMI1[AV], 10=HDMI1[PC], 12=HDMI2[AV], 13=HDMI2[PC], 14=DisplayPort"
  direction: WR
- id: MWAD
  label: Sound Change
  kind: action
  params:
    - name: value
      type: integer
      description: "1=MAIN, 2=SUB"
  direction: WR
- id: MWPP
  label: Main PIP Pos
  kind: action
  params:
    - name: value
      type: integer
      description: "0=POS1, 1=POS2"
  direction: WR
- id: MW2P
  label: PbyP2 Pos
  kind: action
  params:
    - name: value
      type: integer
      description: "0=POS1, 1=POS2, 2=POS3"
  direction: WR
- id: MOFF
  label: PIP Auto Off
  kind: action
  params:
    - name: value
      type: integer
      description: "0=MANUAL, 1=AUTO"
  direction: WR

# OTHERS menu
- id: SCSV
  label: Screen Motion Pattern
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1-4=PATTERN1-4"
  direction: WR
- id: MTIM
  label: Motion Time1
  kind: action
  params:
    - name: value
      type: integer
      description: "0-20"
  direction: WR
- id: MINT
  label: Motion Time2
  kind: action
  params:
    - name: value
      type: integer
      description: "10-990 (PATTERN1=per 10sec), 5-20 (PATTERN2-4=per sec)"
  direction: WR
- id: PMNG
  label: Power Management PC
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: PMAV
  label: Power Management AV
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: AINC
  label: Auto Input Change
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: BTSC
  label: Logo Screen
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
  direction: WR
- id: SCAN
  label: Scan Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0=MODE1, 1=MODE2, 2=MODE3"
  direction: WR
- id: CSYS
  label: Color System
  kind: action
  params:
    - name: value
      type: integer
      description: "0=AUTO, 1=PAL, 2=PAL-60, 3=SECAM, 4=NTSC3.58, 5=NTSC4.43"
  direction: WR
- id: WIDE
  label: Screen Size
  kind: action
  params:
    - name: value
      type: integer
      description: "1=WIDE, 2=NORMAL, 3=Dot by Dot, 4=ZOOM1, 5=ZOOM2"
  direction: WR

# FUNCTION menu
- id: RSET
  label: All Reset
  kind: action
  params:
    - name: value
      type: integer
      description: "0=ALL RESET 1, 1=ALL RESET 2"
  direction: W
- id: ALCK
  label: Adjustment Lock
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON1, 2=ON2"
  direction: WR
- id: ALTG
  label: Adjustment Lock Target
  kind: action
  params:
    - name: value
      type: integer
      description: "0=REMOTE, 1=BUTTONS, 2=BOTH"
  direction: WR
- id: LOSD
  label: OSD Display
  kind: action
  params:
    - name: value
      type: integer
      description: "0=ON1, 1=OFF, 2=ON2"
  direction: WR
- id: OFLD
  label: LED
  kind: action
  params:
    - name: value
      type: integer
      description: "0=ON, 1=OFF"
  direction: WR
- id: TALT
  label: Temperature Alert
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=OSD & LED, 2=LED"
  direction: WR
- id: PBTN
  label: Power Button
  kind: action
  params:
    - name: value
      type: integer
      description: "0=MONITOR, 1=CONTROLLER"
  direction: WR
- id: PCIP
  label: External Controller Input
  kind: action
  params:
    - name: value
      type: integer
      description: "0=D-SUB, 1=DisplayPort, 2=HDMI1, 3=HDMI2, 4=DVI-I"
  direction: WR
- id: SALT
  label: Status Alert
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=OSD & LED, 2=LED"
  direction: WR

# INFORMATION
- id: INF1
  label: Model Info
  kind: query
  params: []
  direction: R
- id: SRNO
  label: Serial No
  kind: query
  params: []
  direction: R
- id: DSTA
  label: Temperature Sensor
  kind: query
  params: []
  direction: R
- id: ERRT
  label: Temperature Acquisition
  kind: query
  params: []
  direction: R
- id: STCA
  label: Cause Of Last Standby
  kind: action
  params:
    - name: value
      type: integer
      description: "0"
  direction: WR

# Gamma data transfer
- id: UGRW
  label: Red Gamma Data Write
  kind: action
  params:
    - name: value
      type: string
      description: "aaxxxx...xxxxcc format (aa=block 01-16, 32 data pieces, cc=checksum)"
  direction: W
- id: UGGW
  label: Green Gamma Data Write
  kind: action
  params:
    - name: value
      type: string
      description: "aaxxxx...xxxxcc format"
  direction: W
- id: UGBW
  label: Blue Gamma Data Write
  kind: action
  params:
    - name: value
      type: string
      description: "aaxxxx...xxxxcc format"
  direction: W
- id: UGRR
  label: Red Gamma Data Read
  kind: action
  params:
    - name: block
      type: integer
      description: "1-16"
  direction: W
- id: UGGR
  label: Green Gamma Data Read
  kind: action
  params:
    - name: block
      type: integer
      description: "1-16"
  direction: W
- id: UGBR
  label: Blue Gamma Data Read
  kind: action
  params:
    - name: block
      type: integer
      description: "1-16"
  direction: W
- id: UGRS
  label: User Data Initialize
  kind: action
  params:
    - name: value
      type: integer
      description: "0"
  direction: W
- id: UGSV
  label: User Data Save
  kind: action
  params:
    - name: value
      type: integer
      description: "0"
  direction: W
- id: CRST
  label: C.M.S. Reset
  kind: action
  params:
    - name: target
      type: integer
      description: "1=reset hue, 2=reset saturation, 3=reset brightness"
  direction: W
```

## Feedbacks
```yaml
# Command responses
- id: ok
  label: OK
  type: enum
  values:
    - ok
    - "ERR"
    - "WAIT"
    - "LOCKED"
    - "UNSELECTED"
  description: "OK=success, ERR=command invalid or cannot execute in current state, WAIT=command processing, LOCKED=RS-232C locked, UNSELECTED=RS-232C/LAN SELECT set to LAN"

# Power state read (POWR R direction)
- id: power_state
  label: Power State
  type: enum
  values:
    - "0"
    - "1"
    - "2"
  description: "0=standby, 1=normal, 2=input signal waiting"

# Input state read (INPS R direction)
- id: input_state
  label: Input State
  type: enum
  values:
    - "1"
    - "2"
    - "3"
    - "4"
    - "9"
    - "10"
    - "12"
    - "13"
    - "14"
  description: "1=DVI-I, 2=D-SUB[RGB], 3=D-SUB[COMPONENT], 4=D-SUB[VIDEO], 9=HDMI1[AV], 10=HDMI1[PC], 12=HDMI2[AV], 13=HDMI2[PC], 14=DisplayPort"

# Temperature status (DSTA)
- id: temperature_status
  label: Temperature Status
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
    - "4"
  description: "0=normal, 1=abnormal standby, 2=abnormal (main power off to clear), 3=abnormal dimmed, 4=sensor abnormal"

# Standby cause (STCA)
- id: standby_cause
  label: Standby Cause
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
    - "4"
    - "6"
    - "8"
    - "20"
  description: "0=no error, 1=POWER button, 2=main power switch, 3=RS-232C/LAN, 4=no signal, 6=abnormal temp, 8=schedule, 20=OFF IF NO OPERATION"
```

## Variables
```yaml
# All WR commands can be read via R direction (query with ? parameter)
# See Actions section for parameter ranges
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros documented
```

## Safety
```yaml
confirmation_required_for:
  - RSET (ALL RESET) # timeout must be 30+ seconds
interlocks:
  - POWR timeout when POWER ON DELAY active: set to DELAY period + 10 seconds minimum
  - Daisy chain multi-monitor: timeout >= monitor position from PC × 10 seconds
# No safety warnings found in source beyond timing requirements
```

## Notes
- RS-232C and LAN mutually exclusive — switch via CTLS command
- Command format: 4-char command + 4-char parameter (space-padded if needed)
- Parameter must be exactly 4 chars; negative values use 3 digits (e.g., AUTR-005)
- Query: append `?` to command field (e.g., `VOLM ????`)
- Response interval: 100ms minimum between commands
- Daisy chain: up to 25 monitors, all must share same baud rate
- LAN auth: username + password required (source: LAN control section with login sequence)
- Repeater control: append `+` to 4th char of parameter for broadcast to all monitors
- Factory preset IP: 192.168.150.2 (DHCP CLIENT OFF condition)
- LAN data port range: 1025-65535 (actual port number not stated in source)
- SEARCH port range: 1025-65535 (actual port number not stated in source)

<!-- UNRESOLVED: LAN TCP port number not stated in source -->
<!-- UNRESOLVED: firmware version not stated in source -->
<!-- UNRESOLVED: gamma data transfer read responses not documented in detail -->
<!-- UNRESOLVED: repeater control response format for multi-monitor reads not fully specified -->

## Provenance

```yaml
source_domains:
  - business.sharpusa.com
source_urls:
  - https://business.sharpusa.com/Portals/0/downloads/Manuals/PN_E603_703_Operation_Manual.pdf
retrieved_at: 2026-05-13T20:34:55.553Z
last_checked_at: 2026-06-10T00:48:02.188Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T00:48:02.188Z
matched_actions: 196
action_count: 196
confidence: medium
summary: "All 196 spec actions matched literally in source; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "DHCP client behavior, LAN port number not stated in source"
- "TCP port number not stated in source (factory preset IP: 192.168.150.2)"
- "no unsolicited event notifications documented"
- "no multi-step macros documented"
- "LAN TCP port number not stated in source"
- "firmware version not stated in source"
- "gamma data transfer read responses not documented in detail"
- "repeater control response format for multi-monitor reads not fully specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
