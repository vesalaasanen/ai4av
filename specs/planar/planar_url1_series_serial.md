---
spec_id: admin/planar-url1-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar URL1 Series Control Spec"
manufacturer: Planar
model_family: "URL1 Series"
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - "URL1 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/444139/planar-ultrares-l-series-rs232-user-manual.pdf
  - https://www.planar.com/media/av2mrnr0/planar-ultrares-l-series-url122-user-manual.pdf
  - https://www.planar.com/media/435720/planar-ultrares-series-rs232-user-manual_jul6-2016.pdf
retrieved_at: 2026-10-07T20:50:10.137Z
last_checked_at: 2026-10-07T20:50:10.137Z
generated_at: 2026-10-07T20:50:10.137Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - AUTO.ON
  - COLOR
  - COMMAND.ENABLE
  - "model number not stated in source; \"URL1 Series\" used as generic model name"
  - "many additional commands documented in source (GAIN, GAMMA, COLOR, etc.)"
  - "additional feedbacks for COLOR, CONTRAST, GAMMA, SIGNAL.INFO, etc."
  - "most settings in command table can be read/written but are not"
  - "display sends unsolicited notifications only via SMTP/email"
  - "no explicit multi-step macros defined in source"
  - "additional safety procedures not documented in source"
  - "firmware version compatibility not stated"
  - "fault behavior and error recovery not documented"
  - "command timing requirements not specified"
verification:
  verdict: verified
  checked_at: 2026-10-07T20:50:10.137Z
  matched_actions: 125
  action_count: 125
  confidence: medium
  summary: "All 125 units map to source commands and transport values are stated. Three source commands (AUTO.ON, COLOR, COMMAND.ENABLE) are unrepresented, about 97% coverage (120 of 123). (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Planar URL1 Series Control Spec

## Summary
The Planar URL1 Series is a professional LCD display supporting multi-zone video wall configurations. Control is available via RS-232C (19200 baud 8N1) or IP control over TCP/UDP port 57. The display uses a text-based command protocol with query, set, increment/decrement, and execute operators.

<!-- UNRESOLVED: model number not stated in source; "URL1 Series" used as generic model name -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
addressing:
  port: 57  # TCP and UDP port for IP control
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable       # DISPLAY.POWER, AUTO.ON, SYSTEM.REBOOT present
- routable        # SOURCE.SELECT, MULTI.VIEW, LAYOUT, PIP.SWAP present
- queryable       # ? operator on most commands returns current value
- levelable       # BRIGHTNESS, CONTRAST, VOLUME, BACKLIGHT.INTENSITY present
```

## Actions
```yaml
- id: display_power
  label: Display Power
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = OFF, 1 = ON

- id: source_select
  label: Source Select
  kind: action
  params:
    - name: source
      type: integer
      description: 1 = HDMI.1, 2 = HDMI.2, 3 = HDMI.3, 4 = HDMI.4, 5 = DP, 14 = NONE
    - name: zone
      type: integer
      description: 0-3 = ZONE.1-4, 254 = ALL, 255 = CURRENT

- id: brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: audio_mute
  label: Audio Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = OFF, 1 = ON

- id: aspect_set
  label: Set Aspect Ratio
  kind: action
  params:
    - name: mode
      type: integer
      description: 0 = AUTO, 1 = 16X9, 2 = 4X3, 3 = FILL, 4 = NATIVE, 5 = LETTERBOX

- id: preset_recall
  label: Recall Preset
  kind: action
  params:
    - name: preset_number
      type: integer
      description: Preset number 1-1000

- id: preset_save
  label: Save Preset
  kind: action
  params:
    - name: preset_number
      type: integer
      description: Preset number 1-1000

- id: reset_user
  label: Factory Reset (User)
  kind: action
  params: []

- id: system_reboot
  label: Reboot System
  kind: action
  params: []

- id: osd_close
  label: Close OSD
  kind: action
  params: []

- id: pattern
  label: Test Pattern
  kind: action
  params:
    - name: pattern
      type: integer
      description: 0 = NONE, 1 = BLACK, 2 = WHITE, 3 = GRAY, 4-9 = color patterns, 11 = GRAYBAR, 12-14 = color bars, 16 = CHECKERBOARD, 18 = COLORBAR

- id: backlight_intensity_set
  label: Set Backlight Intensity
  kind: action
  params:
    - name: value
      type: integer
      description: 1-100

