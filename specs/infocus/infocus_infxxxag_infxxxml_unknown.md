---
spec_id: admin/infocus-infxxxag-infxxxml
schema_version: ai4av-public-spec-v1
revision: 1
title: "InFocus INFxxxAG INFxxxML Control Spec"
manufacturer: InFocus
model_family: INFxxxAG
aliases: []
compatible_with:
  manufacturers:
    - InFocus
  models:
    - INFxxxAG
    - INFxxxML
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.infocus.com
source_urls:
  - https://cdn.infocus.com/2026/02/b7RCq21d-InFocus_Generic_RS232_Commands.xlsx
retrieved_at: 2026-05-14T16:51:10.504Z
last_checked_at: 2026-07-21T22:52:54.553Z
generated_at: 2026-07-21T22:52:54.553Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Sheet: IN13xST/IN213x/INL314x/INL412x and Sheet: IN102x–IN105x document distinct model families with different baud rates; behaviour for INFxxxAG/INFxxxML at 19200 baud not separately verified"
  - "firmware version compatibility range not stated in source"
  - "source provides query commands but no discrete Variables section."
  - "no multi-step macro sequences described in source"
  - "Firmware version compatibility range not stated in source"
  - "Lamp-hours threshold for \"running out\" warning not specified"
  - "V. Keystone range for specific model INL2156/58/59 variant noted in source but not fully resolved for INFxxxAG/INFxxxML behaviour"
  - "Command timing (latency between send and projector response) not documented"
  - "Sheet: IN13xST/IN213x/INL314x/INL412x and Sheet: IN102x–IN105x are documented as separate model families with different baud rates; whether INFxxxAG/INFxxxML firmware accepts any of these command sets is unverified"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:52:54.553Z
  matched_actions: 223
  action_count: 223
  confidence: medium
  summary: "All 223 spec actions map literally to Std DLP (S001-S109,R001-R028), IN13xST (parenthesized ASCII), and IN102x (C00-C0C) sheets; transport (9600-8-N-1) matches; near-total bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# InFocus INFxxxAG INFxxxML Control Spec

## Summary
InFocus DLP projector family supporting RS-232 serial control. Three command syntaxes documented across separate sheets: hex-prefix Std DLP (9600 baud, projector-ID addressing 00–99, broadcast ~0000), parenthesized ASCII for IN13xST/IN213x/INL314x/INL412x (19200 baud), and plain HEX C00–C0C for IN102x/IN103x/IN104x/IN105x (19200 baud). Serial-only; no IP/HTTP control documented. Commands cover power, input routing, picture adjustment, geometry, language, security, lamp/filter maintenance, 3D modes, IR keypad simulation, and queryable status. All Std DLP commands terminated with `<CR>` (0x0D); projector pass = `P`, fail = `F`.

<!-- UNRESOLVED: Sheet: IN13xST/IN213x/INL314x/INL412x and Sheet: IN102x–IN105x document distinct model families with different baud rates; behaviour for INFxxxAG/INFxxxML at 19200 baud not separately verified -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # Std DLP sheet default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # Std DLP projector return: Pass = "P", Fail = "F"
  # IN13xST/IN213x/INL314x/INL412x sheet uses 19200 baud; this spec keeps 9600 as primary,
  # but IN-prefix families documented separately in Actions for completeness.
  # IN102x/IN103x/IN104x/IN105x sheet uses 19200 baud.
auth:
  type: none  # inferred: no login flow; 4-digit password used inline with security commands, not as session auth
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# ===== Sheet: Std DLP (9600 baud, projector-ID addressing) =====
# Format: ~NNNN <space> CMD <space> [param] <CR>
# Projector ID NNNN = 0000 (broadcast) or 0001..0099

- id: power_on
  label: Power On (Std DLP)
  kind: action
  command: "7E 30 30 30 30 20 31 0D"  # ~0000 1
  params: []

- id: power_off
  label: Power Off (Std DLP)
  kind: action
  command: "7E 30 30 30 30 20 30 0D"  # ~0000 0
  params:
    - name: state
      type: integer
      description: "0 = off; 2 accepted for backward compatibility"

- id: power_on_with_password
  label: Power On with Password
  kind: action
  command: "7E 30 30 30 30 20 31 20 7E nnnn 0D"  # ~0000 1 ~nnnn
  params:
    - name: password
      type: integer
      description: "4-digit password 0000-9999; ~0000..~9999"

- id: resync
  label: Resync
  kind: action
  command: "7E 30 30 30 31 20 31 0D"  # ~0001 1
  params: []

- id: av_mute
  label: AV Mute
  kind: action
  command: "7E 30 30 30 32 20 n 0D"  # ~0002 n
  params:
    - name: state
      type: integer
      description: "1 = on, 0 = off (2 accepted for backward compatibility)"

- id: mute
  label: Mute
  kind: action
  command: "7E 30 30 30 33 20 n 0D"  # ~0003 n
  params:
    - name: state
      type: integer
      description: "1 = on, 0 = off (2 accepted for backward compatibility)"

- id: freeze
  label: Freeze
  kind: action
  command: "7E 30 30 30 34 20 n 0D"  # ~0004 n
  params:
    - name: state
      type: integer
      description: "1 = freeze, 0 = unfreeze (2 accepted for backward compatibility)"

- id: zoom_plus
  label: Zoom Plus
  kind: action
  command: "7E 30 30 30 35 20 31 0D"  # ~0005 1
  params: []

- id: zoom_minus
  label: Zoom Minus
  kind: action
  command: "7E 30 30 30 36 20 31 0D"  # ~0006 1
  params: []

- id: ir_function
  label: IR Function Enable
  kind: action
  command: "7E 30 30 31 31 20 n 0D"  # ~0011 n
  params:
    - name: state
      type: integer
      description: "0 = off, 1 = on"

- id: direct_source
  label: Direct Source Commands
  kind: action
  command: "7E 30 30 31 32 20 a 0D"  # ~0012 n (two-digit a)
  params:
    - name: source
      type: integer
      description: "5 = VGA, 6 = VGA 2, 9 = S-Video, 10 = Video, 1 = HDMI (HDMI 1), 15 = HDMI 2, 21 = HDBaseT"

- id: picture_mode
  label: Picture Mode
  kind: action
  command: "7E 30 30 32 30 20 aa 0D"  # ~0020 n (two-digit aa)
  params:
    - name: mode
      type: integer
      description: "1 = Presentation, 2 = Bright, 3 = Movie (Cinema), 4 = sRGB, 5 = User, 9 = 3D, 12 = Game (Football), 13 = DICOM SIM, 14 = ISF Day, 15 = ISF Night, 22 = HDR SIM, 26 = HLG SIM, 27 = Rec.709, 28 = Dark Cinema, 29 = Football"

- id: brightness
  label: Brightness
  kind: action
  command: "7E 30 30 32 31 20 a 0D"  # ~0021 n
  params:
    - name: value
      type: integer
      description: "-50 to 50 (ASCII decimal; a=2D 35 30 .. 35 30)"

- id: contrast
  label: Contrast
  kind: action
  command: "7E 30 30 32 32 20 a 0D"  # ~0022 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: sharpness
  label: Sharpness
  kind: action
  command: "7E 30 30 32 33 20 a 0D"  # ~0023 n
  params:
    - name: value
      type: integer
      description: "1 to 15"

