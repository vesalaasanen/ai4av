---
spec_id: admin/rotel-rsp-1582
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RSP-1582 Control Spec"
manufacturer: Rotel
model_family: RSP-1582
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RSP-1582
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RSP1582%20Protocol_0.pdf"
retrieved_at: 2026-09-26T14:23:14.694Z
last_checked_at: 2026-09-26T14:23:14.694Z
generated_at: 2026-09-26T14:23:14.694Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "authentication, complete firmware compatibility range, error responses and quantitative timing limits are not stated."
  - "Unit Response is listed as n/a; no response payload documented."
  - "this row gives a behavior description, not response bytes."
  - "absolute range is not documented.\""
  - "no additional settable variables beyond the action parameters are documented."
  - "the source does not distinguish unsolicited events from command responses."
  - "no multi-command macros or sequences are documented."
  - "the source documents no confirmation or interlock procedures."
  - "the source does not give a complete byte-counted message example or grammar, so a universal framing parser cannot be specified from this document."
  - "these vendor response oddities have not been checked against hardware."
  - "volume-up/down step size and which intermediate absolute volume values are accepted are not stated."
  - "authentication, error messages, timeout/retry handling, full byte-count framing, and firmware compatibility outside explicitly documented branches require further source evidence."
verification:
  verdict: verified
  checked_at: 2026-09-26T14:23:14.694Z
  matched_actions: 72
  action_count: 72
  confidence: medium
  summary: "All 72 RSP-1582 commands, firmware-specific domains, responses and transport match; source contradictions and framing gaps remain explicit. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Rotel RSP-1582 Control Spec

## Summary

ASCII RS232 and TCP/IP control for the Rotel RSP-1582, from the manufacturer's Controller Command List version 1.40, dated March 6, 2017. Includes all documented controls and feedback requests, with separate volume formats for HDMI 1.4 / software V2.xx and HDMI 2.0a / software V5.xx.

<!-- UNRESOLVED: authentication, complete firmware compatibility range, error responses and quantitative timing limits are not stated. -->

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
  port: 9596
auth:
  type: UNRESOLVED  # source does not establish authentication requirements
encoding: ASCII
command_terminator: "!"
# Commands contain no spaces and must not be followed by CR or LF.
# Response framing also supports byte-counted variable-length text; see Notes.
```

## Traits
```yaml
- powerable  # inferred from the documented power commands
- routable   # inferred from the documented input selection commands
- queryable  # inferred from the documented status query commands
```

## Actions
```yaml
- id: power_on
  label: "Power On"
  kind: action
  command: "power_on!"
  params: []
  response: "power=on!"
- id: power_off
  label: "Power Off"
  kind: action
  command: "power_off!"
  params: []
  response: "power=standby!"
- id: power_toggle
  label: "Power Toggle"
  kind: action
  command: "power_toggle!"
  params: []
  response: "power=on/standby!"
- id: volume_up
  label: "Volume Up"
  kind: action
  command: "volume_up!"
  params: []
  response: "volume=-##.#db!/volume=##!"
- id: volume_down
  label: "Volume Down"
  kind: action
  command: "volume_down!"
  params: []
  response: "volume=-##.#db!/volume=##!"
- id: set_volume_db
  label: "Set Volume to level n; n = 90.0 (min) – 00.0 (max); Applies to SW V2.xx units only."
  kind: action
  command: "volume_-{magnitude_db}db!"
  source_command: "volume_-nn.ndb!"
  firmware: "SW V2.xx only"
  params:
    - name: magnitude_db
      type: string
      description: "Replace nn.n with the positive magnitude, formatted as two decimal digits, a decimal point and one decimal digit: 00.0 to 90.0. The command supplies the minus sign. 90.0 is minimum volume; 00.0 is maximum. SW V2.xx only."
  response: "volume=-##.#db!"
- id: set_volume_flat
  label: "Set Volume to level n; n = 00 (min) – 96 (max); Applies to SW 5.xx units only."
  kind: action
  command: "volume_{level}!"
  source_command: "volume_nn!"
  firmware: "SW V5.xx only"
  params:
    - name: level
      type: string
      description: "Replace nn with two decimal digits: 00 (minimum) through 96 (maximum). SW V5.xx / HDMI 2.0a only."
  response: "volume=##!"
