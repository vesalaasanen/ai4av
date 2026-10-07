---
spec_id: admin/roland-xs-62s
schema_version: ai4av-public-spec-v1
revision: 1
title: "Roland XS-62S Control Spec"
manufacturer: Roland
model_family: XS-62S
aliases: []
compatible_with:
  manufacturers:
    - Roland
  models:
    - XS-62S
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - static.roland.com
source_urls:
  - https://static.roland.com/assets/media/pdf/XS-62S_reference_v31_eng02_W.pdf
retrieved_at: 2026-06-12T01:15:21.296Z
last_checked_at: 2026-10-07T10:50:11.326Z
generated_at: 2026-10-07T10:50:11.326Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "tally/GPIO pin-by-pin command mapping beyond GPO and GPI assignment; VISCA-over-IP and RS-422 camera control protocol details"
  - "source describes no explicit safety warnings or interlock procedures"
  - "TALLY output PGM/PST states are triggered by panel crosspoint selection, not by an explicit command — only GPO 1-4 are addressable via GPO command; firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T10:50:11.326Z
  matched_actions: 52
  action_count: 52
  confidence: medium
  summary: "All 52 spec actions map one-to-one to the source command tables, transport values match, and the spontaneous ERR/XON/XOFF messages are modelled as Events. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Roland XS-62S Control Spec

## Summary
The Roland XS-62S is a 6-channel video switcher with audio mixing, supporting remote control over TCP (Telnet, port 8023) and RS-232 (DB-9 male, 9600/38400 bps, 8N1, XON/XOFF). The protocol is ASCII framed by STX (0x02), a 3-letter command code, optional parameters separated by `:` and `,`, and terminated by `;`. The device replies with `ACK` (0x06) and emits unsolicited `XON`/`XOFF`/`ERR` notifications.

<!-- UNRESOLVED: tally/GPIO pin-by-pin command mapping beyond GPO and GPI assignment; VISCA-over-IP and RS-422 camera control protocol details -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 8023
serial:
  baud_rate: [9600, 38400]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: xon_xoff
auth:
  type: UNRESOLVED
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
# Video-related operations
- id: select_pgm_channel
  label: Select channel for PGM/1
  kind: action
  command: "PGM{a}"
  params:
    - name: a
      type: integer
      description: "0=SDI IN 1, 1=SDI IN 2, 2=SDI IN 3, 3=SDI IN 4, 4=HDMI IN 5, 5=HDMI/ANLG IN 6, 6=STL/BKG IN 7, 7=STL/BKG IN 8"

- id: select_pvw_channel
  label: Select channel for PVW/2
  kind: action
  command: "PST{a}"
  params:
    - name: a
      type: integer
      description: "0=SDI IN 1, 1=SDI IN 2, 2=SDI IN 3, 3=SDI IN 4, 4=HDMI IN 5, 5=HDMI/ANLG IN 6, 6=STILL/BKG IN 7, 7=STILL/BKG IN 8"

- id: select_aux_channel
  label: Select channel for AUX/3
  kind: action
  command: "AUX{a}"
  params:
    - name: a
      type: integer
      description: "0=SDI IN 1, 1=SDI IN 2, 2=SDI IN 3, 3=SDI IN 4, 4=HDMI IN 5, 5=HDMI/ANLG IN 6, 6=STILL/BKG IN 7, 7=STILL/BKG IN 8"

- id: select_transition_effect
  label: Select transition effect
  kind: action
  command: "TRS{a}"
  params:
    - name: a
      type: integer
      description: "0=MIX, 1=MIX, 2=WIPE"

- id: set_transition_time
  label: Set video transition time
  kind: action
  command: "TIM{a}"
  params:
    - name: a
      type: integer
      description: "0 (0.0 sec) to 40 (4.0 sec)"

- id: cut_transition
  label: Use a cut to transition video
  kind: action
  command: "CUT"
  params: []

- id: take_button
  label: Press the [TAKE] button
  kind: action
  command: "TAK"
  params: []

- id: set_pinp
  label: Set the [PinP] button on/off
  kind: action
  command: "PPS{a}"
  params:
    - name: a
      type: integer
      description: "0=OFF, 1=PVW ON, 2=PGM ON"

- id: set_split
  label: Set SPLIT on/off
  kind: action
  command: "SPS{a}"
  params:
    - name: a
      type: integer
      description: "0=OFF, 1=PVW ON, 2=PGM ON"