- id: rgb_gain_red
  label: RGB Gain Red
  kind: action
  command: "7E 30 30 32 34 20 a 0D"  # ~0024 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: rgb_gain_green
  label: RGB Gain Green
  kind: action
  command: "7E 30 30 32 35 20 a 0D"  # ~0025 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: rgb_gain_blue
  label: RGB Gain Blue
  kind: action
  command: "7E 30 30 32 36 20 a 0D"  # ~0026 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: rgb_bias_red
  label: RGB Bias Red
  kind: action
  command: "7E 30 30 32 37 20 a 0D"  # ~0027 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: rgb_bias_green
  label: RGB Bias Green
  kind: action
  command: "7E 30 30 32 38 20 a 0D"  # ~0028 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: rgb_bias_blue
  label: RGB Bias Blue
  kind: action
  command: "7E 30 30 32 39 20 a 0D"  # ~0029 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: brilliantcolor
  label: BrilliantColor
  kind: action
  command: "7E 30 30 33 34 20 a 0D"  # ~0034 n
  params:
    - name: value
      type: integer
      description: "1 to 10"

- id: gamma
  label: Gamma
  kind: action
  command: "7E 30 30 33 35 20 aa 0D"  # ~0035 n
  params:
    - name: mode
      type: integer
      description: "1 = Film, 2 = Video, 3 = Graphics, 4 = Standard (2.2), 5 = 1.8, 6 = 2.0, 8 = 2.6, 12 = 2.4"

- id: colour_temp
  label: Colour Temp
  kind: action
  command: "7E 30 30 33 36 20 n 0D"  # ~0036 n
  params:
    - name: mode
      type: integer
      description: "1 = Warm, 2 = Medium (Standard), 3 = Cold, 4 = Cool"

- id: colour_space
  label: Colour Space
  kind: action
  command: "7E 30 30 33 37 20 n 0D"  # ~0037 n
  params:
    - name: mode
      type: integer
      description: "1 = Auto, 2 = RGB (RGB 0-255), 3 = YUV, 4 = RGB (16-235)"

- id: tint
  label: Tint
  kind: action
  command: "7E 30 30 34 34 20 a 0D"  # ~0044 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: colour_saturation
  label: Colour (Saturation)
  kind: action
  command: "7E 30 30 34 35 20 a 0D"  # ~0045 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: brightness_adjust
  label: Brightness Adjust (+/-)
  kind: action
  command: "7E 30 30 34 36 20 n 0D"  # ~0046 n
  params:
    - name: direction
      type: integer
      description: "1 = minus, 2 = plus"

- id: contrast_adjust
  label: Contrast Adjust (+/-)
  kind: action
  command: "7E 30 30 34 37 20 n 0D"  # ~0047 n
  params:
    - name: direction
      type: integer
      description: "1 = minus, 2 = plus"

- id: four_corners
  label: Four Corners Geometry Adjustment
  kind: action
  command: "7E 30 30 35 39 20 aa 0D"  # ~0059 n (two-digit aa)
  params:
    - name: corner_direction
      type: integer
      description: "1 = top-left right+, 2 = top-left left+, 3 = top-left up+, 4 = top-left down+, 5 = top-right right+, 6 = top-right left+, 7 = top-right up+, 8 = top-right down+, 9 = bottom-left right+, 10 = bottom-left left+, 11 = bottom-left up+, 12 = bottom-left down+, 13 = bottom-right right+, 14 = bottom-right left+, 15 = bottom-right up+, 16 = bottom-right down+"

- id: aspect_ratio
  label: Aspect Ratio (Format)
  kind: action
  command: "7E 30 30 36 30 20 aa 0D"  # ~0060 n
  params:
    - name: ratio
      type: integer
      description: "1 = 4:3, 2 = 16:9, 3 = 16:10, 5 = LBX, 6 = Native, 7 = Auto, 16 = 21:9, 19 = FULL"

- id: edge_mask
  label: Edge Mask
  kind: action
  command: "7E 30 30 36 31 20 a 0D"  # ~0061 n
  params:
    - name: value
      type: integer
      description: "0 to 10"

- id: zoom
  label: Zoom
  kind: action
  command: "7E 30 30 36 32 20 a 0D"  # ~0062 n
  params:
    - name: value
      type: integer
      description: "-5 to 25"

- id: h_image_shift
  label: H Image Shift
  kind: action
  command: "7E 30 30 36 33 20 a 0D"  # ~0063 n
  params:
    - name: value
      type: integer
      description: "-100 to 100"

- id: v_image_shift
  label: V Image Shift
  kind: action
  command: "7E 30 30 36 34 20 a 0D"  # ~0064 n
  params:
    - name: value
      type: integer
      description: "-100 to 100"

- id: h_keystone
  label: H Keystone
  kind: action
  command: "7E 30 30 36 35 20 a 0D"  # ~0065 n
  params:
    - name: value
      type: integer
      description: "-30 to 30"

- id: v_keystone
  label: V Keystone
  kind: action
  command: "7E 30 30 36 36 20 a 0D"  # ~0066 n
  params:
    - name: value
      type: integer
      description: "RT models: -40 to 40; ST models: -20 to 20; INL2156/58/59: -30 to 30"

- id: auto_keystone
  label: Auto Keystone
  kind: action
  command: "7E 30 30 36 39 20 n 0D"  # ~0069 n
  params:
    - name: state
      type: integer
      description: "1 = on, 0 = off (2 accepted for backward compatibility)"

- id: language
  label: Language
  kind: action
  command: "7E 30 30 37 30 20 aa 0D"  # ~0070 n
  params:
    - name: lang
      type: integer
      description: "1=English 2=Deutsch 3=Français 4=Italiana 5=Español 6=Português 7=Polski 8=Nederlands 9=Svenska 10=Norsk/Dansk 11=Suomi 12=ελληνικά 13=繁體中文 14=簡体中文 15=日本語 16=한국어 17=Русский 18=Magyar 19=Čeština 20=عربي 21=ไทย 22=Türkçe 23=فارسی 24=हिंदी 25=Tiếng Việt 26=Bahasa Indonesia 27=Română 28=Slovenčina 29=Pilipino 30=Melayu 31=বাংলা 32=Norsk 33=Dansk 34=(unspecified)"

- id: projection_mode
  label: Projection
  kind: action
  command: "7E 30 30 37 31 20 n 0D"  # ~0071 n
  params:
    - name: mode
      type: integer
      description: "1 = Front, 2 = Rear, 3 = Front-Ceiling, 4 = Rear-Ceiling"

- id: menu_location
  label: Menu Location
  kind: action
  command: "7E 30 30 37 32 20 n 0D"  # ~0072 n
  params:
    - name: location
      type: integer
      description: "1 = Top Left, 2 = Top Right, 3 = Centre, 4 = Bottom Left, 5 = Bottom Right"

- id: signal_frequency
  label: Signal Frequency
  kind: action
  command: "7E 30 30 37 33 20 a 0D"  # ~0073 n
  params:
    - name: value
      type: integer
      description: "-5 to 5 (by signal)"

- id: signal_phase
  label: Signal Phase
  kind: action
  command: "7E 30 30 37 34 20 aa 0D"  # ~0074 n
  params:
    - name: value
      type: integer
      description: "0 to 63 (by signal)"

- id: signal_h_position
  label: Signal H. Position
  kind: action
  command: "7E 30 30 37 35 20 a 0D"  # ~0075 n
  params:
    - name: value
      type: integer
      description: "-5 to 5 (by timing)"

- id: signal_v_position
  label: Signal V. Position
  kind: action
  command: "7E 30 30 37 36 20 a 0D"  # ~0076 n
  params:
    - name: value
      type: integer
      description: "-5 to 5 (by timing)"