- id: mute_toggle
  label: "Mute Toggle"
  kind: action
  command: "mute!"
  params: []
  response: "mute=on/off!"
- id: mute_on
  label: "Mute On"
  kind: action
  command: "mute_on!"
  params: []
  response: "mute=on!"
- id: mute_off
  label: "Mute Off"
  kind: action
  command: "mute_off!"
  params: []
  response: "mute=off!"
- id: source_cd
  label: "Source CD"
  kind: action
  command: "cd!"
  params: []
  response: "source=cd!"
- id: source_video1
  label: "Source Video 1"
  kind: action
  command: "video1!"
  params: []
  response: "source=video1!"
- id: source_video2
  label: "Source Video 2"
  kind: action
  command: "video2!"
  params: []
  response: "source=video2!"
- id: source_video3
  label: "Source Video 3"
  kind: action
  command: "video3!"
  params: []
  response: "source=video3!"
- id: source_video4
  label: "Source Video 4"
  kind: action
  command: "video4!"
  params: []
  response: "source=video4!"
- id: source_video5
  label: "Source Video 5"
  kind: action
  command: "video5!"
  params: []
  response: "source=video5!"
- id: source_video6
  label: "Source Video 6"
  kind: action
  command: "video6!"
  params: []
  response: "source=video6!"
- id: source_video7
  label: "Source Video 7"
  kind: action
  command: "video7!"
  params: []
  response: "source=video7!"
- id: source_video8
  label: "Source Video 8"
  kind: action
  command: "video8!"
  params: []
  response: "source=video8!"
- id: source_tuner
  label: "Source Tuner"
  kind: action
  command: "tuner!"
  params: []
  response: "source=tuner!"
- id: source_phono
  label: "Source Phono"
  kind: action
  command: "phono!"
  params: []
  response: "source=phono!"
- id: source_usb
  label: "Source Front USB"
  kind: action
  command: "usb!"
  params: []
  response: "source=usb!"
- id: source_pc_usb
  label: "Source PC-USB"
  kind: action
  command: "pc_usb!"
  params: []
  response: "source=pc_usb!"
- id: source_bal_xlr
  label: "Source XLR"
  kind: action
  command: "bal_xlr!"
  params: []
  response: "source=bal_xlr!"
- id: source_bluetooth
  label: "Source Bluetooth"
  kind: action
  command: "bluetooth!"
  params: []
  response: "source=bluetooth!"
- id: source_multi_input
  label: "Source Multi Input"
  kind: action
  command: "multi_input!"
  params: []
  response: "source=multi_input!"
- id: play
  label: "PlaySource"
  kind: action
  command: "play!"
  params: []
  # UNRESOLVED: Unit Response is listed as n/a; no response payload documented.
- id: stop
  label: "StopSource"
  kind: action
  command: "stop!"
  params: []
  # UNRESOLVED: Unit Response is listed as n/a; no response payload documented.
- id: pause
  label: "Pause Source"
  kind: action
  command: "pause!"
  params: []
  # UNRESOLVED: Unit Response is listed as n/a; no response payload documented.
- id: track_fwd
  label: "Track Forward/Tune Up"
  kind: action
  command: "track_fwd!"
  params: []
  # UNRESOLVED: Unit Response is listed as n/a; no response payload documented.
- id: track_back
  label: "Track Backward/Tune Down"
  kind: action
  command: "track_back!"
  params: []
  # UNRESOLVED: Unit Response is listed as n/a; no response payload documented.
- id: menu
  label: "Displaythe Menu"
  kind: action
  command: "menu!"
  params: []
  # UNRESOLVED: Unit Response is listed as n/a; no response payload documented.
- id: exit
  label: "Exit Key"
  kind: action
  command: "exit!"
  params: []
  # UNRESOLVED: Unit Response is listed as n/a; no response payload documented.
- id: cursor_up
  label: "Cursor Up"
  kind: action
  command: "up!"
  params: []
  # UNRESOLVED: Unit Response is listed as n/a; no response payload documented.
- id: cursor_down
  label: "Cursor Down"
  kind: action
  command: "down!"
  params: []
  # UNRESOLVED: Unit Response is listed as n/a; no response payload documented.