- id: multi_view_set
  label: Set Multi-Source View
  kind: action
  params:
    - name: mode
      type: integer
      description: 0 = SINGLE, 1 = DUAL, 2 = TRIPLE, 3 = QUAD, 4 = PIP

- id: pip_swap
  label: PIP Swap
  kind: action
  params: []

- id: send_key
  label: Send Key
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code from KEY codes table

- id: osd_allow_popup
  label: Allow Pop Up Messages
  kind: action
  params:
    - name: value
      type: integer
      description: OSD.ALLOW.POPUP; 0 = NO 1 = YES

- id: audio_input
  label: Audio Input
  kind: action
  params: []

- id: audio_select
  label: Audio Select
  kind: action
  params:
    - name: zone
      type: integer
      description: AUDIO.ZONE; Zone 0 = ZONE.1 1 = ZONE.2 2 = ZONE.3 3 = ZONE.4

- id: audio_settings
  label: Audio Settings
  kind: action
  params:
    - name: settings
      type: integer
      description: AUDIO.SETTINGS; Op 1: Zone 0 = ZONE.1 1 = ZONE.2 2 = ZONE.3 3 = ZONE.4 Ops 2-8: Unsigned Integers

- id: source_scan
  label: Auto Scan Sources
  kind: action
  params:
    - name: value
      type: integer
      description: SOURCE.SCAN; 0 = OFF 1 = ON

- id: audio_balance
  label: Set Balance
  kind: action
  params:
    - name: value
      type: integer
      description: AUDIO.BALANCE; 0-100

- id: audio_bass
  label: Set Bass
  kind: action
  params:
    - name: value
      type: integer
      description: AUDIO.BASS; 0-100

- id: blank_color
  label: Set Blank Screen Color
  kind: action
  params:
    - name: color
      type: integer
      description: BLANK.COLOR; 0 = RED 1 = GREEN 2 = BLUE 3 = CYAN 4 = MAGENTA 5 = YELLOW 6 = WHITE 7 = BLACK

- id: color_gamut
  label: Set Color Gamut
  kind: action
  params:
    - name: value
      type: integer
      description: COLOR.GAMUT; Mod 1: Zone 0 = ZONE.1 1 = ZONE.2 2 = ZONE.3 3 = ZONE.4 255 = CURRENT [None = CURRENT] Mod 2: Type 0 = SETTING 1 = ACTUAL 2 = COPY 3 = REVERT [None = SETTING] Mod 3: Gamut 0 = REC709 1 = SMPTE.C 2 = EBU 5 = USER 6 = AUTO 255 = CURRENT; 0 = REC709 1 = SMPTE.C 2 = EBU 5 = USER 6 = AUTO 7 = DISABLE

- id: colorspace
  label: Set Color Space
  kind: action
  params:
    - name: value
      type: integer
      description: COLORSPACE; Mod 1: Zone 0 = ZONE.1 1 = ZONE.2 2 = ZONE.3 3 = ZONE.4 253 = ALL.INPUT 254 = ALL 254 = ALL.ZONE 255 = CURRENT Mod 2: Value Type 0 = SETTING 1 = ACTUAL; 0 = REC601 1 = REC709 2 = RGB 3 = RGB.VIDEO 4 = AUTO

- id: color_subsampling
  label: Color Subsampling
  kind: action
  params:
    - name: zone
      type: integer
      description: COLOR.SUBSAMPLING; Zone 0 = ZONE.1 1 = ZONE.2 2 = ZONE.3 3 = ZONE.4 255 = CURRENT

- id: color_temperature
  label: Set Color Temperature
  kind: action
  params:
    - name: value
      type: integer
      description: LED.COLOR.TEMPERATURE; 0 = 6500K 1 = 9300K 2 = 12000K

- id: content_rotation
  label: Set Content Rotation
  kind: action
  params:
    - name: value
      type: integer
      description: ROTATE; Zone 0 = ZONE.1 1 = ZONE.2 2 = ZONE.3 3 = ZONE.4 253 = ALL.INPUT 254 = ALL 254 = ALL.ZONE 255 = CURRENT [None = CURRENT]; 0 = NONE 90 = 90 180 = 180 270 = 270

- id: current_zone
  label: Set Current Zone
  kind: action
  params:
    - name: zone
      type: integer
      description: CURRENT.ZONE; Zone 0 = ZONE.1 1 = ZONE.2 2 = ZONE.3 3 = ZONE.4

