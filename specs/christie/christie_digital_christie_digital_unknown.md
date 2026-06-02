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
last_checked_at: 2026-06-02T00:05:08.970Z
generated_at: 2026-06-02T00:05:08.970Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific model number not stated in source (status reply references DWU670-E). Ethernet port number not stated. Login/auth procedure for \"Service Mode\" is referenced but not fully documented."
  - "TCP port number not stated in source"
  - "source does not document unsolicited device-pushed events; all flows are request/reply."
  - "source does not describe multi-step sequences."
  - "source does not contain explicit electrical-safety warnings, hazard procedures,"
  - "TCP port number for Ethernet control not stated in source. Specific projector model number (DWU670-E) is one of possibly several E Series models. Service account credentials are not enumerated (only \"service,service\" given as example). IR Remote keycode list ends at keycode 72; completeness of IR keycode table is not guaranteed by the source."
verification:
  verdict: verified
  checked_at: 2026-06-02T00:05:08.970Z
  matched_actions: 225
  action_count: 225
  confidence: medium
  summary: "All 225 spec actions found with literal command matches in source; transport parameters verified complete. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Christie Digital E Series Control Spec

## Summary
ASCII serial protocol for controlling Christie E Series projectors over RS-232 or Ethernet. All commands are wrapped in parentheses with a 3-letter function code, optional 4-letter subcode, and optional data, request ("?"), or reply ("!") marker. The status response example names a specific model `DWU670-E`, but the manual itself covers the whole E Series.

<!-- UNRESOLVED: specific model number not stated in source (status reply references DWU670-E). Ethernet port number not stated. Login/auth procedure for "Service Mode" is referenced but not fully documented. -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred: "ETHERNET port" mentioned in source for remote access
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: TCP port number not stated in source
auth:
  type: none  # inferred: no protocol-level auth procedure in source (PIV is projector-side PIN, UID is service-mode login, not connection auth)
```

## Traits
```yaml
- powerable  # inferred from PWR, APW, ASH, SLP, PWR+STBM commands
- routable   # inferred from SIN, PIP, PPS, PHS, PPP input/PIP routing commands
- queryable  # inferred from "?" request forms (LIF+LP1H?, MIF+RESL?, SST?, PIF+FWVS?, etc.)
- levelable  # inferred from BRT, CON, CLR, TNT, NRD, FTC, ROG, GOG, BOG, ROO, GOO, BOO, SYT, WPK image-level commands
```

## Actions
```yaml
# Size & Position
- id: szp_set
  label: Size Presets
  kind: action
  command: "(SZP{preset})"
  params:
    - name: preset
      type: integer
      description: "0=Auto, 1=Native, 2=4:3, 3=LetterBox, 4=Full Size, 5=Full Width, 6=Full Height"
- id: szp_query
  label: Size Presets Query
  kind: query
  command: "(SZP?)"
  params: []

- id: ovs_set
  label: Overscan
  kind: action
  command: "(OVS{mode})"
  params:
    - name: mode
      type: integer
      description: "0=OFF, 1=ZOOM, 2=CROP"
- id: ovs_query
  label: Overscan Query
  kind: query
  command: "(OVS?)"
  params: []

- id: pxp_set
  label: Pixel Phase
  kind: action
  command: "(PXP{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: pxp_query
  label: Pixel Phase Query
  kind: query
  command: "(PXP?)"
  params: []

- id: pxt_set
  label: Pixel Track
  kind: action
  command: "(PXT{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: pxt_query
  label: Pixel Track Query
  kind: query
  command: "(PXT?)"
  params: []

- id: hor_set
  label: Horizontal Position
  kind: action
  command: "(HOR{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: hor_query
  label: Horizontal Position Query
  kind: query
  command: "(HOR?)"
  params: []

- id: vrt_set
  label: Vertical Position
  kind: action
  command: "(VRT{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: vrt_query
  label: Vertical Position Query
  kind: query
  command: "(VRT?)"
  params: []

- id: wrp_hkst_set
  label: Horizontal Keystone
  kind: action
  command: "(WRP+HKST{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: wrp_hkst_query
  label: Horizontal Keystone Query
  kind: query
  command: "(WRP+HKST?)"
  params: []

- id: wrp_vkst_set
  label: Vertical Keystone
  kind: action
  command: "(WRP+VKST{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: wrp_vkst_query
  label: Vertical Keystone Query
  kind: query
  command: "(WRP+VKST?)"
  params: []

- id: hpc_set
  label: Horizontal Pincushion
  kind: action
  command: "(HPC{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: hpc_query
  label: Horizontal Pincushion Query
  kind: query
  command: "(HPC?)"
  params: []

- id: vpc_set
  label: Vertical Pincushion
  kind: action
  command: "(VPC{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: vpc_query
  label: Vertical Pincushion Query
  kind: query
  command: "(VPC?)"
  params: []

- id: siz_set
  label: Digital Zoom
  kind: action
  command: "(SIZ{value})"
  params:
    - name: value
      type: integer
      description: "0-100, 100=normal (default), 0=fully reduced"
- id: siz_query
  label: Digital Zoom Query
  kind: query
  command: "(SIZ?)"
  params: []

- id: dsh_set
  label: Digital Horizontal Shift
  kind: action
  command: "(DSH{value})"
  params:
    - name: value
      type: integer
      description: "0-100, 0=left, 50=center (default), 100=right. Requires Digital Zoom applied first."
- id: dsh_query
  label: Digital Horizontal Shift Query
  kind: query
  command: "(DSH?)"
  params: []

- id: dsv_set
  label: Digital Vertical Shift
  kind: action
  command: "(DSV{value})"
  params:
    - name: value
      type: integer
      description: "0-100, 0=top, 50=center (default), 100=bottom. Requires Digital Zoom applied first."