- id: cursor_left
  label: "Cursor Left"
  kind: action
  command: "left!"
  params: []
  # UNRESOLVED: Unit Response is listed as n/a; no response payload documented.
- id: cursor_right
  label: "Cursor Right"
  kind: action
  command: "right!"
  params: []
  # UNRESOLVED: Unit Response is listed as n/a; no response payload documented.
- id: enter
  label: "Enter Key"
  kind: action
  command: "enter!"
  params: []
  # UNRESOLVED: Unit Response is listed as n/a; no response payload documented.
- id: dsp_2channel
  label: "Select 2 channel mode"
  kind: action
  command: "2channel!"
  params: []
  response: "dsp_mode=stereo!"
- id: dsp_3channel
  label: "Select 3 channel stereo mode"
  kind: action
  command: "3channel!"
  params: []
  response: "dsp_mode=dolby_3_stereo!"
- id: dsp_5channel
  label: "Select 5 channel stereo mode"
  kind: action
  command: "5channel!"
  params: []
  response: "dsp_mode=5_channel_stereo!"
- id: dsp_7channel
  label: "Select 7 channel stereo mode"
  kind: action
  command: "7channel!"
  params: []
  response: "dsp_mode=7_channel_stereo!"
- id: dsp_prologic_music
  label: "Select Pro Logic II Music mode"
  kind: action
  command: "prologic_music!"
  params: []
  response: "dsp_mode=dolby_pliix_music!"
- id: dsp_prologic_movie
  label: "Select Pro Logic II Movie mode"
  kind: action
  command: "prologic_movie!"
  params: []
  response: "dsp_mode=dolby_pliix_movie!"
- id: dsp_prologic_game
  label: "Select Pro Logic II Game mode"
  kind: action
  command: "prologic_game!"
  params: []
  response: "dsp_mode=dolby_pliix_game!"
- id: dsp_prologic_iiz
  label: "Select Pro Logic IIz mode"
  kind: action
  command: "prologic_iiz!"
  params: []
  response: "dsp_mode=dolby_pliiz!"
- id: dsp_neo6_music
  label: "Select dts Neo:6 Music mode"
  kind: action
  command: "neo6_music!"
  params: []
  response: "dsp_mode=dts_neo:6_music!"
- id: dsp_neo6_cinema
  label: "Select dts Neo:6 Cinema mode"
  kind: action
  command: "neo6_cinema!"
  params: []
  response: "dsp_mode=dts_neo:6_cinema!"
- id: dsp_bypass
  label: "Select AnalogBypass mode"
  kind: action
  command: "bypass!"
  params: []
  response: "dsp_mode=analog_bypass!"
- id: dsp_surround_next
  label: "Select the next DSP mode"
  kind: action
  command: "surround_next!"
  params: []
  response_description: "cycles through all dspmodes"
  # UNRESOLVED: this row gives a behavior description, not response bytes.
- id: subwoofer_up
  label: "Temp. increase Sub level +0.5dB"
  kind: action
  command: "subwoofer_up!"
  params: []
  response: "subwoofer_level=+/-##.#db!"
- id: subwoofer_down
  label: "Temp. decrease Sub level -0.5dB"
  kind: action
  command: "subwoofer_down!"
  params: []
  response: "subwoofer_level=+/-##.#db!"
- id: center_up
  label: "Temp. increase Ctr level +0.5dB"
  kind: action
  command: "center_up!"
  params: []
  response: "center_level=+/-##.#db!"
- id: center_down
  label: "Temp. decrease Ctr level -0.5dB"
  kind: action
  command: "center_down!"
  params: []
  response: "center_level=+/-##.#db!"
- id: surround_right_up
  label: "Temp. increase RS level +0.5dB"
  kind: action
  command: "surround_right_up!"
  params: []
  response: "surround_right =+/-##.#db!"
- id: surround_right_down
  label: "Temp. decrease RS level -0.5dB"
  kind: action
  command: "surround_right_down!"
  params: []
  response: "surround_right =+/-##.#db!"
- id: surround_left_up
  label: "Temp. increase LS level +0.5dB"
  kind: action
  command: "surround_left_up!"
  params: []
  response: "surround_left=+/-##.#db!"
- id: surround_left_down
  label: "Temp. decrease LS level -0.5dB"
  kind: action
  command: "surround_left_down!"
  params: []
  response: "surround_left=+/-##.#db!"
