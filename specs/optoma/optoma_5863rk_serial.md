---
spec_id: admin/optoma-5863rk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma 5863RK Control Spec"
manufacturer: Optoma
model_family: 5863RK
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - 5863RK
    - 5863Rk
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - region-resource.optoma.com
  - optomausa.com
  - optomaeurope.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/0f4c1011-de9c-4953-b8ad-8620be92eac4.pdf
  - https://www.optomausa.com/product/5863rk
  - https://www.optomaeurope.com/ContentStorage/Documents/955b7f8f-f533-43a5-b6ae-483e6833feaf.pdf
retrieved_at: 2026-07-14T18:13:42.174Z
last_checked_at: 2026-07-22T00:28:11.897Z
generated_at: 2026-07-22T00:28:11.897Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility range not stated in source"
  - "source does not define multi-step command sequences the device"
  - "source notes (line 19) that Wake-on-LAN is unavailable while"
  - "Voltage/current/power specifications not stated in source"
  - "Fault behaviour and error-recovery procedures not stated in source"
verification:
  verdict: verified
  checked_at: 2026-07-22T00:28:11.897Z
  matched_actions: 109
  action_count: 109
  confidence: medium
  summary: "All 109 spec actions (SET and GET) map literally to source ~xxNN opcode/hex rows with matching parameter values; transport fields match the RS232/LAN tables. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Optoma 5863RK Control Spec

## Summary
RS-232 / LAN control protocol for the Optoma 5863RK Creative Touch 5-series Interactive Flat Panel (IFP). Covers the full SET (command) and GET (query) catalogues, transport framing (RS-232 on DB-9 and LAN on TCP port 4023), and system auto-send status notifications (standby, warming, cooling, over-temperature).

<!-- UNRESOLVED: firmware compatibility range not stated in source -->

