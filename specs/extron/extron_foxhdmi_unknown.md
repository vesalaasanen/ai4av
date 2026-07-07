---
spec_id: admin/extron-foxbox-tx-rx-hdmi
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron FOXBOX Tx / Rx HDMI Control Spec"
manufacturer: Extron
model_family: "FOXBOX Tx HDMI"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "FOXBOX Tx HDMI"
    - "FOXBOX Rx HDMI"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - extron.com
source_urls:
  - https://www.extron.com/download/files/userman/68-1984-01_FOXBOX_Tx_Rx_HDMI_D_.pdf
  - https://www.extron.com/download/files/userman/68-1984-50_B.pdf
retrieved_at: 2026-07-02T20:47:42.481Z
last_checked_at: 2026-07-07T11:42:06.574Z
generated_at: 2026-07-07T11:42:06.574Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source doc (68-1984-01 Rev. D) does not state a specific firmware version; all version tokens are placeholders. Part numbers referenced generically as 60-1174-xx. Power on/off commands are not documented (device powers via physical connection)."
  - "exact byte-level formatting of numeric fields (leading zeros, decimal"
  - "no explicit multi-step command sequences documented in source."
  - "specific firmware version not stated (Vx.xx placeholder)."
  - "exact full part numbers not stated (60-1174-xx, 60-1187-xx referenced generically)."
  - "no power on/off command documented; power state controlled physically."
  - "precise byte-level encoding/spacing of some merged table rows (gain/attenuation) inferred from examples; verify on hardware."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:42:06.574Z
  matched_actions: 84
  action_count: 84
  confidence: medium
  summary: "All 84 spec actions matched exactly against source commands; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-02
---

# Extron FOXBOX Tx / Rx HDMI Control Spec

## Summary
Extron FOXBOX Tx HDMI and FOXBOX Rx HDMI fiber-optic HDMI extenders, controlled via Extron's Simple Instruction Set (SIS) over RS-232. Control is through front-panel 2.5 mm Configuration ports (Tx and Rx) and a rear-panel Remote RS-232 captive-screw port (Rx only). This spec covers all documented SIS commands for the transmitter and receiver, including EDID management, audio gain/attenuation, HDCP authorization, link/signal status queries, memory presets, test patterns, video mute, image shift, video delay, and resets.

<!-- UNRESOLVED: Source doc (68-1984-01 Rev. D) does not state a specific firmware version; all version tokens are placeholders. Part numbers referenced generically as 60-1174-xx. Power on/off commands are not documented (device powers via physical connection). -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
# NOTE: Source states the RS-232 Configuration port defaults are 9600 baud,
# 8 data bits, no parity, 1 stop bit, no flow control. Connector on Tx/Rx is a
# 2.5 mm mini stereo jack; the Rx also exposes a 3-pole captive screw Remote
# RS-232 port. Pinout (9-pin D to TRS): Tip=Rx line, Ring=Tx line, Sleeve=Gnd.
# The "RS-232 Over Fiber" pass-through can carry up to 115200 baud between
# Tx and Rx; that is a pass-through channel, NOT the unit control port.
```

## Traits
```yaml
# - queryable   # inferred: extensive status / info query commands present
# - levelable   # inferred: audio gain/attenuation/level and image position controls present
```

## Actions
```yaml
# Symbols (verbatim from source): ] = CR/LF, } = CR (no LF), | = pipe (alt for }),
# • = hard space, E = Escape (hex 1B), W = alt for E.
# Tx symbol vars: X!=EDID hex switch pos; X@=refresh rate(1=50Hz,2=60Hz);
#   X#=EDID value; X$=native resolution; X%=EDID record(128/256 bytes);
#   X^=input audio format(0=follow switch,1=force digital,2=force analog,3=auto);
#   X&=audio gain range 00-10; X*=audio level -18..+10 dB; X(=attenuation 00-18;
#   X1)=enable/disable(0/1); X1!=HDCP auth(0/1); X1@=link/input status(0/1);
#   X1#=temp nnnF•nnC; X1$=mode(SM/MM); X1%=firmware v.vv; X1&=sync freq.
# Rx symbol vars: X1)=mute/enable(0/1); X1@=link status(0/1); X1#=temp;
#   X1$=mode(SM/MM); X1%=firmware; X1^=sync freq; X1&=audio switch pos(0/1);
#   X1*=H/V position 000-255; X1(=preset 01-30; X2)=test pattern(0 none,1 color
#   bars,2 grayscale,3 alt pixels); X2!=Rx link/daisy(0/1/2); X2@=video delay
#   (0-6, 0.25s steps, 2=default); X2#=bit depth(0 auto,1 8-bit).
# `device:` indicates which unit(s) the row appears for in the source tables.