- id: center_back_right_up
  label: "Temp. increase RB level +0.5dB"
  kind: action
  command: "center_back_right_up!"
  params: []
  response: "center_back_right=+/-##.#db!"
- id: center_back_right_down
  label: "Temp. decrease RB level -0.5dB"
  kind: action
  command: "center_back_right_down!"
  params: []
  response: "center_back_right=+/-##.#db!"
- id: center_back_left_up
  label: "Temp. increase LB level +0.5dB"
  kind: action
  command: "center_back_left_up!"
  params: []
  response: "center_back_left=+/-##.#db!"
- id: center_back_left_down
  label: "Temp. decrease LB level -0.5dB"
  kind: action
  command: "center_back_left_down!"
  params: []
  response: "center_back_left=+/-##.#db!"
- id: dimmer_toggle
  label: "Toggle displaydimmer(+/-10)"
  kind: action
  command: "dimmer!"
  params: []
  response: "dimmer=+/-##!"
- id: dimmer_0
  label: "Set displayto neutral level(0)"
  kind: action
  command: "dimmer_0!"
  params: []
  response: "dimmer=0!"
- id: dimmer_minus
  label: "Set display to dimmer level -n; (n = 1-10)"
  kind: action
  command: "dimmer_-{level}!"
  source_command: "dimmer_-n!"
  params:
    - name: level
      type: integer
      description: "Magnitude n from 1 through 10; command supplies the minus sign."
      min: 1
      max: 10
  response: "dimmer_-#!"
- id: dimmer_plus
  label: "Set display to dimmer level +n; (n = 1-10)"
  kind: action
  command: "dimmer_+{level}!"
  source_command: "dimmer_+n!"
  params:
    - name: level
      type: integer
      description: "Magnitude n from 1 through 10; command supplies the plus sign."
      min: 1
      max: 10
  response: "dimmer=+#!"
- id: factory_default_on
  label: "Reset unit to factorydefaults"
  kind: action
  command: "factory_default_on!"
  params: []
  # UNRESOLVED: Unit Response is listed as n/a; no response payload documented.
- id: get_current_power
  label: "Request currentpower status"
  kind: query
  command: "get_current_power!"
  params: []
  response: "power=on!/ power=standby!"
  response_example: "power=on!"
- id: get_current_source
  label: "Request current source"
  kind: query
  command: "get_current_source!"
  params: []
  response: "source=cd! / source=coax1! / source=coax1! / source=coax2! /<br>source=coax3! / source=opt1! / source=opt2! / source=opt3! /<br>source=tuner! / source=phono! / source=usb! / source=pc_usb! /<br>source=video1! / source=video2! / source=video3! / source=video4! /<br>source=video5! / source=video6! / source=video7! / source=video8! /<br>source=bluetooth!/source=bal_xlr!/source=multi_input!"
  response_example: "source=pc_usb!"
- id: get_volume
  label: "Request current volume value"
  kind: query
  command: "get_volume!"
  params: []
  response: "volume=-##.#db!(V2.xx) /volume=##!(V5.xx)"
  response_example: "volume=-40.5db!/volume=26!"
- id: get_mute_status
  label: "Request current mute status."
  kind: query
  command: "get_mute_status!"
  params: []
  response: "mute=off!/mute=on!"
  response_example: "mute=on!"
- id: get_dsp_mode
  label: "Request current DSP mode. Note for Dolby Pro Logic II modes, will return either dolby_plii_music or dolby_pliix_music depending on if system is configured for 5.1 or 7.1 operation."
  kind: query
  command: "get_dsp_mode!"
  params: []
  response: "dsp_mode=stereo! / dsp_mode=dolby_3_stereo! /<br>dsp_mode=5_channel_stereo! / dsp_mode=7_channel_stereo! /<br>dsp_mode=dolby_plii_music! / dsp_mode=dolby_pliix_music! /<br>dsp_mode=dolby_plii_movie! / dsp_mode=dolby_pliix_movie! /<br>dsp_mode=dolby_plii_game! / dsp_mode=dolby_pliix_game! /<br>dsp_mode=dolby_pliiz! / dsp_mode=dts_neo:6_music! /<br>dsp_mode=dts_neo:6_cinema! / dsp_mode=analog_bypass! /<br>dsp_mode=source_dependent!"
  response_example: "dsp_mode=dolby_pliix_music!"