## Transport
```yaml
# IFP supports RS-232 (DB-9) and RJ45 (LAN) control; the LAN port number
# is documented as 4023 (line 47 of the refined source), not the generic 23
# hinted at in the introductory note (line 23). Both transports listed.
protocols:
  - serial
  - tcp
addressing:
  port: 4023
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# powerable       (power on/off commands present: ~xx00 n=0/1/3)
# routable        (input source switching commands present: ~xx12)
# queryable       (GET command catalogue present)
# levelable       (volume, treble, bass, brightness, contrast, backlight, color present)
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# Each named opcode/mnemonic in the SET catalogue is one action.
# Hex payloads copied verbatim from the source.
# Parameter ranges that show a single "~xxNN n" template are emitted as one
# parameterized action; the source-list "to" range (e.g. 7E 30 30 39 35 20 30 0d
# to 7E 30 30 39 35 20 31 30 30 0d) confirms a single command.

- id: power_off
  label: Power Off
  kind: action
  command: "~xx00 n"   # n=0; hex 7E 30 30 30 30 20 30 0d
  params:
    - name: n
      type: integer
      description: 0 = power off
  notes: "Hex template: 7E 30 30 30 30 20 30 0D. Response: P/F."

- id: power_on
  label: Power On
  kind: action
  command: "~xx00 n"   # n=1; hex 7E 30 30 30 30 20 31 0d
  params:
    - name: n
      type: integer
      description: 1 = power on
  notes: "Hex template: 7E 30 30 30 30 20 31 0D. Response: P/F."

- id: power_restart
  label: Power Restart
  kind: action
  command: "~xx00 n"   # n=3; hex 7E 30 30 30 30 20 33 0d
  params:
    - name: n
      type: integer
      description: 3 = restart
  notes: "Hex template: 7E 30 30 30 30 20 33 0D. Response: P/F."

- id: power_mode_eco
  label: Power Mode (Standby) Eco
  kind: action
  command: "~xx114 n"   # n=0; hex 7E 30 30 31 31 34 20 30 0d
  params:
    - name: n
      type: integer
      description: 0 = Eco standby

- id: power_mode_active
  label: Power Mode (Standby) Active
  kind: action
  command: "~xx114 n"   # n=1; hex 7E 30 30 31 31 34 20 31 0d
  params:
    - name: n
      type: integer
      description: 1 = Active standby (required for LAN/OMS remote power on)

- id: treble_set
  label: Treble
  kind: action
  command: "~xx95 n"   # n=0-100; hex range 7E 30 30 39 35 20 30 0d .. 7E 30 30 39 35 20 31 30 30 0d
  params:
    - name: n
      type: integer
      description: Treble level 0-100

- id: bass_set
  label: Bass
  kind: action
  command: "~xx96 n"   # n=0-100; hex range 7E 30 30 39 36 20 30 0d .. 7E 30 30 39 36 20 31 30 30 0d
  params:
    - name: n
      type: integer
      description: Bass level 0-100

- id: balance_set
  label: Balance
  kind: action
  command: "~xx99 n"   # n=50-50 (typo in source; likely -50..+50); hex range 7E 30 30 39 39 20 30 0d .. 7E 30 30 39 39 20 31 30 30 0d
  params:
    - name: n
      type: integer
      description: Balance level (source shows range marker "50-50"; see Notes)

- id: contrast_set
  label: Contrast
  kind: action
  command: "~xx22 n"   # n=0-100; hex range 7E 30 30 32 32 20 30 0d .. 7E 30 30 32 32 20 31 30 30 0d
  params:
    - name: n
      type: integer
      description: Contrast 0-100

- id: brightness_set
  label: Brightness
  kind: action
  command: "~xx21 n"   # n=0-100; hex range 7E 30 30 32 31 20 30 0d .. 7E 30 30 32 31 20 31 30 30 0d
  params:
    - name: n
      type: integer
      description: Brightness 0-100

- id: sound_mode_standard
  label: Sound Mode Standard
  kind: action
  command: "~xx252 n"   # n=1; hex 7E 30 30 32 35 32 20 31 0d
  params:
    - name: n
      type: integer
      description: 1 = Standard

- id: sound_mode_meeting
  label: Sound Mode Meeting
  kind: action
  command: "~xx252 n"   # n=4; hex 7E 30 30 32 35 32 20 34 0d
  params:
    - name: n
      type: integer
      description: 4 = Meeting

- id: sound_mode_user
  label: Sound Mode User
  kind: action
  command: "~xx252 n"   # n=2; hex 7E 30 30 32 35 32 20 32 0d
  params:
    - name: n
      type: integer
      description: 2 = User

- id: sound_mode_classroom
  label: Sound Mode Classroom
  kind: action
  command: "~xx252 n"   # n=3; hex 7E 30 30 32 35 32 20 33 0d
  params:
    - name: n
      type: integer
      description: 3 = Classroom

- id: sound_mode_movie
  label: Sound Mode Movie
  kind: action
  command: "~xx252 n"   # n=5; hex 7E 30 30 32 35 32 20 35 0d
  params:
    - name: n
      type: integer
      description: 5 = Movie

- id: volume_set
  label: Volume
  kind: action
  command: "~xx81 n"   # n=0-100; hex range 7E 30 30 38 31 20 30 0d .. 7E 30 30 38 31 20 31 30 30 0d
  params:
    - name: n
      type: integer
      description: Master volume 0-100

- id: video_mute_off
  label: Video Mute Off
  kind: action
  command: "~xx13 n"   # n=0; hex 7E 30 30 31 33 20 30 0d
  params:
    - name: n
      type: integer
      description: 0 = off

- id: video_mute_on
  label: Video Mute On
  kind: action
  command: "~xx13 n"   # n=1; hex 7E 30 30 31 33 20 31 0d
  params:
    - name: n
      type: integer
      description: 1 = on

- id: mute_off
  label: Audio Mute Off
  kind: action
  command: "~xx80 n"   # n=0; hex 7E 30 30 38 30 20 30 0d
  params:
    - name: n
      type: integer
      description: 0 = off

- id: mute_on
  label: Audio Mute On
  kind: action
  command: "~xx80 n"   # n=1; hex 7E 30 30 38 30 20 31 0d
  params:
    - name: n
      type: integer
      description: 1 = on

- id: input_hdmi1
  label: Input Source HDMI1
  kind: action
  command: "~xx12 n"   # n=1; hex 7E 30 30 31 32 20 31 0d
  params:
    - name: n
      type: integer
      description: 1 = HDMI1

- id: input_hdmi2
  label: Input Source HDMI2
  kind: action
  command: "~xx12 n"   # n=15; hex 7E 30 30 31 32 20 31 35 0d
  params:
    - name: n
      type: integer
      description: 15 = HDMI2 (source encodes HDMI2 as 15)

- id: input_hdmi3
  label: Input Source HDMI3
  kind: action
  command: "~xx12 n"   # n=16; hex 7E 30 30 31 32 20 31 36 0d
  params:
    - name: n
      type: integer
      description: 16 = HDMI3

- id: input_usb_c1
  label: Input Source USB Type-C 1
  kind: action
  command: "~xx12 n"   # n=27; hex 7E 30 30 31 32 20 32 37 0d
  params:
    - name: n
      type: integer
      description: 27 = USB Type-C 1

- id: input_usb_c2
  label: Input Source USB Type-C 2
  kind: action
  command: "~xx12 n"   # n=30; hex 7E 30 30 31 32 20 32 37 0d (source duplicates hex 27 - copy verbatim)
  params:
    - name: n
      type: integer
      description: 30 = USB Type-C 2

- id: input_hdmi4
  label: Input Source HDMI4
  kind: action
  command: "~xx12 n"   # n=29; hex 7E 30 30 31 32 20 32 39 1d (source uses 1d instead of 0d as terminator - copy verbatim)
  params:
    - name: n
      type: integer
      description: 29 = HDMI4

- id: input_displayport
  label: Input Source DisplayPort
  kind: action
  command: "~xx12 n"   # n=20; hex 7E 30 30 31 32 20 32 30 0d
  params:
    - name: n
      type: integer
      description: 20 = DisplayPort

- id: input_slot_in_pc
  label: Input Source Slot in PC
  kind: action
  command: "~xx12 n"   # n=25; hex 7E 30 30 31 32 20 32 35 0d
  params:
    - name: n
      type: integer
      description: 25 = Slot in PC

- id: input_android
  label: Input Source Android
  kind: action
  command: "~xx12 n"   # n=24; hex 7E 30 30 31 32 20 32 34 0d
  params:
    - name: n
      type: integer
      description: 24 = Android

- id: aspect_4_3
  label: Aspect Ratio 4:3
  kind: action
  command: "~xx60 n"   # n=1; hex 7E 30 30 36 30 20 31 0d
  params:
    - name: n
      type: integer
      description: 1 = 4:3

- id: aspect_16_9
  label: Aspect Ratio 16:9
  kind: action
  command: "~xx60 n"   # n=2; hex 7E 30 30 36 30 20 32 0d
  params:
    - name: n
      type: integer
      description: 2 = 16:9

- id: aspect_ptp
  label: Aspect Ratio PTP
  kind: action
  command: "~xx60 n"   # n=14; hex 7E 30 30 36 30 20 31 34 0d
  params:
    - name: n
      type: integer
      description: 14 = PTP (pixel-to-pixel)

- id: language_english
  label: Language English
  kind: action
  command: "~xx70 n"   # n=1; hex 7E 30 30 37 30 20 31 0d
  params:
    - name: n
      type: integer
      description: 1 = English

- id: language_french
  label: Language Français
  kind: action
  command: "~xx70 n"   # n=3; hex 7E 30 30 37 30 20 33 0d
  params:
    - name: n
      type: integer
      description: 3 = Français

- id: language_spanish
  label: Language Español
  kind: action
  command: "~xx70 n"   # n=5; hex 7E 30 30 37 30 20 35 0d
  params:
    - name: n
      type: integer
      description: 5 = Español

- id: language_traditional_chinese
  label: Language Traditional Chinese
  kind: action
  command: "~xx70 n"   # n=13; hex 7E 30 30 37 30 20 31 33 0d
  params:
    - name: n
      type: integer
      description: 13 = Traditional Chinese

- id: language_simplified_chinese
  label: Language Simplified Chinese
  kind: action
  command: "~xx70 n"   # n=14; hex 7E 30 30 37 30 20 31 34 0d
  params:
    - name: n
      type: integer
      description: 14 = Simplified Chinese

- id: language_portuguese
  label: Language Português
  kind: action
  command: "~xx70 n"   # n=6; hex 7E 30 30 37 30 20 36 0d
  params:
    - name: n
      type: integer
      description: 6 = Português

- id: language_german
  label: Language German
  kind: action
  command: "~xx70 n"   # n=2; hex 7E 30 30 37 30 20 32 0d
  params:
    - name: n
      type: integer
      description: 2 = German

- id: language_dutch
  label: Language Dutch
  kind: action
  command: "~xx70 n"   # n=8; hex 7E 30 30 37 30 20 38 0d
  params:
    - name: n
      type: integer
      description: 8 = Dutch

- id: language_polish
  label: Language Polish
  kind: action
  command: "~xx70 n"   # n=7; hex 7E 30 30 37 30 20 37 0d
  params:
    - name: n
      type: integer
      description: 7 = Polish

- id: language_russian
  label: Language Russian
  kind: action
  command: "~xx70 n"   # n=17; hex 7E 30 30 37 30 20 31 37 0d
  params:
    - name: n
      type: integer
      description: 17 = Russian

- id: language_czech
  label: Language Czech
  kind: action
  command: "~xx70 n"   # n=19; hex 7E 30 30 37 30 20 31 39 0d
  params:
    - name: n
      type: integer
      description: 19 = Czech

- id: language_danish
  label: Language Danish
  kind: action
  command: "~xx70 n"   # n=24; hex 7E 30 30 37 30 20 32 34 0d
  params:
    - name: n
      type: integer
      description: 24 = Danish

- id: language_swedish
  label: Language Swedish
  kind: action
  command: "~xx70 n"   # n=9; hex 7E 30 30 37 30 20 39 0d
  params:
    - name: n
      type: integer
      description: 9 = Swedish

- id: language_italian
  label: Language Italian
  kind: action
  command: "~xx70 n"   # n=4; hex 7E 30 30 37 30 20 34 0d
  params:
    - name: n
      type: integer
      description: 4 = Italian

- id: language_turkish
  label: Language Turkish
  kind: action
  command: "~xx70 n"   # n=22; hex 7E 30 30 37 30 20 32 32 0d
  params:
    - name: n
      type: integer
      description: 22 = Turkish

- id: language_arabic
  label: Language Arabic
  kind: action
  command: "~xx70 n"   # n=20; hex 7E 30 30 37 30 20 32 30 0d
  params:
    - name: n
      type: integer
      description: 20 = Arabic

- id: language_romanian
  label: Language Romanian
  kind: action
  command: "~xx70 n"   # n=27; hex 7E 30 30 37 30 20 32 37 0d
  params:
    - name: n
      type: integer
      description: 27 = Romanian

- id: language_hungarian
  label: Language Hungarian
  kind: action
  command: "~xx70 n"   # n=18; hex 7E 30 30 37 30 20 31 38 0d
  params:
    - name: n
      type: integer
      description: 18 = Hungarian

- id: language_finnish
  label: Language Finnish
  kind: action
  command: "~xx70 n"   # n=11; hex 7E 30 30 37 30 20 31 31 0d
  params:
    - name: n
      type: integer
      description: 11 = Finnish

- id: language_norwegian
  label: Language Norwegian (Norge)
  kind: action
  command: "~xx70 n"   # n=10; hex 7E 30 30 37 30 20 31 30 0d
  params:
    - name: n
      type: integer
      description: 10 = Norwegian (Norge)

- id: picture_mode_presentation
  label: Picture Mode Presentation
  kind: action
  command: "~xx20 n"   # n=1; hex 7E 30 30 32 30 20 31 0d
  params:
    - name: n
      type: integer
      description: 1 = Presentation

- id: picture_mode_bright
  label: Picture Mode Bright
  kind: action
  command: "~xx20 n"   # n=2; hex 7E 30 30 32 30 20 32 0d
  params:
    - name: n
      type: integer
      description: 2 = Bright

- id: picture_mode_cinema
  label: Picture Mode Cinema
  kind: action
  command: "~xx20 n"   # n=3; hex 7E 30 30 32 30 20 33 0d
  params:
    - name: n
      type: integer
      description: 3 = Cinema

- id: picture_mode_dicom_sim
  label: Picture Mode DICOM SIM
  kind: action
  command: "~xx20 n"   # n=13; hex 7E 30 30 32 30 21 33 0d (source uses 0x21 instead of 0x20 separator - verbatim)
  params:
    - name: n
      type: integer
      description: 13 = DICOM SIM

- id: picture_mode_user
  label: Picture Mode User
  kind: action
  command: "~xx20 n"   # n=5; hex 7E 30 30 32 30 20 35 0d
  params:
    - name: n
      type: integer
      description: 5 = User

- id: picture_mode_hdr
  label: Picture Mode HDR
  kind: action
  command: "~xx20 n"   # n=21; hex 7E 30 30 32 30 20 32 31 0d
  params:
    - name: n
      type: integer
      description: 21 = HDR

- id: color_set
  label: Color
  kind: action
  command: "~xx45 n"   # n=0-100; hex range 7E 30 30 34 35 20 30 0d .. 7E 30 30 34 35 20 31 30 30 0d
  params:
    - name: n
      type: integer
      description: Color saturation 0-100

- id: backlight_set
  label: Backlight
  kind: action
  command: "~xx251 n"   # n=0-100; hex range 7E 30 30 32 35 31 20 30 0d .. 7E 30 30 32 35 31 20 31 30 30 0d
  params:
    - name: n
      type: integer
      description: Backlight 0-100

- id: color_temp_cool
  label: Color Temperature Cool
  kind: action
  command: "~xx36 n"   # n=2; hex 7E 30 30 33 36 20 32 0d
  params:
    - name: n
      type: integer
      description: 2 = Cool

- id: color_temp_standard
  label: Color Temperature Standard
  kind: action
  command: "~xx36 n"   # n=1; hex 7E 30 30 33 36 20 31 0d
  params:
    - name: n
      type: integer
      description: 1 = Standard

- id: color_temp_warm
  label: Color Temperature Warm
  kind: action
  command: "~xx36 n"   # n=4; hex 7E 30 30 33 36 20 34 0d
  params:
    - name: n
      type: integer
      description: 4 = Warm

- id: freeze_unfreeze
  label: Freeze Unfreeze
  kind: action
  command: "~xx04 n"   # n=0; hex 7E 30 30 30 34 20 30 0d
  params:
    - name: n
      type: integer
      description: 0 = unfreeze

- id: freeze_freeze
  label: Freeze Freeze
  kind: action
  command: "~xx04 n"   # n=1; hex 7E 30 30 30 34 20 31 0d
  params:
    - name: n
      type: integer
      description: 1 = freeze

- id: pixel_shift_off
  label: Pixel Shift Off
  kind: action
  command: "~xx250 n"   # n=0; hex 7E 30 30 32 35 30 20 30 0d
  params:
    - name: n
      type: integer
      description: 0 = off

- id: pixel_shift_2
  label: Pixel Shift Interval 2 min
  kind: action
  command: "~xx250 n"   # n=2; hex 7E 30 30 32 35 30 20 32 0d
  params:
    - name: n
      type: integer
      description: 2 minute interval

- id: pixel_shift_3
  label: Pixel Shift Interval 3 min
  kind: action
  command: "~xx250 n"   # n=3; hex 7E 30 30 32 35 30 20 33 0d
  params:
    - name: n
      type: integer
      description: 3 minute interval

- id: pixel_shift_5
  label: Pixel Shift Interval 5 min
  kind: action
  command: "~xx250 n"   # n=5; hex 7E 30 30 32 35 30 20 35 0d
  params:
    - name: n
      type: integer
      description: 5 minute interval

- id: pixel_shift_30
  label: Pixel Shift Interval 30 min
  kind: action
  command: "~xx250 n"   # n=30; hex 7E 30 30 32 35 30 20 33 30 0d
  params:
    - name: n
      type: integer
      description: 30 minute interval

- id: pixel_shift_60
  label: Pixel Shift Interval 60 min
  kind: action
  command: "~xx250 n"   # n=60; hex 7E 30 30 32 35 30 20 36 30 0d
  params:
    - name: n
      type: integer
      description: 60 minute interval

- id: remote_vol_up
  label: Remote Control Vol+
  kind: action
  command: "~xx140 n"   # n=17; hex 7E 30 30 31 34 30 20 31 37 0d
  params:
    - name: n
      type: integer
      description: 17 = Vol+

- id: remote_vol_down
  label: Remote Control Vol-
  kind: action
  command: "~xx140 n"   # n=18; hex 7E 30 30 31 34 30 20 31 38 0d
  params:
    - name: n
      type: integer
      description: 18 = Vol-

- id: remote_up
  label: Remote Control Up
  kind: action
  command: "~xx140 n"   # n=10; hex 7E 30 30 31 34 30 20 31 30 0d
  params:
    - name: n
      type: integer
      description: 10 = Up

- id: remote_down
  label: Remote Control Down
  kind: action
  command: "~xx140 n"   # n=14; hex 7E 30 30 31 34 30 20 31 34 0d
  params:
    - name: n
      type: integer
      description: 14 = Down

- id: remote_left
  label: Remote Control Left
  kind: action
  command: "~xx140 n"   # n=11; hex 7E 30 30 31 34 30 20 31 31 0d
  params:
    - name: n
      type: integer
      description: 11 = Left

- id: remote_right
  label: Remote Control Right
  kind: action
  command: "~xx140 n"   # n=13; hex 7E 30 30 31 34 30 20 31 33 0d
  params:
    - name: n
      type: integer
      description: 13 = Right

- id: remote_ok
  label: Remote Control OK
  kind: action
  command: "~xx140 n"   # n=12; hex 7E 30 30 31 34 30 20 31 32 0d
  params:
    - name: n
      type: integer
      description: 12 = OK

- id: remote_menu
  label: Remote Control Menu Key
  kind: action
  command: "~xx140 n"   # n=20; hex 7E 30 30 31 34 30 20 32 30 0d
  params:
    - name: n
      type: integer
      description: 20 = Menu

- id: remote_input
  label: Remote Control Input Source
  kind: action
  command: "~xx140 n"   # n=47; hex 7E 30 30 31 34 30 20 34 37 0d
  params:
    - name: n
      type: integer
      description: 47 = Input source

- id: remote_exit
  label: Remote Control Exit
  kind: action
  command: "~xx140 n"   # n=74; hex 7E 30 30 31 34 30 20 37 34 0d
  params:
    - name: n
      type: integer
      description: 74 = Exit

- id: display_message
  label: Display Message on OSD
  kind: action
  command: "~xx210 nn…..n"   # hex template 7E 30 30 32 31 30 20 nn…n 0D (source uses literal "nn…n od" - copied verbatim)
  params:
    - name: message
      type: string
      description: OSD message text

- id: reset_to_default
  label: Reset To Default
  kind: action
  command: "~xx112 n"   # n=1; hex 7E 30 30 31 31 32 20 31 OD (source uses literal "od" - copied verbatim)
  params:
    - name: n
      type: integer
      description: 1 = reset

- id: osd_lock_on
  label: OSD Lock On with Password
  kind: action
  command: "~xx239 1 ~nnnn"   # hex 7E 30 30 32 33 39 20 31 20 a 0D; password ~0000 (~30 30 30 30) .. ~9999 (~39 39 39 39)
  params:
    - name: password
      type: string
      description: 4-digit password "~0000" to "~9999"

- id: osd_lock_off
  label: OSD Lock Off with Password
  kind: action
  command: "~xx239 2 ~nnnn"   # hex 7E 30 30 32 33 39 20 32 20 a 0D; password ~0000 (~30 30 30 30) .. ~9999 (~39 39 39 39)
  params:
    - name: password
      type: string
      description: 4-digit password "~0000" to "~9999"

# --- GET / QUERY actions ---
- id: get_power
  label: Get Power
  kind: query
  command: "~xx124 n"   # n=1; hex 7E 30 30 31 32 34 20 31 0D; success responses OK0 (off) / OK1 (on)
  params: []

- id: get_contrast
  label: Get Contrast
  kind: query
  command: "~xx126 n"   # n=1; hex 7E 30 30 31 32 36 20 31 0D; success OK0-100
  params: []

- id: get_brightness
  label: Get Brightness
  kind: query
  command: "~xx125 n"   # n=1; hex 7E 30 30 31 32 35 20 31 0D; success OK0-100
  params: []

- id: get_volume
  label: Get Volume
  kind: query
  command: "~xx120 n"   # n=1; hex 7E 30 30 31 32 30 20 31 0D; success OK0-100
  params: []

- id: get_video_mute
  label: Get Video Mute
  kind: query
  command: "~xx363 n"   # n=1; hex 7E 30 30 33 36 33 20 31 0D; OK0=off, OK1=on
  params: []

- id: get_mute
  label: Get Audio Mute
  kind: query
  command: "~xx356 n"   # n=1; hex 7E 30 30 33 35 36 20 31 0D; OK0=off, OK1=on
  params: []

- id: get_sound_mode
  label: Get Sound Mode
  kind: query
  command: "~xx139 n"   # n=1; hex 7E 30 30 31 33 39 20 31 0D; OK1=Standard, OK2=User, OK3=Classroom, OK4=Meeting, OK5=Movie
  params: []

- id: get_input_source
  label: Get Input Source
  kind: query
  command: "~xx121 n"   # n=1; hex 7E 30 30 31 32 31 20 31 0D; OK7=HDMI1, OK8=HDMI2, OK9=HDMI3, OK25=HDMI4, OK23=USB Type-C 1, OK2=VGA, OK20=Android, OK21=Slot in PC, OK26=USB Type-C 2, OK15=DisplayPort
  params: []

- id: get_aspect_ratio
  label: Get Aspect Ratio
  kind: query
  command: "~xx127 n"   # n=1; hex 7E 30 30 31 32 37 20 31 0D; OK1=4:3, OK2=16:9, OK14=PTP
  params: []

- id: get_picture_mode
  label: Get Picture Mode
  kind: query
  command: "~xx123 n"   # n=1; hex 7E 30 30 31 32 33 20 31 0D; OK1=Presentation, OK2=Bright, OK3=Cinema, OK5=User, OK10=DICOM SIM., OK21=HDR
  params: []

- id: get_color_temp
  label: Get Color Temp
  kind: query
  command: "~xx128 n"   # n=1; hex 7E 30 30 31 32 38 20 31 0D; OK1=Cool, OK0=Standard, OK3=Warm
  params: []

- id: get_wlan_status
  label: Get WLAN Status
  kind: query
  command: "~xx451 n"   # n=1; hex 7E 30 30 34 35 31 20 31 0D; OK0=Disconnected, OK1=Connected
  params: []

- id: get_wlan_mac
  label: Get WLAN Mac Address
  kind: query
  command: "~xx555 n"   # n=2; hex 7E 30 30 35 35 35 20 32 0D; response Oknn:nn:nn:nn:nn:nn
  params: []

- id: get_wlan_ip
  label: Get WLAN IP Address
  kind: query
  command: "~xx451 n"   # n=2; hex 7E 30 30 34 35 31 20 32 0D; response Oknnn:nnn:nnn:nnn
  params: []

- id: get_lan_status
  label: Get LAN Status
  kind: query
  command: "~xx87 n"   # n=1; hex 7E 30 30 38 37 20 31 0D; OK0=Disconnected, OK1=Connected
  params: []

- id: get_lan_mac
  label: Get LAN Mac Address
  kind: query
  command: "~xx555 n"   # n=1; hex 7E 30 30 35 35 35 20 31 0D; response Oknn:nn:nn:nn:nn:nn
  params: []

- id: get_lan_ip
  label: Get LAN IP Address
  kind: query
  command: "~xx87 n"   # n=3; hex 7E 30 30 38 37 20 33 0D; response Oknnn:nnn:nnn:nnn
  params: []

- id: get_fw_version
  label: Get Firmware Version
  kind: query
  command: "~xx122 n"   # n=1; hex 7E 30 30 31 32 32 20 31 0D; response Oknnnnnnnnnnnnnn (ex. 20190926164814)
  params: []

- id: get_usage_hours
  label: Get Usage Hours
  kind: query
  command: "~xx108 n"   # n=1; hex 7E 30 30 31 30 38 20 31 0D; response Oknnnnn
  params: []

- id: get_device_type
  label: Get Device Type
  kind: query
  command: "~xx149 n"   # n=1; hex 7E 30 30 31 34 39 20 31 0D; OK2 = Device type = IFP
  params: []

- id: get_information_string
  label: Get Information String (Power/Usage/Input/FW/Display-Mode)
  kind: query
  command: "~xx150 n"   # hex template 7E 30 30 31 35 30 20 nn 0D; n=1..4,16..19; response format OKabbbbbccddddee
  params:
    - name: n
      type: integer
      description: |
        1 = power running time + usage hours + input source + FW + display mode;
        2 = device native resolution (Oknnn);
        3 = input source (ex. OKHDMI1);
        4 = source resolution (ex. OK1920x1080);
        16 = power mode standby (OK0=Eco, OK1=Active);
        17 = DHCP (OK0=Off, OK1=On);
        18 = system temperature (Oknnn, ex. OK48);
        19 = source refresh rate (Oknnn, ex. OK60Hz)

- id: get_regulatory_model
  label: Get Regulatory Model Name
  kind: query
  command: "~xx151 n"   # n=3; hex 7E 30 30 31 35 31 20 33 0D; response Oknnn (ex. SLUGRK) - source notes "will provide when kick off"
  params: []

- id: get_osd_lock
  label: Get OSD Lock
  kind: query
  command: "~xx229 n"   # n=1; hex 7E 30 30 32 32 39 20 31 0D; OK0=Off, OK1=On
  params: []

- id: get_serial_number
  label: Get Serial Number
  kind: query
  command: "~xx353 n"   # n=1; hex 7E 30 30 33 35 33 20 31 0D; response Okaaaaaaaa… (serial number string)
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  description: From ~xx124; OK1=on, OK0=off

- id: contrast_value
  type: integer
  range: [0, 100]
  description: From ~xx126

- id: brightness_value
  type: integer
  range: [0, 100]
  description: From ~xx125

- id: volume_value
  type: integer
  range: [0, 100]
  description: From ~xx120

- id: video_mute_state
  type: enum
  values: [off, on]
  description: From ~xx363; OK0=off, OK1=on

- id: mute_state
  type: enum
  values: [off, on]
  description: From ~xx356; OK0=off, OK1=on

- id: sound_mode
  type: enum
  values: [standard, user, classroom, meeting, movie]
  description: From ~xx139; OK1=Standard, OK2=User, OK3=Classroom, OK4=Meeting, OK5=Movie

- id: input_source
  type: enum
  values: [hdmi1, hdmi2, hdmi3, hdmi4, usb_type_c_1, usb_type_c_2, vga, android, slot_in_pc, displayport]
  description: From ~xx121; OK7=HDMI1, OK8=HDMI2, OK9=HDMI3, OK25=HDMI4, OK23=USB-C1, OK2=VGA, OK20=Android, OK21=Slot in PC, OK26=USB-C2, OK15=DisplayPort

- id: aspect_ratio
  type: enum
  values: ["4:3", "16:9", ptp]
  description: From ~xx127; OK1=4:3, OK2=16:9, OK14=PTP

- id: picture_mode
  type: enum
  values: [presentation, bright, cinema, user, dicom_sim, hdr]
  description: From ~xx123; OK1=Presentation, OK2=Bright, OK3=Cinema, OK5=User, OK10=DICOM SIM., OK21=HDR

- id: color_temp
  type: enum
  values: [cool, standard, warm]
  description: From ~xx128; OK1=Cool, OK0=Standard, OK3=Warm

- id: wlan_status
  type: enum
  values: [disconnected, connected]
  description: From ~xx451 n=1

- id: wlan_mac
  type: string
  description: From ~xx555 n=2; format nn:nn:nn:nn:nn:nn

- id: wlan_ip
  type: string
  description: From ~xx451 n=2; format nnn:nnn:nnn:nnn

- id: lan_status
  type: enum
  values: [disconnected, connected]
  description: From ~xx87 n=1

- id: lan_mac
  type: string
  description: From ~xx555 n=1; format nn:nn:nn:nn:nn:nn

- id: lan_ip
  type: string
  description: From ~xx87 n=3; format nnn:nnn:nnn:nnn

- id: fw_version
  type: string
  description: From ~xx122; example response 20190926164814

- id: usage_hours
  type: integer
  description: From ~xx108; format Oknnnnn

- id: device_type
  type: string
  description: From ~xx149; response "OK2" = IFP

- id: information_string
  type: string
  description: |
    From ~xx150. Composite response "OKabbbbbccddddee":
      a: power running time (0=off, 1=on)
      bbbbb: usage hours
      cc: input source code (per Information-string cc table)
      ddddd: firmware version
      ee: display mode (ee table: 01=Presentation, 02=Bright, 05=User, 21=HDR, 03=Cinema, 10=DICOM SIM.)
    n=2 native resolution (Oknnn)
    n=3 input source (ex. OKHDMI1)
    n=4 source resolution (ex. OK1920x1080)
    n=16 power mode standby (OK0=Eco, OK1=Active)
    n=17 DHCP (OK0=Off, OK1=On)
    n=18 system temperature (Oknnn, ex. OK48)
    n=19 source refresh rate (Oknnn, ex. OK60Hz)

- id: regulatory_model_name
  type: string
  description: From ~xx151 n=3; example SLUGRK. Source notes "will provide when kick off"

- id: osd_lock_state
  type: enum
  values: [off, on]
  description: From ~xx229; OK0=off, OK1=on

- id: serial_number
  type: string
  description: From ~xx353 n=1
```