- id: security_timer
  label: Security Timer (Month/Day/Hour)
  kind: action
  command: "7E 30 30 37 37 20 aabbcc 0D"  # ~0077 aabbcc
  params:
    - name: timer
      type: string
      description: "mm/dd/hh. mm=00-12 (aa), dd=00-30 (bb), hh=00-24 (cc); ASCII hex pairs"

- id: security_on
  label: Security On with Password
  kind: action
  command: "7E 30 30 37 38 20 31 20 7E nnnn 0D"  # ~0078 1 ~nnnn
  params:
    - name: password
      type: integer
      description: "4-digit password 0000-9999"

- id: security_off
  label: Security Off with Password
  kind: action
  command: "7E 30 30 37 38 20 30 20 7E nnnn 0D"  # ~0078 0 ~nnnn
  params:
    - name: password
      type: integer
      description: "4-digit password 0000-9999"

- id: projector_id
  label: Projector ID
  kind: action
  command: "7E 30 30 37 39 20 aa 0D"  # ~0079 n
  params:
    - name: id
      type: integer
      description: "00 to 99"

- id: mute_audio
  label: Mute (audio, alt ID)
  kind: action
  command: "7E 30 30 38 30 20 n 0D"  # ~0080 n (alt mute)
  params:
    - name: state
      type: integer
      description: "1 = on, 0 = off (2 accepted for backward compatibility)"

- id: volume
  label: Volume (Audio)
  kind: action
  command: "7E 30 30 38 31 20 a 0D"  # ~0081 n
  params:
    - name: value
      type: integer
      description: "0 to 10"

- id: logo
  label: Logo
  kind: action
  command: "7E 30 30 38 32 20 n 0D"  # ~0082 n
  params:
    - name: mode
      type: integer
      description: "1 = Default, 2 = User, 3 = Neutral"

- id: projection_location
  label: Projection Location
  kind: action
  command: "7E 30 30 38 34 20 n 0D"  # ~0084 n
  params:
    - name: mode
      type: integer
      description: "0 = Auto, 1 = Desktop, 2 = Ceiling"

- id: closed_captioning
  label: Closed Captioning
  kind: action
  command: "7E 30 30 38 38 20 n 0D"  # ~0088 n
  params:
    - name: mode
      type: integer
      description: "0 = Off, 1 = CC1, 2 = CC2"

- id: screen_type
  label: Screen Type (WXGA/WUXGA only)
  kind: action
  command: "7E 30 30 39 31 20 n 0D"  # ~0090 n (source uses ~0090 prefix in HEX column, ASCII table shows ~0091)
  params:
    - name: ratio
      type: integer
      description: "0 = 16:9, 1 = 16:10"

- id: signal_automatic
  label: Signal Automatic
  kind: action
  command: "7E 30 30 39 31 20 n 0D"  # ~0091 n
  params:
    - name: state
      type: integer
      description: "0 = off, 1 = on"

- id: high_altitude
  label: High Altitude
  kind: action
  command: "7E 30 30 31 30 31 20 n 0D"  # ~00101 n
  params:
    - name: state
      type: integer
      description: "1 = on, 0 = off (2 accepted for backward compatibility)"

- id: information_hide
  label: Information Hide
  kind: action
  command: "7E 30 30 31 30 32 20 n 0D"  # ~00102 n
  params:
    - name: state
      type: integer
      description: "1 = on, 0 = off (2 accepted for backward compatibility)"

- id: keypad_lock
  label: Keypad Lock
  kind: action
  command: "7E 30 30 31 30 33 20 n 0D"  # ~00103 n
  params:
    - name: state
      type: integer
      description: "1 = on, 0 = off (2 accepted for backward compatibility)"

- id: background_color
  label: Background Color
  kind: action
  command: "7E 30 30 31 30 34 20 n 0D"  # ~00104 n
  params:
    - name: color
      type: integer
      description: "0 = None, 1 = Blue, 2 = Black, 3 = Red, 4 = Green, 5 = White, 6 = Gray, 7 = Logo"

- id: direct_power_on
  label: Direct Power On
  kind: action
  command: "7E 30 30 31 30 35 20 n 0D"  # ~00105 n
  params:
    - name: state
      type: integer
      description: "1 = on, 0 = off (2 accepted for backward compatibility)"

- id: auto_power_off
  label: Auto Power Off (minutes)
  kind: action
  command: "7E 30 30 31 30 36 20 aaa 0D"  # ~00106 n
  params:
    - name: minutes
      type: integer
      description: "0 to 180 (5-minute steps)"

- id: sleep_timer
  label: Sleep Timer (minutes)
  kind: action
  command: "7E 30 30 31 30 37 20 aaa 0D"  # ~00107 n
  params:
    - name: minutes
      type: integer
      description: "0 to 990 (30-minute steps)"

- id: lamp_reminder
  label: Lamp Reminder
  kind: action
  command: "7E 30 30 31 30 39 20 n 0D"  # ~00109 n
  params:
    - name: state
      type: integer
      description: "1 = on, 0 = off (2 accepted for backward compatibility)"

- id: brightness_mode
  label: Brightness Mode
  kind: action
  command: "7E 30 30 31 31 30 20 n 0D"  # ~00110 n
  params:
    - name: mode
      type: integer
      description: "1 = Bright, 2 = Eco, 4 = Dynamic, 6 = Power"

- id: lamp_reset
  label: Lamp Reset
  kind: action
  command: "7E 30 30 31 31 31 20 31 0D"  # ~00111 1
  params:
    - name: confirm
      type: integer
      description: "1 = yes"

- id: reset_to_default
  label: Reset to Default (no password)
  kind: action
  command: "7E 30 30 31 31 32 20 31 0D"  # ~00112 1
  params:
    - name: confirm
      type: integer
      description: "1 = yes; requires security off"

- id: reset_to_default_with_password
  label: Reset to Default with Password
  kind: action
  command: "7E 30 30 31 31 32 20 31 20 7E nnnn 0D"  # ~00112 1 ~nnnn
  params:
    - name: password
      type: integer
      description: "4-digit password 0000-9999; required when security is on (else returns F)"

- id: signal_power_on
  label: Signal Power On
  kind: action
  command: "7E 30 30 31 31 33 20 n 0D"  # ~00113 n
  params:
    - name: state
      type: integer
      description: "1 = on, 0 = off (2 accepted for backward compatibility)"

- id: power_mode_standby
  label: Power Mode (Standby)
  kind: action
  command: "7E 30 30 31 31 34 20 n 0D"  # ~00114 n
  params:
    - name: mode
      type: integer
      description: "0 = Eco (<0.5W), 1 = Active, 2 = ErP Off"

- id: quick_resume
  label: Quick Resume
  kind: action
  command: "7E 30 30 31 31 35 20 n 0D"  # ~00115 n
  params:
    - name: state
      type: integer
      description: "1 = on, 0 = off (2 accepted for backward compatibility)"

- id: ir_remote_key
  label: IR Remote Key (Std DLP keypad simulation)
  kind: action
  command: "7E 30 30 31 34 30 20 aa 0D"  # ~00140 nn
  params:
    - name: key
      type: integer
      description: "10 = Up, 11 = Left, 12 = Enter (Projection MENU), 13 = Right, 14 = Down, 15 = Keystone +, 16 = Keystone -, 17 = Volume -, 18 = Volume +, 19 = Brightness, 20 = Menu, 21 = Zoom, 28 = Contrast, 47 = Source"

- id: test_pattern
  label: Test Pattern
  kind: action
  command: "7E 30 30 31 39 35 20 n 0D"  # ~00195 n
  params:
    - name: pattern
      type: integer
      description: "0 = Off, 1 = Grid (Red), 2 = White, 3 = Grid (Green), 4 = Grid (Blue), 9 = Test Card"