```

## Feedbacks
```yaml
- id: "volume_level"
  label: "Volume Level"
  type: "string"
  responses: ["volume=-##.#db!", "volume=##!"]
  notes: "Preserved common feedback ID. Interpret dB text for V2.xx and two-digit numeric text for V5.xx; firmware-specific domains are documented below."
- id: "power_state"
  type: "enum"
  values: ["on", "standby"]
  response: "power=on!/ power=standby!"
- id: "current_source"
  type: "enum"
  values: ["cd", "coax1", "coax2", "coax3", "opt1", "opt2", "opt3", "tuner", "phono", "usb", "pc_usb", "video1", "video2", "video3", "video4", "video5", "video6", "video7", "video8", "bluetooth", "bal_xlr", "multi_input"]
  response: "source={source}!"
  notes: "Query return strings include coax1/coax2/coax3 and opt1/opt2/opt3; no corresponding source-selection command rows are documented. The source repeats coax1 in its query response list."
- id: "volume_db"
  type: "number"
  response: "volume=-##.#db!"
  firmware: "SW V2.xx / HDMI 1.4"
  min: -90.0
  max: 0.0
  unit: "dB"
  example: "volume=-74.5db!"
- id: "volume_numeric"
  type: "number"
  response: "volume=##!"
  firmware: "SW V5.xx / HDMI 2.0a"
  min: 0
  max: 96
  example: "volume=25!"
- id: "mute_status"
  type: "enum"
  values: ["on", "off"]
  response: "mute=off!/mute=on!"
- id: "dsp_mode"
  type: "enum"
  values: ["stereo", "dolby_3_stereo", "5_channel_stereo", "7_channel_stereo", "dolby_plii_music", "dolby_pliix_music", "dolby_plii_movie", "dolby_pliix_movie", "dolby_plii_game", "dolby_pliix_game", "dolby_pliiz", "dts_neo:6_music", "dts_neo:6_cinema", "analog_bypass", "source_dependent"]
  response: "dsp_mode={mode}!"
  notes: "For Dolby Pro Logic II the query can return plii or pliix variants depending on 5.1 or 7.1 configuration; preserve the query inventory even though the setter table shows pliix responses."
- id: "subwoofer_level"
  type: "number"
  response: "subwoofer_level=+/-##.#db!"
  unit: "dB"
  notes: "Temporary level trim; each documented up/down command changes the level by 0.5 dB. UNRESOLVED: absolute range is not documented."
- id: "center_level"
  type: "number"
  response: "center_level=+/-##.#db!"
  unit: "dB"
  notes: "Temporary level trim; each documented up/down command changes the level by 0.5 dB. UNRESOLVED: absolute range is not documented."
- id: "surround_right_level"
  type: "number"
  response: "surround_right =+/-##.#db!"
  unit: "dB"
  notes: "Temporary level trim; each documented up/down command changes the level by 0.5 dB. UNRESOLVED: absolute range is not documented."
- id: "surround_left_level"
  type: "number"
  response: "surround_left=+/-##.#db!"
  unit: "dB"
  notes: "Temporary level trim; each documented up/down command changes the level by 0.5 dB. UNRESOLVED: absolute range is not documented."
- id: "center_back_right_level"
  type: "number"
  response: "center_back_right=+/-##.#db!"
  unit: "dB"
  notes: "Temporary level trim; each documented up/down command changes the level by 0.5 dB. UNRESOLVED: absolute range is not documented."
- id: "center_back_left_level"
  type: "number"
  response: "center_back_left=+/-##.#db!"
  unit: "dB"
  notes: "Temporary level trim; each documented up/down command changes the level by 0.5 dB. UNRESOLVED: absolute range is not documented."
- id: "dimmer_level"
  type: "number"
  responses: ["dimmer=+/-##!", "dimmer=0!", "dimmer_-#!", "dimmer=+#!"]
  notes: "Negative-setting response is copied literally as dimmer_-#!; the source does not use equals in that row. Do not silently normalize it."
