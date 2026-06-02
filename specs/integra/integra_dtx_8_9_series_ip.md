---
spec_id: admin/integra-dtx-8-9-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra DTX-8.9 Series Control Spec"
manufacturer: Integra
model_family: DTX-8.9
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - DTX-8.9
    - DTR-8.9
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T01:48:15.092Z
last_checked_at: 2026-06-02T01:48:15.092Z
generated_at: 2026-06-02T01:48:15.092Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - XCN
  - XAT
  - XTI
  - XCH
  - XCT
  - SCN
  - SAT
  - STI
  - SCH
  - SCT
  - HAT
  - HCN
  - "firmware version compatibility range not stated in source"
  - "no explicit multi-step macro sequences defined in source"
  - "no safety warnings, interlock procedures, or power sequencing"
  - "full main-table DTX-8.9 column not extracted in the refined source — actions are populated from the explicit Model Support Note plus all commands the receiver-class ISCP protocol documents. Hardware verification against a DTX-8.9 unit recommended before promoting status above draft."
  - "TGA/TGB/TGC 12V trigger commands only function when each trigger's setup-menu parameter is OFF — runtime precondition stated in source."
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-06-02T01:48:15.092Z
  matched_actions: 322
  action_count: 322
  confidence: medium
  summary: "All 322 spec actions verified against source ISCP protocol for DTX-8.9; transport parameters confirmed; DTX-8.9-specific features (Zone3, Dock) present and supported. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Integra DTX-8.9 Series Control Spec

## Summary
Integra DTX-8.9 / DTR-8.9 AV receiver controlled via the Integra Serial Communication Protocol (ISCP). Source documents two transports: RS-232C (3-wire, 9600 baud, 8N1, no flow control) and eISCP over TCP/IP (default port 60128, configurable 49152–65535). Messages use a 3-character command opcode plus variable-length ASCII parameters; receiver responds with status messages within 50 ms.

<!-- UNRESOLVED: firmware version compatibility range not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 60128
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
- powerable    # inferred from PWR/ZPW/PW3 power commands
- routable     # inferred from SLI/SLZ/SL3 input selector commands
- queryable    # inferred from QSTN query commands
- levelable    # inferred from MVL/ZVL/VL3 volume commands
```

## Actions
```yaml
# ISCP message format: "!1" + 3-char command + parameter + [EOF][CR][LF] (eISCP)
# or "!1" + 3-char command + parameter + [CR] (RS-232C).
# `command:` fields below show the ISCP message body (opcode + parameter)
# verbatim from the source; framing characters are added by the transport layer.

# === System Power / Mute ===

- id: power_on
  label: System Power On
  kind: action
  command: "!1PWR01"
  params: []

- id: power_off
  label: System Standby
  kind: action
  command: "!1PWR00"
  params: []

- id: power_query
  label: System Power Query
  kind: query
  command: "!1PWRQSTN"
  params: []

- id: mute_off
  label: Audio Mute Off
  kind: action
  command: "!1AMT00"
  params: []

- id: mute_on
  label: Audio Mute On
  kind: action
  command: "!1AMT01"
  params: []

- id: mute_toggle
  label: Audio Mute Wrap-Around
  kind: action
  command: "!1AMTTG"
  params: []

- id: mute_query
  label: Audio Mute Query
  kind: query
  command: "!1AMTQSTN"
  params: []

# === Speaker A/B ===

- id: speaker_a_off
  label: Speaker A Off
  kind: action
  command: "!1SPA00"
  params: []

- id: speaker_a_on
  label: Speaker A On
  kind: action
  command: "!1SPA01"
  params: []

- id: speaker_a_toggle
  label: Speaker A Switch Wrap-Around
  kind: action
  command: "!1SPAUP"
  params: []

- id: speaker_a_query
  label: Speaker A State Query
  kind: query
  command: "!1SPAQSTN"
  params: []

- id: speaker_b_off
  label: Speaker B Off
  kind: action
  command: "!1SPB00"
  params: []

- id: speaker_b_on
  label: Speaker B On
  kind: action
  command: "!1SPB01"
  params: []

- id: speaker_b_toggle
  label: Speaker B Switch Wrap-Around
  kind: action
  command: "!1SPBUP"
  params: []

- id: speaker_b_query
  label: Speaker B State Query
  kind: query
  command: "!1SPBQSTN"
  params: []

# === Speaker Layout ===

- id: speaker_layout_sb
  label: Set SurrBack Speaker
  kind: action
  command: "!1SPLSB"
  params: []

- id: speaker_layout_fh
  label: Set Front High Speaker
  kind: action
  command: "!1SPLFH"
  params: []

- id: speaker_layout_fw
  label: Set Front Wide Speaker
  kind: action
  command: "!1SPLFW"
  params: []

- id: speaker_layout_toggle
  label: Speaker Layout Wrap-Around
  kind: action
  command: "!1SPLUP"
  params: []

- id: speaker_layout_query
  label: Speaker Layout Query
  kind: query
  command: "!1SPLQSTN"
  params: []

# === Master Volume ===

- id: volume_set
  label: Set Master Volume
  kind: action
  command: "!1MVL{level}"
  params:
    - name: level
      type: string
      description: Volume level 00-64 hex (0-100 decimal)

- id: volume_up
  label: Master Volume Up
  kind: action
  command: "!1MVLUP"
  params: []

- id: volume_down
  label: Master Volume Down
  kind: action
  command: "!1MVLDOWN"
  params: []

- id: volume_up_1db
  label: Master Volume Up 1dB
  kind: action
  command: "!1MVLUP1"
  params: []

- id: volume_down_1db
  label: Master Volume Down 1dB
  kind: action
  command: "!1MVLDOWN1"
  params: []

- id: volume_query
  label: Master Volume Query
  kind: query
  command: "!1MVLQSTN"
  params: []

# === Tone Controls - Front / Front Wide / Front High / Center / Surround / Surround Back / Subwoofer ===

- id: tone_front_set
  label: Set Front Tone
  kind: action
  command: "!1TFR{value}"
  params:
    - name: value
      type: string
      description: "Bxx or Txx where xx is -A...00...+A"

- id: tone_front_bass_up
  label: Front Bass Up
  kind: action
  command: "!1TFRBUP"
  params: []

- id: tone_front_bass_down
  label: Front Bass Down
  kind: action
  command: "!1TFRBDOWN"
  params: []

- id: tone_front_treble_up
  label: Front Treble Up
  kind: action
  command: "!1TFRTUP"
  params: []

- id: tone_front_treble_down
  label: Front Treble Down
  kind: action
  command: "!1TFRTDOWN"
  params: []

- id: tone_front_query
  label: Front Tone Query
  kind: query
  command: "!1TFRQSTN"
  params: []