- id: dsv_query
  label: Digital Vertical Shift Query
  kind: query
  command: "(DSV?)"
  params: []

- id: aim
  label: Auto Image
  kind: action
  command: "(AIM1)"
  params: []
  notes: Forces the projector to reacquire and lock to the input signal.

# Image Settings
- id: brt_set
  label: Brightness
  kind: action
  command: "(BRT{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: brt_query
  label: Brightness Query
  kind: query
  command: "(BRT?)"
  params: []

- id: con_set
  label: Contrast
  kind: action
  command: "(CON{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: con_query
  label: Contrast Query
  kind: query
  command: "(CON?)"
  params: []

- id: csp_set
  label: Color Space
  kind: action
  command: "(CSP{mode})"
  params:
    - name: mode
      type: integer
      description: "0=RGB, 1=REC709, 2=REC601, 3=RGB Video, 4=Auto (default)"
- id: csp_query
  label: Color Space Query
  kind: query
  command: "(CSP?)"
  params: []

- id: dtl_set
  label: Detail (Sharpness)
  kind: action
  command: "(DTL{level})"
  params:
    - name: level
      type: integer
      description: "0=Maximum, 1=High, 2=Normal (default), 3=Low, 4=Minimum"
- id: dtl_query
  label: Detail Query
  kind: query
  command: "(DTL?)"
  params: []

- id: clr_set
  label: Color Saturation
  kind: action
  command: "(CLR{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: clr_query
  label: Color Query
  kind: query
  command: "(CLR?)"
  params: []

- id: tnt_set
  label: Tint
  kind: action
  command: "(TNT{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: tnt_query
  label: Tint Query
  kind: query
  command: "(TNT?)"
  params: []

- id: nrd_set
  label: Noise Reduction
  kind: action
  command: "(NRD{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 0"
- id: nrd_query
  label: Noise Reduction Query
  kind: query
  command: "(NRD?)"
  params: []

- id: ftc_set
  label: Flesh Tone Correction
  kind: action
  command: "(FTC{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 0"
- id: ftc_query
  label: Flesh Tone Correction Query
  kind: query
  command: "(FTC?)"
  params: []

- id: vbl_set
  label: Video Black Level (IRE)
  kind: action
  command: "(VBL{mode})"
  params:
    - name: mode
      type: integer
      description: "0=IRE off, 1=IRE on"
- id: vbl_query
  label: Video Black Level Query
  kind: query
  command: "(VBL?)"
  params: []

- id: fmd_set
  label: Film Mode Detect
  kind: action
  command: "(FMD{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On (default)"
- id: fmd_query
  label: Film Mode Detect Query
  kind: query
  command: "(FMD?)"
  params: []

- id: clc_set
  label: Closed Captions
  kind: action
  command: "(CLC{mode})"
  params:
    - name: mode
      type: integer
      description: "0=off (default), 1=CC1, 2=CC2"
- id: clc_query
  label: Closed Captions Query
  kind: query
  command: "(CLC?)"
  params: []

- id: rog_set
  label: Red Gain
  kind: action
  command: "(ROG{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: rog_query
  label: Red Gain Query
  kind: query
  command: "(ROG?)"
  params: []

- id: gog_set
  label: Green Gain
  kind: action
  command: "(GOG{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: gog_query
  label: Green Gain Query
  kind: query
  command: "(GOG?)"
  params: []

- id: bog_set
  label: Blue Gain
  kind: action
  command: "(BOG{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: bog_query
  label: Blue Gain Query
  kind: query
  command: "(BOG?)"
  params: []

- id: roo_set
  label: Red Offset
  kind: action
  command: "(ROO{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: roo_query
  label: Red Offset Query
  kind: query
  command: "(ROO?)"
  params: []

- id: goo_set
  label: Green Offset
  kind: action
  command: "(GOO{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: goo_query
  label: Green Offset Query
  kind: query
  command: "(GOO?)"
  params: []

- id: boo_set
  label: Blue Offset
  kind: action
  command: "(BOO{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: boo_query
  label: Blue Offset Query
  kind: query
  command: "(BOO?)"
  params: []

- id: syt_set
  label: Sync Threshold (SOG)
  kind: action
  command: "(SYT{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 50"
- id: syt_query
  label: Sync Threshold Query
  kind: query
  command: "(SYT?)"
  params: []

- id: gor
  label: RGB Gain/Offset Reset
  kind: action
  command: "(GOR1)"
  params: []
  notes: Reset Red, Green, Blue gain and offset values.

- id: pst_set
  label: Picture Setting
  kind: action
  command: "(PST{preset})"
  params:
    - name: preset
      type: integer
      description: "0=Presentation, 1=Video, 2=Bright, 3=Whiteboard, 4=Blackboard, 5=Beige Wall, 6=User"
- id: pst_user_store
  label: Picture Setting - Store User Mode
  kind: action
  command: "(PST+USER1)"
  params: []
  notes: Stores current settings to User Mode.
- id: pst_query
  label: Picture Setting Query
  kind: query
  command: "(PST?)"
  params: []

- id: dim_set
  label: DynamicBlack
  kind: action
  command: "(DIM{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On"
- id: dim_query
  label: DynamicBlack Query
  kind: query
  command: "(DIM?)"
  params: []

- id: bgc_set
  label: Gamma Curve
  kind: action
  command: "(BGC{curve})"
  params:
    - name: curve
      type: integer
      description: "0=Video, 1=Film, 2=Bright, 3=CRT"
- id: bgc_query
  label: Gamma Curve Query
  kind: query
  command: "(BGC?)"
  params: []

- id: bcl_set
  label: BrilliantColor
  kind: action
  command: "(BCL{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Normal Look, 1=Bright Look"