```

## Variables
```yaml
# UNRESOLVED: no additional settable variables beyond the action parameters are documented.
```

## Events
```yaml
# UNRESOLVED: the source does not distinguish unsolicited events from command responses.
```

## Macros
```yaml
# UNRESOLVED: no multi-command macros or sequences are documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: the source documents no confirmation or interlock procedures.
# factory_default_on! is explicitly described as resetting the unit to factory defaults.
```

## Notes

Source: `docs/pdfs/rotel_rsp_1_series.md`, refined verbatim at `docs/pdfs/rotel_rsp_1_series.refined.md`. The source explicitly names RSP-1582; this spec makes no family-wide compatibility claim.

Every command ends in `!`. Do not include spaces, carriage return or line feed in the transmitted command. TCP commands and responses use port 9596; the product must have a valid IP address on a local network. The source states that RS232 hardware has no flow control and warns to take care sending and receiving to avoid packet loss. No numeric pacing or retry interval is documented.

Response framing is not universally delimiter-only. The source says status information has either a terminating `!` or a byte count for variable-length text that may itself contain `!`. That count includes text data only, excluding the length and comma character. <!-- UNRESOLVED: the source does not give a complete byte-counted message example or grammar, so a universal framing parser cannot be specified from this document. -->

The source's response strings use `#` as digit placeholders and `/` or `+/-` to show alternatives or signs. Action `response` values preserve that notation, including HTML line breaks copied from the source tables; they are documentation patterns, not strings to transmit. `source_command` records the original vendor template for the four parameterized setters. Substitute the documented parameter text into braces in `command`; do not transmit the braces. The space in `surround_right =+/-##.#db!` and the unusual negative-dimmer response `dimmer_-#!` are preserved as documented. <!-- UNRESOLVED: these vendor response oddities have not been checked against hardware. -->

HDMI 1.4 / software V2.xx uses -90.0 dB minimum through 00.0 maximum; the source examples are `volume=-74.5db!` and `volume_-84.0db!`. HDMI 2.0a / software V5.xx uses the numeric range 00 minimum through 96 maximum; examples are `volume=25!` and `volume_12!`. Select the volume setter and feedback interpretation for the actual unit's software/HDMI branch. The source supplies no firmware discovery command. <!-- UNRESOLVED: volume-up/down step size and which intermediate absolute volume values are accepted are not stated. -->

Front USB input selection noticeably slows IP responses. The source recommends RS232 instead of IP when Front USB is used. The source gives no numeric timeout adjustment.

Protocol history retained from the manual: version 1.00 (October 23, 2015) is the original specification; 1.10 (July 12, 2016) reflects RS232 feedback and command changes in main software V2.59/2.60; 1.20 (January 9, 2017) reflects stereo DSP feedback changed with V2.81; 1.30 (January 16, 2017) adds the HDMI 2.0a volume-change note; 1.40 (March 6, 2017) adds missing Surround/Center Back trim commands. This history does not establish a complete per-command minimum firmware matrix.

<!-- UNRESOLVED: authentication, error messages, timeout/retry handling, full byte-count framing, and firmware compatibility outside explicitly documented branches require further source evidence. -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RSP1582%20Protocol_0.pdf"
retrieved_at: 2026-09-26T14:23:14.694Z
last_checked_at: 2026-09-26T14:23:14.694Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-26T14:23:14.694Z
matched_actions: 72
action_count: 72
confidence: medium
summary: "All 72 RSP-1582 commands, firmware-specific domains, responses and transport match; source contradictions and framing gaps remain explicit. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "authentication, complete firmware compatibility range, error responses and quantitative timing limits are not stated."
- "Unit Response is listed as n/a; no response payload documented."
- "this row gives a behavior description, not response bytes."
- "absolute range is not documented.\""
- "no additional settable variables beyond the action parameters are documented."
- "the source does not distinguish unsolicited events from command responses."
- "no multi-command macros or sequences are documented."
- "the source documents no confirmation or interlock procedures."
- "the source does not give a complete byte-counted message example or grammar, so a universal framing parser cannot be specified from this document."
- "these vendor response oddities have not been checked against hardware."
- "volume-up/down step size and which intermediate absolute volume values are accepted are not stated."
- "authentication, error messages, timeout/retry handling, full byte-count framing, and firmware compatibility outside explicitly documented branches require further source evidence."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