- id: set_dsk
  label: Set DSK on/off
  kind: action
  command: "DSK{a}"
  params:
    - name: a
      type: integer
      description: "0=OFF, 1=ON"

- id: dsk_preview
  label: Preview the DSK composited result in the multi-view monitor
  kind: action
  command: "DVW{a}"
  params:
    - name: a
      type: integer
      description: "0=OFF, 1=ON"

- id: set_auto_mixing
  label: Set the [AUTO MIXING] button on/off
  kind: action
  command: "ATM{a}"
  params:
    - name: a
      type: integer
      description: "0=OFF, 1=ON"

- id: set_freeze
  label: Set the [FREEZE] button on/off
  kind: action
  command: "FRZ{a}"
  params:
    - name: a
      type: integer
      description: "0=OFF, 1=ON"

- id: query_video_output
  label: Verify the state of a video output channel
  kind: query
  command: "QVC{a}"  # source also shows "QVC{a,b}" variant for batch query
  params:
    - name: a
      type: integer
      description: "0=PGM/1, 1=PVW/2, 2=AUX/3; returns b 0-7"

- id: set_edid
  label: Set the EDID
  kind: action
  command: "EDD{a},{b}"
  params:
    - name: a
      type: integer
      description: "0=HDMI IN 5, 1=HDMI IN 6, 2=RGB IN 6"
    - name: b
      type: integer
      description: "0=INTERNAL, 1=SVGA, 2=XGA, 3=WXGA, 4=FWXGA, 5=SXGA, 6=SXGA+, 7=UXGA, 8=WUXGA, 9=720p, 10=1080i, 11=1080p (when a=2 only 0-8 valid)"

- id: set_input_scaling
  label: Input scaling type setting
  kind: action
  command: "VIA{a},{b}"
  params:
    - name: a
      type: integer
      description: "0=HDMI IN 5, 1=HDMI IN 6, 2=RGB IN 6"
    - name: b
      type: integer
      description: "0=FULL, 1=LETTERBOX, 2=CROP, 3=DOT BY DOT, 4=MANUAL"

- id: set_scaler_resolution
  label: Resolution setting for scaler out
  kind: action
  command: "VOR{a}"
  params:
    - name: a
      type: integer
      description: "0=480p/576p, 1=720p, 2=1080p, 3=SVGA, 4=XGA, 5=WXGA, 6=SXGA, 7=FWXGA, 8=SXGA+, 9=UXGA, 10=WUXGA"

- id: query_scaler_resolution
  label: Verify the state of the scaler out resolution
  kind: query
  command: "QVR"
  params: []

- id: set_scaler_scaling
  label: Scaling type of scaler out setting
  kind: action
  command: "VOA{a}"
  params:
    - name: a
      type: integer
      description: "0=FULL, 1=LETTERBOX, 2=CROP, 3=DOT BY DOT, 4=MANUAL"

- id: set_hdmi_color_space
  label: Select the color space for the HDMI output
  kind: action
  command: "VOC{a},{b}"
  params:
    - name: a
      type: integer
      description: "0=HDMI OUT 1, 1=HDMI OUT 2, 2=HDMI OUT 3"
    - name: b
      type: integer
      description: "0=YCC, 1=RGB(0-255), 2=RGB(16-235)"

- id: set_hdmi_signal_type
  label: Set the signal type for the HDMI output
  kind: action
  command: "VOD{a},{b}"
  params:
    - name: a
      type: integer
      description: "0=HDMI OUT 1, 1=HDMI OUT 2, 2=HDMI OUT 3"
    - name: b
      type: integer
      description: "0=DVI-D, 1=HDMI"

- id: set_pinp_position
  label: When using PinP compositing, adjust the display position of the video
  kind: action
  command: "PIP{a},{b}"
  params:
    - name: a
      type: integer
      description: "-250 to 250 (horizontal position of inset screen)"
    - name: b
      type: integer
      description: "-250 to 250 (vertical position of inset screen)"

- id: set_split_position
  label: When using SPLIT compositing, adjust the display position of the video
  kind: action
  command: "SPT{a},{b}"
  params:
    - name: a
      type: integer
      description: "-250 to 250 (V-CENTER horizontal, or H-CENTER vertical)"
    - name: b
      type: integer
      description: "-250 to 250 (companion axis)"