## Variables
```yaml
# Settable parameters in the SET catalogue are represented as parameterized
# actions (e.g. volume_set, brightness_set). No implicit "variable" registers
# beyond what is documented in the SET/GET catalogue - section intentionally
# kept lean.
```

## Events
```yaml
# Auto-send (INFO) notifications the device pushes without being queried.
# Source lists these under "System Auto send" with response tokens only
# (no inbound SET/GET templates documented).
- id: event_standby_mode
  type: enum
  values: [standby]
  description: "INFO0 - device entered standby"
- id: event_warming_up
  type: enum
  values: [warming]
  description: "INFO1 - device is warming up"
- id: event_cooling_down
  type: enum
  values: [cooling]
  description: "INFO2 - device is cooling down"
- id: event_over_temperature
  type: enum
  values: [over_temperature]
  description: "INFO7 - over-temperature alert"
```

## Macros
```yaml
# UNRESOLVED: source does not define multi-step command sequences the device
# itself executes. Empty by design.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source notes (line 19) that Wake-on-LAN is unavailable while
# Power Mode Standby is set to Active - this is a precondition, not a
# safety interlock per se. No explicit safety warnings or interlocks
# documented in the source.
```

## Notes
Source PDF bundle refines two separate documents. The format of every command is `~XX YY n` (lead-code 7E 0D, two-byte device ID `XX`, two-byte command ID `YY`, ASCII space, variable ASCII payload, CR). Hex templates in the source are written in 7-bit ASCII format (e.g. `7E 30 30 30 30 20 30 0d` is the literal ASCII byte stream `~0000 0\r`) — they are ASCII framed, not binary. Operators decoding wire bytes should treat the hex column as ASCII-encoded payload.