- id: current_zone_layout
  label: Current Zone Layout
  kind: action
  params:
    - name: value
      type: integer
      description: CURRENT.ZONE.LAYOUT; 0 = S.1 1 = P.UL.1 2 = P.UL.2 3 = P.UR.1 4 = P.UR.2 5 = P.LL.1 6 = P.LL.2 7 = P.LR.1 8 = P.LR.2 9 = D.L.1 10 = D.L.2 11 = D.T.1 12 = D.T.2 13 = T.L.1 14 = T.L.2 15 = T.L.3 16 = T.R.1 17 = T.R.2 18 = T.R.3 19 = T.T.1 20 = T.T.2 21 = T.T.3 22 = T.B.1 23 = T.B.2 24 = T.B.3 25 = T.M.1 26 = T.M.2 27 = T.M.3 28 = Q.1 29 = Q.2 30 = Q.3 31 = Q.4

- id: ipv4_gateway
  label: Set Default Gateway
  kind: action
  params:
    - name: value
      type: string
      description: IPV4.GATEWAY; String

- id: network_dhcp
  label: Set DHCP
  kind: action
  params:
    - name: value
      type: integer
      description: NETWORK.DHCP; 0 = OFF 1 = ON

- id: diagnostic_color
  label: Set Diagnostic Color
  kind: action
  params:
    - name: value
      type: integer
      description: DIAGNOSTIC.COLOR; Zone 0 = ZONE.1 1 = ZONE.2 2 = ZONE.3 3 = ZONE.4 253 = ALL.INPUT 254 = ALL 254 = ALL.ZONE 255 = CURRENT [None = CURRENT]; 0 = RED 1 = GREEN 2 = BLUE 255 = OFF

- id: display_name
  label: Set Display Name
  kind: action
  params:
    - name: value
      type: string
      description: DISPLAY.NAME; String

- id: displayport_type
  label: Set DisplayPort 1 Type
  kind: action
  params:
    - name: value
      type: integer
      description: DP.TYPE; 0 = 1.1 1 = 1.2

- id: network_dns1
  label: Set DNS Server 1
  kind: action
  params:
    - name: value
      type: string
      description: NETWORK.DNS1; String

- id: network_dns2
  label: Set DNS Server 2
  kind: action
  params:
    - name: value
      type: string
      description: NETWORK.DNS2; String

- id: edid_timing
  label: Set EDID Timing
  kind: action
  params:
    - name: value
      type: integer
      description: EDID.TIMING; Mod 1: Input 1 = HDMI.1 2 = HDMI.2 3 = HDMI.3 4 = HDMI.4 5 = DP 6 = ALL Mod 2: Param 0 = UPDATE 1 = HACTIVE 2 = VACTIVE 3 = VREFRESH 4 = FULL.SPEC 5 = PCLK 6 = HBLANK 7 = HFP 8 = HSYNC 9 = VBLANK 10 = VFP 11 = VSYNC 12 = FACTORY 13 = TYPE; Signed Integer -3 = 4K60 -2 = 4K30 -1 = 1080P

- id: edid_selected_connector
  label: Set EDID Zone
  kind: action
  params:
    - name: value
      type: integer
      description: EDID.SELECTEDCONNECTOR; 1 = HDMI.1 2 = HDMI.2 3 = HDMI.3 4 = HDMI.4 5 = DP 6 = ALL

- id: audio_speakers
  label: Enable Internal Speakers
  kind: action
  params:
    - name: value
      type: integer
      description: AUDIO.SPEAKERS; 0 = OFF 1 = ON

- id: led_enable
  label: Enable Status LED
  kind: action
  params:
    - name: value
      type: integer
      description: LED.ENABLE; 0 = DISABLE 1 = ENABLE

- id: firmware_update
  label: Firmware Update
  kind: action
  params:
    - name: value
      type: string
      description: FIRMWARE.UPDATE; Mod 1: Firmware 0 = AUTO 1 = VP.AP 2 = HDMI Mod 2: Type 0 = START 1 = PACKET 2 = FINISH 3 = URL; String

- id: gain_set
  label: Set Gain
  kind: action
  params:
    - name: value
      type: integer
      description: GAIN; Mod 1: Zone 0 = ZONE.1 1 = ZONE.2 2 = ZONE.3 3 = ZONE.4 253 = ALL.INPUT 254 = ALL 254 = ALL.ZONE 255 = CURRENT [None = CURRENT] Mod 2: Color 0 = RED 1 = GREEN 2 = BLUE 255 = ALL [None = ALL]; For RED, GREEN and BLUE modifiers, one operand: 0-200 For ALL operand, three operands: Red Gain: 0-200 Green Gain: 0-200 Blue Gain: 0-200