- id: tone_front_wide_set
  label: Set Front Wide Tone
  kind: action
  command: "!1TFW{value}"
  params:
    - name: value
      type: string
      description: "Bxx or Txx where xx is -A...00...+A"

- id: tone_front_wide_bass_up
  label: Front Wide Bass Up
  kind: action
  command: "!1TFWBUP"
  params: []

- id: tone_front_wide_bass_down
  label: Front Wide Bass Down
  kind: action
  command: "!1TFWBDOWN"
  params: []

- id: tone_front_wide_treble_up
  label: Front Wide Treble Up
  kind: action
  command: "!1TFWTUP"
  params: []

- id: tone_front_wide_treble_down
  label: Front Wide Treble Down
  kind: action
  command: "!1TFWTDOWN"
  params: []

- id: tone_front_wide_query
  label: Front Wide Tone Query
  kind: query
  command: "!1TFWQSTN"
  params: []

- id: tone_front_high_set
  label: Set Front High Tone
  kind: action
  command: "!1TFH{value}"
  params:
    - name: value
      type: string
      description: "Bxx or Txx where xx is -A...00...+A"

- id: tone_front_high_bass_up
  label: Front High Bass Up
  kind: action
  command: "!1TFHBUP"
  params: []

- id: tone_front_high_bass_down
  label: Front High Bass Down
  kind: action
  command: "!1TFHBDOWN"
  params: []

- id: tone_front_high_treble_up
  label: Front High Treble Up
  kind: action
  command: "!1TFHTUP"
  params: []

- id: tone_front_high_treble_down
  label: Front High Treble Down
  kind: action
  command: "!1TFHTDOWN"
  params: []

- id: tone_front_high_query
  label: Front High Tone Query
  kind: query
  command: "!1TFHQSTN"
  params: []

- id: tone_center_set
  label: Set Center Tone
  kind: action
  command: "!1TCT{value}"
  params:
    - name: value
      type: string
      description: "Bxx or Txx where xx is -A...00...+A"

- id: tone_center_bass_up
  label: Center Bass Up
  kind: action
  command: "!1TCTBUP"
  params: []

- id: tone_center_bass_down
  label: Center Bass Down
  kind: action
  command: "!1TCTBDOWN"
  params: []

- id: tone_center_treble_up
  label: Center Treble Up
  kind: action
  command: "!1TCTTUP"
  params: []

- id: tone_center_treble_down
  label: Center Treble Down
  kind: action
  command: "!1TCTTDOWN"
  params: []

- id: tone_center_query
  label: Center Tone Query
  kind: query
  command: "!1TCTQSTN"
  params: []

- id: tone_surround_set
  label: Set Surround Tone
  kind: action
  command: "!1TSR{value}"
  params:
    - name: value
      type: string
      description: "Bxx or Txx where xx is -A...00...+A"

- id: tone_surround_bass_up
  label: Surround Bass Up
  kind: action
  command: "!1TSRBUP"
  params: []

- id: tone_surround_bass_down
  label: Surround Bass Down
  kind: action
  command: "!1TSRBDOWN"
  params: []

- id: tone_surround_treble_up
  label: Surround Treble Up
  kind: action
  command: "!1TSRTUP"
  params: []

- id: tone_surround_treble_down
  label: Surround Treble Down
  kind: action
  command: "!1TSRTDOWN"
  params: []

- id: tone_surround_query
  label: Surround Tone Query
  kind: query
  command: "!1TSRQSTN"
  params: []

- id: tone_surround_back_set
  label: Set Surround Back Tone
  kind: action
  command: "!1TSB{value}"
  params:
    - name: value
      type: string
      description: "Bxx or Txx where xx is -A...00...+A"

- id: tone_surround_back_bass_up
  label: Surround Back Bass Up
  kind: action
  command: "!1TSBBUP"
  params: []

- id: tone_surround_back_bass_down
  label: Surround Back Bass Down
  kind: action
  command: "!1TSBBDOWN"
  params: []

- id: tone_surround_back_treble_up
  label: Surround Back Treble Up
  kind: action
  command: "!1TSBTUP"
  params: []

- id: tone_surround_back_treble_down
  label: Surround Back Treble Down
  kind: action
  command: "!1TSBTDOWN"
  params: []

- id: tone_surround_back_query
  label: Surround Back Tone Query
  kind: query
  command: "!1TSBQSTN"
  params: []

- id: tone_subwoofer_set
  label: Set Subwoofer Bass
  kind: action
  command: "!1TSWB{value}"
  params:
    - name: value
      type: string
      description: "Subwoofer bass xx where xx is -A...00...+A"

- id: tone_subwoofer_bass_up
  label: Subwoofer Bass Up
  kind: action
  command: "!1TSWBUP"
  params: []

- id: tone_subwoofer_bass_down
  label: Subwoofer Bass Down
  kind: action
  command: "!1TSWBDOWN"
  params: []

- id: tone_subwoofer_query
  label: Subwoofer Tone Query
  kind: query
  command: "!1TSWQSTN"
  params: []

# === Sleep ===

- id: sleep_set
  label: Set Sleep Time
  kind: action
  command: "!1SLP{time}"
  params:
    - name: time
      type: string
      description: 01-5A hex (1-90 min)

- id: sleep_off
  label: Sleep Off
  kind: action
  command: "!1SLPOFF"
  params: []

- id: sleep_toggle
  label: Sleep Time Wrap-Around Up
  kind: action
  command: "!1SLPUP"
  params: []

- id: sleep_query
  label: Sleep Time Query
  kind: query
  command: "!1SLPQSTN"
  params: []

# === Speaker Level Calibration ===

- id: speaker_level_test
  label: Speaker Level TEST Key
  kind: action
  command: "!1SLCTEST"
  params: []

- id: speaker_level_chsel
  label: Speaker Level CH SEL Key
  kind: action
  command: "!1SLCCHSEL"
  params: []

- id: speaker_level_up
  label: Speaker Level Up
  kind: action
  command: "!1SLCUP"
  params: []

- id: speaker_level_down
  label: Speaker Level Down
  kind: action
  command: "!1SLCDOWN"
  params: []

# === Subwoofer / Center Temporary Level ===

- id: subwoofer_level_set
  label: Set Subwoofer Temporary Level
  kind: action
  command: "!1SWL{level}"
  params:
    - name: level
      type: string
      description: "-F to +C (-15dB to +12dB)"

- id: subwoofer_level_up
  label: Subwoofer Level Up
  kind: action
  command: "!1SWLUP"
  params: []

- id: subwoofer_level_down
  label: Subwoofer Level Down
  kind: action
  command: "!1SWLDOWN"
  params: []

- id: subwoofer_level_query
  label: Subwoofer Level Query
  kind: query
  command: "!1SWLQSTN"
  params: []

- id: center_level_set
  label: Set Center Temporary Level
  kind: action
  command: "!1CTL{level}"
  params:
    - name: level
      type: string
      description: "-C to +C (-12dB to +12dB)"