- id: set_dsk_source
  label: During DSK composition, set the channel of the overlaid logo or image
  kind: action
  command: "DSS{a}"
  params:
    - name: a
      type: integer
      description: "0=SDI IN 1, 1=SDI IN 2, 2=SDI IN 3, 3=SDI IN 4, 4=HDMI IN 5, 5=HDMI/ANLG IN 6, 6=STILL/BKG IN 7, 7=STILL/BKG IN 8"

- id: set_dsk_key_level
  label: Adjust the key level (amount of extraction) for DSK composition
  kind: action
  command: "KYL{a}"
  params:
    - name: a
      type: integer
      description: "0 to 255"

- id: set_dsk_key_gain
  label: Adjust the key gain (semi-transmissive region) for DSK composition
  kind: action
  command: "KYG{a}"
  params:
    - name: a
      type: integer
      description: "0 to 255"

- id: set_input_connector_ch6
  label: Select input connector for channel 6
  kind: action
  command: "IPS{a}"
  params:
    - name: a
      type: integer
      description: "0=HDMI, 1=RGB/COMPONENT"

- id: query_input_connector_ch6
  label: Query the input connector of video channel 6
  kind: query
  command: "QIP"  # source also shows "QIP{a}" variant
  params: []

- id: set_video_output_bus
  label: Set the bus assigned to the video output connector
  kind: action
  command: "VOS{a}"
  params:
    - name: a
      type: integer
      description: "0=PGM, 1=PVW, 2=AUX"

- id: query_video_output_bus
  label: Query the bus assigned to the video output connector
  kind: query
  command: "QVS{a}"  # source also shows "QVS{a,b}" variant
  params:
    - name: a
      type: integer
      description: "0=SDI OUT 1, 1=SDI OUT 2, 2=HDMI OUT 1, 3=HDMI OUT 2, 4=HDMI OUT 3"

# Audio-related operations
- id: set_pgm_input_volume
  label: Adjust input volume level for PGM/1 bus audio
  kind: action
  command: "IL1{a},{b}"
  params:
    - name: a
      type: integer
      description: "0=AUDIO IN 1, 1=AUDIO IN 2, 2=AUDIO IN 3, 3=AUDIO IN 4, 4=AUDIO IN 5/6, 5=SDI IN 1, 6=SDI IN 2, 7=SDI IN 3, 8=SDI IN 4, 9=HDMI IN 5, 10=HDMI IN 6"
    - name: b
      type: integer
      description: "-801 (-INF dB), -800 (-80.0dB) to 0 (0.0dB) to 100 (10.0dB)"

- id: set_pvw_input_volume
  label: Adjust input volume level for PVW/2 bus audio
  kind: action
  command: "IL2{a},{b}"
  params:
    - name: a
      type: integer
      description: "0=AUDIO IN 1, 1=AUDIO IN 2, 2=AUDIO IN 3, 3=AUDIO IN 4, 4=AUDIO IN 5/6, 5=SDI IN 1, 6=SDI IN 2, 7=SDI IN 3, 8=SDI IN 4, 9=HDMI IN 5, 10=HDMI IN 6"
    - name: b
      type: integer
      description: "-801 (-INF dB), -800 (-80.0dB) to 0 (0.0dB) to 100 (10.0dB)"

- id: set_master_output_volume
  label: Adjust output volume level for master out
  kind: action
  command: "OL1{a}"
  params:
    - name: a
      type: integer
      description: "-801 (-INF dB), -800 (-80.0dB) to 0 (0.0dB) to 100 (10.0dB)"

- id: set_pvw_output_volume
  label: Adjust output volume level for PVW/2 bus audio
  kind: action
  command: "OL2{a}"
  params:
    - name: a
      type: integer
      description: "-801 (-INF dB), -800 (-80.0dB) to 0 (0.0dB) to 100 (10.0dB)"

- id: set_aux_output_volume
  label: Adjust output volume level for AUX/3 bus audio
  kind: action
  command: "OL3{a}"
  params:
    - name: a
      type: integer
      description: "-801 (-INF dB), -800 (-80.0dB) to 0 (0.0dB) to 100 (10.0dB)"