- id: gamma_set
  label: Set Gamma
  kind: action
  params:
    - name: value
      type: integer
      description: GAMMA; Zone 0 = ZONE.1 1 = ZONE.2 2 = ZONE.3 3 = ZONE.4 253 = ALL.INPUT 254 = ALL 254 = ALL.ZONE 255 = CURRENT [None = CURRENT]; 0 = 1.5 1 = 1.55 2 = 1.6 3 = 1.65 4 = 1.7 5 = 1.75 6 = 1.8 7 = 1.85 8 = 1.9 9 = 1.95 10 = 2.0 11 = 2.05 12 = 2.1 13 = 2.15 14 = 2.2 15 = 2.25 16 = 2.3 17 = 2.35 18 = 2.4 19 = 2.45 20 = 2.5 21 = 2.55 22 = 2.6 23 = 2.65 24 = 2.7 25 = 2.75 26 = 2.8

- id: hdmi_cec
  label: HDMI CEC
  kind: action
  params:
    - name: value
      type: integer
      description: CEC.ENABLE; 0 = DISABLE 1 = ENABLE

- id: help
  label: Help
  kind: action
  params:
    - name: value
      type: string
      description: HELP; 0 = FIRST 2147483647 = NEXT; String

- id: hostname
  label: Set Host Name
  kind: action
  params:
    - name: value
      type: string
      description: HOSTNAME; String

- id: signal_info
  label: Image Information
  kind: action
  params:
    - name: value
      type: integer
      description: SIGNAL.INFO; Mod 1: Zone 0 = ZONE.1 1 = ZONE.2 2 = ZONE.3 3 = ZONE.4 255 = CURRENT [None = CURRENT] Mod 2: Parameter 0 = HACTIVE 1 = VACTIVE 2 = PCLK 3 = HTOTAL 4 = VTOTAL 5 = VREFRESH 6 = HREFRESH 7 = INTERLACE 8 = VFIELDRATE 9 = VREFRESH.X.100 10 = COLORDEPTH 11 = TMDS [None = ALL]; Unsigned Integer

- id: pan
  label: Set Image Position
  kind: action
  params:
    - name: value
      type: integer
      description: PAN; Mod 1: Zone 0 = ZONE.1 1 = ZONE.2 2 = ZONE.3 3 = ZONE.4 253 = ALL.INPUT 254 = ALL 254 = ALL.ZONE 255 = CURRENT Mod 2: Direction 0 = X 1 = Y 255 = ALL [None = ALL]; -1000 ~ 1000

- id: ipv4_address
  label: Set IP Address
  kind: action
  params:
    - name: value
      type: string
      description: IPV4.ADDRESS; String

- id: ir_code
  label: Set IR Code
  kind: action
  params:
    - name: value
      type: integer
      description: IR.CODE; 0-65535

- id: ir_lock
  label: IR Remote Lock
  kind: action
  params:
    - name: value
      type: integer
      description: IR.LOCK; 0 = DISABLE 1 = ENABLE

- id: keypad_lock
  label: Keypad Lock
  kind: action
  params:
    - name: value
      type: integer
      description: KEY.LOCK; 0 = DISABLE 1 = ENABLE

- id: layout_set
  label: Set Layout
  kind: action
  params:
    - name: value
      type: integer
      description: LAYOUT; Multi-Source View 1 = DUAL 2 = TRIPLE 4 = PIP 5 = CURRENT [None = CURRENT]; 0 = SINGLE 1 = PIP.UL 2 = PIP.UR 3 = PIP.LL 4 = PIP.LR 5 = DUAL.L 6 = DUAL.T 7 = TRIPLE.L 8 = TRIPLE.R 9 = TRIPLE.T 10 = TRIPLE.B 11 = TRIPLE.M 12 = QUAD

- id: network_mac
  label: Network MAC Address
  kind: action
  params: []

- id: osd_position
  label: Set Menu Position
  kind: action
  params:
    - name: value
      type: integer
      description: OSD.POSITION; 0 = CENTER 1 = UPPER.LEFT 2 = UPPER.RIGHT 3 = LOWER.LEFT 4 = LOWER.RIGHT

- id: model_id
  label: Model ID
  kind: action
  params: []

- id: model_series
  label: Model Series
  kind: action
  params: []