- id: center_level_up
  label: Center Level Up
  kind: action
  command: "!1CTLUP"
  params: []

- id: center_level_down
  label: Center Level Down
  kind: action
  command: "!1CTLDOWN"
  params: []

- id: center_level_query
  label: Center Level Query
  kind: query
  command: "!1CTLQSTN"
  params: []

# === Display Mode ===

- id: display_mode_selector_volume
  label: Display Selector + Volume
  kind: action
  command: "!1DIF00"
  params: []

- id: display_mode_selector_listening
  label: Display Selector + Listening Mode
  kind: action
  command: "!1DIF01"
  params: []

- id: display_mode_digital_format
  label: Display Digital Format
  kind: action
  command: "!1DIF02"
  params: []

- id: display_mode_video_format
  label: Display Video Format
  kind: action
  command: "!1DIF03"
  params: []

- id: display_mode_toggle
  label: Display Mode Wrap-Around Up
  kind: action
  command: "!1DIFTG"
  params: []

- id: display_mode_query
  label: Display Mode Query
  kind: query
  command: "!1DIFQSTN"
  params: []

# === Dimmer ===

- id: dimmer_bright
  label: Dimmer Bright
  kind: action
  command: "!1DIM00"
  params: []

- id: dimmer_dim
  label: Dimmer Dim
  kind: action
  command: "!1DIM01"
  params: []

- id: dimmer_dark
  label: Dimmer Dark
  kind: action
  command: "!1DIM02"
  params: []

- id: dimmer_shutoff
  label: Dimmer Shut-Off
  kind: action
  command: "!1DIM03"
  params: []

- id: dimmer_bright_led_off
  label: Dimmer Bright LED Off
  kind: action
  command: "!1DIM08"
  params: []

- id: dimmer_toggle
  label: Dimmer Wrap-Around Up
  kind: action
  command: "!1DIMDIM"
  params: []

- id: dimmer_query
  label: Dimmer Level Query
  kind: query
  command: "!1DIMQSTN"
  params: []

# === OSD / Setup Operation ===

- id: osd_menu
  label: OSD Menu Key
  kind: action
  command: "!1OSDMENU"
  params: []

- id: osd_up
  label: OSD Up Key
  kind: action
  command: "!1OSDUP"
  params: []

- id: osd_down
  label: OSD Down Key
  kind: action
  command: "!1OSDDOWN"
  params: []

- id: osd_right
  label: OSD Right Key
  kind: action
  command: "!1OSDRIGHT"
  params: []

- id: osd_left
  label: OSD Left Key
  kind: action
  command: "!1OSDLEFT"
  params: []

- id: osd_enter
  label: OSD Enter Key
  kind: action
  command: "!1OSDENTER"
  params: []

- id: osd_exit
  label: OSD Exit Key
  kind: action
  command: "!1OSDEXIT"
  params: []

- id: osd_audio
  label: OSD Audio Adjust Key
  kind: action
  command: "!1OSDAUDIO"
  params: []

- id: osd_video
  label: OSD Video Adjust Key
  kind: action
  command: "!1OSDVIDEO"
  params: []

# === Memory Setup ===

- id: memory_store
  label: Memory Store
  kind: action
  command: "!1MEMSTR"
  params: []

- id: memory_recall
  label: Memory Recall
  kind: action
  command: "!1MEMRCL"
  params: []

- id: memory_lock
  label: Memory Lock
  kind: action
  command: "!1MEMLOCK"
  params: []

- id: memory_unlock
  label: Memory Unlock
  kind: action
  command: "!1MEMUNLK"
  params: []

# === Audio / Video Info ===

- id: audio_info_query
  label: Audio Information Query
  kind: query
  command: "!1IFAQSTN"
  params: []

- id: video_info_query
  label: Video Information Query
  kind: query
  command: "!1IFVQSTN"
  params: []

# === Input Selector (Main) ===

- id: input_select
  label: Select Input
  kind: action
  command: "!1SLI{code}"
  params:
    - name: code
      type: string
      description: 'Input code: 00 VIDEO1, 01 VIDEO2, 02 VIDEO3, 03 VIDEO4, 04 VIDEO5, 05 VIDEO6, 06 VIDEO7, 10 DVD, 20 TAPE1, 21 TAPE2, 22 PHONO, 23 CD, 24 FM, 25 AM, 26 TUNER, 27 MUSIC SERVER, 28 INTERNET RADIO, 29 USB Front, 2A USB Rear, 40 Universal PORT, 30 MULTI CH'

- id: input_up
  label: Input Wrap-Around Up
  kind: action
  command: "!1SLIUP"
  params: []

- id: input_down
  label: Input Wrap-Around Down
  kind: action
  command: "!1SLIDOWN"
  params: []

- id: input_query
  label: Input Selector Query
  kind: query
  command: "!1SLIQSTN"
  params: []

# === RECOUT Selector ===

- id: recout_select
  label: Select RECOUT
  kind: action
  command: "!1SLR{code}"
  params:
    - name: code
      type: string
      description: 'RECOUT code: 00-04 VIDEO1-5, 10 DVD, 20 TAPE1, 22 PHONO, 23 CD, 24 FM, 25 AM, 26 TUNER, 27 MUSIC SERVER, 28 INTERNET RADIO, 30 MULTI CH, 7F OFF, 80 SOURCE'

- id: recout_query
  label: RECOUT Selector Query
  kind: query
  command: "!1SLRQSTN"
  params: []

# === Audio Selector ===

- id: audio_selector_auto
  label: Audio Selector AUTO
  kind: action
  command: "!1SLA00"
  params: []

- id: audio_selector_multichannel
  label: Audio Selector MULTI-CHANNEL
  kind: action
  command: "!1SLA01"
  params: []

- id: audio_selector_analog
  label: Audio Selector ANALOG
  kind: action
  command: "!1SLA02"
  params: []

- id: audio_selector_ilink
  label: Audio Selector iLINK
  kind: action
  command: "!1SLA03"
  params: []

- id: audio_selector_hdmi
  label: Audio Selector HDMI
  kind: action
  command: "!1SLA04"
  params: []

- id: audio_selector_coax_opt
  label: Audio Selector COAX/OPT
  kind: action
  command: "!1SLA05"
  params: []

- id: audio_selector_balance
  label: Audio Selector BALANCE
  kind: action
  command: "!1SLA06"
  params: []

- id: audio_selector_toggle
  label: Audio Selector Wrap-Around Up
  kind: action
  command: "!1SLAUP"
  params: []

- id: audio_selector_query
  label: Audio Selector Query
  kind: query
  command: "!1SLAQSTN"
  params: []

# === 12V Triggers ===

- id: trigger_a_off
  label: 12V Trigger A Off
  kind: action
  command: "!1TGA00"
  params: []