- id: bcl_query
  label: BrilliantColor Query
  kind: query
  command: "(BCL?)"
  params: []

- id: wpk_set
  label: White Peaking
  kind: action
  command: "(WPK{value})"
  params:
    - name: value
      type: integer
      description: "Adjusts amount of white processing through the data path."
- id: wpk_query
  label: White Peaking Query
  kind: query
  command: "(WPK?)"
  params: []

- id: cci_set
  label: Color Temperature
  kind: action
  command: "(CCI{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Warmest, 1=Warm, 2=Cool, 3=Bright"
- id: cci_query
  label: Color Temperature Query
  kind: query
  command: "(CCI?)"
  params: []

- id: edg_set
  label: Edge Enhancement
  kind: action
  command: "(EDG{level})"
  params:
    - name: level
      type: integer
      description: "0=off, 1=normal, 2=Maximum"
- id: edg_query
  label: Edge Enhancement Query
  kind: query
  command: "(EDG?)"
  params: []

- id: cws_set
  label: Color Wheel Speed
  kind: action
  command: "(CWS{speed})"
  params:
    - name: speed
      type: integer
      description: "0=2x setting, 1=3x setting"
- id: cws_query
  label: Color Wheel Speed Query
  kind: query
  command: "(CWS?)"
  params: []

# Configuration
- id: loc_lang_set
  label: OSD Language
  kind: action
  command: "(LOC+LANG{language})"
  params:
    - name: language
      type: integer
      description: "0=English, 1=Chinese, 2=French, 3=German, 4=Italian, 5=Japanese, 6=Korean, 7=Russian, 8=Spanish"
- id: loc_lang_query
  label: OSD Language Query
  kind: query
  command: "(LOC+LANG?)"
  params: []

- id: fcs
  label: Focus (step)
  kind: action
  command: "(FCS{direction})"
  params:
    - name: direction
      type: enum
      description: "n=increase by 1, p=decrease by 1"
  notes: "Use modifier 'n' to increase focus by 1, 'p' to decrease."

- id: zom
  label: Zoom (step)
  kind: action
  command: "(ZOM{direction})"
  params:
    - name: direction
      type: enum
      description: "n=increase by 1, p=decrease by 1"
  notes: "Use modifier 'n' to increase zoom by 1, 'p' to decrease."

- id: lvo
  label: Lens Shift Vertical (step)
  kind: action
  command: "(LVO{direction})"
  params:
    - name: direction
      type: enum
      description: "n=increase by 1, p=decrease by 1"

- id: lho
  label: Lens Shift Horizontal (step)
  kind: action
  command: "(LHO{direction})"
  params:
    - name: direction
      type: enum
      description: "n=increase by 1, p=decrease by 1"

- id: lcb_lock_set
  label: Lock Lens Motors
  kind: action
  command: "(LCB+LOCK{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Allow (default), 1=Locked"
- id: lcb_lock_query
  label: Lens Motors Lock Query
  kind: query
  command: "(LCB+LOCK?)"
  params: []

- id: lcb_home
  label: Lens Center (Home)
  kind: action
  command: "(LCB+HOME1)"
  params: []
  notes: Calibrates the lens and returns to horizontal/vertical home. Focus and Zoom unaffected.

- id: cel_set
  label: Ceiling Mount
  kind: action
  command: "(CEL{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On, 2=Auto (G-sensor detects orientation)"
- id: cel_query
  label: Ceiling Mount Query
  kind: query
  command: "(CEL?)"
  params: []

- id: sor_set
  label: Rear Projection
  kind: action
  command: "(SOR{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On"
- id: sor_query
  label: Rear Projection Query
  kind: query
  command: "(SOR?)"
  params: []

- id: msh_set
  label: Menu Shift Horizontal
  kind: action
  command: "(MSH{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 0"
- id: msh_query
  label: Menu Shift Horizontal Query
  kind: query
  command: "(MSH?)"
  params: []

- id: msv_set
  label: Menu Shift Vertical
  kind: action
  command: "(MSV{value})"
  params:
    - name: value
      type: integer
      description: "0-100, default 0"
- id: msv_query
  label: Menu Shift Vertical Query
  kind: query
  command: "(MSV?)"
  params: []

- id: mbe_user_set
  label: Show Messages (OSD Messages)
  kind: action
  command: "(MBE+USER{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On (default)"
- id: mbe_user_query
  label: Show Messages Query
  kind: query
  command: "(MBE+USER?)"
  params: []

- id: ost_set
  label: Menu Transparency
  kind: action
  command: "(OST{value})"
  params:
    - name: value
      type: integer
      description: "0-90, default 0 (not transparent)"
- id: ost_query
  label: Menu Transparency Query
  kind: query
  command: "(OST?)"
  params: []

- id: sps_slct_set
  label: Splash Screen Select
  kind: action
  command: "(SPS+SLCT{choice})"
  params:
    - name: choice
      type: integer
      description: "0=Factory Logo (default), 1=Blue, 2=Black, 3=White"
- id: sps_slct_query
  label: Splash Screen Query
  kind: query
  command: "(SPS+SLCT?)"
  params: []

- id: piv
  label: PIN Protect Toggle
  kind: action
  command: '(PIV"XXXXX")'
  params:
    - name: pin
      type: string
      description: "5-digit numeric PIN (0-9). If correct, toggles the Pin Protect function."
  notes: "Enables/disables password protection; correct PIN must be supplied."

- id: pcg
  label: Change PIN
  kind: action
  command: '(PCG"OOOOO,NNNNN")'
  params:
    - name: old_pin
      type: string
      description: "5-digit old PIN (default 12345)"
    - name: new_pin
      type: string
      description: "5-digit new PIN (numeric, 0-9)"