- id: white_level
  label: White Level
  kind: action
  command: "7E 30 30 32 30 30 20 aa 0D"  # ~00200 n
  params:
    - name: value
      type: integer
      description: "0 to 31"

- id: black_level
  label: Black Level
  kind: action
  command: "7E 30 30 32 30 31 20 a 0D"  # ~00201 n
  params:
    - name: value
      type: integer
      description: "-5 to 5"

- id: ire
  label: IRE
  kind: action
  command: "7E 30 30 32 30 34 20 n 0D"  # ~00204 n
  params:
    - name: value
      type: integer
      description: "1 = 0 IRE, 0 = 7.5 IRE"

- id: display_message
  label: Display Message on OSD
  kind: action
  command: "7E 30 30 32 31 30 20 <msg> 0D"  # ~00210 n (msg = 1-30 ASCII chars; HEх column in source shows ~00200 prefix but ASCII function index S075 maps to ~00210)
  params:
    - name: message
      type: string
      description: "1-30 character ASCII string"

- id: colour_setting_reset
  label: Colour Setting Reset
  kind: action
  command: "7E 30 30 32 31 35 20 31 0D"  # ~00215 1
  params:
    - name: confirm
      type: integer
      description: "1 = yes"

- id: mode_3d
  label: 3D Mode
  kind: action
  command: "7E 30 30 32 33 30 20 n 0D"  # ~00230 n
  params:
    - name: mode
      type: integer
      description: "0 = Off, 1 = DLP-Link"

- id: d_3d_sync_invert
  label: 3D Sync Invert
  kind: action
  command: "7E 30 30 32 33 31 20 n 0D"  # ~00231 n
  params:
    - name: state
      type: integer
      description: "0 = off, 1 = on"

- id: information_menu
  label: Information Menu
  kind: action
  command: "7E 30 30 33 31 33 20 n 0D"  # ~00313 n
  params:
    - name: state
      type: integer
      description: "1 = on, 0 = off (2 accepted for backward compatibility). Sending Off while other OSD open returns F."

- id: optional_filter_installed
  label: Optional Filter Installed
  kind: action
  command: "7E 30 30 33 32 30 20 n 0D"  # ~00320 n
  params:
    - name: state
      type: integer
      description: "1 = yes, 0 = no (2 accepted for backward compatibility)"

- id: filter_reminder
  label: Filter Reminder
  kind: action
  command: "7E 30 30 33 32 32 20 n 0D"  # ~00322 n
  params:
    - name: hours
      type: integer
      description: "0 = off, 1 = 300hr, 2 = 500hr, 3 = 800hr, 4 = 1000hr"

- id: filter_reset
  label: Filter Reset
  kind: action
  command: "7E 30 30 33 32 33 20 31 0D"  # ~00323 1
  params:
    - name: confirm
      type: integer
      description: "1 = yes"

- id: colour_setting_red_hue
  label: Colour Setting Red Hue
  kind: action
  command: "7E 30 30 33 32 37 20 a 0D"  # ~00327 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: colour_setting_green_hue
  label: Colour Setting Green Hue
  kind: action
  command: "7E 30 30 33 32 38 20 a 0D"  # ~00328 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: colour_setting_blue_hue
  label: Colour Setting Blue Hue
  kind: action
  command: "7E 30 30 33 32 39 20 a 0D"  # ~00329 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: colour_setting_cyan_hue
  label: Colour Setting Cyan Hue
  kind: action
  command: "7E 30 30 33 33 30 20 a 0D"  # ~00330 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: colour_setting_yellow_hue
  label: Colour Setting Yellow Hue
  kind: action
  command: "7E 30 30 33 33 31 20 a 0D"  # ~00331 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: colour_setting_magenta_hue
  label: Colour Setting Magenta Hue
  kind: action
  command: "7E 30 30 33 33 32 20 a 0D"  # ~00332 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: colour_setting_red_saturation
  label: Colour Setting Red Saturation
  kind: action
  command: "7E 30 30 33 33 33 20 a 0D"  # ~00333 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: colour_setting_green_saturation
  label: Colour Setting Green Saturation
  kind: action
  command: "7E 30 30 33 33 34 20 a 0D"  # ~00334 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: colour_setting_blue_saturation
  label: Colour Setting Blue Saturation
  kind: action
  command: "7E 30 30 33 33 35 20 a 0D"  # ~00335 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: colour_setting_cyan_saturation
  label: Colour Setting Cyan Saturation
  kind: action
  command: "7E 30 30 33 33 36 20 a 0D"  # ~00336 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: colour_setting_yellow_saturation
  label: Colour Setting Yellow Saturation
  kind: action
  command: "7E 30 30 33 33 37 20 a 0D"  # ~00337 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: colour_setting_magenta_saturation
  label: Colour Setting Magenta Saturation
  kind: action
  command: "7E 30 30 33 33 38 20 a 0D"  # ~00338 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: colour_setting_red_gain
  label: Colour Setting Red Gain
  kind: action
  command: "7E 30 30 33 33 39 20 a 0D"  # ~00339 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: colour_setting_green_gain
  label: Colour Setting Green Gain
  kind: action
  command: "7E 30 30 33 34 30 20 a 0D"  # ~00340 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: colour_setting_blue_gain
  label: Colour Setting Blue Gain
  kind: action
  command: "7E 30 30 33 34 31 20 a 0D"  # ~00341 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: colour_setting_cyan_gain
  label: Colour Setting Cyan Gain
  kind: action
  command: "7E 30 30 33 34 32 20 a 0D"  # ~00342 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: colour_setting_yellow_gain
  label: Colour Setting Yellow Gain
  kind: action
  command: "7E 30 30 33 34 33 20 a 0D"  # ~00343 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: colour_setting_magenta_gain
  label: Colour Setting Magenta Gain
  kind: action
  command: "7E 30 30 33 34 34 20 a 0D"  # ~00344 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: colour_setting_white_red
  label: Colour Setting White Red
  kind: action
  command: "7E 30 30 33 34 35 20 a 0D"  # ~00345 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: colour_setting_white_green
  label: Colour Setting White Green
  kind: action
  command: "7E 30 30 33 34 36 20 a 0D"  # ~00346 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: colour_setting_white_blue
  label: Colour Setting White Blue
  kind: action
  command: "7E 30 30 33 34 37 20 a 0D"  # ~00347 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: display_mode_lock
  label: Display Mode Lock
  kind: action
  command: "7E 30 30 33 34 38 20 n 0D"  # ~00348 n
  params:
    - name: state
      type: integer
      description: "1 = on, 0 = off"

- id: d_3d_to_2d
  label: 3D→2D
  kind: action
  command: "7E 30 30 34 30 30 20 n 0D"  # ~00400 n
  params:
    - name: mode
      type: integer
      description: "0 = 3D, 1 = L, 2 = R"

- id: d_3d_format
  label: 3D Format
  kind: action
  command: "7E 30 30 34 30 35 20 n 0D"  # ~00405 n
  params:
    - name: format
      type: integer
      description: "0 = Auto, 1 = SBS, 2 = Top and Bottom, 3 = Frame Sequential"

- id: wall_colour
  label: Wall Colour
  kind: action
  command: "7E 30 30 35 30 36 20 n 0D"  # ~00506 n
  params:
    - name: color
      type: integer
      description: "0 = Whiteboard, 1 = Blackboard, 2 = Light Yellow, 3 = Light Green, 4 = Light Blue, 5 = Pink, 6 = Gray"