- id: trigger_a_on
  label: 12V Trigger A On
  kind: action
  command: "!1TGA01"
  params: []

- id: trigger_b_off
  label: 12V Trigger B Off
  kind: action
  command: "!1TGB00"
  params: []

- id: trigger_b_on
  label: 12V Trigger B On
  kind: action
  command: "!1TGB01"
  params: []

- id: trigger_c_off
  label: 12V Trigger C Off
  kind: action
  command: "!1TGC00"
  params: []

- id: trigger_c_on
  label: 12V Trigger C On
  kind: action
  command: "!1TGC01"
  params: []

# === HDMI Output Selector ===

- id: hdmi_out_analog
  label: HDMI Out Analog
  kind: action
  command: "!1HDO00"
  params: []

- id: hdmi_out_main
  label: HDMI Out Main
  kind: action
  command: "!1HDO01"
  params: []

- id: hdmi_out_sub
  label: HDMI Out Sub
  kind: action
  command: "!1HDO02"
  params: []

- id: hdmi_out_both
  label: HDMI Out Both
  kind: action
  command: "!1HDO03"
  params: []

- id: hdmi_out_both_main
  label: HDMI Out Both Main
  kind: action
  command: "!1HDO04"
  params: []

- id: hdmi_out_both_sub
  label: HDMI Out Both Sub
  kind: action
  command: "!1HDO05"
  params: []

- id: hdmi_out_toggle
  label: HDMI Out Wrap-Around Up
  kind: action
  command: "!1HDOUP"
  params: []

- id: hdmi_out_query
  label: HDMI Out Query
  kind: query
  command: "!1HDOQSTN"
  params: []

# === Monitor Out Resolution ===

- id: resolution_through
  label: Resolution Through
  kind: action
  command: "!1RES00"
  params: []

- id: resolution_auto
  label: Resolution Auto
  kind: action
  command: "!1RES01"
  params: []

- id: resolution_480p
  label: Resolution 480p
  kind: action
  command: "!1RES02"
  params: []

- id: resolution_720p
  label: Resolution 720p
  kind: action
  command: "!1RES03"
  params: []

- id: resolution_1080i
  label: Resolution 1080i
  kind: action
  command: "!1RES04"
  params: []

- id: resolution_1080p
  label: Resolution 1080p
  kind: action
  command: "!1RES05"
  params: []

- id: resolution_1080p_24fs
  label: Resolution 1080p/24fs
  kind: action
  command: "!1RES07"
  params: []

- id: resolution_source
  label: Resolution Source
  kind: action
  command: "!1RES06"
  params: []

- id: resolution_toggle
  label: Resolution Wrap-Around Up
  kind: action
  command: "!1RESUP"
  params: []

- id: resolution_query
  label: Resolution Query
  kind: query
  command: "!1RESQSTN"
  params: []

# === ISF Mode ===

- id: isf_custom
  label: ISF Mode Custom
  kind: action
  command: "!1ISF00"
  params: []

- id: isf_day
  label: ISF Mode Day
  kind: action
  command: "!1ISF01"
  params: []

- id: isf_night
  label: ISF Mode Night
  kind: action
  command: "!1ISF02"
  params: []

- id: isf_toggle
  label: ISF Mode Wrap-Around Up
  kind: action
  command: "!1ISFUP"
  params: []

- id: isf_query
  label: ISF Mode Query
  kind: query
  command: "!1ISFQSTN"
  params: []

# === Listening Mode (LMD) ===

- id: lmd_set
  label: Set Listening Mode
  kind: action
  command: "!1LMD{code}"
  params:
    - name: code
      type: string
      description: 'Listening mode code: 00 STEREO, 01 DIRECT, 02 SURROUND, 03 FILM, 04 THX, 05 ACTION, 06 MUSICAL, 07 MONO MOVIE, 08 ORCHESTRA, 09 UNPLUGGED, 0A STUDIO-MIX, 0B TV LOGIC, 0C ALL CH STEREO, 0D THEATER-DIM, 0E ENHANCED 7, 0F MONO, 11 PURE AUDIO, 12 MULTIPLEX, 13 FULL MONO, 14 DOLBY VIRTUAL, 15 DTS Surround Sensation, 16 Audyssey DSX, 40 5.1ch Straight Decode, 41 Dolby EX, 42 THX Cinema, 43 THX Surround EX, 44 THX Music, 45 THX Games, 50 U2/S2 Cinema, 51 U2/S2 Music, 52 U2/S2 Games, 80 PLII/PLIIx Movie, 81 PLII/PLIIx Music, 82 Neo:6 Cinema, 83 Neo:6 Music, 84 PLII/PLIIx THX Cinema, 85 Neo:6 THX Cinema, 86 PLII/PLIIx Game, 87 Neural Surr, 88 Neural THX, 89 PLII/PLIIx THX Games, 8A Neo:6 THX Games, 8B PLII/PLIIx THX Music, 8C Neo:6 THX Music, 8D Neural THX Cinema, 8E Neural THX Music, 8F Neural THX Games, 90 PLIIz Height, 91-92 Neo:6 + DTS Surr Sens, 93 Neural Digital Music, 94-99 PLIIz Height + THX variants, A0-A7 Audyssey DSX variants'

- id: lmd_up
  label: Listening Mode Wrap-Around Up
  kind: action
  command: "!1LMDUP"
  params: []

- id: lmd_down
  label: Listening Mode Wrap-Around Down
  kind: action
  command: "!1LMDDOWN"
  params: []

- id: lmd_movie
  label: Listening Mode Movie Wrap-Around
  kind: action
  command: "!1LMDMOVIE"
  params: []

- id: lmd_music
  label: Listening Mode Music Wrap-Around
  kind: action
  command: "!1LMDMUSIC"
  params: []

- id: lmd_game
  label: Listening Mode Game Wrap-Around
  kind: action
  command: "!1LMDGAME"
  params: []

- id: lmd_query
  label: Listening Mode Query
  kind: query
  command: "!1LMDQSTN"
  params: []

# === Late Night (LTN) ===

- id: late_night_off
  label: Late Night Off
  kind: action
  command: "!1LTN00"
  params: []

- id: late_night_low
  label: Late Night Low
  kind: action
  command: "!1LTN01"
  params: []

- id: late_night_high
  label: Late Night High
  kind: action
  command: "!1LTN02"
  params: []

- id: late_night_auto
  label: Late Night Auto
  kind: action
  command: "!1LTN03"
  params: []

- id: late_night_toggle
  label: Late Night Wrap-Around Up
  kind: action
  command: "!1LTNUP"
  params: []

- id: late_night_query
  label: Late Night Query
  kind: query
  command: "!1LTNQSTN"
  params: []

# === Re-EQ / Academy / Cinema Filter (RAS) ===

- id: ras_off
  label: Re-EQ/Cinema Filter Off
  kind: action
  command: "!1RAS00"
  params: []