- id: network_ping
  label: Network Ping
  kind: action
  params:
    - name: address
      type: string
      description: NETWORK.PING; String

- id: network_enable
  label: Network Port
  kind: action
  params:
    - name: value
      type: integer
      description: NETWORK.ENABLE; 0 = OFF 1 = ON

- id: source_next
  label: Next Source
  kind: action
  params:
    - name: zone
      type: integer
      description: SOURCE.NEXT; Zone 0 = ZONE.1 1 = ZONE.2 2 = ZONE.3 3 = ZONE.4 254 = ALL 255 = CURRENT

- id: noise_reduction
  label: Set Noise Reduction
  kind: action
  params:
    - name: value
      type: integer
      description: NOISE.REDUCTION; Zone 0 = ZONE.1 1 = ZONE.2 2 = ZONE.3 3 = ZONE.4 253 = ALL.INPUT 254 = ALL 254 = ALL.ZONE 255 = CURRENT [None = CURRENT]; 0 = OFF 1 = LOW 2 = MEDIUM 3 = HIGH

- id: notification_email
  label: Notification Event
  kind: action
  params:
    - name: value
      type: string
      description: NOTIFICATION.EMAIL; Event 0 = POWER.STATE.CHANGED 1 = ERROR.OCCURRED 2 = SOURCE.DETECTED 3 = SOURCE.LOST 4 = SOURCE.SELECTED; Op 1: Enable 0 = DISABLE 1 = ENABLE Op 2: Recipients List String Op 3: User Message String

- id: network_ntpserver
  label: Set NTP Server
  kind: action
  params:
    - name: value
      type: string
      description: NETWORK.NTPSERVER; String

- id: offset_set
  label: Set Offset
  kind: action
  params:
    - name: value
      type: integer
      description: OFFSET; Mod 1: Zone 0 = ZONE.1 1 = ZONE.2 2 = ZONE.3 3 = ZONE.4 253 = ALL.INPUT 254 = ALL 254 = ALL.ZONE 255 = CURRENT [None = CURRENT] Mod 2: Color 0 = RED 1 = GREEN 2 = BLUE 255 = ALL [None = ALL]; For RED, GREEN and BLUE modifiers, one operand: 0-100 For ALL operand, three operands: Red Offset: 0-100 Green Offset: 0-100 Blue Offset: 0-100

- id: osd_rotation
  label: Set OSD Rotation
  kind: action
  params:
    - name: value
      type: integer
      description: ORIENTATION; 0 = LANDSCAPE 1 = PORTRAIT

- id: osd_status
  label: OSD Status
  kind: action
  params: []

- id: osd_timeout
  label: Set OSD Timeout
  kind: action
  params:
    - name: value
      type: integer
      description: OSD.TIMEOUT; 0 = OFF 10 = 10.SECONDS 30 = 30.SECONDS 60 = 60.SECONDS 120 = 120.SECONDS 240 = 240.SECONDS 0-3600

- id: osd_transparency
  label: Set OSD Transparency
  kind: action
  params:
    - name: value
      type: integer
      description: OSD.TRANSPARENCY; 0-5

- id: overscan
  label: Set Overscan
  kind: action
  params:
    - name: value
      type: integer
      description: OVERSCAN; Zone 0 = ZONE.1 1 = ZONE.2 2 = ZONE.3 3 = ZONE.4 253 = ALL.INPUT 254 = ALL 254 = ALL.ZONE 255 = CURRENT [None = CURRENT]; 0-20

- id: pip_size
  label: Set PIP Size
  kind: action
  params:
    - name: value
      type: integer
      description: PIP.SIZE; 0 = SMALL 1 = MEDIUM 2 = LARGE

- id: pixel_orbit
  label: Pixel Orbit
  kind: action
  params:
    - name: value
      type: integer
      description: PIXEL.ORBIT; 0 = OFF 1 = ON

- id: power_down_mode
  label: Set Power Down Mode
  kind: action
  params:
    - name: value
      type: integer
      description: POWER.DOWN.MODE; 0 = Standby.Mode 1 = Networked.Standby.Mode 2 = Fast.Startup

- id: power_on_delay
  label: Set Power On Delay
  kind: action
  params:
    - name: value
      type: string
      description: POWER.ON.DELAY; Unsigned fixed point 0.0-10.0

- id: power_save_delay
  label: Set Power Saving Delay
  kind: action
  params:
    - name: value
      type: integer
      description: POWER.SAVE.DELAY; 60 = 1.MINUTE 300 = 5.MINUTES 900 = 15.MINUTES 1800 = 30.MINUTES 3600 = 60.MINUTES