- id: set_audio_delay
  label: Adjust delay time of input audio
  kind: action
  command: "ADT{a},{b}"
  params:
    - name: a
      type: integer
      description: "0=AUDIO IN 1, 1=AUDIO IN 2, 2=AUDIO IN 3, 3=AUDIO IN 4, 4=AUDIO IN 5/6"
    - name: b
      type: integer
      description: "0 (0.0 fps) to 120 (12.0 fps)"

- id: query_volume
  label: Acquire information on volume level
  kind: query
  command: "QAL{a}"  # source also shows "QAL{b}" variant
  params:
    - name: a
      type: integer
      description: "0=AUDIO IN 1, 1=AUDIO IN 2, 2=AUDIO IN 3, 3=AUDIO IN 4, 4=AUDIO IN 5/6, 5=SDI IN 1, 6=SDI IN 2, 7=SDI IN 3, 8=SDI IN 4, 9=HDMI IN 5, 10=HDMI IN 6, 11=MASTER OUT, 12=PVW/2, 13=AUX/3, 14=ALL"

- id: set_audio_output_bus
  label: Assign the bus for an audio output connector
  kind: action
  command: "AOS{a},{b}"
  params:
    - name: a
      type: integer
      description: "0=AUDIO OUT XLR, 1=AUDIO OUT RCA, 2=PHONES"
    - name: b
      type: integer
      description: "0=PGM/1, 1=PVW/2, 2=AUX/3"

- id: query_audio_output_bus
  label: Query the state of the bus for an audio output connector
  kind: query
  command: "QAS{a}"  # source also shows "QAS{a,b}" variant
  params:
    - name: a
      type: integer
      description: "0=AUDIO OUT XLR, 1=AUDIO OUT RCA, 2=PHONES"

- id: set_input_mute
  label: Specify the mute function for input audio
  kind: action
  command: "IAM{a},{b}"
  params:
    - name: a
      type: integer
      description: "0=AUDIO IN 1, 1=AUDIO IN 2, 2=AUDIO IN 3, 3=AUDIO IN 4, 4=AUDIO IN 5/6, 5=SDI IN 1, 6=SDI IN 2, 7=SDI IN 3, 8=SDI IN 4, 9=HDMI IN 5, 10=HDMI IN 6"
    - name: b
      type: integer
      description: "0=OFF, 1=ON"

- id: set_input_solo
  label: Specify the solo function for input audio
  kind: action
  command: "IAS{a},{b}"
  params:
    - name: a
      type: integer
      description: "0=AUDIO IN 1, 1=AUDIO IN 2, 2=AUDIO IN 3, 3=AUDIO IN 4, 4=AUDIO IN 5/6, 5=SDI IN 1, 6=SDI IN 2, 7=SDI IN 3, 8=SDI IN 4, 9=HDMI IN 5, 10=HDMI IN 6"
    - name: b
      type: integer
      description: "0=OFF, 1=ON"

# System-related operations
- id: set_hdcp
  label: Set HDCP on/off
  kind: action
  command: "HCP{a}"
  params:
    - name: a
      type: integer
      description: "0=OFF, 1=ON"

- id: set_test_pattern
  label: Set test pattern
  kind: action
  command: "TPT{a}"
  params:
    - name: a
      type: integer
      description: "0=OFF, 1=75% COLOR BAR, 2=100% COLOR BAR, 3=RAMP, 4=STEP, 5=HATCH"

- id: set_test_tone
  label: Set test tone
  kind: action
  command: "TTN{a}"
  params:
    - name: a
      type: integer
      description: "0=OFF, 1=-20dB@1kHz, 2=-10dB@1kHz, 3=0dB@1kHz, 4=-20dB@400Hz, 5=-10dB@400Hz, 6=0dB@400Hz"

- id: recall_preset
  label: Call up preset memory
  kind: action
  command: "MEM{a}"
  params:
    - name: a
      type: integer
      description: "0=Preset 1, 1=Preset 2, 2=Preset 3, 3=Preset 4, 4=Preset 5, 5=Preset 6, 6=Preset 7, 7=Preset 8"

- id: query_panel_status
  label: Acquire status of the operating panel buttons
  kind: query
  command: "QPL{a}"  # source also shows "QPL{b}" variant
  params:
    - name: a
      type: integer
      description: "0=PGM/1, 1=PVW/2, 2=AUX/3, 3=PinP/SPLIT, 4=DSK, 5=FREEZE, 6=Video fade level, 7=ALL"