- id: ras_reeq_on
  label: Re-EQ/Cinema Filter On
  kind: action
  command: "!1RAS01"
  params: []

- id: ras_academy
  label: Academy On
  kind: action
  command: "!1RAS02"
  params: []

- id: ras_toggle
  label: Re-EQ/Academy Wrap-Around Up
  kind: action
  command: "!1RASUP"
  params: []

- id: ras_query
  label: Re-EQ/Academy/Cinema Filter Query
  kind: query
  command: "!1RASQSTN"
  params: []

# === Audyssey MultEQ / DynEQ / DynVol / Dolby Volume / Music Optimizer ===

- id: audyssey_multeq_off
  label: Audyssey MultEQ Off
  kind: action
  command: "!1ADY00"
  params: []

- id: audyssey_multeq_on
  label: Audyssey MultEQ On
  kind: action
  command: "!1ADY01"
  params: []

- id: audyssey_multeq_toggle
  label: Audyssey MultEQ Wrap-Around Up
  kind: action
  command: "!1ADYUP"
  params: []

- id: audyssey_multeq_query
  label: Audyssey MultEQ Query
  kind: query
  command: "!1ADYQSTN"
  params: []

- id: audyssey_dyneq_off
  label: Audyssey Dynamic EQ Off
  kind: action
  command: "!1ADQ00"
  params: []

- id: audyssey_dyneq_on
  label: Audyssey Dynamic EQ On
  kind: action
  command: "!1ADQ01"
  params: []

- id: audyssey_dyneq_toggle
  label: Audyssey Dynamic EQ Wrap-Around Up
  kind: action
  command: "!1ADQUP"
  params: []

- id: audyssey_dyneq_query
  label: Audyssey Dynamic EQ Query
  kind: query
  command: "!1ADQQSTN"
  params: []

- id: audyssey_dynvol_off
  label: Audyssey Dynamic Volume Off
  kind: action
  command: "!1ADV00"
  params: []

- id: audyssey_dynvol_light
  label: Audyssey Dynamic Volume Light
  kind: action
  command: "!1ADV01"
  params: []

- id: audyssey_dynvol_medium
  label: Audyssey Dynamic Volume Medium
  kind: action
  command: "!1ADV02"
  params: []

- id: audyssey_dynvol_heavy
  label: Audyssey Dynamic Volume Heavy
  kind: action
  command: "!1ADV03"
  params: []

- id: audyssey_dynvol_toggle
  label: Audyssey Dynamic Volume Wrap-Around Up
  kind: action
  command: "!1ADVUP"
  params: []

- id: audyssey_dynvol_query
  label: Audyssey Dynamic Volume Query
  kind: query
  command: "!1ADVQSTN"
  params: []

- id: dolby_volume_off
  label: Dolby Volume Off
  kind: action
  command: "!1DVL00"
  params: []

- id: dolby_volume_low
  label: Dolby Volume Low
  kind: action
  command: "!1DVL01"
  params: []

- id: dolby_volume_mid
  label: Dolby Volume Mid
  kind: action
  command: "!1DVL02"
  params: []

- id: dolby_volume_high
  label: Dolby Volume High
  kind: action
  command: "!1DVL03"
  params: []

- id: dolby_volume_toggle
  label: Dolby Volume Wrap-Around Up
  kind: action
  command: "!1DVLUP"
  params: []

- id: dolby_volume_query
  label: Dolby Volume Query
  kind: query
  command: "!1DVLQSTN"
  params: []

- id: music_optimizer_off
  label: Music Optimizer Off
  kind: action
  command: "!1MOT00"
  params: []

- id: music_optimizer_on
  label: Music Optimizer On
  kind: action
  command: "!1MOT01"
  params: []

- id: music_optimizer_toggle
  label: Music Optimizer Wrap-Around Up
  kind: action
  command: "!1MOTUP"
  params: []

- id: music_optimizer_query
  label: Music Optimizer Query
  kind: query
  command: "!1MOTQSTN"
  params: []

# === Tuner ===

- id: tune_set
  label: Set Tuning Frequency
  kind: action
  command: "!1TUN{freq}"
  params:
    - name: freq
      type: string
      description: 5-digit frequency (FM nnn.nn MHz / AM nnnnn kHz)

- id: tune_up
  label: Tuning Up
  kind: action
  command: "!1TUNUP"
  params: []

- id: tune_down
  label: Tuning Down
  kind: action
  command: "!1TUNDOWN"
  params: []

- id: tune_query
  label: Tuning Query
  kind: query
  command: "!1TUNQSTN"
  params: []

- id: preset_set
  label: Set Preset
  kind: action
  command: "!1PRS{num}"
  params:
    - name: num
      type: string
      description: Preset 01-28 hex (1-40)

- id: preset_up
  label: Preset Wrap-Around Up
  kind: action
  command: "!1PRSUP"
  params: []

- id: preset_down
  label: Preset Wrap-Around Down
  kind: action
  command: "!1PRSDOWN"
  params: []

- id: preset_query
  label: Preset Query
  kind: query
  command: "!1PRSQSTN"
  params: []

- id: preset_memory_store
  label: Store Preset Memory
  kind: action
  command: "!1PRM{num}"
  params:
    - name: num
      type: string
      description: Preset 01-28 hex (1-40)

# === Net/USB Operation (NTC) ===

- id: net_play
  label: Net/USB Play
  kind: action
  command: "!1NTCPLAY"
  params: []

- id: net_stop
  label: Net/USB Stop
  kind: action
  command: "!1NTCSTOP"
  params: []

- id: net_pause
  label: Net/USB Pause
  kind: action
  command: "!1NTCPAUSE"
  params: []

- id: net_track_up
  label: Net/USB Track Up
  kind: action
  command: "!1NTCTRUP"
  params: []

- id: net_track_down
  label: Net/USB Track Down
  kind: action
  command: "!1NTCTRDN"
  params: []

- id: net_ff
  label: Net/USB FF
  kind: action
  command: "!1NTCFF"
  params: []

- id: net_rew
  label: Net/USB REW
  kind: action
  command: "!1NTCREW"
  params: []

- id: net_repeat
  label: Net/USB Repeat
  kind: action
  command: "!1NTCREPEAT"
  params: []

- id: net_random
  label: Net/USB Random
  kind: action
  command: "!1NTCRANDOM"
  params: []

- id: net_display
  label: Net/USB Display
  kind: action
  command: "!1NTCDISPLAY"
  params: []

- id: net_album
  label: Net/USB Album
  kind: action
  command: "!1NTCALBUM"
  params: []

- id: net_artist
  label: Net/USB Artist
  kind: action
  command: "!1NTCARTIST"
  params: []

- id: net_genre
  label: Net/USB Genre
  kind: action
  command: "!1NTCGENRE"
  params: []