The lead-code narrative on lines 52–53 indicates `(space + variable + CR)` framing; the actual ASCII delimiter is `0x20` (space) and line terminator `0x0D` (CR). Spec preserves the source's literal hex notation, including minor inconsistencies:

- `input_usb_c2` source shows hex `7E 30 30 31 32 20 32 37 0d` (duplicate of USB-C1's hex, but parameter `n=30` and label name "USB Type C2"). Copied verbatim; presumed source typo.
- `input_hdmi4` source uses terminator `1d` instead of `0d`. Copied verbatim; presumed typo.
- `picture_mode_dicom_sim` source uses ASCII byte `0x21` instead of `0x20` as separator. Copied verbatim; presumed typo.
- `display_message` template shows literal "nn…n od" (lowercase o instead of zero). Copied verbatim.
- `reset_to_default` template shows literal "1 od". Copied verbatim.
- `balance_set` source range cell shows `50-50` (likely intended as `-50 .. +50`).

Port number: the introductory note (line 23) says "RJ45 (port 23)" but the protocol framing table (line 47) explicitly states `Port 4023`. Used 4023 — the table value outranks the prose note. LAN transport framed on TCP/4023.

LAN vs RS-232 framing: source explicitly supports both transports with identical protocol (same ASCII framing). Spec lists both as supported protocols.

Power Mode Standby precondition: Active mode required for OMS / LAN remote power-on; Wake-on-LAN is greyed-out in Active mode. Documented as a precondition on the power_mode_active and get_wlan_* actions via notes where relevant.

Regulatory model name response (line 206): source flags "will provide when kick off" — value is placeholder pending firmware.

Source URLs referenced by US KB: `support.optomausa.com/hc/en-us/search?query=5863Rk`, `support.optomausa.com/hc/en-us/search?query=5863RK+RS232`, `files.remotecentral.com/library/22-1/optoma/index.html`. No PDF cable of the original RS232 manual was located; this spec refines a Markdown excerpt derived from the same content already in `docs/pdfs/optoma_5863rk_serial.refined.md`.

<!-- UNRESOLVED: firmware compatibility range not stated in source -->
<!-- UNRESOLVED: Voltage/current/power specifications not stated in source -->
<!-- UNRESOLVED: Fault behaviour and error-recovery procedures not stated in source -->

## Provenance

```yaml
source_domains:
  - region-resource.optoma.com
  - optomausa.com
  - optomaeurope.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/0f4c1011-de9c-4953-b8ad-8620be92eac4.pdf
  - https://www.optomausa.com/product/5863rk
  - https://www.optomaeurope.com/ContentStorage/Documents/955b7f8f-f533-43a5-b6ae-483e6833feaf.pdf
retrieved_at: 2026-07-14T18:13:42.174Z
last_checked_at: 2026-07-22T00:28:11.897Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:28:11.897Z
matched_actions: 109
action_count: 109
confidence: medium
summary: "All 109 spec actions (SET and GET) map literally to source ~xxNN opcode/hex rows with matching parameter values; transport fields match the RS232/LAN tables. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility range not stated in source"
- "source does not define multi-step command sequences the device"
- "source notes (line 19) that Wake-on-LAN is unavailable while"
- "Voltage/current/power specifications not stated in source"
- "Fault behaviour and error-recovery procedures not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