- id: gpo_output
  label: GPO output
  kind: action
  command: "GPO{a},{b}"
  params:
    - name: a
      type: integer
      description: "0=GPO1, 1=GPO2, 2=GPO3, 3=GPO4"
    - name: b
      type: integer
      description: "When ONE SHOT: 1=Output; When ALT: 0=OFF, 1=ON"

- id: set_transition_mode
  label: Operation mode for video transition
  kind: action
  command: "MOD{a}"
  params:
    - name: a
      type: integer
      description: "0=PGM-PST, 1=DISSOLVE, 2=MATRIX"

- id: camera_preset_recall
  label: Camera control (preset recall)
  kind: action
  command: "CAM{a},{b}"
  params:
    - name: a
      type: integer
      description: "0-6 (camera ID)"
    - name: b
      type: integer
      description: "0=MEMORY1, 1=MEMORY2, 2=MEMORY3, 3=MEMORY4, 4=MEMORY5, 5=MEMORY6, 6=MEMORY7, 7=MEMORY8"

- id: query_crosspoint_tally
  label: Acquire cross-point status
  kind: query
  command: "TLY"  # source also shows "TLY{a,b,...,h}" variant
  params: []

- id: query_version
  label: Version information
  kind: query
  command: "VER"  # source also shows "VER:,{a}" variant
  params: []

- id: query_device_status
  label: Acquire status of XS-62S
  kind: query
  command: "ACS"
  params: []
```

## Feedbacks
```yaml
- id: ack
  type: enum
  values: [ok]
  description: "ACK (0x06) acknowledges a command. Some commands echo the parameter (e.g. ACK a)."

- id: error
  type: enum
  values: [syntax_error, invalid, out_of_range]
  description: "stxERR:a; - 0=syntax error, 4=invalid (conflicts with another setting), 5=out of range error"
```

## Events
```yaml
- id: flow_control_xon
  type: notification
  description: "stxXON; - unsolicited XON flow control signal"

- id: flow_control_xoff
  type: notification
  description: "stxXOFF; - unsolicited XOFF flow control signal"

- id: error_event
  type: notification
  description: "stxERR:{code}; - unsolicited error response with code 0/4/5"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source describes no explicit safety warnings or interlock procedures
```

## Notes
Command framing on the wire: every command is wrapped with STX (0x02) prefix and `;` terminator; parameters are separated by `:` and `,`. Replies use `ACK` (0x06), sometimes followed by an echoed parameter. After each command, controllers must wait for `ACK` before sending the next. Operating mode (PGM-PST, DISSOLVE, MATRIX) affects which commands are valid — some return `ERR:4` in DISSOLVE/MATRIX. The RS-232 cable must be a crossover. RS-232 supports 9600 and 38400 bps; its communication settings are 8N1 with XON/XOFF flow control. Camera control over RS-422 supports 9600 and 38400 bps, 8N1, with no flow control. LAN control uses Telnet on TCP port 8023. The source describes VISCA-compatible camera control over RS-422 and control of up to seven daisy-chained cameras, and control of up to six cameras via the CONTROL port (LAN), including JVC, Panasonic, Canon, PTZOptics, Avonic, and cameras supporting VISCA over IP. TALLY/GPIO connector is DB-25 female, with open-collector tally outputs rated 12V/200mA max; GPI inputs use no-voltage contact triggering with photocoupler.
<!-- UNRESOLVED: TALLY output PGM/PST states are triggered by panel crosspoint selection, not by an explicit command — only GPO 1-4 are addressable via GPO command; firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - static.roland.com
source_urls:
  - https://static.roland.com/assets/media/pdf/XS-62S_reference_v31_eng02_W.pdf
retrieved_at: 2026-06-12T01:15:21.296Z
last_checked_at: 2026-10-07T10:50:11.326Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T10:50:11.326Z
matched_actions: 52
action_count: 52
confidence: medium
summary: "All 52 spec actions map one-to-one to the source command tables, transport values match, and the spontaneous ERR/XON/XOFF messages are modelled as Events. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "tally/GPIO pin-by-pin command mapping beyond GPO and GPI assignment; VISCA-over-IP and RS-422 camera control protocol details"
- "source describes no explicit safety warnings or interlock procedures"
- "TALLY output PGM/PST states are triggered by panel crosspoint selection, not by an explicit command — only GPO 1-4 are addressable via GPO command; firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