- id: net_playlist
  label: Net/USB Playlist
  kind: action
  command: "!1NTCPLAYLIST"
  params: []

- id: net_right
  label: Net/USB Right
  kind: action
  command: "!1NTCRIGHT"
  params: []

- id: net_left
  label: Net/USB Left
  kind: action
  command: "!1NTCLEFT"
  params: []

- id: net_up
  label: Net/USB Up
  kind: action
  command: "!1NTCUP"
  params: []

- id: net_down
  label: Net/USB Down
  kind: action
  command: "!1NTCDOWN"
  params: []

- id: net_select
  label: Net/USB Select
  kind: action
  command: "!1NTCSELECT"
  params: []

- id: net_0
  label: Net/USB 0 Key
  kind: action
  command: "!1NTC0"
  params: []

- id: net_1
  label: Net/USB 1 Key
  kind: action
  command: "!1NTC1"
  params: []

- id: net_2
  label: Net/USB 2 Key
  kind: action
  command: "!1NTC2"
  params: []

- id: net_3
  label: Net/USB 3 Key
  kind: action
  command: "!1NTC3"
  params: []

- id: net_4
  label: Net/USB 4 Key
  kind: action
  command: "!1NTC4"
  params: []

- id: net_5
  label: Net/USB 5 Key
  kind: action
  command: "!1NTC5"
  params: []

- id: net_6
  label: Net/USB 6 Key
  kind: action
  command: "!1NTC6"
  params: []

- id: net_7
  label: Net/USB 7 Key
  kind: action
  command: "!1NTC7"
  params: []

- id: net_8
  label: Net/USB 8 Key
  kind: action
  command: "!1NTC8"
  params: []

- id: net_9
  label: Net/USB 9 Key
  kind: action
  command: "!1NTC9"
  params: []

- id: net_delete
  label: Net/USB Delete
  kind: action
  command: "!1NTCDELETE"
  params: []

- id: net_caps
  label: Net/USB Caps
  kind: action
  command: "!1NTCCAPS"
  params: []

- id: net_location
  label: Net/USB Location
  kind: action
  command: "!1NTCLOCATION"
  params: []

- id: net_language
  label: Net/USB Language
  kind: action
  command: "!1NTCLANGUAGE"
  params: []

- id: net_setup
  label: Net/USB Setup
  kind: action
  command: "!1NTCSETUP"
  params: []

- id: net_return
  label: Net/USB Return
  kind: action
  command: "!1NTCRETURN"
  params: []

- id: net_chup
  label: Net/USB CH Up (iRadio)
  kind: action
  command: "!1NTCCHUP"
  params: []

- id: net_chdn
  label: Net/USB CH Down (iRadio)
  kind: action
  command: "!1NTCCHDN"
  params: []

# === Net/USB Info Queries ===

- id: net_artist_query
  label: Net/USB Artist Query
  kind: query
  command: "!1NATQSTN"
  params: []

- id: net_album_query
  label: Net/USB Album Query
  kind: query
  command: "!1NALQSTN"
  params: []

- id: net_title_query
  label: Net/USB Title Query
  kind: query
  command: "!1NTIQSTN"
  params: []

- id: net_time_query
  label: Net/USB Time Query
  kind: query
  command: "!1NTMQSTN"
  params: []

- id: net_track_query
  label: Net/USB Track Query
  kind: query
  command: "!1NTRQSTN"
  params: []

- id: net_play_status_query
  label: Net/USB Play Status Query
  kind: query
  command: "!1NSTQSTN"
  params: []

- id: net_preset_set
  label: Set Internet Radio Preset
  kind: action
  command: "!1NPR{num}"
  params:
    - name: num
      type: string
      description: Preset 01-28 hex (1-40)

# === Zone 2 ===

- id: z2_power_on
  label: Zone2 Power On
  kind: action
  command: "!1ZPW01"
  params: []

- id: z2_power_off
  label: Zone2 Standby
  kind: action
  command: "!1ZPW00"
  params: []

- id: z2_power_query
  label: Zone2 Power Query
  kind: query
  command: "!1ZPWQSTN"
  params: []

- id: z2_mute_off
  label: Zone2 Mute Off
  kind: action
  command: "!1ZMT00"
  params: []

- id: z2_mute_on
  label: Zone2 Mute On
  kind: action
  command: "!1ZMT01"
  params: []

- id: z2_mute_toggle
  label: Zone2 Mute Wrap-Around
  kind: action
  command: "!1ZMTTG"
  params: []

- id: z2_mute_query
  label: Zone2 Mute Query
  kind: query
  command: "!1ZMTQSTN"
  params: []

- id: z2_volume_set
  label: Set Zone2 Volume
  kind: action
  command: "!1ZVL{level}"
  params:
    - name: level
      type: string
      description: Volume level 00-64 hex (0-100)

- id: z2_volume_up
  label: Zone2 Volume Up
  kind: action
  command: "!1ZVLUP"
  params: []

- id: z2_volume_down
  label: Zone2 Volume Down
  kind: action
  command: "!1ZVLDOWN"
  params: []

- id: z2_volume_query
  label: Zone2 Volume Query
  kind: query
  command: "!1ZVLQSTN"
  params: []

- id: z2_tone_set
  label: Set Zone2 Tone
  kind: action
  command: "!1ZTN{value}"
  params:
    - name: value
      type: string
      description: "Bxx or Txx where xx is -A...00...+A"

- id: z2_tone_bass_up
  label: Zone2 Bass Up
  kind: action
  command: "!1ZTNBUP"
  params: []

- id: z2_tone_bass_down
  label: Zone2 Bass Down
  kind: action
  command: "!1ZTNBDOWN"
  params: []

- id: z2_tone_treble_up
  label: Zone2 Treble Up
  kind: action
  command: "!1ZTNTUP"
  params: []

- id: z2_tone_treble_down
  label: Zone2 Treble Down
  kind: action
  command: "!1ZTNTDOWN"
  params: []

- id: z2_tone_query
  label: Zone2 Tone Query
  kind: query
  command: "!1ZTNQSTN"
  params: []

- id: z2_balance_set
  label: Set Zone2 Balance
  kind: action
  command: "!1ZBL{value}"
  params:
    - name: value
      type: string
      description: "xx where xx is -A...00...+A"

- id: z2_balance_up
  label: Zone2 Balance Up (R)
  kind: action
  command: "!1ZBLUP"
  params: []

- id: z2_balance_down
  label: Zone2 Balance Down (L)
  kind: action
  command: "!1ZBLDOWN"
  params: []

- id: z2_balance_query
  label: Zone2 Balance Query
  kind: query
  command: "!1ZBLQSTN"
  params: []