- id: hdmi_link
  label: HDMI Link (CEC)
  kind: action
  command: "7E 30 30 35 31 31 20 n 0D"  # ~00511 n
  params:
    - name: state
      type: integer
      description: "1 = on, 0 = off (2 accepted for backward compatibility)"

- id: auto_source
  label: Auto Source
  kind: action
  command: "7E 30 30 35 36 33 20 n 0D"  # ~00563 n
  params:
    - name: state
      type: integer
      description: "1 = on, 0 = off (2 accepted for backward compatibility)"

# ===== Queries (READ from Projector - Std DLP) =====

- id: query_lan_settings
  label: LAN Settings / Network State
  kind: query
  command: "7E 30 30 38 37 20 31 0D"  # ~0087 1
  params: []

- id: query_lan_ip_address
  label: LAN IP Address
  kind: query
  command: "7E 30 30 38 37 20 33 0D"  # ~0087 3
  params: []

- id: query_lamp_hours
  label: Lamp Hours
  kind: query
  command: "7E 30 30 31 30 38 20 31 0D"  # ~00108 1
  params: []

- id: query_input_source
  label: Input Source
  kind: query
  command: "7E 30 30 31 32 31 20 31 0D"  # ~00121 1
  params: []

- id: query_software_version
  label: Software Version
  kind: query
  command: "7E 30 30 31 32 32 20 31 0D"  # ~00122 1
  params: []

- id: query_display_mode
  label: Display Mode
  kind: query
  command: "7E 30 30 31 32 33 20 31 0D"  # ~00123 1
  params: []

- id: query_power_state
  label: Power State
  kind: query
  command: "7E 30 30 31 32 34 20 31 0D"  # ~00124 1
  params: []

- id: query_brightness
  label: Brightness
  kind: query
  command: "7E 30 30 31 32 35 20 31 0D"  # ~00125 1
  params: []

- id: query_contrast
  label: Contrast
  kind: query
  command: "7E 30 30 31 32 36 20 31 0D"  # ~00126 1
  params: []

- id: query_aspect_ratio
  label: Aspect Ratio
  kind: query
  command: "7E 30 30 31 32 37 20 31 0D"  # ~00127 1
  params: []

- id: query_color_temperature
  label: Color Temperature
  kind: query
  command: "7E 30 30 31 32 38 20 31 0D"  # ~00128 1
  params: []

- id: query_projection_mode
  label: Projection Mode
  kind: query
  command: "7E 30 30 31 32 39 20 31 0D"  # ~00129 1
  params: []

- id: query_information
  label: Information (combined)
  kind: query
  command: "7E 30 30 31 35 30 20 31 0D"  # ~00150 1
  params: []

- id: query_resolution
  label: Resolution
  kind: query
  command: "7E 30 30 31 35 30 20 34 0D"  # ~00150 4
  params: []

- id: query_standby_power_mode
  label: Standby Power Mode
  kind: query
  command: "7E 30 30 31 35 30 20 31 36 0D"  # ~00150 16
  params: []

- id: query_refresh_rate
  label: Refresh Rate
  kind: query
  command: "7E 30 30 31 35 30 20 31 39 0D"  # ~00150 19
  params: []

- id: query_model_name
  label: Model Name
  kind: query
  command: "7E 30 30 31 35 31 20 31 0D"  # ~00151 1
  params: []

- id: query_filter_usage_hours
  label: Filter Usage Hours
  kind: query
  command: "7E 30 30 33 32 31 20 31 0D"  # ~00321 1
  params: []

- id: query_system_temperature
  label: System Temperature
  kind: query
  command: "7E 30 30 33 35 32 20 31 0D"  # ~00352 1
  params: []

- id: query_serial_number
  label: Serial Number
  kind: query
  command: "7E 30 30 33 35 33 20 31 0D"  # ~00353 1
  params: []

- id: query_av_mute
  label: AV Mute State
  kind: query
  command: "7E 30 30 33 35 35 20 31 0D"  # ~00355 1
  params: []

- id: query_mute
  label: Mute State
  kind: query
  command: "7E 30 30 33 35 36 20 31 0D"  # ~00356 1
  params: []

- id: query_h_image_shift
  label: H Image Shift
  kind: query
  command: "7E 30 30 35 34 33 20 31 0D"  # ~00543 1
  params: []

- id: query_v_image_shift
  label: V Image Shift
  kind: query
  command: "7E 30 30 35 34 33 20 32 0D"  # ~00543 2
  params: []

- id: query_v_keystone
  label: V Keystone
  kind: query
  command: "7E 30 30 35 34 33 20 33 0D"  # ~00543 3
  params: []

- id: query_h_keystone
  label: H Keystone
  kind: query
  command: "7E 30 30 35 34 33 20 34 0D"  # ~00543 4
  params: []

- id: query_lan_mac_address
  label: LAN MAC Address
  kind: query
  command: "7E 30 30 35 35 35 20 31 0D"  # ~00555 1
  params: []

- id: query_projector_id
  label: Projector ID
  kind: query
  command: "7E 30 30 35 35 38 20 31 0D"  # ~00558 1
  params: []

# ===== Sheet: IN13xST IN213x INL314x INL412x (19200 baud, parenthesized ASCII) =====
# Timing: Lamp Ignition delay 20s; Power Down delay 10s; Source change delay 8s;
#         Inter-command delay minimum 5ms; Inter-character delay minimum 2ms.
# Status query returns "(0-N, value)"; action with "!" returns "(0-N, value)".

- id: inx_power_query
  label: INx Power Status
  kind: query
  command: "(PWR?)"
  params: []

- id: inx_power_on
  label: INx Power On
  kind: action
  command: "(PWR1)"
  params: []

- id: inx_power_off
  label: INx Power Off
  kind: action
  command: "(PWR0)"
  params: []

- id: inx_power_on_with_return
  label: INx Power On + Return
  kind: action
  command: "(PWR1!)"
  params: []

- id: inx_power_off_with_return
  label: INx Power Off + Return
  kind: action
  command: "(PWR0!)"
  params: []

- id: inx_blank_query
  label: INx Blank (AV Mute) Status
  kind: query
  command: "(BLK?)"
  params: []

- id: inx_blank_on
  label: INx Blank On
  kind: action
  command: "(BLK1)"
  params: []

- id: inx_blank_off
  label: INx Blank Off
  kind: action
  command: "(BLK0)"
  params: []

- id: inx_blank_on_with_return
  label: INx Blank On + Return
  kind: action
  command: "(BLK1!)"
  params: []

- id: inx_blank_off_with_return
  label: INx Blank Off + Return
  kind: action
  command: "(BLK0!)"
  params: []

- id: inx_source_query
  label: INx Source Status
  kind: query
  command: "(SRC?)"
  params: []

- id: inx_source_set
  label: INx Source Set
  kind: action
  command: "(SRC{n})"
  params:
    - name: source
      type: integer
      description: "0=Computer1, 1=Computer2, 4=HDMI1, 5=HDMI2, 6=HDMI3, 11=VIDEO, 12=S-VIDEO, 17=HDBaseT"

- id: inx_source_set_with_return
  label: INx Source Set + Return
  kind: action
  command: "(SRC{n}!)"
  params:
    - name: source
      type: integer
      description: "0=Computer1, 1=Computer2, 4=HDMI1, 5=HDMI2, 6=HDMI3, 11=VIDEO, 12=S-VIDEO, 17=HDBaseT"

- id: inx_aspect_query
  label: INx Aspect Status
  kind: query
  command: "(ARZ?)"
  params: []