- id: power_save_mode
  label: Set Power Saving Mode
  kind: action
  params:
    - name: value
      type: integer
      description: POWER.SAVE.MODE; 0 = Disable 1 = Power.Down 2 = Wake.On.Signal

- id: preset_count
  label: Preset Count
  kind: action
  params: []

- id: preset_delete
  label: Delete Preset
  kind: action
  params:
    - name: preset_number
      type: integer
      description: PRESET.DELETE; Preset Number 1-1000

- id: preset_full
  label: Preset Full
  kind: action
  params:
    - name: preset_number
      type: integer
      description: PRESET.FULL; Preset Number 1-1000; 0 = NO 1 = YES

- id: preset_list
  label: Preset List
  kind: action
  params:
    - name: value
      type: integer
      description: PRESET.LIST; 0 = FIRST 2147483647 = NEXT; A list of unsigned integers

- id: preset_max
  label: Preset Max
  kind: action
  params: []

- id: preset_name
  label: Set Preset Name
  kind: action
  params:
    - name: value
      type: string
      description: PRESET.NAME; Preset Number 1-1000; String

- id: revert_image_settings
  label: Revert Image Settings
  kind: action
  params:
    - name: zone
      type: integer
      description: REVERT.IMAGE.SETTINGS; Zone 0 = ZONE.1 1 = ZONE.2 2 = ZONE.3 3 = ZONE.4 255 = CURRENT [None = CURRENT]

- id: clone_settings
  label: Save and Restore Settings
  kind: action
  params:
    - name: value
      type: integer
      description: CLONE.SETTINGS; Mod 1: Operation 0 = COPY 1 = PASTE Mod 2: Location 0 = USB

- id: save_diagnostics
  label: Save Diagnostics
  kind: action
  params:
    - name: location
      type: integer
      description: SAVE.DIAGNOSTICS; Location 0 = USB

- id: schedule
  label: Schedule
  kind: action
  params:
    - name: value
      type: integer
      description: SCHEDULE; Mod 1: Slot 1-20 Mod 2: Parameter 0 = FREQ 1 = MINUTE 2 = HOUR 3 = DAY 4 = ACTION 5 = DATA 6 = ENABLE [None = ALL]; Unsigned int

- id: schedule_action
  label: Schedule Action
  kind: action
  params:
    - name: value
      type: integer
      description: SCHEDULE.ACTION; Slot 1-20; 0 = TURN.ON 1 = TURN.OFF 2 = RECALL 3 = PANEL.BRIGHTNESS

- id: schedule_day
  label: Schedule Day
  kind: action
  params:
    - name: value
      type: integer
      description: SCHEDULE.DAY; Slot 1-20; 0 = MON 1 = TUE 2 = WED 3 = THU 4 = FRI 5 = SAT 6 = SUN

- id: schedule_description
  label: Schedule Description
  kind: action
  params:
    - name: slot
      type: integer
      description: SCHEDULE.DESCRIPTION; Slot 1-20; String

- id: schedule_frequency
  label: Schedule Frequency
  kind: action
  params:
    - name: value
      type: integer
      description: SCHEDULE.FREQUENCY; Slot 1-20; 0 = DAILY 1 = WEEKLY 2 = WEEKDAYS 3 = WEEKENDS

- id: serial_device
  label: Serial Device
  kind: action
  params:
    - name: value
      type: string
      description: SERIAL.DEVICE; Mod 1: Port 0 = DB9 1 = USB Mod 2: Setting 0 = BAUD; String

- id: serial_number
  label: Serial Number
  kind: action
  params: []

- id: sharpness_set
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: SHARPNESS; Zone 0 = ZONE.1 1 = ZONE.2 2 = ZONE.3 3 = ZONE.4 253 = ALL.INPUT 254 = ALL 254 = ALL.ZONE 255 = CURRENT [None = CURRENT]; 0-10

- id: smtp_authentication
  label: SMTP Authentication
  kind: action
  params:
    - name: value
      type: integer
      description: NETWORK.SMTP.AUTHENTICATION; 0 = NONE 1 = AUTO 2 = PLAIN 3 = SCRAM_SHA1 4 = CRAM_MD5 5 = DIGEST_MD5 6 = LOGIN 7 = NTLM