- id: pwr_stbm_set
  label: Standby Mode
  kind: action
  command: "(PWR+STBM{mode})"
  params:
    - name: mode
      type: integer
      description: "0=1W Mode (keypad only; cannot power on via UART/WEB/USB), 1=Communication Mode (~20W; power-on via UART/WEB/USB supported)"
- id: pwr_stbm_query
  label: Standby Mode Query
  kind: query
  command: "(PWR+STBM?)"
  params: []

- id: apw_set
  label: Auto Power On
  kind: action
  command: "(APW{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off (default), 1=On (skip standby on AC applied)"
- id: apw_query
  label: Auto Power On Query
  kind: query
  command: "(APW?)"
  params: []

- id: ash_set
  label: Auto Shutdown
  kind: action
  command: "(ASH{minutes})"
  params:
    - name: minutes
      type: integer
      description: "0=Off/Never, 1=5min, 2=10min, 3=15min, 4=20min, 5=25min, 6=30min"
- id: ash_query
  label: Auto Shutdown Query
  kind: query
  command: "(ASH?)"
  params: []

- id: slp_set
  label: Sleep Timer
  kind: action
  command: "(SLP{hours})"
  params:
    - name: hours
      type: integer
      description: "0=Off (default), 1=2 Hrs, 2=4 Hrs, 3=6 Hrs"
- id: slp_query
  label: Sleep Timer Query
  kind: query
  command: "(SLP?)"
  params: []

- id: hat_set
  label: High Altitude Mode
  kind: action
  command: "(HAT{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On (modify fan speeds for high altitude)"
- id: hat_query
  label: High Altitude Query
  kind: query
  command: "(HAT?)"
  params: []

- id: net_dhcp_set
  label: Network - DHCP
  kind: action
  command: "(NET+DHCP{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On"
- id: net_eth0_set
  label: Network - IP Address
  kind: action
  command: '(NET+ETH0"{ip}")'
  params:
    - name: ip
      type: string
      description: "IPv4 address, e.g. 192.168.000.001"
- id: net_sub0_set
  label: Network - Subnet Mask
  kind: action
  command: '(NET+SUB0"{mask}")'
  params:
    - name: mask
      type: string
      description: "Subnet mask, e.g. 255.255.255.000"
- id: net_gate_set
  label: Network - Default Gateway
  kind: action
  command: '(NET+GATE"{gateway}")'
  params:
    - name: gateway
      type: string
      description: "Default gateway IPv4 address"
- id: net_host_set
  label: Network - Projector Name
  kind: action
  command: '(NET+HOST"{name}")'
  params:
    - name: name
      type: string
      description: "Projector hostname, e.g. DWU670-E"
- id: net_mac0_set
  label: Network - MAC Address
  kind: action
  command: '(NET+MAC0"{mac}")'
  params:
    - name: mac
      type: string
      description: "MAC address, e.g. 00:E0:47:01:02:3C"
- id: net_show_set
  label: Network - Show Network Messages
  kind: action
  command: "(NET+SHOW{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On"
- id: net_rstr
  label: Network - Restart
  kind: action
  command: "(NET+RSTR1)"
  params: []
- id: net_rset
  label: Network - Factory Reset
  kind: action
  command: "(NET+RSET1)"
  params: []

- id: bdr_set
  label: Serial Port Baud Rate
  kind: action
  command: "(BDR{baud})"
  params:
    - name: baud
      type: integer
      description: "0=2400, 1=4800, 2=9600, 3=14400, 4=19200, 5=38400, 6=57600, 7=115200 (default)"
- id: bdr_query
  label: Serial Port Baud Rate Query
  kind: query
  command: "(BDR?)"
  params: []

- id: sec_set
  label: Serial Port Echo
  kind: action
  command: "(SEC{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off (default), 1=On"
- id: sec_query
  label: Serial Port Echo Query
  kind: query
  command: "(SEC?)"
  params: []

- id: vtt_set
  label: 12V Trigger
  kind: action
  command: "(VTT{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On (controls screen raise/lower)"
- id: vtt_query
  label: 12V Trigger Query
  kind: query
  command: "(VTT?)"
  params: []

- id: hks_set
  label: Hot-key Settings
  kind: action
  command: "(HKS{function})"
  params:
    - name: function
      type: integer
      description: "0=Blank Screen, 1=Aspect Ratio, 2=Freeze Screen, 3=Projector Info, 4=Overscan, 5=Closed Captions"
- id: hks_query
  label: Hot-key Settings Query
  kind: query
  command: "(HKS?)"
  params: []

# Lamp
- id: lpm_set
  label: Lamp Power
  kind: action
  command: "(LPM{level})"
  params:
    - name: level
      type: integer
      description: "0=280W, 1=285W, 2=290W, 3=295W, 4=300W, 5=305W, 6=310W, 7=315W, 8=320W, 9=325W, 10=330W (default)"
- id: lpm_query
  label: Lamp Power Query
  kind: query
  command: "(LPM?)"
  params: []

- id: lop_set
  label: Current Lamp
  kind: action
  command: "(LOP{choice})"
  params:
    - name: choice
      type: integer
      description: "1=Only Lamp 1, 2=Only Lamp 2, 3=Both Lamps"
- id: lop_query
  label: Current Lamp Query
  kind: query
  command: "(LOP?)"
  params: []

- id: wsp_set
  label: Whisper Mode
  kind: action
  command: "(WSP{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=Lamp1, 2=Lamp2, 3=Auto"
- id: wsp_query
  label: Whisper Mode Query
  kind: query
  command: "(WSP?)"
  params: []

- id: lsf_set
  label: Lamp Auto Switch
  kind: action
  command: "(LSF{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Only on lamp fail, 1=Switch on every power on (and on fail), 2=Switch after N hours (and on fail)"