- id: z2_input_select
  label: Select Zone2 Input
  kind: action
  command: "!1SLZ{code}"
  params:
    - name: code
      type: string
      description: 'Input code: 00-06 VIDEO1-7, 10 DVD, 20 TAPE1, 21 TAPE2, 22 PHONO, 23 CD, 24 FM, 25 AM, 26 TUNER, 27 MUSIC SERVER, 28 INTERNET RADIO, 29 USB Front, 2A USB Rear, 40 Universal PORT, 30 MULTI CH, 7F OFF, 80 SOURCE'

- id: z2_input_query
  label: Zone2 Input Query
  kind: query
  command: "!1SLZQSTN"
  params: []

- id: z2_net_play
  label: Zone2 Net Play
  kind: action
  command: "!1NTCPLAYz"
  params: []

- id: z2_net_stop
  label: Zone2 Net Stop
  kind: action
  command: "!1NTCSTOPz"
  params: []

- id: z2_net_pause
  label: Zone2 Net Pause
  kind: action
  command: "!1NTCPAUSEz"
  params: []

- id: z2_net_track_up
  label: Zone2 Net Track Up
  kind: action
  command: "!1NTCTRUPz"
  params: []

- id: z2_net_track_down
  label: Zone2 Net Track Down
  kind: action
  command: "!1NTCTRDNz"
  params: []

# === Zone 3 (DTX-8.9 confirmed Yes) ===

- id: z3_power_on
  label: Zone3 Power On
  kind: action
  command: "!1PW301"
  params: []

- id: z3_power_off
  label: Zone3 Standby
  kind: action
  command: "!1PW300"
  params: []

- id: z3_power_query
  label: Zone3 Power Query
  kind: query
  command: "!1PW3QSTN"
  params: []

- id: z3_mute_off
  label: Zone3 Mute Off
  kind: action
  command: "!1MT300"
  params: []

- id: z3_mute_on
  label: Zone3 Mute On
  kind: action
  command: "!1MT301"
  params: []

- id: z3_mute_toggle
  label: Zone3 Mute Wrap-Around
  kind: action
  command: "!1MT3TG"
  params: []

- id: z3_mute_query
  label: Zone3 Mute Query
  kind: query
  command: "!1MT3QSTN"
  params: []

- id: z3_volume_set
  label: Set Zone3 Volume
  kind: action
  command: "!1VL3{level}"
  params:
    - name: level
      type: string
      description: Volume level 00-64 hex (0-100)

- id: z3_volume_up
  label: Zone3 Volume Up
  kind: action
  command: "!1VL3UP"
  params: []

- id: z3_volume_down
  label: Zone3 Volume Down
  kind: action
  command: "!1VL3DOWN"
  params: []

- id: z3_volume_query
  label: Zone3 Volume Query
  kind: query
  command: "!1VL3QSTN"
  params: []

- id: z3_input_select
  label: Select Zone3 Input
  kind: action
  command: "!1SL3{code}"
  params:
    - name: code
      type: string
      description: 'Input code (DTX-8.9 supported): 00-04 VIDEO1-5, 10 DVD, 20 TAPE1, 22 PHONO, 23 CD, 24 FM, 25 AM, 26 TUNER, 80 SOURCE'

- id: z3_input_query
  label: Zone3 Input Query
  kind: query
  command: "!1SL3QSTN"
  params: []

- id: z3_tune_set
  label: Set Zone3 Tuning Frequency
  kind: action
  command: "!1TU3{freq}"
  params:
    - name: freq
      type: string
      description: 5-digit frequency (FM nnn.nn MHz / AM nnnnn kHz)

- id: z3_tune_up
  label: Zone3 Tuning Up
  kind: action
  command: "!1TU3UP"
  params: []

- id: z3_tune_down
  label: Zone3 Tuning Down
  kind: action
  command: "!1TU3DOWN"
  params: []

- id: z3_tune_query
  label: Zone3 Tuning Query
  kind: query
  command: "!1TU3QSTN"
  params: []

- id: z3_preset_set
  label: Set Zone3 Preset
  kind: action
  command: "!1PR3{num}"
  params:
    - name: num
      type: string
      description: Preset 01-28 hex (1-40)

- id: z3_preset_up
  label: Zone3 Preset Up
  kind: action
  command: "!1PR3UP"
  params: []

- id: z3_preset_down
  label: Zone3 Preset Down
  kind: action
  command: "!1PR3DOWN"
  params: []

- id: z3_preset_query
  label: Zone3 Preset Query
  kind: query
  command: "!1PR3QSTN"
  params: []

# === Dock via RI (CDS) - DTX-8.9 confirmed Yes ===

- id: dock_power_on
  label: Dock Power On
  kind: action
  command: "!1CDSPWRON"
  params: []

- id: dock_power_off
  label: Dock Standby
  kind: action
  command: "!1CDSPWROFF"
  params: []

- id: dock_play_resume
  label: Dock Play/Resume
  kind: action
  command: "!1CDSPLY/RES"
  params: []

- id: dock_stop
  label: Dock Stop
  kind: action
  command: "!1CDSSTOP"
  params: []

- id: dock_skip_forward
  label: Dock Track Up
  kind: action
  command: "!1CDSSKIP.F"
  params: []

- id: dock_skip_reverse
  label: Dock Track Down
  kind: action
  command: "!1CDSSKIP.R"
  params: []

- id: dock_pause
  label: Dock Pause
  kind: action
  command: "!1CDSPAUSE"
  params: []

- id: dock_play_pause
  label: Dock Play/Pause
  kind: action
  command: "!1CDSPLY/PAU"
  params: []

- id: dock_ff
  label: Dock FF
  kind: action
  command: "!1CDSFF"
  params: []

- id: dock_rew
  label: Dock Rewind
  kind: action
  command: "!1CDSREW"
  params: []

- id: dock_album_up
  label: Dock Album Up
  kind: action
  command: "!1CDSALBUM+"
  params: []

- id: dock_album_down
  label: Dock Album Down
  kind: action
  command: "!1CDSALBUM-"
  params: []

- id: dock_playlist_up
  label: Dock Playlist Up
  kind: action
  command: "!1CDSPLIST+"
  params: []

- id: dock_playlist_down
  label: Dock Playlist Down
  kind: action
  command: "!1CDSPLIST-"
  params: []

- id: dock_chapter_up
  label: Dock Chapter Up
  kind: action
  command: "!1CDSCHAPT+"
  params: []

- id: dock_chapter_down
  label: Dock Chapter Down
  kind: action
  command: "!1CDSCHAPT-"
  params: []

- id: dock_random
  label: Dock Shuffle
  kind: action
  command: "!1CDSRANDOM"
  params: []

- id: dock_repeat
  label: Dock Repeat
  kind: action
  command: "!1CDSREPEAT"
  params: []

- id: dock_mute
  label: Dock Mute
  kind: action
  command: "!1CDSMUTE"
  params: []

- id: dock_backlight
  label: Dock Backlight
  kind: action
  command: "!1CDSBLIGHT"
  params: []