# ---- Transmitter: EDID / refresh rate (switch mode) ----
- id: tx_request_edid_and_refresh
  label: Request EDID and Refresh Rate Switch Positions
  kind: query
  device: tx
  command: "EStat }"
  params: []
  description: "Response: EdidMdr X! •Vrate X@]. Example response: EdidMdr15 •Vrate2 ]."

- id: tx_request_edid_switch
  label: Request EDID Switch Position
  kind: query
  device: tx
  command: "E2Stat }"
  params: []
  description: "Response: X!]."

- id: tx_request_refresh_rate_switch
  label: Request Refresh Rate Switch Position
  kind: query
  device: tx
  command: "E3Stat }"
  params: []
  description: "Response: X@]."

- id: tx_set_edid_resolution
  label: Set EDID Resolution and Refresh Rate
  kind: action
  device: tx
  command: "EAX# EDID }"
  params:
    - name: edid_value
      var: X#
      type: integer
      description: "EDID value per X# table (00-62). Front-panel EDID rotary switch must be in position 1 or unit returns E14. Example: EA58EDID } -> Edid •A58 ] (720p @ 60 Hz)."
  description: "Response: Edid •AX#]. Assigns EDID value X#."

- id: tx_view_assigned_edid
  label: View Assigned EDID
  kind: query
  device: tx
  command: "EAEDID }"
  params: []
  description: "Response: X#]."

- id: tx_save_edid
  label: Save EDID
  kind: action
  device: tx
  command: "ES0EDID }"
  params: []
  description: "Response: EdidS0 ]. Saves resolution of display on transmitter pass-through port to EDID location 0."

- id: tx_show_native_edid
  label: Show Native EDID Value
  kind: query
  device: tx
  command: "ENEDID }"
  params: []
  description: "Response: X$]. Shows native resolution of display connected to receiver (e.g. 800x600@60Hz)."

- id: tx_import_edid
  label: Import EDID
  kind: action
  device: tx
  command: "EI0EDID }"
  params: []
  description: "Response: X% EdidI ]. Imports a 128 or 256 byte EDID record (X%)."

# ---- Transmitter: audio input selection ----
- id: tx_set_input_audio_format
  label: Set Input Audio Format
  kind: action
  device: tx
  command: "EIX^ AFMT }"
  params:
    - name: format
      var: X^
      type: integer
      description: "0=follow switch (default), 1=force digital audio, 2=force analog audio, 3=auto (digital if present, else analog)."
  description: "Response: AfmtI X^]. Sets the input audio format."

- id: tx_view_input_audio_format
  label: View Input Audio Format
  kind: query
  device: tx
  command: "EIAFMT }"
  params: []
  description: "Response: X^]."

# ---- Transmitter: audio gain / attenuation ----
- id: tx_set_audio_gain
  label: Set Input Audio Gain (+dB)
  kind: action
  device: tx
  command: "X&G"
  params:
    - name: gain
      var: X&
      type: integer
      description: "Gain value 00-10. Example: 2G -> Aud+02.0 ] (set +2 dB)."
  description: "Response: Aud X*]. Set gain (uppercase G). Case-sensitive. When PC connected to receiver, requires receiver-Tx-to-transmitter-Rx fiber cable or unit returns E14."