- id: lsf_time_set
  label: Lamp Auto Switch - N Hours
  kind: action
  command: "(LSF+TIME{hours})"
  params:
    - name: hours
      type: integer
      description: "Number of hours before lamp auto switch when LSF mode = 2"
- id: lsf_query
  label: Lamp Auto Switch Query
  kind: query
  command: "(LSF?)"
  params: []

- id: lif_lp1h_query
  label: Lamp 1 Hours Query
  kind: query
  command: "(LIF+LP1H?)"
  params: []
- id: lif_lp2h_query
  label: Lamp 2 Hours Query
  kind: query
  command: "(LIF+LP2H?)"
  params: []
- id: lif_lpth_query
  label: Total Lamp Hours Query
  kind: query
  command: "(LIF+LPTH?)"
  params: []
- id: lif_lp1r_query
  label: Lamp 1 Reset Times Query
  kind: query
  command: "(LIF+LP1R?)"
  params: []
- id: lif_lp2r_query
  label: Lamp 2 Reset Times Query
  kind: query
  command: "(LIF+LP2R?)"
  params: []

- id: lpl_set
  label: Lamp Life Warning
  kind: action
  command: "(LPL{hours})"
  params:
    - name: hours
      type: integer
      description: "0=Off (default). Any positive value triggers a warning at that many hours."
- id: lpl_query
  label: Lamp Life Warning Query
  kind: query
  command: "(LPL?)"
  params: []

- id: lpc_lmp1
  label: Reset Lamp 1 Hours
  kind: action
  command: "(LPC+LMP11)"
  params: []
- id: lpc_lmp2
  label: Reset Lamp 2 Hours
  kind: action
  command: "(LPC+LMP21)"
  params: []
  notes: "Source example shows (LPC+LAMP21); the subcode table lists LMP2. Either form per source."
- id: lpc_both
  label: Reset Both Lamp Hours
  kind: action
  command: "(LPC+BOTH1)"
  params: []

# Input Switching & PIP
- id: sin_set
  label: Input Source Change
  kind: action
  command: "(SIN{source})"
  params:
    - name: source
      type: integer
      description: "0=VGA1, 1=VGA2, 2=RGBHV (5-wire BNC), 3=HDMI 1, 4=HDMI 2, 5=Component, 6=S-Video, 7=Composite"
- id: sin_main
  label: Set Main Source
  kind: action
  command: "(SIN+MAIN{source})"
  params:
    - name: source
      type: integer
      description: "Same enumeration as SIN direct: 0=VGA1, 1=VGA2, 2=RGBHV, 3=HDMI 1, 4=HDMI 2, 5=Component, 6=S-Video, 7=Composite"
- id: sin_piip
  label: Set PIP Source
  kind: action
  command: "(SIN+PIIP{source})"
  params:
    - name: source
      type: integer
      description: "Same enumeration as SIN direct: 0=VGA1, 1=VGA2, 2=RGBHV, 3=HDMI 1, 4=HDMI 2, 5=Component, 6=S-Video, 7=Composite"
- id: sin_query
  label: Active Source Query
  kind: query
  command: "(SIN?)"
  params: []

- id: pip_set
  label: PIP/PBP Enable
  kind: action
  command: "(PIP{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Disable (default), 1=Enable"
- id: pip_query
  label: PIP/PBP State Query
  kind: query
  command: "(PIP?)"
  params: []

- id: pps
  label: PIP/PBP Swap
  kind: action
  command: "(PPS1)"
  params: []
  notes: Swap MAIN and PIP sources.

- id: phs_set
  label: PIP/PBP Size
  kind: action
  command: "(PHS{size})"
  params:
    - name: size
      type: integer
      description: "0=Small, 1=Medium, 2=Large"
- id: phs_query
  label: PIP/PBP Size Query
  kind: query
  command: "(PHS?)"
  params: []

- id: ppp_set
  label: PIP/PBP Layout
  kind: action
  command: "(PPP{layout})"
  params:
    - name: layout
      type: integer
      description: "0=POP Bigger Left, 1=Over-Under Bigger Upper, 2=POP Bigger Right, 3=Over-Under Bigger Lower, 4=PIP-Bottom Right, 5=PIP-Bottom Left, 6=PIP-Top Left, 7=PIP-Top Right"
- id: ppp_query
  label: PIP/PBP Layout Query
  kind: query
  command: "(PPP?)"
  params: []

- id: tmg_set
  label: Timing Detect Mode
  kind: action
  command: "(TMG{mode})"
  params:
    - name: mode
      type: integer
      description: "0=Normal, 1=Wide"
- id: tmg_query
  label: Timing Detect Mode Query
  kind: query
  command: "(TMG?)"
  params: []

- id: mif_acts_query
  label: Main Image Active Source
  kind: query
  command: "(MIF+ACTS?)"
  params: []
- id: mif_sgft_query
  label: Main Image Signal Format
  kind: query
  command: "(MIF+SGFT?)"
  params: []
- id: mif_aprt_query
  label: Main Image Aspect Ratio
  kind: query
  command: "(MIF+APRT?)"
  params: []
- id: mif_resl_query
  label: Main Image Resolution
  kind: query
  command: "(MIF+RESL?)"
  params: []
- id: mif_vref_query
  label: Main Image Vertical Refresh
  kind: query
  command: "(MIF+VREF?)"
  params: []
- id: mif_href_query
  label: Main Image Horizontal Refresh
  kind: query
  command: "(MIF+HREF?)"
  params: []
- id: mif_pixc_query
  label: Main Image Pixel Clock
  kind: query
  command: "(MIF+PIXC?)"
  params: []
- id: mif_sync_query
  label: Main Image Sync Type
  kind: query
  command: "(MIF+SYNC?)"
  params: []