- id: inx_aspect_set
  label: INx Aspect Set
  kind: action
  command: "(ARZ{n})"
  params:
    - name: aspect
      type: integer
      description: "0=Auto, 1=Native, 2=4x3, 3=16x9, 4=Letterbox, 6=16x10"

- id: inx_aspect_set_with_return
  label: INx Aspect Set + Return
  kind: action
  command: "(ARZ{n}!)"
  params:
    - name: aspect
      type: integer
      description: "0=Auto, 1=Native, 2=4x3, 3=16x9, 4=Letterbox, 6=16x10"

- id: inx_lamp_low_power_query
  label: INx Lamp Low Power (ECO) Status
  kind: query
  command: "(IPM?)"
  params: []

- id: inx_lamp_low_power_on
  label: INx Lamp Low Power On
  kind: action
  command: "(IPM1)"
  params: []

- id: inx_lamp_low_power_off
  label: INx Lamp Low Power Off
  kind: action
  command: "(IPM0)"
  params: []

- id: inx_lamp_low_power_on_with_return
  label: INx Lamp Low Power On + Return
  kind: action
  command: "(IPM1!)"
  params: []

- id: inx_lamp_low_power_off_with_return
  label: INx Lamp Low Power Off + Return
  kind: action
  command: "(IPM0!)"
  params: []

- id: inx_volume_query
  label: INx Volume Status
  kind: query
  command: "(VOL?)"
  params: []

- id: inx_volume_up
  label: INx Volume Up
  kind: action
  command: "(VOL+)"
  params: []

- id: inx_volume_down
  label: INx Volume Down
  kind: action
  command: "(VOL-)"
  params: []

- id: inx_volume_set
  label: INx Volume Set
  kind: action
  command: "(VOL{nn})"
  params:
    - name: level
      type: integer
      description: "0 to 10"

- id: inx_volume_up_with_return
  label: INx Volume Up + Return
  kind: action
  command: "(VOL+!)"
  params: []

- id: inx_volume_down_with_return
  label: INx Volume Down + Return
  kind: action
  command: "(VOL-!)"
  params: []

- id: inx_volume_set_with_return
  label: INx Volume Set + Return
  kind: action
  command: "(VOL{nn}!)"
  params:
    - name: level
      type: integer
      description: "0 to 10"

- id: inx_mute_query
  label: INx Mute Status
  kind: query
  command: "(MTE?)"
  params: []

- id: inx_mute_on
  label: INx Mute On
  kind: action
  command: "(MTE1)"
  params: []

- id: inx_mute_off
  label: INx Mute Off
  kind: action
  command: "(MTE0)"
  params: []

- id: inx_mute_on_with_return
  label: INx Mute On + Return
  kind: action
  command: "(MTE1!)"
  params: []

- id: inx_mute_off_with_return
  label: INx Mute Off + Return
  kind: action
  command: "(MTE0!)"
  params: []

- id: inx_firmware_version
  label: INx Firmware Version
  kind: query
  command: "(FVS?)"
  params: []

- id: inx_lamp_eco_hours
  label: INx Lamp ECO Hours
  kind: query
  command: "(LME?)"
  params: []

- id: inx_lamp_normal_hours
  label: INx Lamp Normal Hours
  kind: query
  command: "(LMO?)"
  params: []

- id: inx_lamp_dynamic_hours
  label: INx Lamp Dynamic Hours
  kind: query
  command: "(LML?)"
  params: []

- id: inx_lamp_hours
  label: INx Lamp Hours
  kind: query
  command: "(LMP?)"
  params: []

- id: inx_total_eco_hours
  label: INx Total ECO Hours
  kind: query
  command: "(LTE?)"
  params: []

- id: inx_total_normal_hours
  label: INx Total Normal Hours
  kind: query
  command: "(LTO?)"
  params: []

- id: inx_total_dynamic_hours
  label: INx Total Dynamic Hours
  kind: query
  command: "(LTL?)"
  params: []

- id: inx_total_hours
  label: INx Total Hours
  kind: query
  command: "(LMT?)"
  params: []

- id: inx_lamp_reset_count
  label: INx Lamp Reset Times
  kind: query
  command: "(LMR?)"
  params: []

- id: inx_lamp_reset
  label: INx Lamp Hours Reset
  kind: action
  command: "(LRT1)"
  params: []

- id: inx_ceiling_query
  label: INx Ceiling/Projection Status
  kind: query
  command: "(CEL?)"
  params: []

- id: inx_ceiling_set
  label: INx Ceiling Set
  kind: action
  command: "(CEL{n})"
  params:
    - name: mode
      type: integer
      description: "0=Front table, 1=Front ceiling, 2=Rear table, 3=Rear ceiling"

- id: inx_ceiling_set_with_return
  label: INx Ceiling Set + Return
  kind: action
  command: "(CEL{n}!)"
  params:
    - name: mode
      type: integer
      description: "0=Front table, 1=Front ceiling, 2=Rear table, 3=Rear ceiling"

- id: inx_brightness_query
  label: INx Brightness Status
  kind: query
  command: "(BRT?)"
  params: []

- id: inx_brightness_up
  label: INx Brightness Up
  kind: action
  command: "(BRT+)"
  params: []

- id: inx_brightness_down
  label: INx Brightness Down
  kind: action
  command: "(BRT-)"
  params: []

- id: inx_brightness_set
  label: INx Brightness Set
  kind: action
  command: "(BRT{nn})"
  params:
    - name: value
      type: integer
      description: "0 to 100"

- id: inx_brightness_up_with_return
  label: INx Brightness Up + Return
  kind: action
  command: "(BRT+!)"
  params: []

- id: inx_brightness_down_with_return
  label: INx Brightness Down + Return
  kind: action
  command: "(BRT-!)"
  params: []

- id: inx_brightness_set_with_return
  label: INx Brightness Set + Return
  kind: action
  command: "(BRT{nn}!)"
  params:
    - name: value
      type: integer
      description: "0 to 100"

- id: inx_contrast_query
  label: INx Contrast Status
  kind: query
  command: "(CON?)"
  params: []

- id: inx_contrast_up
  label: INx Contrast Up
  kind: action
  command: "(CON+)"
  params: []

- id: inx_contrast_down
  label: INx Contrast Down
  kind: action
  command: "(CON-)"
  params: []

- id: inx_contrast_set
  label: INx Contrast Set
  kind: action
  command: "(CON{nn})"
  params:
    - name: value
      type: integer
      description: "0 to 100"

- id: inx_contrast_up_with_return
  label: INx Contrast Up + Return
  kind: action
  command: "(CON+!)"
  params: []

- id: inx_contrast_down_with_return
  label: INx Contrast Down + Return
  kind: action
  command: "(CON-!)"
  params: []

- id: inx_contrast_set_with_return
  label: INx Contrast Set + Return
  kind: action
  command: "(CON{nn}!)"
  params:
    - name: value
      type: integer
      description: "0 to 100"

- id: inx_presets_query
  label: INx Picture Presets Status
  kind: query
  command: "(PST?)"
  params: []

- id: inx_presets_set
  label: INx Picture Presets Set
  kind: action
  command: "(PST{n})"
  params:
    - name: preset
      type: integer
      description: "1=User, 5=Presentation, 7=Movie, 10=Bright, 11=sRGB, 12=Blackboard"

- id: inx_presets_set_with_return
  label: INx Picture Presets Set + Return
  kind: action
  command: "(PST{n}!)"
  params:
    - name: preset
      type: integer
      description: "1=User, 5=Presentation, 7=Movie, 10=Bright, 11=sRGB, 12=Blackboard"