- id: tx_set_audio_attenuation
  label: Set Input Audio Attenuation (-dB)
  kind: action
  device: tx
  command: "X(g"
  params:
    - name: attenuation
      var: X(
      type: integer
      description: "Attenuation value 00-18."
  description: "Response: Aud X*]. Set attenuation (lowercase g). Case-sensitive."

- id: tx_increment_input_level
  label: Increment Input Level
  kind: action
  device: tx
  command: "+G"
  params: []
  description: "Response: Aud X*]. Increases audio level by 1 dB. Example: +G Aud+03.0 ]."

- id: tx_decrement_input_level
  label: Decrement Input Level
  kind: action
  device: tx
  command: "-G"
  params: []
  description: "Response: Aud X*]. Decreases audio level by 1 dB. Example (verbatim): -G Aud-01.0 ] (en-dash in source)."

- id: tx_show_input_level
  label: Show Input Level
  kind: query
  device: tx
  command: "G"
  params: []
  description: "Response: X*]. Shows current input audio level."

# ---- Transmitter: HDCP authorized device ----
- id: tx_hdcp_auth_on
  label: HDCP Authorized Device On
  kind: action
  device: tx
  command: "EE1HDCP }"
  params: []
  description: "Response: HdcpE1 ]. Sets transmitter as HDCP authorized device."

- id: tx_hdcp_auth_off
  label: HDCP Authorized Device Off
  kind: action
  device: tx
  command: "EE0HDCP }"
  params: []
  description: "Response: HdcpE0 ]. Sets transmitter as not HDCP authorized."

- id: tx_view_hdcp_auth_status
  label: View HDCP Authorized Device Status
  kind: query
  device: tx
  command: "EEHDCP }"
  params: []
  description: "Response: X1!]. Shows HDCP authorized device status (0/1)."

# ---- Transmitter: status requests ----
- id: tx_view_link1_status
  label: View Link 1 (Tx-to-Rx) Status
  kind: query
  device: tx
  command: "1S"
  params: []
  description: "Response: X1@]."

- id: tx_view_link2_status
  label: View Link 2 (Rx-to-Tx) Status
  kind: query
  device: tx
  command: "2S"
  params: []
  description: "Response: X1@]."

- id: tx_view_input_video_status
  label: View Input Video Status
  kind: query
  device: tx
  command: "3S"
  params: []
  description: "Response: X1@]."

- id: tx_view_input_audio_status
  label: View Input Audio Status
  kind: query
  device: tx
  command: "4S"
  params: []
  description: "Response: X1@]."

- id: tx_view_all_signal_status
  label: View All Signal Status
  kind: query
  device: tx
  command: "5S"
  params: []
  description: "Response: SigI X1@ •SigO X1@ •HdcpI X1@ •HdcpO X1@]. Reports HDMI input/output and HDCP encoding on input/output."

- id: tx_view_hdmi_signal_status
  label: View HDMI Signal Status
  kind: query
  device: tx
  command: "6S"
  params: []
  description: "Response: SigI X1@ •SigO X1@]. HDMI input/output status (always -- for output on a transmitter)."

- id: tx_view_hdcp_status
  label: View HDCP Status
  kind: query
  device: tx
  command: "7S"
  params: []
  description: "Response: HdcpI X1@ •HdcpO X1@]."

- id: tx_view_temperature
  label: View Temperature
  kind: query
  device: tx
  command: "20S"
  params: []
  description: "Response: X1# F•X1# C]. Temperature in Fahrenheit and Celsius."

# ---- Transmitter: information requests ----
- id: tx_information_request
  label: Information Request
  kind: query
  device: tx
  command: "I"
  params: []
  description: "Response: 1Lnk X1@ •2Lnk X1@ •Vid X1@ •Aud X1@ •X1$ •Tx ]. Reports link1/link2/video/audio status, fiber mode (SM/MM), device type (Tx)."

- id: tx_show_firmware_version
  label: Show Firmware Version
  kind: query
  device: tx
  command: "Q"
  params: []
  description: "Response: X1%]. Example: Q 1.23 ]."

- id: tx_request_part_number
  label: Request Part Number
  kind: query
  device: tx
  command: "N"
  params: []
  description: "Response: 60-nnnn-nn ]."

- id: tx_input_sync_detection
  label: Input Sync Detection
  kind: query
  device: tx
  command: "1LS"
  params: []
  description: "Response: X1& horizontal , X1& vertical ]. Horizontal kHz / vertical Hz. 000.0,000.0 if no signal."

# ---- Transmitter: resets ----
- id: tx_reset_audio
  label: Reset Audio
  kind: action
  device: tx
  command: "EZA }"
  params: []
  description: "Response: Zpa ]. Resets audio to default (0 dB gain)."

- id: tx_system_reset
  label: System Reset
  kind: action
  device: tx
  command: "EZXXX }"
  params: []
  description: "Response: Zpx ]. Resets all settings to factory defaults."

# ================= RECEIVER =================

# ---- Receiver: video mute ----
- id: rx_mute_output
  label: Mute Output (Video Blank)
  kind: action
  device: rx
  command: "1B"
  params: []
  description: "Response: Blk1 ]. Blanks the video output."

- id: rx_unmute_output
  label: Unmute Output
  kind: action
  device: rx
  command: "0B"
  params: []
  description: "Response: Blk0 ]. Outputs video."

- id: rx_show_video_mute_status
  label: Show Video Mute Status
  kind: query
  device: rx
  command: "B"
  params: []
  description: "Response: X1)]. Video mute status (0/1)."

# ---- Receiver: horizontal shift ----
- id: rx_set_horizontal_position
  label: Set Horizontal Position
  kind: action
  device: rx
  command: "X1*H"
  params:
    - name: position
      var: X1*
      type: integer
      description: "Horizontal position 000-255."
  description: "Response: Hph X1*]. Sets horizontal centering."

- id: rx_increment_horizontal
  label: Increment Horizontal Position
  kind: action
  device: rx
  command: "+H"
  params: []
  description: "Response: Hph X1*]. Shifts image one pixel right."

- id: rx_decrement_horizontal
  label: Decrement Horizontal Position
  kind: action
  device: rx
  command: "-H"
  params: []
  description: "Response: Hph X1*]. Shifts image one pixel left. Source uses en-dash."

- id: rx_show_horizontal_position
  label: Show Horizontal Position
  kind: query
  device: rx
  command: "H"
  params: []
  description: "Response: X1*]."

# ---- Receiver: vertical shift ----
- id: rx_set_vertical_position
  label: Set Vertical Position
  kind: action
  device: rx
  command: "X1*/"
  params:
    - name: position
      var: X1*
      type: integer
      description: "Vertical position 000-255."
  description: "Response: Vph X1*]. Sets vertical centering. Command mnemonic is forward slash (/)."

- id: rx_increment_vertical
  label: Increment Vertical Position
  kind: action
  device: rx
  command: "+/"
  params: []
  description: "Response: Vph X1*]. Shifts image down one line."

- id: rx_decrement_vertical
  label: Decrement Vertical Position
  kind: action
  device: rx
  command: "-/"
  params: []
  description: "Response: Vph X1*]. Shifts image up one line. Source uses en-dash."

- id: rx_show_vertical_position
  label: Show Vertical Position
  kind: query
  device: rx
  command: "/"
  params: []
  description: "Response: X1*]."

# ---- Receiver: sync frequency ----
- id: rx_view_input_frequency
  label: View Input Frequency
  kind: query
  device: rx
  command: "1LS"
  params: []
  description: "Response: X1^ ,X1^]. Horizontal kHz / vertical Hz. 000.0,000.0 if no signal."

# ---- Receiver: memory presets ----
- id: rx_save_preset
  label: Save Preset
  kind: action
  device: rx
  command: "X1(,"
  params:
    - name: preset
      var: X1(
      type: integer
      description: "Memory preset number 01-30. Command code is a comma."
  description: "Response: Spr X1(]."

- id: rx_recall_preset
  label: Recall Preset
  kind: action
  device: rx
  command: "X1(."
  params:
    - name: preset
      var: X1(
      type: integer
      description: "Memory preset number 01-30. Command code is a period."
  description: "Response: Rpr X1(]."

# ---- Receiver: auto memory ----
- id: rx_disable_auto_memory
  label: Disable Auto Memory
  kind: action
  device: rx
  command: "55*0#"
  params: []
  description: "Response: Img0 ]."

- id: rx_enable_auto_memory
  label: Enable Auto Memory
  kind: action
  device: rx
  command: "55*1#"
  params: []
  description: "Response: Img1 ]."

- id: rx_show_auto_memory_status
  label: Show Auto Memory Status
  kind: query
  device: rx
  command: "55#"
  params: []
  description: "Response: X1)]."

# ---- Receiver: audio mute ----
- id: rx_mute_audio
  label: Mute Audio
  kind: action
  device: rx
  command: "1Z"
  params: []
  description: "Response: Amt1 ]. Silences receiver audio output."

- id: rx_unmute_audio
  label: Unmute Audio
  kind: action
  device: rx
  command: "0Z"
  params: []
  description: "Response: Amt0 ]. Receiver outputs audio."

- id: rx_show_audio_mute_status
  label: Show Audio Mute Status
  kind: query
  device: rx
  command: "Z"
  params: []
  description: "Response: X1)]. Audio mute status (0/1)."

# ---- Receiver: test pattern ----
- id: rx_output_color_bars
  label: Output Color Bars
  kind: action
  device: rx
  command: "1J"
  params: []
  description: "Response: Tst1 ]. Outputs color bars test pattern. Requires video input at Tx and Tx-to-Rx fiber link."

- id: rx_output_grayscale
  label: Output Grayscale
  kind: action
  device: rx
  command: "2J"
  params: []
  description: "Response: Tst2 ]. Outputs grayscale test pattern."

- id: rx_output_alternating_pixels
  label: Output Alternating Pixels
  kind: action
  device: rx
  command: "3J"
  params: []
  description: "Response: Tst3 ]. Outputs alternating pixels test pattern."

- id: rx_test_pattern_off
  label: Turn Test Pattern Off
  kind: action
  device: rx
  command: "0J"
  params: []
  description: "Response: Tst0 ]. Outputs input video (no test pattern)."

- id: rx_show_test_pattern_status
  label: Show Test Pattern Status
  kind: query
  device: rx
  command: "J"
  params: []
  description: "Response: X2)]."

# ---- Receiver: return link / daisy chain ----
- id: rx_disable_return_link
  label: Disable Return Link
  kind: action
  device: rx
  command: "66*0*0#"
  params: []
  description: "Response: Rle*0*0 ]. Disables link 2. Recommended when Tx is a FOX 500 DA6 and Rx is on outputs 2-6."

- id: rx_enable_return_link
  label: Enable Return Link to Transmitter
  kind: action
  device: rx
  command: "66*0*1#"
  params: []
  description: "Response: Rle*0*1 ]. Enables link 2 (default)."

- id: rx_enable_daisy_chain
  label: Enable Daisy Chain
  kind: action
  device: rx
  command: "66*0*2#"
  params: []
  description: "Response: Rle*0*2 ]. Enables receiver daisy chain mode."

- id: rx_show_return_link_status
  label: Show Return Link and Daisy Chain Status
  kind: query
  device: rx
  command: "66*0#"
  params: []
  description: "Response: 0* X2!]."

# ---- Receiver: video bit depth ----
- id: rx_set_bit_depth_auto
  label: Set Video Bit Depth to Auto
  kind: action
  device: rx
  command: "EV0BITD }"
  params: []
  description: "Response: BitdV0 ]."

- id: rx_force_8bit_depth
  label: Force Video to 8-bit Depth
  kind: action
  device: rx
  command: "EV1BITD }"
  params: []
  description: "Response: BitdV1 ]."

- id: rx_view_bit_depth
  label: View Video Bit Depth
  kind: query
  device: rx
  command: "EVBITD }"
  params: []
  description: "Response: X2#]."

# ---- Receiver: HDCP notification ----
- id: rx_enable_hdcp_notification
  label: Enable HDCP Notification
  kind: action
  device: rx
  command: "EN1HDCP }"
  params: []
  description: "Response: HdcpN1 ]."

- id: rx_disable_hdcp_notification
  label: Disable HDCP Notification
  kind: action
  device: rx
  command: "EN0HDCP }"
  params: []
  description: "Response: HdcpN0 ]."

- id: rx_view_hdcp_notification_status
  label: View HDCP Notification Status
  kind: query
  device: rx
  command: "ENHDCP }"
  params: []
  description: "Response: X1)]."

# ---- Receiver: video shutdown delay ----
- id: rx_set_video_delay
  label: Set Video Delay
  kind: action
  device: rx
  command: "3*X2@#"
  params:
    - name: delay
      var: X2@
      type: integer
      description: "0=0s, 1=0.25s, 2=0.5s (default), 3=0.75s, 4=1.0s, 5=1.25s, 6=1.5s. Example: 3*3# -> Dly3 ] (0.75 s)."
  description: "Response: Dly X2@]. Delays digital video for monitor sync on input rate change; embedded audio is not delayed."

- id: rx_view_video_delay
  label: View Video Delay
  kind: query
  device: rx
  command: "3#"
  params: []
  description: "Response: X2@]."

# ---- Receiver: switch and signal status requests ----
- id: rx_request_audio_switch_status
  label: Request Audio Switch Status
  kind: query
  device: rx
  command: "EStat }"
  params: []
  description: "Response: X1&]. 0=off (embedded audio muted), 1=on (unmute). Captive-screw audio output stays active regardless."

- id: rx_check_audio_embed
  label: Check Audio Embed
  kind: query
  device: rx
  command: "E5Stat }"
  params: []
  description: "Response: EmbedAud X1@]. 0=audio not embedded, 1=embedded in video stream."

- id: rx_view_link1_status
  label: View Link 1 (Tx-to-Rx) Status
  kind: query
  device: rx
  command: "1S"
  params: []
  description: "Response: X1@]."

- id: rx_view_link2_status
  label: View Link 2 (Rx-to-Tx) Status
  kind: query
  device: rx
  command: "2S"
  params: []
  description: "Response: X1@]."

- id: rx_view_input_video_status
  label: View Input Video Status
  kind: query
  device: rx
  command: "3S"
  params: []
  description: "Response: X1@]."

- id: rx_view_input_audio_status
  label: View Input Audio Status
  kind: query
  device: rx
  command: "4S"
  params: []
  description: "Response: X1@]."

- id: rx_view_all_signal_status
  label: View All Signal Status
  kind: query
  device: rx
  command: "5S"
  params: []
  description: "Response: SigI X1@ •SigO X1@ •HdcpI X1@ •HdcpO X1@]."

- id: rx_view_hdmi_signal_status
  label: View HDMI Signal Status
  kind: query
  device: rx
  command: "6S"
  params: []
  description: "Response: SigI X1@ •SigO X1@]."

- id: rx_view_hdcp_status
  label: View HDCP Status
  kind: query
  device: rx
  command: "7S"
  params: []
  description: "Response: HdcpI X1@ •HdcpO X1@]."

- id: rx_view_temperature
  label: View Temperature
  kind: query
  device: rx
  command: "20S"
  params: []
  description: "Response: X1# F•X1# C]."

# ---- Receiver: information requests ----
- id: rx_information_request
  label: Information Request
  kind: query
  device: rx
  command: "I"
  params: []
  description: "Response: 1Lnk X1@ •2Lnk X1@ •Vid X1@ •Aud X1@ •X1$ •Rx ]. Device type reported as Rx."

- id: rx_show_firmware_version
  label: Show Firmware Version
  kind: query
  device: rx
  command: "Q"
  params: []
  description: "Response: X1%]. Example: Q 1.23 ]."

- id: rx_request_part_number
  label: Request Part Number
  kind: query
  device: rx
  command: "N"
  params: []
  description: "Response: 60-nnnn-nn ]."

# ---- Receiver: resets ----
- id: rx_reset_audio
  label: Reset Audio
  kind: action
  device: rx
  command: "EZA }"
  params: []
  description: "Response: Zpa ]. Resets audio to default (0 dB gain)."

- id: rx_system_reset
  label: System Reset
  kind: action
  device: rx
  command: "EZXXX }"
  params: []
  description: "Response: Zpx ]. Resets all settings to factory defaults."
```

## Feedbacks
```yaml
# Observable query responses (values returned by query actions above).
- id: edid_switch_position
  type: enum
  values: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"]
  description: "X! EDID hex switch position (transmitter)."

- id: refresh_rate
  type: enum
  values: ["1", "2"]
  description: "X@ refresh rate; 1=50 Hz, 2=60 Hz."

- id: link_input_status
  type: enum
  values: ["0", "1"]
  description: "X1@ link/input status; 0=not detected, 1=detected."

- id: hdcp_auth_status
  type: enum
  values: ["0", "1"]
  description: "X1! HDCP authorized device status (transmitter); 0=off, 1=on."

- id: enable_disable_status
  type: enum
  values: ["0", "1"]
  description: "X1) enable/disable or mute status; 0=off/disable, 1=on/enable."

- id: video_mute_status
  type: enum
  values: ["0", "1"]
  description: "Receiver video blank status (Blk)."

- id: audio_mute_status
  type: enum
  values: ["0", "1"]
  description: "Receiver audio mute status (Amt)."

- id: test_pattern_status
  type: enum
  values: ["0", "1", "2", "3"]
  description: "X2) test pattern; 0=none, 1=color bars, 2=grayscale, 3=alternating pixels."

- id: video_bit_depth
  type: enum
  values: ["0", "1"]
  description: "X2#; 0=auto, 1=8-bit."

- id: video_delay
  type: enum
  values: ["0", "1", "2", "3", "4", "5", "6"]
  description: "X2@ video delay step (0.25 s per step, 2=default)."

- id: transmission_mode
  type: enum
  values: ["SM", "MM"]
  description: "X1$ fiber transmission mode; SM=singlemode, MM=multimode."

- id: temperature
  type: string
  description: "X1# format nnn F•nn C."

- id: firmware_version
  type: string
  description: "X1% firmware version v.vv."

- id: part_number
  type: string
  description: "60-nnnn-nn."

- id: audio_switch_position
  type: enum
  values: ["0", "1"]
  description: "X1& receiver Audio switch; 0=off (embedded muted), 1=on."

- id: rx_link_daisy_status
  type: enum
  values: ["0", "1", "2"]
  description: "X2! return link / daisy chain; 0=disable, 1=return link enable, 2=daisy chain enable."

# UNRESOLVED: exact byte-level formatting of numeric fields (leading zeros, decimal
# placement) inferred from examples only; verify against device.
```

## Variables
```yaml
- id: edid_value
  param: X#
  type: integer
  range: "00-62"
  description: "Assigned EDID value (transmitter). See X# value table in source; categories: user-captured (00), PC resolutions 01-30, DVI Pro 31-54, HDMI PC 55-62 with embedded audio."

- id: input_audio_format
  param: X^
  type: enum
  values: ["0", "1", "2", "3"]
  description: "Transmitter input audio format; 0=follow switch, 1=force digital, 2=force analog, 3=auto."

- id: audio_gain
  param: X&
  type: integer
  range: "00-10"
  description: "Transmitter input audio gain (used with set-gain command)."

- id: audio_level
  param: X*
  type: integer
  range: "-18..+10"
  description: "Transmitter audio level in 1.0 dB steps."

- id: audio_attenuation
  param: X(
  type: integer
  range: "00-18"
  description: "Transmitter input audio attenuation."

- id: horizontal_position
  param: X1*
  type: integer
  range: "000-255"
  description: "Receiver horizontal centering position."

- id: vertical_position
  param: X1*
  type: integer
  range: "000-255"
  description: "Receiver vertical centering position."

- id: memory_preset
  param: X1(
  type: integer
  range: "01-30"
  description: "Receiver memory preset number."

- id: video_delay_step
  param: X2@
  type: enum
  values: ["0", "1", "2", "3", "4", "5", "6"]
  description: "Receiver video delay; 0.25 s per step (2=default = 0.5 s)."
```

## Events
```yaml
# Unsolicited (unit-initiated) messages, verbatim from source.
- id: powerup_copyright_tx
  trigger: equipment power-up
  payload: "(c) Copyright 20 nn , Extron Electronics FOXBOX Tx HDMI, Vx.xx , 60-1174-xx ]]"
  description: "Issued by transmitter on first power-on. Vx.xx = firmware, 60-1174-xx = part number."

- id: powerup_copyright_rx
  trigger: equipment power-up
  payload: "(c) Copyright 20 nn , Extron Electronics FOXBOX Rx HDMI, Vx.xx , 60-1174-xx ]]"
  description: "Issued by receiver on first power-on."

- id: reconfig
  trigger: transmitter video input signal changed
  payload: "Reconfig ]"
  description: "Sent whenever the video input signal to the transmitter changes."

- id: link_status_change
  trigger: fiber link / video connection change
  payload: "1Lnk X1@ •2Lnk X1@ •Vid X1@ •Aud X1@]"
  description: "Status message sent on link/video connection change."

- id: embed_audio_change
  trigger: receiver rear-panel HDMI Audio switch position change
  payload: "EmbedAud X1)]"
  description: "Embedded audio message sent on HDMI Audio switch change."
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step command sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# No safety warnings, interlock procedures, or power-on sequencing requirements
# stated in the source excerpt. Source notes only physical cabling guidance
# (do not tin wires; ideal bare-wire length 3/16 inch / 5 mm; cross Tx/Rx once
# between source and target) and that front-panel EDID rotary switch must be in
# position 1 for EDID SIS commands (else E14 error) - operational, not safety.
```

## Notes
- **Symbol conventions (verbatim):** `]` = CR/LF (ends all responses); `}` = CR with no LF; `|` = pipe, interchangeable with `}`; `•` = hard space; `E` = Escape (hex 1B); `W` interchangeable with `E`. Source uses an en-dash (–) in decrement examples; ASCII hyphen (`-`) shown in command templates above for portability — verify exact byte on device.
- **Timeout:** pauses of 10 seconds or longer between command ASCII characters abort the command with no indication.
- **Error responses:** `E10` invalid command, `E11` invalid preset number, `E13` invalid parameter, `E14` invalid command for this configuration.
- **Device-specific behavior:** SIS commands are transmitter- or receiver-specific and may respond differently depending on the connected unit; the host must connect to the appropriate device (Configuration port on Tx or Rx; rear Remote RS-232 on Rx).
- **EDID rotary switch:** the front-panel EDID Minder rotary switch on the transmitter must be in position 1 for EDID SIS variables to be changeable; otherwise the unit returns E14.
- **Audio gain case sensitivity:** set-gain (`G`, uppercase) and set-attenuation (`g`, lowercase) are case sensitive; increment/decrement/show are not case sensitive. When the controlling PC is connected to the receiver, gain/attenuation commands require the receiver-Tx-to-transmitter-Rx fiber cable or the unit returns E14.
- **Over-fiber pass-through:** the RS-232 Over Fiber port passes serial signals (e.g. projector control) between Tx and Rx at up to 115200 baud; this is distinct from the unit control port (which defaults to 9600 baud).

<!-- UNRESOLVED: specific firmware version not stated (Vx.xx placeholder). -->
<!-- UNRESOLVED: exact full part numbers not stated (60-1174-xx, 60-1187-xx referenced generically). -->
<!-- UNRESOLVED: no power on/off command documented; power state controlled physically. -->
<!-- UNRESOLVED: precise byte-level encoding/spacing of some merged table rows (gain/attenuation) inferred from examples; verify on hardware. -->

## Provenance

```yaml
source_domains:
  - extron.com
source_urls:
  - https://www.extron.com/download/files/userman/68-1984-01_FOXBOX_Tx_Rx_HDMI_D_.pdf
  - https://www.extron.com/download/files/userman/68-1984-50_B.pdf
retrieved_at: 2026-07-02T20:47:42.481Z
last_checked_at: 2026-07-07T11:42:06.574Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:42:06.574Z
matched_actions: 84
action_count: 84
confidence: medium
summary: "All 84 spec actions matched exactly against source commands; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source doc (68-1984-01 Rev. D) does not state a specific firmware version; all version tokens are placeholders. Part numbers referenced generically as 60-1174-xx. Power on/off commands are not documented (device powers via physical connection)."
- "exact byte-level formatting of numeric fields (leading zeros, decimal"
- "no explicit multi-step command sequences documented in source."
- "specific firmware version not stated (Vx.xx placeholder)."
- "exact full part numbers not stated (60-1174-xx, 60-1187-xx referenced generically)."
- "no power on/off command documented; power state controlled physically."
- "precise byte-level encoding/spacing of some merged table rows (gain/attenuation) inferred from examples; verify on hardware."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