- id: mif_clsp_query
  label: Main Image Color Space
  kind: query
  command: "(MIF+CLSP?)"
  params: []

- id: sif_acts_query
  label: PIP Image Active Source
  kind: query
  command: "(SIF+ACTS?)"
  params: []
- id: sif_sgft_query
  label: PIP Image Signal Format
  kind: query
  command: "(SIF+SGFT?)"
  params: []
- id: sif_aprt_query
  label: PIP Image Aspect Ratio
  kind: query
  command: "(SIF+APRT?)"
  params: []
- id: sif_resl_query
  label: PIP Image Resolution
  kind: query
  command: "(SIF+RESL?)"
  params: []
- id: sif_vref_query
  label: PIP Image Vertical Refresh
  kind: query
  command: "(SIF+VREF?)"
  params: []
- id: sif_href_query
  label: PIP Image Horizontal Refresh
  kind: query
  command: "(SIF+HREF?)"
  params: []
- id: sif_pixc_query
  label: PIP Image Pixel Clock
  kind: query
  command: "(SIF+PIXC?)"
  params: []
- id: sif_sync_query
  label: PIP Image Sync Type
  kind: query
  command: "(SIF+SYNC?)"
  params: []
- id: sif_clsp_query
  label: PIP Image Color Space
  kind: query
  command: "(SIF+CLSP?)"
  params: []

- id: esh_set
  label: Enabled Main Source Hot-key
  kind: action
  command: "(ESH{mode})"
  params:
    - name: mode
      type: integer
      description: "0=ON, 1=OFF"
- id: esh_query
  label: Enabled Hot-key Query
  kind: query
  command: "(ESH?)"
  params: []

- id: mhk_vga1
  label: Hot-key Assignment for VGA1
  kind: action
  command: "(MHK+VGA1{key})"
  params:
    - name: key
      type: integer
      description: "Number key 0-9 to assign as hot-key (e.g. 8 → (MHK+VGA18))"
- id: mhk_vga2
  label: Hot-key Assignment for VGA2
  kind: action
  command: "(MHK+VGA2{key})"
  params:
    - name: key
      type: integer
      description: "Number key 0-9"
- id: mhk_bnc1
  label: Hot-key Assignment for BNC
  kind: action
  command: "(MHK+BNC1{key})"
  params:
    - name: key
      type: integer
      description: "Number key 0-9"
- id: mhk_hdm1
  label: Hot-key Assignment for HDMI1
  kind: action
  command: "(MHK+HDM1{key})"
  params:
    - name: key
      type: integer
      description: "Number key 0-9"
- id: mhk_hdm2
  label: Hot-key Assignment for HDMI2
  kind: action
  command: "(MHK+HDM2{key})"
  params:
    - name: key
      type: integer
      description: "Number key 0-9"
- id: mhk_con1
  label: Hot-key Assignment for Component
  kind: action
  command: "(MHK+CON1{key})"
  params:
    - name: key
      type: integer
      description: "Number key 0-9"
- id: mhk_svdo
  label: Hot-key Assignment for S-Video
  kind: action
  command: "(MHK+SVDO{key})"
  params:
    - name: key
      type: integer
      description: "Number key 0-9"
- id: mhk_cops
  label: Hot-key Assignment for Composite
  kind: action
  command: "(MHK+COPS{key})"
  params:
    - name: key
      type: integer
      description: "Number key 0-9"

- id: sks_set
  label: Source Key Function
  kind: action
  command: "(SKS{function})"
  params:
    - name: function
      type: integer
      description: "0=Change source, 1=List all sources (default), 2=Change source with Auto"

# Miscellaneous
- id: itp_set
  label: Test Pattern
  kind: action
  command: "(ITP{pattern})"
  params:
    - name: pattern
      type: integer
      description: "0=Off, 1=Grid, 2=White, 3=Black, 4=Checkerboard, 5=Color bars, 6=Red (service), 7=Green (service), 8=Blue (service), 9=Yellow (service), 10=Magenta (service), 11=Cyan (service)"
  notes: "Patterns 6-11 require Service Mode. Switching away from Grid/Color Bars may take up to 18 seconds."
- id: itp_query
  label: Test Pattern Query
  kind: query
  command: "(ITP?)"
  params: []

- id: sst
  label: Projector Status (full dump)
  kind: query
  command: "(SST?)"
  params: []
  notes: |
    Returns a series of (SST!NNN "value" "label") replies:
    000 Model Name, 001 Serial Number, 002 Native Resolution, 003 Main Input,
    004 Main Signal Format, 005 Main Pixel Clock, 006 Main Sync Type,
    007 Main Horz Refresh, 008 Main Vert Refresh, 009 PIP/PBP Input,
    010 PIP/PBP Signal Format, 011 PIP/PBP Pixel Clock, 012 PIP/PBP Sync Type,
    013 PIP/PBP Horz Refresh, 014 PIP/PBP Vert Refresh, 015 Lamp Power Setting,
    016 Current Lamp, 017 Lamp 1 Hours, 018 Lamp 2 Hours, 019 Standby Mode,
    020 Lens Lock Setting, 021 IP Address, 022 DHCP.

# Service
- id: cwi_spx2
  label: Color Wheel Index (2x speed)
  kind: action
  command: "(CWI+SPX2{index})"
  params:
    - name: index
      type: integer
      description: "Color wheel index value for 2x speed"
  notes: Service Mode required.
- id: cwi_spx3
  label: Color Wheel Index (3x speed)
  kind: action
  command: "(CWI+SPX3{index})"
  params:
    - name: index
      type: integer
      description: "Color wheel index value for 3x speed"
  notes: Service Mode required.

- id: pif_mdln_query
  label: Projector Model Name
  kind: query
  command: "(PIF+MDLN?)"
  params: []
  notes: Service user required.