- id: inx_freeze_query
  label: INx Freeze Status
  kind: query
  command: "(FRZ?)"
  params: []

- id: inx_freeze_on
  label: INx Freeze On
  kind: action
  command: "(FRZ1)"
  params: []

- id: inx_freeze_off
  label: INx Freeze Off
  kind: action
  command: "(FRZ0)"
  params: []

- id: inx_freeze_on_with_return
  label: INx Freeze On + Return
  kind: action
  command: "(FRZ1!)"
  params: []

- id: inx_freeze_off_with_return
  label: INx Freeze Off + Return
  kind: action
  command: "(FRZ0!)"
  params: []

- id: inx_keypad_key
  label: INx Keypad Navigation
  kind: action
  command: "(NAV{n})"
  params:
    - name: key
      type: integer
      description: "0=Menu, 1=Up, 2=Down, 3=Select, 4=Left, 5=Right"

- id: inx_keypad_key_with_return
  label: INx Keypad Navigation + Return
  kind: action
  command: "(NAV{n}!)"
  params:
    - name: key
      type: integer
      description: "0=Menu, 1=Up, 2=Down, 3=Select, 4=Left, 5=Right"

# ===== Sheet: IN102x IN103x IN104x IN105x (19200 baud, plain HEX C00..C0C) =====

- id: inn_power_on
  label: IN102x Power On
  kind: action
  command: "43 30 30 0D"  # C00
  params: []

- id: inn_power_off_immediate
  label: IN102x Power Off Immediate
  kind: action
  command: "43 30 31 0D"  # C01
  params: []

- id: inn_power_off
  label: IN102x Power Off
  kind: action
  command: "43 30 32 0D"  # C02
  params: []

- id: inn_source_video
  label: IN102x Source Video
  kind: action
  command: "43 30 33 0D"  # C03
  params: []

- id: inn_source_svideo
  label: IN102x Source S-Video
  kind: action
  command: "43 30 34 0D"  # C04
  params: []

- id: inn_source_vga1
  label: IN102x Source VGA In 1
  kind: action
  command: "43 30 35 0D"  # C05
  params: []

- id: inn_source_vga2
  label: IN102x Source VGA 2
  kind: action
  command: "43 30 36 0D"  # C06
  params: []

- id: inn_source_video_alt
  label: IN102x Source Video (alt)
  kind: action
  command: "43 30 37 0D"  # C07
  params: []

- id: inn_source_svideo_alt
  label: IN102x Source S-Video (alt)
  kind: action
  command: "43 30 38 0D"  # C08
  params: []

- id: inn_volume_up
  label: IN102x Volume Up
  kind: action
  command: "43 30 39 0D"  # C09
  params: []

- id: inn_volume_down
  label: IN102x Volume Down
  kind: action
  command: "43 30 41 0D"  # C0A
  params: []

- id: inn_mute_on
  label: IN102x Mute On
  kind: action
  command: "43 30 42 0D"  # C0B
  params: []

- id: inn_mute_off
  label: IN102x Mute Off
  kind: action
  command: "43 30 43 0D"  # C0C
  params: []
```

## Feedbacks
```yaml
- id: projector_info_event
  label: Projector Information (auto-sent on state change)
  type: enum
  values: [0, 1, 2, 3, 4, 6, 7, 8]
  description: "INFOa event format. a=0 Standby, 1 Warming, 2 Cooling, 3 Lamp Fail (in S-sheet text: 'Out of Range' noted at index 4), 4 Out of Range, 6 Lamp Fail, 7 Fan Lock, 8 Over Temperature. Source has minor inconsistency on event-code numbering; both readings reproduced."

- id: power_state_query
  label: Power State Query
  type: enum
  values: [0, 1]
  description: "Response via ~00124 1 - returns Oka, a=0 Off, a=1 On"

- id: brightness_query
  label: Brightness Query
  type: integer
  description: "Response via ~00125 1 - returns Okaaa, -50 to +50"

- id: contrast_query
  label: Contrast Query
  type: integer
  description: "Response via ~00126 1 - returns Okaaa, -50 to +50"

- id: aspect_ratio_query
  label: Aspect Ratio Query
  type: enum
  values: [0, 1, 2, 3, 5, 6, 7, 16, 19]
  description: "Response via ~00127 1 - aa=0 None, 1 4:3, 2 16:9, 3 16:10, 5 LBX, 6 Native, 7 Auto, 16 21:9, 19 FULL. Source contains a duplicate '7' for Auto."

- id: colour_temp_query
  label: Colour Temperature Query
  type: enum
  values: [1, 2, 3, 4]
  description: "Response via ~00128 1 - 1=Warm, 2=Medium(Standard), 3=Cold, 4=Cool"

- id: projection_mode_query
  label: Projection Mode Query
  type: enum
  values: [0, 1, 2, 3]
  description: "Response via ~00129 1 - 0=Front, 1=Rear, 2=Front-Ceiling, 3=Rear-Ceiling"

- id: information_query
  label: Information Query (combined)
  type: string
  description: "Response via ~00150 1 - Okabbbbbccddddee: a=power (0 off / 1 on); bbbbb=5-digit lamp hours; cc=input source (encoding scheme varies by model - scheme A: 00 none / 05 VGA / 09 S-Video / 10 Video / 1 HDMI 1 / 15 HDMI 2; scheme B: 00 none / 02 VGA / 03 VGA 2 / 05 Video / 07 HDMI 1 / 08 HDMI 2 / 16 HDBaseT); dddd=software version; ee=display mode (00 none / 01 Presentation / 02 Bright / 03 Movie(Cinema) / 04 sRGB / 05 User / 09 3D / 12 Game / 13 DICOM SIM / 14 ISF Day / 15 ISF Night / 22 HDR SIM / 26 HLG SIM)"

- id: resolution_query
  label: Resolution Query
  type: string
  description: "Response via ~00150 4 - returns Ok<WxH> e.g. Ok1920x1080; Ok0x0 if no signal"

- id: standby_power_mode_query
  label: Standby Power Mode Query
  type: enum
  values: [0, 1, 2]
  description: "Response via ~00150 16 - 0=Eco, 1=Active, 2=ErP Off"

- id: refresh_rate_query
  label: Refresh Rate Query
  type: string
  description: "Response via ~00150 19 - returns Ok<N>Hz e.g. Ok60Hz; Ok0Hz if no signal"

- id: model_name_query
  label: Model Name Query
  type: enum
  values: [1, 2, 3, 4, 5]
  description: "Response via ~00151 1 - 1=SVGA, 2=XGA, 3=WXGA, 4=1080p, 5=WUXGA"

- id: filter_usage_hours_query
  label: Filter Usage Hours Query
  type: integer
  description: "Response via ~00321 1 - Okaaaaa, 00000 to 99999"

- id: system_temperature_query
  label: System Temperature Query
  type: integer
  description: "Response via ~00352 1 - Okaaa, 000 to 999"

- id: serial_number_query
  label: Serial Number Query
  type: string
  description: "Response via ~00353 1 - returns Oka (string)"

- id: av_mute_query
  label: AV Mute Query
  type: enum
  values: [0, 1]
  description: "Response via ~00355 1 - 0=Off, 1=On"

- id: mute_query
  label: Mute Query
  type: enum
  values: [0, 1]
  description: "Response via ~00356 1 - 0=Off, 1=On"

- id: h_image_shift_query
  label: H Image Shift Query
  type: integer
  description: "Response via ~00543 1 - Okaaaa, -100 to +100"