- id: dock_menu
  label: Dock Menu
  kind: action
  command: "!1CDSMENU"
  params: []

- id: dock_enter
  label: Dock Select
  kind: action
  command: "!1CDSENTER"
  params: []

- id: dock_cursor_up
  label: Dock Cursor Up
  kind: action
  command: "!1CDSUP"
  params: []

- id: dock_cursor_down
  label: Dock Cursor Down
  kind: action
  command: "!1CDSDOWN"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, on]
  notes: "PWR 00 = Standby, PWR 01 = On (also reported as SST status message)"

- id: mute_state
  type: enum
  values: [off, on]
  notes: "AMT 00/01"

- id: volume_level
  type: integer
  range: [0, 100]
  notes: "MVL 00-64 hex (0-100 decimal)"

- id: input_selector
  type: enum
  values: [video1, video2, video3, video4, video5, video6, video7, dvd, tape1, tape2, phono, cd, fm, am, tuner, music_server, internet_radio, usb_front, usb_rear, universal_port, multi_ch]
  notes: "SLI code; query SLIQSTN returns current code"

- id: listening_mode
  type: enum
  notes: "LMD code returned by LMDQSTN; see LMD action for full code map"

- id: tuning_frequency
  type: string
  notes: "TUN nnnnn - FM nnn.nn MHz / AM nnnnn kHz"

- id: preset_number
  type: integer
  range: [1, 40]
  notes: "PRS 01-28 hex"

- id: z2_power_state
  type: enum
  values: [standby, on]

- id: z2_volume_level
  type: integer
  range: [0, 100]

- id: z3_power_state
  type: enum
  values: [standby, on]

- id: z3_volume_level
  type: integer
  range: [0, 100]

- id: net_play_status
  type: string
  notes: 'NST returns "prs" 3-letter status: p=Play(S/P/p/F/R), r=Repeat(-/R/F/1), s=Shuffle'

- id: net_time_info
  type: string
  notes: "NTM mm:ss/mm:ss (elapsed/total)"

- id: net_track_info
  type: string
  notes: "NTR cccc/tttt (current/total)"

- id: audio_information
  type: string
  notes: 'IFA "nnnnn:nnnnn" returned in response to DIF02 / IFAQSTN'

- id: video_information
  type: string
  notes: 'IFV "nnnnn:nnnnn" returned in response to DIF03 / IFVQSTN'
```

## Variables
```yaml
- id: master_volume
  type: integer
  range: [0, 100]
  unit: step
  notes: "Settable via MVL00-MVL64 (hex)"

- id: z2_volume
  type: integer
  range: [0, 100]
  unit: step

- id: z3_volume
  type: integer
  range: [0, 100]
  unit: step

- id: sleep_time
  type: integer
  range: [1, 90]
  unit: minute
  notes: "SLP01-SLP5A hex; SLPOFF disables"

- id: subwoofer_level
  type: integer
  range: [-15, 12]
  unit: dB
  notes: "SWL -F to +C"

- id: center_level
  type: integer
  range: [-12, 12]
  unit: dB
  notes: "CTL -C to +C"

- id: tcp_port
  type: integer
  default: 60128
  range: [49152, 65535]
  notes: "Configurable in Receiver setup menu; receiver must be power-cycled to apply change"
```

## Events
```yaml
- id: status_notification
  trigger: "Receiver state change"
  notes: |
    Per source §2.3: receiver sends unsolicited status messages on state change
    when a TCP connection is held continuously. Format matches command response
    (e.g. "SLI03" when input changes to DVD). Only one client connection allowed.

- id: power_state_change
  trigger: "PWR state change"
  notes: "Source-side messages use SST mnemonic ('!1SST00' = Standby)"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power sequencing
# requirements stated in source.
```

## Notes
- ISCP message framing: RS-232C uses `[CR]`, `[LF]`, or `[CR][LF]` as terminator. eISCP wraps the ISCP message in a 16-byte header (`ISCP` magic + header size 0x10 + data size BE + version 0x01 + reserved 0x000000) and terminates with `[EOF]` (0x1A) optionally followed by `[CR][LF]`.
- Destination Unit Type character is `1` (Receiver) — appears as the 2nd character of every command after the `!` start character.
- Response timing: receiver responds within 50 ms; failure to respond within 50 ms indicates communication failure. Inter-message interval must be ≥ 50 ms.
- TCP connection model: only one client connection allowed at a time. Connection must be held continuously to receive unsolicited status notifications.
- TCP port default 60128, configurable to any value in 49152–65535 via the receiver setup menu (requires power-cycle).
- Net/USB FF/REW commands must be sent continuously with ≤ 100 ms between codes per source §NTC notes.
- Some Zone3 commands (TN3 tone, BL3 balance, NT3 net, NP3 preset) explicitly marked "No" for DTX-8.9 in source compatibility tables and are intentionally omitted from this spec.
- Zone3 input selector (SL3) supports a subset of inputs vs Main / Zone2 — see param description on `z3_input_select`.
- XM, SIRIUS, HD Radio, and RDS commands are model-specific and not confirmed present on DTX-8.9; omitted from this spec.
- RI-attached source-device commands (CCD/CT1/CT2/CEQ/CDT/CDV/CMD/CCR) control external devices wired via the Onkyo RI bus, not the receiver itself; omitted from this spec. Dock-via-RI (CDS) is included because the source's Model Support Note explicitly lists CDS dock command support for DTX-8.9.
<!-- UNRESOLVED: full main-table DTX-8.9 column not extracted in the refined source — actions are populated from the explicit Model Support Note plus all commands the receiver-class ISCP protocol documents. Hardware verification against a DTX-8.9 unit recommended before promoting status above draft. -->
<!-- UNRESOLVED: TGA/TGB/TGC 12V trigger commands only function when each trigger's setup-menu parameter is OFF — runtime precondition stated in source. -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T01:48:15.092Z
last_checked_at: 2026-06-02T01:48:15.092Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T01:48:15.092Z
matched_actions: 322
action_count: 322
confidence: medium
summary: "All 322 spec actions verified against source ISCP protocol for DTX-8.9; transport parameters confirmed; DTX-8.9-specific features (Zone3, Dock) present and supported. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- XCN
- XAT
- XTI
- XCH
- XCT
- SCN
- SAT
- STI
- SCH
- SCT
- HAT
- HCN
- "firmware version compatibility range not stated in source"
- "no explicit multi-step macro sequences defined in source"
- "no safety warnings, interlock procedures, or power sequencing"
- "full main-table DTX-8.9 column not extracted in the refined source — actions are populated from the explicit Model Support Note plus all commands the receiver-class ISCP protocol documents. Hardware verification against a DTX-8.9 unit recommended before promoting status above draft."
- "TGA/TGB/TGC 12V trigger commands only function when each trigger's setup-menu parameter is OFF — runtime precondition stated in source."
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