- id: pif_snum_query
  label: Projector Serial Number
  kind: query
  command: "(PIF+SNUM?)"
  params: []
  notes: Service user required.
- id: pif_ners_query
  label: Projector Native Resolution
  kind: query
  command: "(PIF+NERS?)"
  params: []
  notes: Service user required.
- id: pif_fwvs_query
  label: Projector Firmware Version
  kind: query
  command: "(PIF+FWVS?)"
  params: []
  notes: Service user required.
- id: pif_cfvs_query
  label: Projector Configuration Version
  kind: query
  command: "(PIF+CFVS?)"
  params: []
  notes: Service user required.
- id: pif_bcvs_query
  label: Projector Boot Code Version
  kind: query
  command: "(PIF+BCVS?)"
  params: []
  notes: Service user required.

- id: def
  label: Factory Defaults
  kind: action
  command: "(DEF 111)"
  params: []
  notes: "Resets all settings. Must send literal '111' to prevent accidental use. Service user required."

- id: uid
  label: Enter Service Code
  kind: action
  command: '(UID"username,password")'
  params:
    - name: username
      type: string
      description: "Service username (e.g. 'service')"
    - name: password
      type: string
      description: "Service password (e.g. 'service')"
  notes: "Service Mode is turned off when the projector is powered off."

# Serial-only
- id: siv
  label: Serial Command Version
  kind: query
  command: "(SIV?)"
  params: []

- id: lce
  label: Last Serial Command Error
  kind: query
  command: "(LCE?)"
  params: []

- id: lse
  label: Last System Error
  kind: query
  command: "(LSE?)"
  params: []
  notes: |
    Returns: 1 = lamp did not strike after 5 attempts; 3 = lamp went out unexpectedly;
    4 = fan failure; 5 = over temperature.

- id: pwr
  label: Power On/Off
  kind: action
  command: "(PWR{state})"
  params:
    - name: state
      type: integer
      description: "0=Power off (Standby Mode), 1=Power on (Lamps On)"
- id: pwr_query
  label: Power State Query
  kind: query
  command: "(PWR?)"
  params: []

- id: sns_src0
  label: Source Name - VGA1
  kind: action
  command: '(SNS+SRC0"{name}")'
  params:
    - name: name
      type: string
      description: "User-defined source name"
- id: sns_src1
  label: Source Name - VGA2
  kind: action
  command: '(SNS+SRC1"{name}")'
  params:
    - name: name
      type: string
      description: "User-defined source name"
- id: sns_src2
  label: Source Name - BNC
  kind: action
  command: '(SNS+SRC2"{name}")'
  params:
    - name: name
      type: string
      description: "User-defined source name"
- id: sns_src3
  label: Source Name - HDMI1
  kind: action
  command: '(SNS+SRC3"{name}")'
  params:
    - name: name
      type: string
      description: "User-defined source name"
- id: sns_src4
  label: Source Name - HDMI2
  kind: action
  command: '(SNS+SRC4"{name}")'
  params:
    - name: name
      type: string
      description: "User-defined source name"
- id: sns_src5
  label: Source Name - Component
  kind: action
  command: '(SNS+SRC5"{name}")'
  params:
    - name: name
      type: string
      description: "User-defined source name"
- id: sns_src6
  label: Source Name - S-Video
  kind: action
  command: '(SNS+SRC6"{name}")'
  params:
    - name: name
      type: string
      description: "User-defined source name"
- id: sns_src7
  label: Source Name - Composite
  kind: action
  command: '(SNS+SRC7"{name}")'
  params:
    - name: name
      type: string
      description: "User-defined source name"

- id: key
  label: IR Remote Key-code Entry
  kind: action
  command: "(KEY{code})"
  params:
    - name: code
      type: integer
      description: "Decimal IR keycode. Known codes: POWER=0, TEST=1, SHUTTER=2, FOCUS_LEFT=5, FOCUS_RIGHT=6, ZOOM-=9, ZOOM+=10, LENS H-LEFT=13, LENS H-RIGHT=14, PIP/POP=15, LENS V-DOWN=17, LENS V-UP=18, MENU=19, EXIT=20, GAMMA=23, CONTRAST=24, BRIGHT=25, 1=26..9=34, HELP=35, 0=36, UP=38, LEFT=39, ENTER=40, RIGHT=41, DOWN=42, SWAP=43, AUTO=47, INPUT=48, OSD=49, DISPLAY=64, HOT KEY=65, INFO=66, SIZE=67, LAYOUT=68, KEYSTONE H-LEFT=69, KEYSTONE H-RIGHT=70, KEYSTONE V-UP=71, KEYSTONE V-DOWN=72."
  notes: |
    Known limitations: Enter key works in menus but not dropdowns; Exit key in a dropdown exits
    the dropdown, not the menu. See Appendix-2 in source for full table.

- id: shu_set
  label: Shutter Open/Close
  kind: action
  command: "(SHU{state})"
  params:
    - name: state
      type: integer
      description: "0=Open/Shutter off, 1=Closed/Shutter on (displays black screen)"
- id: shu_query
  label: Shutter State Query
  kind: query
  command: "(SHU?)"
  params: []

- id: osd_set
  label: OSD Show/Hide
  kind: action
  command: "(OSD{state})"
  params:
    - name: state
      type: integer
      description: "0=Hide, 1=Show"
- id: osd_query
  label: OSD State Query
  kind: query
  command: "(OSD?)"
  params: []
```

## Feedbacks
```yaml
# Format: (Code!value) for replies, (Code!value) for subcoded replies
# Examples from SST? reply (one feedback shape per reply row):
- id: power_state
  type: enum
  values: [on, off]
- id: lamp_state
  type: enum
  values: [off, lamps_on]