- id: v_image_shift_query
  label: V Image Shift Query
  type: integer
  description: "Response via ~00543 2 - Okaaaa, -100 to +100"

- id: v_keystone_query
  label: V Keystone Query
  type: integer
  description: "Response via ~00543 3 - Okaaa, -40 to +40"

- id: h_keystone_query
  label: H Keystone Query
  type: integer
  description: "Response via ~00543 4 - Okaaa, -40 to +40"

- id: lan_mac_address_query
  label: LAN MAC Address Query
  type: string
  description: "Response via ~00555 1 - Ok##:##:##:##:##:##"

- id: projector_id_query
  label: Projector ID Query
  type: integer
  description: "Response via ~00558 1 - Okaa, 00 to 99"

- id: lan_settings_query
  label: LAN Settings / Network State Query
  type: enum
  values: [0, 1]
  description: "Response via ~0087 1 - 0=Disconnected, 1=Connected"

- id: lan_ip_address_query
  label: LAN IP Address Query
  type: string
  description: "Response via ~0087 3 - Okaaa_bbb_ccc_ddd (dot-separated octets)"

- id: lamp_hours_query
  label: Lamp Hours Query
  type: integer
  description: "Response via ~00108 1 - Okaaaaa, 5-digit total lamp hours"

- id: input_source_query
  label: Input Source Query
  type: enum
  values: [0, 1, 2, 3, 5, 7, 8, 9, 10, 15, 16]
  description: "Response via ~00121 1. Source documents two encodings: scheme A (0 None, 1 HDMI 1, 5 VGA, 9 S-Video, 10 Video, 15 HDMI 2) and scheme B (0 None, 2 VGA, 3 VGA 2, 5 Video, 7 HDMI 1, 8 HDMI 2, 16 HDBaseT). Values vary by model."

- id: software_version_query
  label: Software Version Query
  type: string
  description: "Response via ~00122 1 - Okaaaa (software version string)"

- id: display_mode_query
  label: Display Mode Query
  type: enum
  values: [0, 1, 2, 3, 4, 5, 9, 12, 13, 14, 15, 22, 26]
  description: "Response via ~00123 1 - 00 None, 01 Presentation, 02 Bright, 03 Movie(Cinema), 04 sRGB, 05 User, 09 3D, 12 Game, 13 DICOM SIM, 14 ISF Day, 15 ISF Night, 22 HDR SIM, 26 HLG SIM"
```

## Variables
```yaml
# UNRESOLVED: source provides query commands but no discrete Variables section.
# All settable parameters are represented as parameterized Actions.
```

## Events
```yaml
- id: projector_info_event
  label: Projector Information (unsolicited, on state change)
  type: enum
  values: [0, 1, 2, 3, 4, 6, 7, 8]
  description: "INFOa - a=0 Standby, 1 Warming, 2 Cooling, 3 Lamp Fail (a=4 listed as Out of Range in some lines), 4 Out of Range, 6 Lamp Fail, 7 Fan Lock, 8 Over Temperature. Source contains minor inconsistencies on event-code numbering for a=3 vs a=4 vs a=6."
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
**Command encoding — Std DLP sheet:** Commands prefixed with `~` are visual notation. Actual bytes: `7E` (ASCII tilde) + 4-digit projector ID + space `20` + command index digits + space `20` + parameter bytes + `0D` (CR). Projector ID `0000` = broadcast (all projectors); IDs `0001`..`0099` target a specific unit. Two-character parameter bytes are ASCII hex digits. Projector return Pass = `P`, Fail = `F`. Parity `None` — no even/odd parity bit.

**IN13xST/IN213x/INL314x/INL412x sheet:** Parenthesized ASCII commands. Timing requirements: Lamp ignition delay 20s, power down delay 10s, source change delay 8s, inter-command delay minimum 5ms, inter-character delay minimum 2ms. Status queries return `(range, value)` format, e.g. `(0-1,n)` for power status. Commands suffixed with `!` request a return confirmation. Baud rate: 19200.

**IN102x/IN103x/IN104x/IN105x sheet:** Plain HEX commands `C00`..`C0C`. ASCII rendering: `(CMDHEX)`. Baud rate: 19200.

**Projector ID:** 00–99. Broadcast address is `~0000`. When sending to a specific projector, prefix all commands with its ID. Security commands S046/S047 and reset S066 require inline password (`~nnnn` 4-digit ASCII) when security is on, else return `F`.

**Security:** Reset-to-default (S065) requires security OFF. Reset-to-default with password (S066, `~00112 1 ~nnnn`) is required when security is on. Security off command (S047) does not require a password parameter; security on (S046) does.

**Backward compatibility:** Several commands accept `0`, `1`, or `2` as state value where `2` is accepted for backward compatibility with legacy control systems. Treat `1` and `2` as equivalent on/off in implementations.

**Query response format:** Std DLP query commands return `OK` + value prefix (e.g. `Oka`, `Okaaaa`, `Okabbbbbccddddee`). On failure, projector returns `F`. Information-menu off command (~00313 0) returns `F` if another OSD is currently displayed.

**Display message HEX note:** Source row S075 (`~00210 n` Display message on OSD) shows HEX column prefix `7E 30 30 32 30 30` which corresponds to `~00200`, while the ASCII column reads `~00210`. Both interpretations kept in `display_message.command` template; implementer should verify against device.

**Screen Type / Signal Automatic:** Both rows S053 and S054 in source map HEX column to `~0091`. Source treats these as overlapping row entries; implementations should treat as separate logical commands even though hex payload coincides.

<!-- UNRESOLVED: Firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: Lamp-hours threshold for "running out" warning not specified -->
<!-- UNRESOLVED: V. Keystone range for specific model INL2156/58/59 variant noted in source but not fully resolved for INFxxxAG/INFxxxML behaviour -->
<!-- UNRESOLVED: Command timing (latency between send and projector response) not documented -->
<!-- UNRESOLVED: Sheet: IN13xST/IN213x/INL314x/INL412x and Sheet: IN102x–IN105x are documented as separate model families with different baud rates; whether INFxxxAG/INFxxxML firmware accepts any of these command sets is unverified -->

## Provenance

```yaml
source_domains:
  - cdn.infocus.com
source_urls:
  - https://cdn.infocus.com/2026/02/b7RCq21d-InFocus_Generic_RS232_Commands.xlsx
retrieved_at: 2026-05-14T16:51:10.504Z
last_checked_at: 2026-07-21T22:52:54.553Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:52:54.553Z
matched_actions: 223
action_count: 223
confidence: medium
summary: "All 223 spec actions map literally to Std DLP (S001-S109,R001-R028), IN13xST (parenthesized ASCII), and IN102x (C00-C0C) sheets; transport (9600-8-N-1) matches; near-total bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Sheet: IN13xST/IN213x/INL314x/INL412x and Sheet: IN102x–IN105x document distinct model families with different baud rates; behaviour for INFxxxAG/INFxxxML at 19200 baud not separately verified"
- "firmware version compatibility range not stated in source"
- "source provides query commands but no discrete Variables section."
- "no multi-step macro sequences described in source"
- "Firmware version compatibility range not stated in source"
- "Lamp-hours threshold for \"running out\" warning not specified"
- "V. Keystone range for specific model INL2156/58/59 variant noted in source but not fully resolved for INFxxxAG/INFxxxML behaviour"
- "Command timing (latency between send and projector response) not documented"
- "Sheet: IN13xST/IN213x/INL314x/INL412x and Sheet: IN102x–IN105x are documented as separate model families with different baud rates; whether INFxxxAG/INFxxxML firmware accepts any of these command sets is unverified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