- id: smtp_encryption
  label: SMTP Connection Encryption
  kind: action
  params:
    - name: value
      type: integer
      description: NETWORK.SMTP.ENCRYPTION; 0 = NONE 1 = TLS 2 = START.TLS

- id: smtp_from
  label: SMTP Email From Address
  kind: action
  params:
    - name: value
      type: string
      description: NETWORK.SMTP.FROM; String

- id: smtp_password
  label: SMTP Password
  kind: action
  params:
    - name: value
      type: string
      description: NETWORK.SMTP.PASSWORD; String

- id: smtp_port
  label: SMTP Port
  kind: action
  params:
    - name: value
      type: integer
      description: NETWORK.SMTP.PORT; Unsigned Integer

- id: smtp_server
  label: SMTP Server
  kind: action
  params:
    - name: value
      type: string
      description: NETWORK.SMTP.SERVER; String

- id: smtp_username
  label: SMTP Username
  kind: action
  params:
    - name: value
      type: string
      description: NETWORK.SMTP.USERNAME; String

- id: snmp_enable
  label: SNMP
  kind: action
  params:
    - name: value
      type: integer
      description: SNMP.ENABLE; 0 = On 1 = Off

- id: splash_screen
  label: Splash Screen
  kind: action
  params:
    - name: value
      type: integer
      description: SPLASH.SCREEN; 0 = DISABLE 1 = ENABLE

- id: ipv4_netmask
  label: Set Subnet Mask
  kind: action
  params:
    - name: value
      type: string
      description: IPV4.NETMASK; String

- id: smtp_test
  label: Test Email
  kind: action
  params:
    - name: event
      type: integer
      description: NETWORK.SMTP.TEST; Event 0 = POWER.STATE.CHANGED 1 = ERROR.OCCURRED 2 = SOURCE.DETECTED 3 = SOURCE.LOST 4 = SOURCE.SELECTED

- id: time
  label: Set Time
  kind: action
  params:
    - name: value
      type: integer
      description: TIME; 0 = YEAR 1 = MONTH 2 = DATE 3 = HOUR 4 = MINUTE [None = ALL]; Unsigned int

- id: time_day
  label: Time Day
  kind: action
  params: []

- id: time_month
  label: Set Time Month
  kind: action
  params:
    - name: value
      type: integer
      description: TIME.MONTH; 1 = JANUARY 2 = FEBRUARY 3 = MARCH 4 = APRIL 5 = MAY 6 = JUNE 7 = JULY 8 = AUGUST 9 = SEPTEMBER 10 = OCTOBER 11 = NOVEMBER 12 = DECEMBER

- id: time_string
  label: Time String
  kind: action
  params: []

- id: timezone_set
  label: Set Time Zone
  kind: action
  params:
    - name: value
      type: string
      description: TIMEZONE; [See separate table]

- id: tint_set
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: TINT; Zone 0 = ZONE.1 1 = ZONE.2 2 = ZONE.3 3 = ZONE.4 253 = ALL.INPUT 254 = ALL 254 = ALL.ZONE 255 = CURRENT [None = CURRENT]; 0-100

- id: audio_treble
  label: Set Treble
  kind: action
  params:
    - name: value
      type: integer
      description: AUDIO.TREBLE; 0-100

- id: network_ntp
  label: Use Network Time
  kind: action
  params:
    - name: value
      type: integer
      description: NETWORK.NTP; 0 = OFF 1 = ON

- id: build_info
  label: Version Info
  kind: action
  params:
    - name: value
      type: string
      description: BUILD.INFO; 0 = DATE.SCP 1 = VERSION.SCP 3 = DATE.VP 4 = VERSION.VP 5 = SRC.INFO.VP 6 = VERSION.HDMI 7 = VERSION.FRC 8 = PKG.DATE 9 = PKG.VERSION 10 = VERSION.SPM; String

- id: wall
  label: Set Wall
  kind: action
  params:
    - name: value
      type: integer
      description: WALL; 0 = ENABLE 1 = WIDTH 2 = HEIGHT 3 = COLUMN 4 = ROW 5 = FRAME.ENABLE 6 = FRAME.WIDTH 7 = FRAME.HEIGHT; 0-100

- id: web_ui_password
  label: Set Web UI Password
  kind: action
  params:
    - name: value
      type: string
      description: PASSWORD.SET; String

# UNRESOLVED: many additional commands documented in source (GAIN, GAMMA, COLOR, etc.)
# not fully enumerated here; see full command table for all 100+ commands
```

## Feedbacks
```yaml
- id: display_power_state
  label: Display Power State
  type: enum
  values:
    - "0"
    - "1"
  query_command: DISPLAY.POWER?