- id: active_source
  type: enum
  values: [VGA1, VGA2, RGBHV, HDMI1, HDMI2, Component, S-Video, Composite]
- id: signal_format
  type: enum
  values: [Digital, Analog, ""]
- id: sync_type
  type: enum
  values: [Separate, Composite, SyncOnGreen, ""]
- id: aspect_ratio
  type: string
- id: resolution
  type: string
- id: vertical_refresh_hz
  type: number
- id: horizontal_refresh_khz
  type: number
- id: pixel_clock_mhz
  type: number
- id: color_space
  type: enum
  values: [RGB, REC709, REC601, RGB_Video, Auto]
- id: lamp_power_w
  type: integer
- id: current_lamp
  type: enum
  values: [Lamp1, Lamp2, Both]
- id: lamp1_hours
  type: integer
- id: lamp2_hours
  type: integer
- id: total_lamp_hours
  type: integer
- id: lamp1_reset_count
  type: integer
- id: lamp2_reset_count
  type: integer
- id: standby_mode
  type: enum
  values: [one_w, communication]
- id: lens_lock
  type: enum
  values: [allow, locked]
- id: ip_address
  type: string
- id: dhcp
  type: enum
  values: [on, off]
- id: model_name
  type: string
- id: serial_number
  type: string
- id: native_resolution
  type: string
- id: firmware_version
  type: string
- id: configuration_version
  type: string
- id: boot_code_version
  type: string
- id: last_serial_error
  type: string
- id: last_system_error_code
  type: integer
  notes: "1=strike fail, 3=lamp out, 4=fan fail, 5=over temp (per LSE? reply table)"
- id: shutter_state
  type: enum
  values: [open, closed]
```

## Variables
```yaml
# Each R/W command has a settable value and a queryable reply; values listed in Actions.
# Items here are global defaults that the projector retains across commands.
- id: default_baud
  type: integer
  value: 115200
- id: default_parity
  type: enum
  values: [none, even, odd]
  value: none
- id: default_data_bits
  type: integer
  value: 8
- id: default_stop_bits
  type: integer
  value: 1
- id: default_flow_control
  type: enum
  values: [none, hardware, software]
  value: none
- id: default_pin
  type: string
  value: "12345"
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited device-pushed events; all flows are request/reply.
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step sequences.
```

## Safety
```yaml
confirmation_required_for:
  - factory_defaults_reset  # source: DEF 111 requires explicit "111" safeguard
  - lens_center_calibration # LCB+HOME1 physically moves the lens
interlocks: []
# UNRESOLVED: source does not contain explicit electrical-safety warnings, hazard procedures,
# or high-voltage interlock sequences. Whisper Mode is documented as incompatible with
# High Altitude Mode (narrative, not an interlock) - see Notes.
```

## Notes
Message framing: every command is wrapped in parentheses. A space between code and parameter is optional. Subcodes are appended with `+` (e.g. `(WRP+HKST 50)`). The optional `#` prefix requests a full acknowledgement echo.

Full Acknowledgment: prefixing a SET message with `#` causes the projector to echo the message as a reply once it has finished processing. This is not needed on REQUEST messages (the data reply is the acknowledgement).

Errors: a malformed command returns a structured error like `(ITP) - (65535 00000 ERR00005 "ITP: Too Few Parameters")`. Use `(LCE?)` to retrieve the last serial command error.

System errors: `(LSE?)` returns a numeric code. 1 = lamp did not strike after 5 attempts; 3 = lamp went out unexpectedly; 4 = fan failure; 5 = over temperature. Other codes not enumerated in source.

Service Mode: a subset of commands (`CWI`, `PIF`, `DEF`, and the service-only test patterns in `ITP6..ITP11`) require logging in via `(UID"service,service")` (or another Service account). Service Mode is cleared on power off.

Standby Mode caveat: in `PWR+STBM0` (1W Mode) the projector cannot be powered on via UART/WEB/USB — only via the keypad. Use `PWR+STBM1` (Communication Mode) if network/serial power-on is required.

Whisper Mode is documented as not compatible with High Altitude Mode — narrative constraint, not enforced as a command-level interlock.

Test pattern timing: switching away from Grid or Color Bars test patterns may take up to 18 seconds (these are non-standard patterns).

Digital Shift requires Digital Zoom to be applied first; otherwise the command is disabled.

The (SST?) status response example in the source references model `DWU670-E`, but the manual itself is titled "E Series Serial Commands Technical Reference Information" and applies to the family. The "E Series" should be treated as a family rather than a single model.

<!-- UNRESOLVED: TCP port number for Ethernet control not stated in source. Specific projector model number (DWU670-E) is one of possibly several E Series models. Service account credentials are not enumerated (only "service,service" given as example). IR Remote keycode list ends at keycode 72; completeness of IR keycode table is not guaranteed by the source. -->

## Provenance

```yaml
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
retrieved_at: 2026-04-30T04:34:57.871Z
last_checked_at: 2026-06-02T00:05:08.970Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T00:05:08.970Z
matched_actions: 225
action_count: 225
confidence: medium
summary: "All 225 spec actions found with literal command matches in source; transport parameters verified complete. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific model number not stated in source (status reply references DWU670-E). Ethernet port number not stated. Login/auth procedure for \"Service Mode\" is referenced but not fully documented."
- "TCP port number not stated in source"
- "source does not document unsolicited device-pushed events; all flows are request/reply."
- "source does not describe multi-step sequences."
- "source does not contain explicit electrical-safety warnings, hazard procedures,"
- "TCP port number for Ethernet control not stated in source. Specific projector model number (DWU670-E) is one of possibly several E Series models. Service account credentials are not enumerated (only \"service,service\" given as example). IR Remote keycode list ends at keycode 72; completeness of IR keycode table is not guaranteed by the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