- id: brightness_value
  label: Brightness Value
  type: integer
  range: [0, 100]
  query_command: BRIGHTNESS?

- id: volume_value
  label: Volume Value
  type: integer
  range: [0, 100]
  query_command: AUDIO.VOLUME?

- id: audio_mute_state
  label: Audio Mute State
  type: enum
  values:
    - "0"
    - "1"
  query_command: AUDIO.MUTE?

- id: aspect_value
  label: Aspect Ratio
  type: enum
  values:
    - AUTO
    - "16X9"
    - "4X3"
    - FILL
    - NATIVE
    - LETTERBOX
  query_command: ASPECT?

- id: system_state
  label: System State
  type: enum
  values:
    - STANDBY
    - POWERING.ON
    - ON
    - POWERING.DOWN
    - BACKLIGHT.OFF
    - FAULT
  query_command: SYSTEM.STATE?

- id: source_message
  label: Source Message
  type: string
  description: Returns resolution and frame rate or "Searching"/"No Signal"
  query_command: SOURCE.MESSAGE?

- id: error_log
  label: Error Log Entry
  type: string
  description: Returns fault entries; empty string when no more entries
  query_command: ERROR.LOG(1)?

# UNRESOLVED: additional feedbacks for COLOR, CONTRAST, GAMMA, SIGNAL.INFO, etc.
```

## Variables
```yaml
# UNRESOLVED: most settings in command table can be read/written but are not
# enumerated here. Full variable list in RS232 Command Codes table.
```

## Events
```yaml
# UNRESOLVED: display sends unsolicited notifications only via SMTP/email
# (NOTIFICATION.EMAIL command). No native push events over serial/IP.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros defined in source
```

## Safety
```yaml
confirmation_required_for:
  - RESET(USER)     # Factory reset requires confirmation
  - FACTORY1 reset  # Full reset plus EDID/network/presets
interlocks:
  - POWER.DOWN.MODE must be set to Networked Standby or Fast Startup for RS-232 control
  # UNRESOLVED: additional safety procedures not documented in source
```

## Notes
Command protocol: `[OPCODE](MODIFIERS)[OPERATOR][OPERANDS][TERM]` where TERM is CR (0x0D), LF (0x0A), or semicolon.

Operators: `=` write, `?` read name, `#` read numeric, `+` increment, `-` decrement, `:` response, `!ERR` error, `@ACK` ack, `^NAK` nak.

Response format mirrors request: `COMMAND:VALUE` or `COMMAND!ERR N` for errors (ERR 1=invalid syntax, 3=unknown command, 4=invalid modifier, 5=invalid operand, 6=invalid operator).

RS-232 connector: URL136-T pinout (Tx=pin 2, Rx=pin 3, GND=pin 5).

IP control uses same serial command set over TCP/UDP port 57.

Multiple zones supported (ZONE.1-4, ALL, CURRENT) for many image adjustment commands.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: fault behavior and error recovery not documented -->
<!-- UNRESOLVED: command timing requirements not specified -->

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/444139/planar-ultrares-l-series-rs232-user-manual.pdf
  - https://www.planar.com/media/av2mrnr0/planar-ultrares-l-series-url122-user-manual.pdf
  - https://www.planar.com/media/435720/planar-ultrares-series-rs232-user-manual_jul6-2016.pdf
retrieved_at: 2026-10-07T20:50:10.137Z
last_checked_at: 2026-10-07T20:50:10.137Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:50:10.137Z
matched_actions: 125
action_count: 125
confidence: medium
summary: "All 125 units map to source commands and transport values are stated. Three source commands (AUTO.ON, COLOR, COMMAND.ENABLE) are unrepresented, about 97% coverage (120 of 123). (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- AUTO.ON
- COLOR
- COMMAND.ENABLE
- "model number not stated in source; \"URL1 Series\" used as generic model name"
- "many additional commands documented in source (GAIN, GAMMA, COLOR, etc.)"
- "additional feedbacks for COLOR, CONTRAST, GAMMA, SIGNAL.INFO, etc."
- "most settings in command table can be read/written but are not"
- "display sends unsolicited notifications only via SMTP/email"
- "no explicit multi-step macros defined in source"
- "additional safety procedures not documented in source"
- "firmware version compatibility not stated"
- "fault behavior and error recovery not documented"
- "command timing requirements not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
