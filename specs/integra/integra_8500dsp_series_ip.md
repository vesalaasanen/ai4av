---
spec_id: admin/integra-8500dsp-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra 8500DSP Series Control Spec"
manufacturer: Integra
model_family: "8500DSP Series"
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - "8500DSP Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.integrahometheater.com
source_urls:
  - "https://assets.integrahometheater.com/product-firmware/Third-Party-Drivers/Crestron_Driver.zip?v=1776701789"
retrieved_at: 2026-09-12T04:03:15.153Z
last_checked_at: 2026-10-01T07:10:30.871Z
generated_at: 2026-10-01T07:10:30.871Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a multi-model generic protocol document; exact command subset supported by 8500DSP Series not confirmed"
  - "source file ends at the CDS dock-command table; table may be truncated mid-list"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures stated in source."
verification:
  verdict: verified
  checked_at: 2026-10-01T07:10:30.871Z
  matched_actions: 551
  action_count: 551
  confidence: medium
  summary: "All 551 spec action units map to ISCP commands documented in the source, transport params match. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-12
---

# Integra 8500DSP Series Control Spec

## Summary
AV receiver controlled via ISCP (Integra Serial Control Protocol), a fixed 3-character command + variable-length parameter scheme, over RS-232C (9600 8N1, 3-wire) and Ethernet (eISCP over TCP, default port 60128). Source document is the generic Integra "Serial Communication Protocol for AV Receiver" v1.15 (31 Aug 2009); covers main zone, Zone2/3/4, tuner/XM/SIRIUS/HD Radio, network/USB playback, ONKYO RI peripheral control, and RI dock commands.

<!-- UNRESOLVED: source is a multi-model generic protocol document; exact command subset supported by 8500DSP Series not confirmed -->
<!-- UNRESOLVED: source file ends at the CDS dock-command table; table may be truncated mid-list -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 60128  # default; receiver-configurable 49152-65535 via setup menu (requires standby cycle)
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # 3-wire RS-232C; DB9 female: pin 2 TX, pin 3 RX, pin 5 GND; straight-thru cable
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
# powerable: PWR/ZPW/PW3/PW4 power commands present
# routable: SLI/SLR/SLA/SLZ/SL3/SL4 input routing commands present
# queryable: QSTN query commands present throughout
# levelable: MVL/ZVL/VL3/VL4 volume, tone, dimmer commands present
traits:
  - powerable
  - routable
  - queryable
  - levelable
```

## Actions
```yaml
# Command strings are ISCP messages (3-char command + parameter). Framing:
#   RS-232: "!" + "1" (destination unit=Receiver) + ISCP message + [CR] or [LF] or [CR][LF]
#   eISCP/TCP: eISCP packet header ("ISCP" magic, header size 0x00000010 BIGENDIAN,
#   data size BIGENDIAN, version 0x01, reserved 0x000000) + "!1" + ISCP message +
#   [EOF] or [EOF][CR] or [EOF][CR][LF] (model-dependent)
# Volume/level/preset numeric parameters are hexadecimal ASCII unless noted.

# --- Main zone: power / mute / speakers ---
- id: pwr_standby
  label: System Standby
  kind: action
  command: "PWR00"
  params: []
- id: pwr_on
  label: System On
  kind: action
  command: "PWR01"
  params: []
- id: pwr_query
  label: System Power Status Query
  kind: query
  command: "PWRQSTN"
  params: []
- id: amt_off
  label: Audio Muting Off
  kind: action
  command: "AMT00"
  params: []
- id: amt_on
  label: Audio Muting On
  kind: action
  command: "AMT01"
  params: []
- id: amt_toggle
  label: Audio Muting Wrap-Around
  kind: action
  command: "AMTTG"
  params: []
- id: amt_query
  label: Audio Muting State Query
  kind: query
  command: "AMTQSTN"
  params: []
- id: spa_off
  label: Speaker A Off
  kind: action
  command: "SPA00"
  params: []
- id: spa_on
  label: Speaker A On
  kind: action
  command: "SPA01"
  params: []
- id: spa_toggle
  label: Speaker A Wrap-Around
  kind: action
  command: "SPAUP"
  params: []
- id: spa_query
  label: Speaker A State Query
  kind: query
  command: "SPAQSTN"
  params: []
- id: spb_off
  label: Speaker B Off
  kind: action
  command: "SPB00"
  params: []
- id: spb_on
  label: Speaker B On
  kind: action
  command: "SPB01"
  params: []
- id: spb_toggle
  label: Speaker B Wrap-Around
  kind: action
  command: "SPBUP"
  params: []
- id: spb_query
  label: Speaker B State Query
  kind: query
  command: "SPBQSTN"
  params: []
- id: spl_surr_back
  label: Speaker Layout Surround Back
  kind: action
  command: "SPLSB"
  params: []
- id: spl_front_high
  label: Speaker Layout Front High (or SurrBack+Front High)
  kind: action
  command: "SPLFH"
  params: []
- id: spl_front_wide
  label: Speaker Layout Front Wide (or SurrBack+Front Wide)
  kind: action
  command: "SPLFW"
  params: []
- id: spl_toggle
  label: Speaker Layout Wrap-Around
  kind: action
  command: "SPLUP"
  params: []
- id: spl_query
  label: Speaker Layout State Query
  kind: query
  command: "SPLQSTN"
  params: []

# --- Main zone: volume / tone ---
- id: mvl_set
  label: Set Master Volume
  kind: action
  command: "MVL{level}"
  params:
    - name: level
      type: string
      description: Hex "00"-"64" for 0-100 scale, or "00"-"50" for 0-80 scale (model-dependent)
- id: mvl_up
  label: Master Volume Up
  kind: action
  command: "MVLUP"
  params: []
- id: mvl_down
  label: Master Volume Down
  kind: action
  command: "MVLDOWN"
  params: []
- id: mvl_up_1db
  label: Master Volume Up 1dB Step
  kind: action
  command: "MVLUP1"
  params: []
- id: mvl_down_1db
  label: Master Volume Down 1dB Step
  kind: action
  command: "MVLDOWN1"
  params: []
- id: mvl_query
  label: Master Volume Query
  kind: query
  command: "MVLQSTN"
  params: []
- id: tfr_bass_set
  label: Set Front Bass
  kind: action
  command: "TFRB{value}"
  params:
    - name: value
      type: string
      description: '"-A".."00".."+A" (-10..0..+10, 2-step)'
- id: tfr_treble_set
  label: Set Front Treble
  kind: action
  command: "TFRT{value}"
  params:
    - name: value
      type: string
      description: '"-A".."00".."+A" (-10..0..+10, 2-step)'
- id: tfr_bass_up
  label: Front Bass Up (2 step)
  kind: action
  command: "TFRBUP"
  params: []
- id: tfr_bass_down
  label: Front Bass Down (2 step)
  kind: action
  command: "TFRBDOWN"
  params: []
- id: tfr_treble_up
  label: Front Treble Up (2 step)
  kind: action
  command: "TFRTUP"
  params: []
- id: tfr_treble_down
  label: Front Treble Down (2 step)
  kind: action
  command: "TFRTDOWN"
  params: []
- id: tfr_query
  label: Front Tone Query
  kind: query
  command: "TFRQSTN"
  params: []
- id: tfw_bass_set
  label: Set Front Wide Bass
  kind: action
  command: "TFWB{value}"
  params:
    - name: value
      type: string
      description: '"-A".."00".."+A" (-10..0..+10, 2-step)'
- id: tfw_treble_set
  label: Set Front Wide Treble
  kind: action
  command: "TFWT{value}"
  params:
    - name: value
      type: string
      description: '"-A".."00".."+A" (-10..0..+10, 2-step)'
- id: tfw_bass_up
  label: Front Wide Bass Up (2 step)
  kind: action
  command: "TFWBUP"
  params: []
- id: tfw_bass_down
  label: Front Wide Bass Down (2 step)
  kind: action
  command: "TFWBDOWN"
  params: []
- id: tfw_treble_up
  label: Front Wide Treble Up (2 step)
  kind: action
  command: "TFWTUP"
  params: []
- id: tfw_treble_down
  label: Front Wide Treble Down (2 step)
  kind: action
  command: "TFWTDOWN"
  params: []
- id: tfw_query
  label: Front Wide Tone Query
  kind: query
  command: "TFWQSTN"
  params: []
- id: tfh_bass_set
  label: Set Front High Bass
  kind: action
  command: "TFHB{value}"
  params:
    - name: value
      type: string
      description: '"-A".."00".."+A" (-10..0..+10, 2-step)'
- id: tfh_treble_set
  label: Set Front High Treble
  kind: action
  command: "TFHT{value}"
  params:
    - name: value
      type: string
      description: '"-A".."00".."+A" (-10..0..+10, 2-step)'
- id: tfh_bass_up
  label: Front High Bass Up (2 step)
  kind: action
  command: "TFHBUP"
  params: []
- id: tfh_bass_down
  label: Front High Bass Down (2 step)
  kind: action
  command: "TFHBDOWN"
  params: []
- id: tfh_treble_up
  label: Front High Treble Up (2 step)
  kind: action
  command: "TFHTUP"
  params: []
- id: tfh_treble_down
  label: Front High Treble Down (2 step)
  kind: action
  command: "TFHTDOWN"
  params: []
- id: tfh_query
  label: Front High Tone Query
  kind: query
  command: "TFHQSTN"
  params: []
- id: tct_bass_set
  label: Set Center Bass
  kind: action
  command: "TCTB{value}"
  params:
    - name: value
      type: string
      description: '"-A".."00".."+A" (-10..0..+10, 2-step)'
- id: tct_treble_set
  label: Set Center Treble
  kind: action
  command: "TCTT{value}"
  params:
    - name: value
      type: string
      description: '"-A".."00".."+A" (-10..0..+10, 2-step)'
- id: tct_bass_up
  label: Center Bass Up (2 step)
  kind: action
  command: "TCTBUP"
  params: []
- id: tct_bass_down
  label: Center Bass Down (2 step)
  kind: action
  command: "TCTBDOWN"
  params: []
- id: tct_treble_up
  label: Center Treble Up (2 step)
  kind: action
  command: "TCTTUP"
  params: []
- id: tct_treble_down
  label: Center Treble Down (2 step)
  kind: action
  command: "TCTTDOWN"
  params: []
- id: tct_query
  label: Center Tone Query
  kind: query
  command: "TCTQSTN"
  params: []
- id: tsr_bass_set
  label: Set Surround Bass
  kind: action
  command: "TSRB{value}"
  params:
    - name: value
      type: string
      description: '"-A".."00".."+A" (-10..0..+10, 2-step)'
- id: tsr_treble_set
  label: Set Surround Treble
  kind: action
  command: "TSRT{value}"
  params:
    - name: value
      type: string
      description: '"-A".."00".."+A" (-10..0..+10, 2-step)'
- id: tsr_bass_up
  label: Surround Bass Up (2 step)
  kind: action
  command: "TSRBUP"
  params: []
- id: tsr_bass_down
  label: Surround Bass Down (2 step)
  kind: action
  command: "TSRBDOWN"
  params: []
- id: tsr_treble_up
  label: Surround Treble Up (2 step)
  kind: action
  command: "TSRTUP"
  params: []
- id: tsr_treble_down
  label: Surround Treble Down (2 step)
  kind: action
  command: "TSRTDOWN"
  params: []
- id: tsr_query
  label: Surround Tone Query
  kind: query
  command: "TSRQSTN"
  params: []
- id: tsb_bass_set
  label: Set Surround Back Bass
  kind: action
  command: "TSBB{value}"
  params:
    - name: value
      type: string
      description: '"-A".."00".."+A" (-10..0..+10, 2-step)'
- id: tsb_treble_set
  label: Set Surround Back Treble
  kind: action
  command: "TSBT{value}"
  params:
    - name: value
      type: string
      description: '"-A".."00".."+A" (-10..0..+10, 2-step)'
- id: tsb_bass_up
  label: Surround Back Bass Up (2 step)
  kind: action
  command: "TSBBUP"
  params: []
- id: tsb_bass_down
  label: Surround Back Bass Down (2 step)
  kind: action
  command: "TSBBDOWN"
  params: []
- id: tsb_treble_up
  label: Surround Back Treble Up (2 step)
  kind: action
  command: "TSBTUP"
  params: []
- id: tsb_treble_down
  label: Surround Back Treble Down (2 step)
  kind: action
  command: "TSBTDOWN"
  params: []
- id: tsb_query
  label: Surround Back Tone Query
  kind: query
  command: "TSBQSTN"
  params: []
- id: tsw_bass_set
  label: Set Subwoofer Bass
  kind: action
  command: "TSWB{value}"
  params:
    - name: value
      type: string
      description: '"-A".."00".."+A" (-10..0..+10, 2-step)'
- id: tsw_bass_up
  label: Subwoofer Bass Up (2 step)
  kind: action
  command: "TSWBUP"
  params: []
- id: tsw_bass_down
  label: Subwoofer Bass Down (2 step)
  kind: action
  command: "TSWBDOWN"
  params: []
- id: tsw_query
  label: Subwoofer Tone Query
  kind: query
  command: "TSWQSTN"
  params: []

# --- Sleep / level calibration / temp levels ---
- id: slp_set
  label: Set Sleep Time
  kind: action
  command: "SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: Hex "01"-"5A" for 1-90 minutes
- id: slp_off
  label: Sleep Time Off
  kind: action
  command: "SLPOFF"
  params: []
- id: slp_up
  label: Sleep Time Wrap-Around Up
  kind: action
  command: "SLPUP"
  params: []
- id: slp_query
  label: Sleep Time Query
  kind: query
  command: "SLPQSTN"
  params: []
- id: slc_test
  label: Speaker Level Calibration TEST Key
  kind: action
  command: "SLCTEST"
  params: []
- id: slc_chsel
  label: Speaker Level Calibration CH SEL Key
  kind: action
  command: "SLCCHSEL"
  params: []
- id: slc_up
  label: Speaker Level Calibration LEVEL + Key
  kind: action
  command: "SLCUP"
  params: []
- id: slc_down
  label: Speaker Level Calibration LEVEL - Key
  kind: action
  command: "SLCDOWN"
  params: []
- id: swl_set
  label: Set Subwoofer Temporary Level
  kind: action
  command: "SWL{value}"
  params:
    - name: value
      type: string
      description: '"-F".."00".."+C" (-15dB..0dB..+12dB)'
- id: swl_up
  label: Subwoofer Level Up
  kind: action
  command: "SWLUP"
  params: []
- id: swl_down
  label: Subwoofer Level Down
  kind: action
  command: "SWLDOWN"
  params: []
- id: swl_query
  label: Subwoofer Level Query
  kind: query
  command: "SWLQSTN"
  params: []
- id: ctl_set
  label: Set Center Temporary Level
  kind: action
  command: "CTL{value}"
  params:
    - name: value
      type: string
      description: '"-C".."00".."+C" (-12dB..0dB..+12dB)'
- id: ctl_up
  label: Center Level Up
  kind: action
  command: "CTLUP"
  params: []
- id: ctl_down
  label: Center Level Down
  kind: action
  command: "CTLDOWN"
  params: []
- id: ctl_query
  label: Center Level Query
  kind: query
  command: "CTLQSTN"
  params: []

# --- Display (DIF codes appear in two source tables: Display Information and Display Mode; payloads identical) ---
- id: dif_00
  label: Display Program Format / Selector+Volume Display Mode
  kind: action
  command: "DIF00"
  params: []
- id: dif_01
  label: Display Digital Input Position / Selector+Listening Mode Display Mode
  kind: action
  command: "DIF01"
  params: []
- id: dif_02
  label: Display Digital Format (temporary; triggers IFA response)
  kind: action
  command: "DIF02"
  params: []
- id: dif_03
  label: Display Bass Level / Video Format (temporary; triggers IFV response)
  kind: action
  command: "DIF03"
  params: []
- id: dif_04
  label: Display Treble Level
  kind: action
  command: "DIF04"
  params: []
- id: dif_toggle
  label: Display Mode Wrap-Around Up
  kind: action
  command: "DIFTG"
  params: []
- id: dif_query
  label: Display Mode Query
  kind: query
  command: "DIFQSTN"
  params: []
- id: dim_bright
  label: Dimmer Level Bright
  kind: action
  command: "DIM00"
  params: []
- id: dim_dim
  label: Dimmer Level Dim
  kind: action
  command: "DIM01"
  params: []
- id: dim_dark
  label: Dimmer Level Dark
  kind: action
  command: "DIM02"
  params: []
- id: dim_shut_off
  label: Dimmer Level Shut-Off
  kind: action
  command: "DIM03"
  params: []
- id: dim_bright_led_off
  label: Dimmer Level Bright & LED OFF
  kind: action
  command: "DIM08"
  params: []
- id: dim_toggle
  label: Dimmer Level Wrap-Around Up
  kind: action
  command: "DIMDIM"
  params: []
- id: dim_query
  label: Dimmer Level Query
  kind: query
  command: "DIMQSTN"
  params: []

# --- Setup OSD / memory ---
- id: osd_menu
  label: OSD Menu Key
  kind: action
  command: "OSDMENU"
  params: []
- id: osd_up
  label: OSD Up Key
  kind: action
  command: "OSDUP"
  params: []
- id: osd_down
  label: OSD Down Key
  kind: action
  command: "OSDDOWN"
  params: []
- id: osd_right
  label: OSD Right Key
  kind: action
  command: "OSDRIGHT"
  params: []
- id: osd_left
  label: OSD Left Key
  kind: action
  command: "OSDLEFT"
  params: []
- id: osd_enter
  label: OSD Enter Key
  kind: action
  command: "OSDENTER"
  params: []
- id: osd_exit
  label: OSD Exit Key
  kind: action
  command: "OSDEXIT"
  params: []
- id: osd_audio
  label: OSD Audio Adjust Key
  kind: action
  command: "OSDAUDIO"
  params: []
- id: osd_video
  label: OSD Video Adjust Key
  kind: action
  command: "OSDVIDEO"
  params: []
- id: mem_store
  label: Memory Store
  kind: action
  command: "MEMSTR"
  params: []
- id: mem_recall
  label: Memory Recall
  kind: action
  command: "MEMRCL"
  params: []
- id: mem_lock
  label: Memory Lock
  kind: action
  command: "MEMLOCK"
  params: []
- id: mem_unlock
  label: Memory Unlock
  kind: action
  command: "MEMUNLK"
  params: []
- id: ifa_query
  label: Audio Information Query
  kind: query
  command: "IFAQSTN"
  params: []
- id: ifv_query
  label: Video Information Query
  kind: query
  command: "IFVQSTN"
  params: []

# --- Input / output selection ---
- id: sli_set
  label: Select Input
  kind: action
  command: "SLI{input}"
  params:
    - name: input
      type: string
      description: 'Hex code - 00 VIDEO1(VCR/DVR), 01 VIDEO2(CBL/SAT), 02 VIDEO3(GAME/TV), 03 VIDEO4(AUX1/AUX), 04 VIDEO5(AUX2), 05 VIDEO6, 06 VIDEO7, 10 DVD, 20 TAPE(1)/TV/TAPE, 21 TAPE2, 22 PHONO, 23 CD, 24 FM, 25 AM, 26 TUNER, 27 MUSIC SERVER, 28 INTERNET RADIO, 29 USB/USB(Front), 2A USB(Rear), 30 MULTI CH, 31 XM (XM models only), 32 SIRIUS (SIRIUS models only), 40 Universal PORT'
- id: sli_up
  label: Input Selector Wrap-Around Up
  kind: action
  command: "SLIUP"
  params: []
- id: sli_down
  label: Input Selector Wrap-Around Down
  kind: action
  command: "SLIDOWN"
  params: []
- id: sli_query
  label: Input Selector Query
  kind: query
  command: "SLIQSTN"
  params: []
- id: slr_set
  label: Select RECOUT
  kind: action
  command: "SLR{input}"
  params:
    - name: input
      type: string
      description: 'Hex code - 00 VIDEO1, 01 VIDEO2, 02 VIDEO3, 03 VIDEO4, 04 VIDEO5, 05 VIDEO6, 06 VIDEO7, 10 DVD, 20 TAPE(1), 21 TAPE2, 22 PHONO, 23 CD, 24 FM, 25 AM, 26 TUNER, 27 MUSIC SERVER, 28 INTERNET RADIO, 30 MULTI CH, 31 XM, 7F OFF, 80 SOURCE'
- id: slr_query
  label: RECOUT Selector Query
  kind: query
  command: "SLRQSTN"
  params: []
- id: sla_set
  label: Select Audio Input
  kind: action
  command: "SLA{mode}"
  params:
    - name: mode
      type: string
      description: '00 AUTO, 01 MULTI-CHANNEL, 02 ANALOG, 03 iLINK, 04 HDMI, 05 COAX/OPT, 06 BALANCE'
- id: sla_up
  label: Audio Selector Wrap-Around Up
  kind: action
  command: "SLAUP"
  params: []
- id: sla_query
  label: Audio Selector Query
  kind: query
  command: "SLAQSTN"
  params: []
- id: tga_off
  label: 12V Trigger A Off
  kind: action
  command: "TGA00"
  params: []
- id: tga_on
  label: 12V Trigger A On
  kind: action
  command: "TGA01"
  params: []
- id: tgb_off
  label: 12V Trigger B Off
  kind: action
  command: "TGB00"
  params: []
- id: tgb_on
  label: 12V Trigger B On
  kind: action
  command: "TGB01"
  params: []
- id: tgc_off
  label: 12V Trigger C Off
  kind: action
  command: "TGC00"
  params: []
- id: tgc_on
  label: 12V Trigger C On
  kind: action
  command: "TGC01"
  params: []
- id: vos_set
  label: Video Output Selector (Japanese model only)
  kind: action
  command: "VOS{mode}"
  params:
    - name: mode
      type: string
      description: '00 D4, 01 Component'
- id: vos_query
  label: Video Output Selector Query
  kind: query
  command: "VOSQSTN"
  params: []
- id: hdo_set
  label: HDMI Output Selector
  kind: action
  command: "HDO{mode}"
  params:
    - name: mode
      type: string
      description: '00 No Analog, 01 Yes/Out Main, 02 Out Sub, 03 Both, 04 Both(Main), 05 Both(Sub)'
- id: hdo_up
  label: HDMI Out Selector Wrap-Around Up
  kind: action
  command: "HDOUP"
  params: []
- id: hdo_query
  label: HDMI Out Selector Query
  kind: query
  command: "HDOQSTN"
  params: []
- id: res_set
  label: Monitor Out Resolution
  kind: action
  command: "RES{mode}"
  params:
    - name: mode
      type: string
      description: '00 Through, 01 Auto (HDMI only), 02 480p, 03 720p, 04 1080i, 05 1080p (HDMI only), 07 1080p/24fs (HDMI only), 06 Source'
- id: res_up
  label: Monitor Out Resolution Wrap-Around Up
  kind: action
  command: "RESUP"
  params: []
- id: res_query
  label: Monitor Out Resolution Query
  kind: query
  command: "RESQSTN"
  params: []
- id: isf_set
  label: ISF Mode
  kind: action
  command: "ISF{mode}"
  params:
    - name: mode
      type: string
      description: '00 Custom, 01 Day, 02 Night'
- id: isf_up
  label: ISF Mode Wrap-Around Up
  kind: action
  command: "ISFUP"
  params: []
- id: isf_query
  label: ISF Mode Query
  kind: query
  command: "ISFQSTN"
  params: []

# --- Listening mode / surround processors ---
- id: lmd_set
  label: Set Listening Mode
  kind: action
  command: "LMD{mode}"
  params:
    - name: mode
      type: string
      description: 'Hex code - 00 STEREO, 01 DIRECT, 02 SURROUND, 03 FILM(Game-RPG), 04 THX, 05 ACTION(Game-Action), 06 MUSICAL(Game-Rock), 07 MONO MOVIE, 08 ORCHESTRA, 09 UNPLUGGED, 0A STUDIO-MIX, 0B TV LOGIC, 0C ALL CH STEREO, 0D THEATER-DIMENSIONAL, 0E ENHANCED 7/ENHANCE(Game-Sports), 0F MONO, 11 PURE AUDIO, 12 MULTIPLEX, 13 FULL MONO, 14 DOLBY VIRTUAL, 15 DTS Surround Sensation, 16 Audyssey DSX, 40 5.1ch Surround/Straight Decode, 41 Dolby EX/DTS ES, 42 THX Cinema, 43 THX Surround EX, 44 THX Music, 45 THX Games, 50 U2/S2 Cinema, 51 MusicMode U2/S2 Music, 52 GamesMode U2/S2 Games, 80 PLII/PLIIx Movie, 81 PLII/PLIIx Music, 82 Neo:6 Cinema, 83 Neo:6 Music, 84 PLII/PLIIx THX Cinema, 85 Neo:6 THX Cinema, 86 PLII/PLIIx Game, 87 Neural Surr (NA models), 88 Neural THX/Neural Surround, 89 PLII/PLIIx THX Games, 8A Neo:6 THX Games, 8B PLII/PLIIx THX Music, 8C Neo:6 THX Music, 8D Neural THX Cinema, 8E Neural THX Music, 8F Neural THX Games, 90 PLIIz Height, 91 Neo:6 Cinema DTS Surround Sensation, 92 Neo:6 Music DTS Surround Sensation, 93 Neural Digital Music, 94 PLIIz Height+THX Cinema, 95 PLIIz Height+THX Music, 96 PLIIz Height+THX Games, 97 PLIIz Height+THX U2/S2 Cinema, 98 PLIIz Height+THX U2/S2 Music, 99 PLIIz Height+THX U2/S2 Games, A0 PLIIx/PLII Movie+Audyssey DSX, A1 PLIIx/PLII Music+Audyssey DSX, A2 PLIIx/PLII Game+Audyssey DSX, A3 Neo:6 Cinema+Audyssey DSX, A4 Neo:6 Music+Audyssey DSX, A5 Neural Surround+Audyssey DSX, A6 Neural Digital Music+Audyssey DSX, A7 Dolby EX+Audyssey DSX'
- id: lmd_up
  label: Listening Mode Wrap-Around Up
  kind: action
  command: "LMDUP"
  params: []
- id: lmd_down
  label: Listening Mode Wrap-Around Down
  kind: action
  command: "LMDDOWN"
  params: []
- id: lmd_movie
  label: Listening Mode Movie Wrap-Around Up
  kind: action
  command: "LMDMOVIE"
  params: []
- id: lmd_music
  label: Listening Mode Music Wrap-Around Up
  kind: action
  command: "LMDMUSIC"
  params: []
- id: lmd_game
  label: Listening Mode Game Wrap-Around Up
  kind: action
  command: "LMDGAME"
  params: []
- id: lmd_query
  label: Listening Mode Query
  kind: query
  command: "LMDQSTN"
  params: []
- id: ltn_set
  label: Set Late Night
  kind: action
  command: "LTN{level}"
  params:
    - name: level
      type: string
      description: '00 Off, 01 Low@DolbyDigital/On@TrueHD, 02 High@DolbyDigital, 03 Auto@DolbyTrueHD'
- id: ltn_up
  label: Late Night Wrap-Around Up
  kind: action
  command: "LTNUP"
  params: []
- id: ltn_query
  label: Late Night Level Query
  kind: query
  command: "LTNQSTN"
  params: []
- id: ras_set
  label: Set Re-EQ/Academy/Cinema Filter
  kind: action
  command: "RAS{mode}"
  params:
    - name: mode
      type: string
      description: '00 Both Off / Re-EQ Off / Cinema Filter Off, 01 Re-EQ On / Cinema Filter On, 02 Academy On (three model-variant tables share opcode RAS)'
- id: ras_up
  label: Re-EQ/Academy Wrap-Around Up
  kind: action
  command: "RASUP"
  params: []
- id: ras_query
  label: Re-EQ/Academy State Query
  kind: query
  command: "RASQSTN"
  params: []
- id: ady_off
  label: Audyssey 2EQ/MultEQ/MultEQ XT Off
  kind: action
  command: "ADY00"
  params: []
- id: ady_on
  label: Audyssey 2EQ/MultEQ/MultEQ XT On
  kind: action
  command: "ADY01"
  params: []
- id: ady_up
  label: Audyssey State Wrap-Around Up
  kind: action
  command: "ADYUP"
  params: []
- id: ady_query
  label: Audyssey State Query
  kind: query
  command: "ADYQSTN"
  params: []
- id: adq_off
  label: Audyssey Dynamic EQ Off
  kind: action
  command: "ADQ00"
  params: []
- id: adq_on
  label: Audyssey Dynamic EQ On
  kind: action
  command: "ADQ01"
  params: []
- id: adq_up
  label: Audyssey Dynamic EQ Wrap-Around Up
  kind: action
  command: "ADQUP"
  params: []
- id: adq_query
  label: Audyssey Dynamic EQ Query
  kind: query
  command: "ADQQSTN"
  params: []
- id: adv_set
  label: Set Audyssey Dynamic Volume
  kind: action
  command: "ADV{mode}"
  params:
    - name: mode
      type: string
      description: '00 Off, 01 Light, 02 Medium, 03 Heavy'
- id: adv_up
  label: Audyssey Dynamic Volume Wrap-Around Up
  kind: action
  command: "ADVUP"
  params: []
- id: adv_query
  label: Audyssey Dynamic Volume Query
  kind: query
  command: "ADVQSTN"
  params: []
- id: dvl_set
  label: Set Dolby Volume
  kind: action
  command: "DVL{mode}"
  params:
    - name: mode
      type: string
      description: '00 Off, 01 Low, 02 Mid, 03 High'
- id: dvl_up
  label: Dolby Volume Wrap-Around Up
  kind: action
  command: "DVLUP"
  params: []
- id: dvl_query
  label: Dolby Volume Query
  kind: query
  command: "DVLQSTN"
  params: []
- id: mot_off
  label: Music Optimizer Off
  kind: action
  command: "MOT00"
  params: []
- id: mot_on
  label: Music Optimizer On
  kind: action
  command: "MOT01"
  params: []
- id: mot_up
  label: Music Optimizer Wrap-Around Up
  kind: action
  command: "MOTUP"
  params: []
- id: mot_query
  label: Music Optimizer Query
  kind: query
  command: "MOTQSTN"
  params: []

# --- Tuner (shared MAIN/ZONE) ---
- id: tun_set
  label: Direct Tuning Frequency (main and Zone2 share TUN)
  kind: action
  command: "TUN{frequency}"
  params:
    - name: frequency
      type: string
      description: 5 digits - FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch (leading two digits 0 for XM)
- id: tun_up
  label: Tuning Frequency Wrap-Around Up
  kind: action
  command: "TUNUP"
  params: []
- id: tun_down
  label: Tuning Frequency Wrap-Around Down
  kind: action
  command: "TUNDOWN"
  params: []
- id: tun_query
  label: Tuning Frequency Query
  kind: query
  command: "TUNQSTN"
  params: []
- id: prs_set
  label: Set Preset No. (main and Zone2 share PRS)
  kind: action
  command: "PRS{preset}"
  params:
    - name: preset
      type: string
      description: Hex "01"-"28" for preset 1-40 (or "01"-"1E" for 1-30, model-dependent)
- id: prs_up
  label: Preset No. Wrap-Around Up
  kind: action
  command: "PRSUP"
  params: []
- id: prs_down
  label: Preset No. Wrap-Around Down
  kind: action
  command: "PRSDOWN"
  params: []
- id: prs_query
  label: Preset No. Query
  kind: query
  command: "PRSQSTN"
  params: []
- id: prm_set
  label: Preset Memory
  kind: action
  command: "PRM{preset}"
  params:
    - name: preset
      type: string
      description: Hex "01"-"28" for preset 1-40 (or "01"-"1E" for 1-30)
- id: rds_rt
  label: Display RDS RT Information
  kind: action
  command: "RDS00"
  params: []
- id: rds_pty
  label: Display RDS PTY Information
  kind: action
  command: "RDS01"
  params: []
- id: rds_tp
  label: Display RDS TP Information
  kind: action
  command: "RDS02"
  params: []
- id: rds_up
  label: RDS Information Wrap-Around Change
  kind: action
  command: "RDSUP"
  params: []
- id: pts_set
  label: Set PTY No.
  kind: action
  command: "PTS{pty}"
  params:
    - name: pty
      type: string
      description: Hex "00"-"1E" for PTY 0-30
- id: pts_enter
  label: Finish PTY Scan
  kind: action
  command: "PTSENTER"
  params: []
- id: tps_start
  label: Start TP Scan (no parameter)
  kind: action
  command: "TPS"
  params: []
- id: tps_enter
  label: Finish TP Scan
  kind: action
  command: "TPSENTER"
  params: []

# --- XM (XM models only) ---
- id: xcn_query
  label: XM Channel Name Query
  kind: query
  command: "XCNQSTN"
  params: []
- id: xat_query
  label: XM Artist Name Query
  kind: query
  command: "XATQSTN"
  params: []
- id: xti_query
  label: XM Title Query
  kind: query
  command: "XTIQSTN"
  params: []
- id: xch_set
  label: Set XM Channel Number
  kind: action
  command: "XCH{channel}"
  params:
    - name: channel
      type: string
      description: '"000"-"255"'
- id: xch_up
  label: XM Channel Wrap-Around Up
  kind: action
  command: "XCHUP"
  params: []
- id: xch_down
  label: XM Channel Wrap-Around Down
  kind: action
  command: "XCHDOWN"
  params: []
- id: xch_query
  label: XM Channel Number Query
  kind: query
  command: "XCHQSTN"
  params: []
- id: xct_up
  label: XM Category Wrap-Around Up
  kind: action
  command: "XCTUP"
  params: []
- id: xct_down
  label: XM Category Wrap-Around Down
  kind: action
  command: "XCTDOWN"
  params: []
- id: xct_query
  label: XM Category Query
  kind: query
  command: "XCTQSTN"
  params: []

# --- SIRIUS (SIRIUS models only) ---
- id: scn_query
  label: SIRIUS Channel Name Query
  kind: query
  command: "SCNQSTN"
  params: []
- id: sat_query
  label: SIRIUS Artist Name Query
  kind: query
  command: "SATQSTN"
  params: []
- id: sti_query
  label: SIRIUS Title Query
  kind: query
  command: "STIQSTN"
  params: []
- id: sch_set
  label: Set SIRIUS Channel Number
  kind: action
  command: "SCH{channel}"
  params:
    - name: channel
      type: string
      description: '"000"-"255"'
- id: sch_up
  label: SIRIUS Channel Wrap-Around Up
  kind: action
  command: "SCHUP"
  params: []
- id: sch_down
  label: SIRIUS Channel Wrap-Around Down
  kind: action
  command: "SCHDOWN"
  params: []
- id: sch_query
  label: SIRIUS Channel Number Query
  kind: query
  command: "SCHQSTN"
  params: []
- id: sct_up
  label: SIRIUS Category Wrap-Around Up
  kind: action
  command: "SCTUP"
  params: []
- id: sct_down
  label: SIRIUS Category Wrap-Around Down
  kind: action
  command: "SCTDOWN"
  params: []
- id: sct_query
  label: SIRIUS Category Query
  kind: query
  command: "SCTQSTN"
  params: []
- id: slk_password_set
  label: Set SIRIUS Parental Lock Password
  kind: action
  command: "SLK{password}"
  params:
    - name: password
      type: string
      description: 4 digits
- id: slk_input
  label: Display Lock Password Input Prompt
  kind: action
  command: "SLKINPUT"
  params: []
- id: slk_wrong
  label: Display Wrong Lock Password Message
  kind: action
  command: "SLKWRONG"
  params: []

# --- HD Radio (HD Radio models only) ---
- id: hat_query
  label: HD Radio Artist Name Query
  kind: query
  command: "HATQSTN"
  params: []
- id: hcn_query
  label: HD Radio Channel Name Query
  kind: query
  command: "HCNQSTN"
  params: []
- id: hti_query
  label: HD Radio Title Query
  kind: query
  command: "HTIQSTN"
  params: []
- id: hds_query
  label: HD Radio Detail Info Query
  kind: query
  command: "HDSQSTN"
  params: []
- id: hpr_set
  label: Set HD Radio Channel Program
  kind: action
  command: "HPR{program}"
  params:
    - name: program
      type: string
      description: Hex "01"-"08"
- id: hpr_query
  label: HD Radio Channel Program Query
  kind: query
  command: "HPRQSTN"
  params: []
- id: hbl_set
  label: Set HD Radio Blend Mode
  kind: action
  command: "HBL{mode}"
  params:
    - name: mode
      type: string
      description: '00 Auto, 01 Analog'
- id: hbl_query
  label: HD Radio Blend Mode Query
  kind: query
  command: "HBLQSTN"
  params: []
- id: hts_query
  label: HD Radio Tuner Status Query
  kind: query
  command: "HTSQSTN"
  params: []

# --- Network/USB operation (network models; NTC) ---
- id: ntc_play
  label: Net/USB Play Key
  kind: action
  command: "NTCPLAY"
  params: []
- id: ntc_stop
  label: Net/USB Stop Key
  kind: action
  command: "NTCSTOP"
  params: []
- id: ntc_pause
  label: Net/USB Pause Key
  kind: action
  command: "NTCPAUSE"
  params: []
- id: ntc_track_up
  label: Net/USB Track Up Key
  kind: action
  command: "NTCTRUP"
  params: []
- id: ntc_track_down
  label: Net/USB Track Down Key
  kind: action
  command: "NTCTRDN"
  params: []
- id: ntc_ff
  label: Net/USB FF Key (continuous - resend with no more than 100ms between codes)
  kind: action
  command: "NTCFF"
  params: []
- id: ntc_rew
  label: Net/USB REW Key (continuous - resend with no more than 100ms between codes)
  kind: action
  command: "NTCREW"
  params: []
- id: ntc_repeat
  label: Net/USB Repeat Key
  kind: action
  command: "NTCREPEAT"
  params: []
- id: ntc_random
  label: Net/USB Random Key
  kind: action
  command: "NTCRANDOM"
  params: []
- id: ntc_display
  label: Net/USB Display Key
  kind: action
  command: "NTCDISPLAY"
  params: []
- id: ntc_album
  label: Net/USB Album Key
  kind: action
  command: "NTCALBUM"
  params: []
- id: ntc_artist
  label: Net/USB Artist Key
  kind: action
  command: "NTCARTIST"
  params: []
- id: ntc_genre
  label: Net/USB Genre Key
  kind: action
  command: "NTCGENRE"
  params: []
- id: ntc_playlist
  label: Net/USB Playlist Key
  kind: action
  command: "NTCPLAYLIST"
  params: []
- id: ntc_right
  label: Net/USB Right Key
  kind: action
  command: "NTCRIGHT"
  params: []
- id: ntc_left
  label: Net/USB Left Key
  kind: action
  command: "NTCLEFT"
  params: []
- id: ntc_up
  label: Net/USB Up Key
  kind: action
  command: "NTCUP"
  params: []
- id: ntc_down
  label: Net/USB Down Key
  kind: action
  command: "NTCDOWN"
  params: []
- id: ntc_select
  label: Net/USB Select Key
  kind: action
  command: "NTCSELECT"
  params: []
- id: ntc_number
  label: Net/USB 0-9 Key
  kind: action
  command: "NTC{n}"
  params:
    - name: n
      type: string
      description: Single digit 0-9
- id: ntc_delete
  label: Net/USB Delete Key
  kind: action
  command: "NTCDELETE"
  params: []
- id: ntc_caps
  label: Net/USB Caps Key
  kind: action
  command: "NTCCAPS"
  params: []
- id: ntc_location
  label: Net/USB Location Key
  kind: action
  command: "NTCLOCATION"
  params: []
- id: ntc_language
  label: Net/USB Language Key
  kind: action
  command: "NTCLANGUAGE"
  params: []
- id: ntc_setup
  label: Net/USB Setup Key
  kind: action
  command: "NTCSETUP"
  params: []
- id: ntc_return
  label: Net/USB Return Key
  kind: action
  command: "NTCRETURN"
  params: []
- id: ntc_ch_up
  label: Net/USB CH Up (iRadio)
  kind: action
  command: "NTCCHUP"
  params: []
- id: ntc_ch_down
  label: Net/USB CH Down (iRadio)
  kind: action
  command: "NTCCHDN"
  params: []
- id: nat_query
  label: Net/USB Artist Name Query
  kind: query
  command: "NATQSTN"
  params: []
- id: nal_query
  label: Net/USB Album Name Query
  kind: query
  command: "NALQSTN"
  params: []
- id: nti_query
  label: Net/USB Title Name Query
  kind: query
  command: "NTIQSTN"
  params: []
- id: ntm_query
  label: Net/USB Time Info Query
  kind: query
  command: "NTMQSTN"
  params: []
- id: ntr_query
  label: Net/USB Track Info Query
  kind: query
  command: "NTRQSTN"
  params: []
- id: nst_query
  label: Net/USB Play Status Query
  kind: query
  command: "NSTQSTN"
  params: []
- id: npr_set
  label: Set Internet Radio Preset
  kind: action
  command: "NPR{preset}"
  params:
    - name: preset
      type: string
      description: Hex "01"-"28" for preset 1-40

# --- ONKYO RI: CD player (CCD) ---
- id: ccd_power
  label: RI CD Power On/Off
  kind: action
  command: "CCDPOWER"
  params: []
- id: ccd_track
  label: RI CD Track+
  kind: action
  command: "CCDTRACK"
  params: []
- id: ccd_play
  label: RI CD Play
  kind: action
  command: "CCDPLAY"
  params: []
- id: ccd_stop
  label: RI CD Stop
  kind: action
  command: "CCDSTOP"
  params: []
- id: ccd_pause
  label: RI CD Pause
  kind: action
  command: "CCDPAUSE"
  params: []
- id: ccd_skip_fwd
  label: RI CD Skip Forward
  kind: action
  command: "CCDSKIP.F"
  params: []
- id: ccd_skip_rev
  label: RI CD Skip Reverse
  kind: action
  command: "CCDSKIP.R"
  params: []
- id: ccd_memory
  label: RI CD Memory
  kind: action
  command: "CCDMEMORY"
  params: []
- id: ccd_clear
  label: RI CD Clear
  kind: action
  command: "CCDCLEAR"
  params: []
- id: ccd_repeat
  label: RI CD Repeat
  kind: action
  command: "CCDREPEAT"
  params: []
- id: ccd_random
  label: RI CD Random
  kind: action
  command: "CCDRANDOM"
  params: []
- id: ccd_display
  label: RI CD Display
  kind: action
  command: "CCDDISP"
  params: []
- id: ccd_dmode
  label: RI CD D.Mode
  kind: action
  command: "CCDD.MODE"
  params: []
- id: ccd_ff
  label: RI CD FF
  kind: action
  command: "CCDFF"
  params: []
- id: ccd_rew
  label: RI CD REW
  kind: action
  command: "CCDREW"
  params: []
- id: ccd_opcl
  label: RI CD Open/Close
  kind: action
  command: "CCDOP/CL"
  params: []
- id: ccd_number
  label: RI CD 0-10
  kind: action
  command: "CCD{n}"
  params:
    - name: n
      type: string
      description: '"0"-"10"'
- id: ccd_plus10
  label: RI CD +10
  kind: action
  command: "CCD+10"
  params: []
- id: ccd_dskip
  label: RI CD Disc+
  kind: action
  command: "CCDD.SKIP"
  params: []
- id: ccd_disc_fwd
  label: RI CD Disc+
  kind: action
  command: "CCDDISC.F"
  params: []
- id: ccd_disc_rev
  label: RI CD Disc-
  kind: action
  command: "CCDDISC.R"
  params: []
- id: ccd_disc_select
  label: RI CD Disc 1-6
  kind: action
  command: "CCDDISC{n}"
  params:
    - name: n
      type: string
      description: '"1"-"6"'
- id: ccd_standby
  label: RI CD Standby
  kind: action
  command: "CCDSTBY"
  params: []
- id: ccd_power_on
  label: RI CD Power On
  kind: action
  command: "CCDPON"
  params: []

# --- ONKYO RI: tape decks / GEQ / DAT ---
- id: ct1_play_fwd
  label: RI TAPE1 Play Forward
  kind: action
  command: "CT1PLAY.F"
  params: []
- id: ct1_play_rev
  label: RI TAPE1 Play Reverse
  kind: action
  command: "CT1PLAY.R"
  params: []
- id: ct1_stop
  label: RI TAPE1 Stop
  kind: action
  command: "CT1STOP"
  params: []
- id: ct1_rec_pause
  label: RI TAPE1 Rec/Pause
  kind: action
  command: "CT1RC/PAU"
  params: []
- id: ct1_ff
  label: RI TAPE1 FF
  kind: action
  command: "CT1FF"
  params: []
- id: ct1_rew
  label: RI TAPE1 REW
  kind: action
  command: "CT1REW"
  params: []
- id: ct2_play_fwd
  label: RI TAPE2 Play Forward
  kind: action
  command: "CT2PLAY.F"
  params: []
- id: ct2_play_rev
  label: RI TAPE2 Play Reverse
  kind: action
  command: "CT2PLAY.R"
  params: []
- id: ct2_stop
  label: RI TAPE2 Stop
  kind: action
  command: "CT2STOP"
  params: []
- id: ct2_rec_pause
  label: RI TAPE2 Rec/Pause
  kind: action
  command: "CT2RC/PAU"
  params: []
- id: ct2_ff
  label: RI TAPE2 FF
  kind: action
  command: "CT2FF"
  params: []
- id: ct2_rew
  label: RI TAPE2 REW
  kind: action
  command: "CT2REW"
  params: []
- id: ct2_opcl
  label: RI TAPE2 Open/Close
  kind: action
  command: "CT2OP/CL"
  params: []
- id: ct2_skip_fwd
  label: RI TAPE2 Skip Forward
  kind: action
  command: "CT2SKIP.F"
  params: []
- id: ct2_skip_rev
  label: RI TAPE2 Skip Reverse
  kind: action
  command: "CT2SKIP.R"
  params: []
- id: ct2_rec
  label: RI TAPE2 Rec
  kind: action
  command: "CT2REC"
  params: []
- id: ceq_power
  label: RI GEQ Power On/Off
  kind: action
  command: "CEQPOWER"
  params: []
- id: ceq_preset
  label: RI GEQ Preset
  kind: action
  command: "CEQPRESET"
  params: []
- id: cdt_play
  label: RI DAT Play
  kind: action
  command: "CDTPLAY"
  params: []
- id: cdt_rec_pause
  label: RI DAT Rec/Pause
  kind: action
  command: "CDTRC/PAU"
  params: []
- id: cdt_stop
  label: RI DAT Stop
  kind: action
  command: "CDTSTOP"
  params: []
- id: cdt_skip_fwd
  label: RI DAT Skip Forward
  kind: action
  command: "CDTSKIP.F"
  params: []
- id: cdt_skip_rev
  label: RI DAT Skip Reverse
  kind: action
  command: "CDTSKIP.R"
  params: []
- id: cdt_ff
  label: RI DAT FF
  kind: action
  command: "CDTFF"
  params: []
- id: cdt_rew
  label: RI DAT REW
  kind: action
  command: "CDTREW"
  params: []

# --- ONKYO RI: DVD player (CDV) ---
- id: cdv_power
  label: RI DVD Power On/Off
  kind: action
  command: "CDVPOWER"
  params: []
- id: cdv_power_on
  label: RI DVD Power On
  kind: action
  command: "CDVPWRON"
  params: []
- id: cdv_power_off
  label: RI DVD Power Off
  kind: action
  command: "CDVPWROFF"
  params: []
- id: cdv_play
  label: RI DVD Play
  kind: action
  command: "CDVPLAY"
  params: []
- id: cdv_stop
  label: RI DVD Stop
  kind: action
  command: "CDVSTOP"
  params: []
- id: cdv_skip_fwd
  label: RI DVD Skip Forward
  kind: action
  command: "CDVSKIP.F"
  params: []
- id: cdv_skip_rev
  label: RI DVD Skip Reverse
  kind: action
  command: "CDVSKIP.R"
  params: []
- id: cdv_ff
  label: RI DVD FF
  kind: action
  command: "CDVFF"
  params: []
- id: cdv_rew
  label: RI DVD REW
  kind: action
  command: "CDVREW"
  params: []
- id: cdv_pause
  label: RI DVD Pause
  kind: action
  command: "CDVPAUSE"
  params: []
- id: cdv_last_play
  label: RI DVD Last Play
  kind: action
  command: "CDVLASTPLAY"
  params: []
- id: cdv_subtitle_toggle
  label: RI DVD Subtitle On/Off
  kind: action
  command: "CDVSUBTON/OFF"
  params: []
- id: cdv_subtitle
  label: RI DVD Subtitle
  kind: action
  command: "CDVSUBTITLE"
  params: []
- id: cdv_setup
  label: RI DVD Setup
  kind: action
  command: "CDVSETUP"
  params: []
- id: cdv_topmenu
  label: RI DVD Top Menu
  kind: action
  command: "CDVTOPMENU"
  params: []
- id: cdv_menu
  label: RI DVD Menu
  kind: action
  command: "CDVMENU"
  params: []
- id: cdv_up
  label: RI DVD Up
  kind: action
  command: "CDVUP"
  params: []
- id: cdv_down
  label: RI DVD Down
  kind: action
  command: "CDVDOWN"
  params: []
- id: cdv_left
  label: RI DVD Left
  kind: action
  command: "CDVLEFT"
  params: []
- id: cdv_right
  label: RI DVD Right
  kind: action
  command: "CDVRIGHT"
  params: []
- id: cdv_enter
  label: RI DVD Enter
  kind: action
  command: "CDVENTER"
  params: []
- id: cdv_return
  label: RI DVD Return
  kind: action
  command: "CDVRETURN"
  params: []
- id: cdv_disc_fwd
  label: RI DVD Disc+
  kind: action
  command: "CDVDISC.F"
  params: []
- id: cdv_disc_rev
  label: RI DVD Disc-
  kind: action
  command: "CDVDISC.R"
  params: []
- id: cdv_audio
  label: RI DVD Audio
  kind: action
  command: "CDVAUDIO"
  params: []
- id: cdv_random
  label: RI DVD Random
  kind: action
  command: "CDVRANDOM"
  params: []
- id: cdv_opcl
  label: RI DVD Open/Close
  kind: action
  command: "CDVOP/CL"
  params: []
- id: cdv_angle
  label: RI DVD Angle
  kind: action
  command: "CDVANGLE"
  params: []
- id: cdv_number
  label: RI DVD 0-10
  kind: action
  command: "CDV{n}"
  params:
    - name: n
      type: string
      description: '"0"-"10"'
- id: cdv_search
  label: RI DVD Search
  kind: action
  command: "CDVSEARCH"
  params: []
- id: cdv_display
  label: RI DVD Display
  kind: action
  command: "CDVDISP"
  params: []
- id: cdv_repeat
  label: RI DVD Repeat
  kind: action
  command: "CDVREPEAT"
  params: []
- id: cdv_memory
  label: RI DVD Memory
  kind: action
  command: "CDVMEMORY"
  params: []
- id: cdv_clear
  label: RI DVD Clear
  kind: action
  command: "CDVCLEAR"
  params: []
- id: cdv_ab_repeat
  label: RI DVD A-B Repeat
  kind: action
  command: "CDVABR"
  params: []
- id: cdv_step_fwd
  label: RI DVD Step
  kind: action
  command: "CDVSTEP.F"
  params: []
- id: cdv_step_rev
  label: RI DVD Step Back
  kind: action
  command: "CDVSTEP.R"
  params: []
- id: cdv_slow_fwd
  label: RI DVD Slow
  kind: action
  command: "CDVSLOW.F"
  params: []
- id: cdv_slow_rev
  label: RI DVD Slow Back
  kind: action
  command: "CDVSLOW.R"
  params: []
- id: cdv_zoom
  label: RI DVD Zoom
  kind: action
  command: "CDVZOOMTG"
  params: []
- id: cdv_zoom_up
  label: RI DVD Zoom Up
  kind: action
  command: "CDVZOOMUP"
  params: []
- id: cdv_zoom_down
  label: RI DVD Zoom Down
  kind: action
  command: "CDVZOOMDN"
  params: []
- id: cdv_progressive
  label: RI DVD Progressive
  kind: action
  command: "CDVPROGRE"
  params: []
- id: cdv_video_off
  label: RI DVD Video On/Off
  kind: action
  command: "CDVVDOFF"
  params: []
- id: cdv_condition_memory
  label: RI DVD Condition Memory
  kind: action
  command: "CDVCONMEM"
  params: []
- id: cdv_function_memory
  label: RI DVD Function Memory
  kind: action
  command: "CDVFUNMEM"
  params: []
- id: cdv_disc_select
  label: RI DVD Disc 1-6
  kind: action
  command: "CDVDISC{n}"
  params:
    - name: n
      type: string
      description: '"1"-"6"'
- id: cdv_folder_up
  label: RI DVD Folder Up
  kind: action
  command: "CDVFOLDUP"
  params: []
- id: cdv_folder_down
  label: RI DVD Folder Down
  kind: action
  command: "CDVFOLDDN"
  params: []
- id: cdv_play_mode
  label: RI DVD Play Mode
  kind: action
  command: "CDVP.MODE"
  params: []
- id: cdv_aspect
  label: RI DVD Aspect (toggle)
  kind: action
  command: "CDVASCTG"
  params: []
- id: cdv_cd_chain_repeat
  label: RI DVD CD Chain Repeat
  kind: action
  command: "CDVCDPCD"
  params: []
- id: cdv_multi_speed_up
  label: RI DVD Multi Speed Up
  kind: action
  command: "CDVMSPUP"
  params: []
- id: cdv_multi_speed_down
  label: RI DVD Multi Speed Down
  kind: action
  command: "CDVMSPDN"
  params: []
- id: cdv_picture_control
  label: RI DVD Picture Control
  kind: action
  command: "CDVPCT"
  params: []
- id: cdv_resolution
  label: RI DVD Resolution (toggle)
  kind: action
  command: "CDVRSCTG"
  params: []
- id: cdv_factory_reset
  label: RI DVD Return to Factory Settings
  kind: action
  command: "CDVINIT"
  params: []

# --- ONKYO RI: MD recorder (CMD) ---
- id: cmd_power
  label: RI MD Power On/Off
  kind: action
  command: "CMDPOWER"
  params: []
- id: cmd_play
  label: RI MD Play
  kind: action
  command: "CMDPLAY"
  params: []
- id: cmd_stop
  label: RI MD Stop
  kind: action
  command: "CMDSTOP"
  params: []
- id: cmd_ff
  label: RI MD FF
  kind: action
  command: "CMDFF"
  params: []
- id: cmd_rew
  label: RI MD REW
  kind: action
  command: "CMDREW"
  params: []
- id: cmd_play_mode
  label: RI MD Play Mode
  kind: action
  command: "CMDP.MODE"
  params: []
- id: cmd_skip_fwd
  label: RI MD Skip Forward
  kind: action
  command: "CMDSKIP.F"
  params: []
- id: cmd_skip_rev
  label: RI MD Skip Reverse
  kind: action
  command: "CMDSKIP.R"
  params: []
- id: cmd_pause
  label: RI MD Pause
  kind: action
  command: "CMDPAUSE"
  params: []
- id: cmd_rec
  label: RI MD Rec
  kind: action
  command: "CMDREC"
  params: []
- id: cmd_memory
  label: RI MD Memory
  kind: action
  command: "CMDMEMORY"
  params: []
- id: cmd_display
  label: RI MD Display
  kind: action
  command: "CMDDISP"
  params: []
- id: cmd_scroll
  label: RI MD Scroll
  kind: action
  command: "CMDSCROLL"
  params: []
- id: cmd_music_scan
  label: RI MD Music Scan
  kind: action
  command: "CMDM.SCAN"
  params: []
- id: cmd_clear
  label: RI MD Clear
  kind: action
  command: "CMDCLEAR"
  params: []
- id: cmd_random
  label: RI MD Random
  kind: action
  command: "CMDRANDOM"
  params: []
- id: cmd_repeat
  label: RI MD Repeat
  kind: action
  command: "CMDREPEAT"
  params: []
- id: cmd_enter
  label: RI MD Enter
  kind: action
  command: "CMDENTER"
  params: []
- id: cmd_eject
  label: RI MD Eject
  kind: action
  command: "CMDEJECT"
  params: []
- id: cmd_number
  label: RI MD 0-10/0
  kind: action
  command: "CMD{n}"
  params:
    - name: n
      type: string
      description: '"0"-"10/0"'
- id: cmd_numeric
  label: RI MD --/--- numeric entry
  kind: action
  command: "CMD{digits}"
  params:
    - name: digits
      type: string
      description: '"nn/nnn" pattern (--/--- keys)'
- id: cmd_name
  label: RI MD Name
  kind: action
  command: "CMDNAME"
  params: []
- id: cmd_group
  label: RI MD Group
  kind: action
  command: "CMDGROUP"
  params: []
- id: cmd_standby
  label: RI MD Standby
  kind: action
  command: "CMDSTBY"
  params: []

# --- ONKYO RI: CD-R recorder (CCR) ---
- id: ccr_power
  label: RI CD-R Power On/Off
  kind: action
  command: "CCRPOWER"
  params: []
- id: ccr_play_mode
  label: RI CD-R Play Mode
  kind: action
  command: "CCRP.MODE"
  params: []
- id: ccr_play
  label: RI CD-R Play
  kind: action
  command: "CCRPLAY"
  params: []
- id: ccr_stop
  label: RI CD-R Stop
  kind: action
  command: "CCRSTOP"
  params: []
- id: ccr_skip_fwd
  label: RI CD-R Skip Forward
  kind: action
  command: "CCRSKIP.F"
  params: []
- id: ccr_skip_rev
  label: RI CD-R Skip Reverse
  kind: action
  command: "CCRSKIP.R"
  params: []
- id: ccr_pause
  label: RI CD-R Pause
  kind: action
  command: "CCRPAUSE"
  params: []
- id: ccr_rec
  label: RI CD-R Rec
  kind: action
  command: "CCRREC"
  params: []
- id: ccr_clear
  label: RI CD-R Clear
  kind: action
  command: "CCRCLEAR"
  params: []
- id: ccr_repeat
  label: RI CD-R Repeat
  kind: action
  command: "CCRREPEAT"
  params: []
- id: ccr_number
  label: RI CD-R 0-10/0
  kind: action
  command: "CCR{n}"
  params:
    - name: n
      type: string
      description: '"0"-"10/0"'
- id: ccr_numeric
  label: RI CD-R --/--- numeric entry
  kind: action
  command: "CCR{digits}"
  params:
    - name: digits
      type: string
      description: '"nn/nnn" pattern (--/--- keys)'
- id: ccr_scroll
  label: RI CD-R Scroll
  kind: action
  command: "CCRSCROLL"
  params: []
- id: ccr_opcl
  label: RI CD-R Open/Close
  kind: action
  command: "CCROP/CL"
  params: []
- id: ccr_display
  label: RI CD-R Display
  kind: action
  command: "CCRDISP"
  params: []
- id: ccr_random
  label: RI CD-R Random
  kind: action
  command: "CCRRANDOM"
  params: []
- id: ccr_memory
  label: RI CD-R Memory
  kind: action
  command: "CCRMEMORY"
  params: []
- id: ccr_ff
  label: RI CD-R FF
  kind: action
  command: "CCRFF"
  params: []
- id: ccr_rew
  label: RI CD-R REW
  kind: action
  command: "CCRREW"
  params: []
- id: ccr_standby
  label: RI CD-R Standby
  kind: action
  command: "CCRSTBY"
  params: []

# --- Zone 2 ---
- id: zpw_standby
  label: Zone2 Standby
  kind: action
  command: "ZPW00"
  params: []
- id: zpw_on
  label: Zone2 On
  kind: action
  command: "ZPW01"
  params: []
- id: zpw_query
  label: Zone2 Power Query
  kind: query
  command: "ZPWQSTN"
  params: []
- id: zmt_off
  label: Zone2 Muting Off
  kind: action
  command: "ZMT00"
  params: []
- id: zmt_on
  label: Zone2 Muting On
  kind: action
  command: "ZMT01"
  params: []
- id: zmt_toggle
  label: Zone2 Muting Wrap-Around
  kind: action
  command: "ZMTTG"
  params: []
- id: zmt_query
  label: Zone2 Muting Query
  kind: query
  command: "ZMTQSTN"
  params: []
- id: zvl_set
  label: Set Zone2 Volume
  kind: action
  command: "ZVL{level}"
  params:
    - name: level
      type: string
      description: Hex "00"-"64" for 0-100 scale, or "00"-"50" for 0-80 scale (only works when main is ON)
- id: zvl_up
  label: Zone2 Volume Up
  kind: action
  command: "ZVLUP"
  params: []
- id: zvl_down
  label: Zone2 Volume Down
  kind: action
  command: "ZVLDOWN"
  params: []
- id: zvl_query
  label: Zone2 Volume Query
  kind: query
  command: "ZVLQSTN"
  params: []
- id: ztn_bass_set
  label: Set Zone2 Bass
  kind: action
  command: "ZTNB{value}"
  params:
    - name: value
      type: string
      description: '"-A".."00".."+A" (-10..0..+10, 2-step)'
- id: ztn_treble_set
  label: Set Zone2 Treble
  kind: action
  command: "ZTNT{value}"
  params:
    - name: value
      type: string
      description: '"-A".."00".."+A" (-10..0..+10, 2-step)'
- id: ztn_bass_up
  label: Zone2 Bass Up (2 step)
  kind: action
  command: "ZTNBUP"
  params: []
- id: ztn_bass_down
  label: Zone2 Bass Down (2 step)
  kind: action
  command: "ZTNBDOWN"
  params: []
- id: ztn_treble_up
  label: Zone2 Treble Up (2 step)
  kind: action
  command: "ZTNTUP"
  params: []
- id: ztn_treble_down
  label: Zone2 Treble Down (2 step)
  kind: action
  command: "ZTNTDOWN"
  params: []
- id: ztn_query
  label: Zone2 Tone Query
  kind: query
  command: "ZTNQSTN"
  params: []
- id: zbl_set
  label: Set Zone2 Balance
  kind: action
  command: "ZBL{value}"
  params:
    - name: value
      type: string
      description: '"-A".."00".."+A" (-10..0..+10, 2-step)'
- id: zbl_up
  label: Zone2 Balance Up (to R, 2 step)
  kind: action
  command: "ZBLUP"
  params: []
- id: zbl_down
  label: Zone2 Balance Down (to L, 2 step)
  kind: action
  command: "ZBLDOWN"
  params: []
- id: zbl_query
  label: Zone2 Balance Query
  kind: query
  command: "ZBLQSTN"
  params: []
- id: slz_set
  label: Select Zone2 Input
  kind: action
  command: "SLZ{input}"
  params:
    - name: input
      type: string
      description: '00 VIDEO1(VCR/DVR), 01 VIDEO2(CBL/SAT), 02 VIDEO3(GAME/TV), 03 VIDEO4(AUX1), 04 VIDEO5(AUX2), 10 DVD, 20 TAPE(1), 22 PHONO, 23 CD, 24 FM, 25 AM, 26 TUNER, 27 MUSIC SERVER, 28 INTERNET RADIO, 29 USB/USB(Front), 2A USB(Rear), 40 Universal PORT, 80 SOURCE'
- id: slz_query
  label: Zone2 Selector Query
  kind: query
  command: "SLZQSTN"
  params: []
- id: tuz_set
  label: Direct Tuning Frequency (Zone2, separated control)
  kind: action
  command: "TUZ{frequency}"
  params:
    - name: frequency
      type: string
      description: 5-digit frequency
- id: tuz_up
  label: Zone2 Tuning Wrap-Around Up
  kind: action
  command: "TUZUP"
  params: []
- id: tuz_down
  label: Zone2 Tuning Wrap-Around Down
  kind: action
  command: "TUZDOWN"
  params: []
- id: tuz_query
  label: Zone2 Tuning Frequency Query
  kind: query
  command: "TUZQSTN"
  params: []
- id: prz_set
  label: Set Zone2 Preset No. (separated control)
  kind: action
  command: "PRZ{preset}"
  params:
    - name: preset
      type: string
      description: Hex "01"-"28" for preset 1-40
- id: prz_up
  label: Zone2 Preset Wrap-Around Up
  kind: action
  command: "PRZUP"
  params: []
- id: prz_down
  label: Zone2 Preset Wrap-Around Down
  kind: action
  command: "PRZDOWN"
  params: []
- id: prz_query
  label: Zone2 Preset Query
  kind: query
  command: "PRZQSTN"
  params: []
- id: ntc_zone2_play
  label: Zone2 Net Play Key
  kind: action
  command: "NTCPLAYz"
  params: []
- id: ntc_zone2_stop
  label: Zone2 Net Stop Key
  kind: action
  command: "NTCSTOPz"
  params: []
- id: ntc_zone2_pause
  label: Zone2 Net Pause Key
  kind: action
  command: "NTCPAUSEz"
  params: []
- id: ntc_zone2_track_up
  label: Zone2 Net Track Up Key
  kind: action
  command: "NTCTRUPz"
  params: []
- id: ntc_zone2_track_down
  label: Zone2 Net Track Down Key
  kind: action
  command: "NTCTRDNz"
  params: []
- id: ntz_play
  label: Zone2 Net Play Key (NTZ, network models)
  kind: action
  command: "NTZPLAY"
  params: []
- id: ntz_stop
  label: Zone2 Net Stop Key
  kind: action
  command: "NTZSTOP"
  params: []
- id: ntz_pause
  label: Zone2 Net Pause Key
  kind: action
  command: "NTZPAUSE"
  params: []
- id: ntz_track_up
  label: Zone2 Net Track Up Key
  kind: action
  command: "NTZTRUP"
  params: []
- id: ntz_track_down
  label: Zone2 Net Track Down Key
  kind: action
  command: "NTZTRDN"
  params: []
- id: ntz_ch_up
  label: Zone2 Net CH Up (iRadio)
  kind: action
  command: "NTZCHUP"
  params: []
- id: ntz_ch_down
  label: Zone2 Net CH Down (iRadio)
  kind: action
  command: "NTZCHDN"
  params: []
- id: npz_set
  label: Set Zone2 Internet Radio Preset
  kind: action
  command: "NPZ{preset}"
  params:
    - name: preset
      type: string
      description: Hex "01"-"28" for preset 1-40
- id: lmz_set
  label: Set Zone2 Listening Mode
  kind: action
  command: "LMZ{mode}"
  params:
    - name: mode
      type: string
      description: '00 STEREO, 01 DIRECT, 0F MONO, 12 MULTIPLEX, 87 DVS(PL2), 88 DVS(NEO6)'
- id: ltz_set
  label: Set Zone2 Late Night
  kind: action
  command: "LTZ{level}"
  params:
    - name: level
      type: string
      description: '00 Off, 01 Low, 02 High'
- id: ltz_up
  label: Zone2 Late Night Wrap-Around Up
  kind: action
  command: "LTZUP"
  params: []
- id: ltz_query
  label: Zone2 Late Night Query
  kind: query
  command: "LTZQSTN"
  params: []
- id: raz_set
  label: Set Zone2 Re-EQ/Academy
  kind: action
  command: "RAZ{mode}"
  params:
    - name: mode
      type: string
      description: '00 Both Off, 01 Re-EQ On, 02 Academy On'
- id: raz_up
  label: Zone2 Re-EQ/Academy Wrap-Around Up
  kind: action
  command: "RAZUP"
  params: []
- id: raz_query
  label: Zone2 Re-EQ/Academy Query
  kind: query
  command: "RAZQSTN"
  params: []

# --- Zone 3 ---
- id: pw3_standby
  label: Zone3 Standby
  kind: action
  command: "PW300"
  params: []
- id: pw3_on
  label: Zone3 On
  kind: action
  command: "PW301"
  params: []
- id: pw3_query
  label: Zone3 Power Query
  kind: query
  command: "PW3QSTN"
  params: []
- id: mt3_off
  label: Zone3 Muting Off
  kind: action
  command: "MT300"
  params: []
- id: mt3_on
  label: Zone3 Muting On
  kind: action
  command: "MT301"
  params: []
- id: mt3_toggle
  label: Zone3 Muting Wrap-Around
  kind: action
  command: "MT3TG"
  params: []
- id: mt3_query
  label: Zone3 Muting Query
  kind: query
  command: "MT3QSTN"
  params: []
- id: vl3_set
  label: Set Zone3 Volume
  kind: action
  command: "VL3{level}"
  params:
    - name: level
      type: string
      description: Hex "00"-"64" for 0-100 scale, or "00"-"50" for 0-80 scale
- id: vl3_up
  label: Zone3 Volume Up
  kind: action
  command: "VL3UP"
  params: []
- id: vl3_down
  label: Zone3 Volume Down
  kind: action
  command: "VL3DOWN"
  params: []
- id: vl3_query
  label: Zone3 Volume Query
  kind: query
  command: "VL3QSTN"
  params: []
- id: tn3_bass_set
  label: Set Zone3 Bass
  kind: action
  command: "TN3B{value}"
  params:
    - name: value
      type: string
      description: '"-A".."00".."+A" (-10..0..+10, 2-step)'
- id: tn3_treble_set
  label: Set Zone3 Treble
  kind: action
  command: "TN3T{value}"
  params:
    - name: value
      type: string
      description: '"-A".."00".."+A" (-10..0..+10, 2-step)'
- id: tn3_bass_up
  label: Zone3 Bass Up (2 step)
  kind: action
  command: "TN3BUP"
  params: []
- id: tn3_bass_down
  label: Zone3 Bass Down (2 step)
  kind: action
  command: "TN3BDOWN"
  params: []
- id: tn3_treble_up
  label: Zone3 Treble Up (2 step)
  kind: action
  command: "TN3TUP"
  params: []
- id: tn3_treble_down
  label: Zone3 Treble Down (2 step)
  kind: action
  command: "TN3TDOWN"
  params: []
- id: tn3_query
  label: Zone3 Tone Query
  kind: query
  command: "TN3QSTN"
  params: []
- id: bl3_set
  label: Set Zone3 Balance
  kind: action
  command: "BL3{value}"
  params:
    - name: value
      type: string
      description: '"-A".."00".."+A" (-10..0..+10, 2-step)'
- id: bl3_up
  label: Zone3 Balance Up (to R, 2 step)
  kind: action
  command: "BL3UP"
  params: []
- id: bl3_down
  label: Zone3 Balance Down (to L, 2 step)
  kind: action
  command: "BL3DOWN"
  params: []
- id: bl3_query
  label: Zone3 Balance Query
  kind: query
  command: "BL3QSTN"
  params: []
- id: sl3_set
  label: Select Zone3 Input
  kind: action
  command: "SL3{input}"
  params:
    - name: input
      type: string
      description: '00 VIDEO1(VCR/DVR), 01 VIDEO2(CBL/SAT), 02 VIDEO3(GAME/TV), 03 VIDEO4(AUX1), 04 VIDEO5(AUX2), 05 VIDEO6, 06 VIDEO7, 10 DVD, 20 TAPE(1), 21 TAPE2, 22 PHONO, 23 CD, 24 FM, 25 AM, 26 TUNER, 27 MUSIC SERVER, 28 INTERNET RADIO, 29 USB/USB(Front), 2A USB(Rear), 30 MULTI CH, 31 XM (XM models), 32 SIRIUS (SIRIUS models), 40 Universal PORT, 80 SOURCE'
- id: sl3_query
  label: Zone3 Selector Query
  kind: query
  command: "SL3QSTN"
  params: []
- id: tu3_set
  label: Direct Tuning Frequency (Zone3, separated control)
  kind: action
  command: "TU3{frequency}"
  params:
    - name: frequency
      type: string
      description: 5-digit frequency
- id: tu3_up
  label: Zone3 Tuning Wrap-Around Up
  kind: action
  command: "TU3UP"
  params: []
- id: tu3_down
  label: Zone3 Tuning Wrap-Around Down
  kind: action
  command: "TU3DOWN"
  params: []
- id: tu3_query
  label: Zone3 Tuning Frequency Query
  kind: query
  command: "TU3QSTN"
  params: []
- id: pr3_set
  label: Set Zone3 Preset No.
  kind: action
  command: "PR3{preset}"
  params:
    - name: preset
      type: string
      description: Hex "01"-"28" for preset 1-40
- id: pr3_up
  label: Zone3 Preset Wrap-Around Up
  kind: action
  command: "PR3UP"
  params: []
- id: pr3_down
  label: Zone3 Preset Wrap-Around Down
  kind: action
  command: "PR3DOWN"
  params: []
- id: pr3_query
  label: Zone3 Preset Query
  kind: query
  command: "PR3QSTN"
  params: []
- id: nt3_play
  label: Zone3 Net Play Key
  kind: action
  command: "NT3PLAY"
  params: []
- id: nt3_stop
  label: Zone3 Net Stop Key
  kind: action
  command: "NT3STOP"
  params: []
- id: nt3_pause
  label: Zone3 Net Pause Key
  kind: action
  command: "NT3PAUSE"
  params: []
- id: nt3_track_up
  label: Zone3 Net Track Up Key
  kind: action
  command: "NT3TRUP"
  params: []
- id: nt3_track_down
  label: Zone3 Net Track Down Key
  kind: action
  command: "NT3TRDN"
  params: []
- id: nt3_ch_up
  label: Zone3 Net CH Up (iRadio)
  kind: action
  command: "NT3CHUP"
  params: []
- id: nt3_ch_down
  label: Zone3 Net CH Down (iRadio)
  kind: action
  command: "NT3CHDN"
  params: []
- id: np3_set
  label: Set Zone3 Internet Radio Preset
  kind: action
  command: "NP3{preset}"
  params:
    - name: preset
      type: string
      description: Hex "01"-"28" for preset 1-40

# --- Zone 4 ---
- id: pw4_standby
  label: Zone4 Standby
  kind: action
  command: "PW400"
  params: []
- id: pw4_on
  label: Zone4 On
  kind: action
  command: "PW401"
  params: []
- id: pw4_query
  label: Zone4 Power Query
  kind: query
  command: "PW4QSTN"
  params: []
- id: mt4_off
  label: Zone4 Muting Off
  kind: action
  command: "MT400"
  params: []
- id: mt4_on
  label: Zone4 Muting On
  kind: action
  command: "MT401"
  params: []
- id: mt4_toggle
  label: Zone4 Muting Wrap-Around
  kind: action
  command: "MT4TG"
  params: []
- id: mt4_query
  label: Zone4 Muting Query
  kind: query
  command: "MT4QSTN"
  params: []
- id: vl4_set
  label: Set Zone4 Volume
  kind: action
  command: "VL4{level}"
  params:
    - name: level
      type: string
      description: Hex "00"-"64" for 0-100 scale, or "00"-"50" for 0-80 scale
- id: vl4_up
  label: Zone4 Volume Up
  kind: action
  command: "VL4UP"
  params: []
- id: vl4_down
  label: Zone4 Volume Down
  kind: action
  command: "VL4DOWN"
  params: []
- id: vl4_query
  label: Zone4 Volume Query
  kind: query
  command: "VL4QSTN"
  params: []
- id: sl4_set
  label: Select Zone4 Input
  kind: action
  command: "SL4{input}"
  params:
    - name: input
      type: string
      description: '00 VIDEO1(VCR/DVR), 01 VIDEO2(CBL/SAT), 02 VIDEO3(GAME/TV), 03 VIDEO4(AUX1), 04 VIDEO5(AUX2), 05 VIDEO6, 06 VIDEO7, 10 DVD, 20 TAPE(1)/TV/TAPE, 21 TAPE2, 22 PHONO, 23 CD, 24 FM, 25 AM, 26 TUNER, 27 MUSIC SERVER, 28 INTERNET RADIO, 29 USB/USB(Front), 2A USB(Rear), 30 MULTI CH, 31 XM (XM models), 32 SIRIUS (SIRIUS models), 40 Universal PORT, 80 SOURCE'
- id: sl4_query
  label: Zone4 Selector Query
  kind: query
  command: "SL4QSTN"
  params: []
- id: tu4_set
  label: Direct Tuning Frequency (Zone4, separated control)
  kind: action
  command: "TU4{frequency}"
  params:
    - name: frequency
      type: string
      description: 5-digit frequency
- id: tu4_up
  label: Zone4 Tuning Wrap-Around Up
  kind: action
  command: "TU4UP"
  params: []
- id: tu4_down
  label: Zone4 Tuning Wrap-Around Down
  kind: action
  command: "TU4DOWN"
  params: []
- id: tu4_query
  label: Zone4 Tuning Frequency Query
  kind: query
  command: "TU4QSTN"
  params: []
- id: pr4_set
  label: Set Zone4 Preset No.
  kind: action
  command: "PR4{preset}"
  params:
    - name: preset
      type: string
      description: Hex "01"-"28" for preset 1-40
- id: pr4_up
  label: Zone4 Preset Wrap-Around Up
  kind: action
  command: "PR4UP"
  params: []
- id: pr4_down
  label: Zone4 Preset Wrap-Around Down
  kind: action
  command: "PR4DOWN"
  params: []
- id: pr4_query
  label: Zone4 Preset Query
  kind: query
  command: "PR4QSTN"
  params: []
- id: nt4_play
  label: Zone4 Net Play Key
  kind: action
  command: "NT4PLAY"
  params: []
- id: nt4_stop
  label: Zone4 Net Stop Key
  kind: action
  command: "NT4STOP"
  params: []
- id: nt4_pause
  label: Zone4 Net Pause Key
  kind: action
  command: "NT4PAUSE"
  params: []
- id: nt4_track_up
  label: Zone4 Net Track Up Key
  kind: action
  command: "NT4TRUP"
  params: []
- id: nt4_track_down
  label: Zone4 Net Track Down Key
  kind: action
  command: "NT4TRDN"
  params: []
- id: np4_set
  label: Set Zone4 Internet Radio Preset
  kind: action
  command: "NP4{preset}"
  params:
    - name: preset
      type: string
      description: Hex "01"-"28" for preset 1-40

# --- Dock via RI (CDS) ---
- id: cds_power_on
  label: Dock On
  kind: action
  command: "CDSPWRON"
  params: []
- id: cds_power_off
  label: Dock Standby
  kind: action
  command: "CDSPWROFF"
  params: []
- id: cds_play_resume
  label: Dock Play/Resume Key
  kind: action
  command: "CDSPLY/RES"
  params: []
- id: cds_stop
  label: Dock Stop Key
  kind: action
  command: "CDSSTOP"
  params: []
- id: cds_skip_fwd
  label: Dock Track Up Key
  kind: action
  command: "CDSSKIP.F"
  params: []
- id: cds_skip_rev
  label: Dock Track Down Key
  kind: action
  command: "CDSSKIP.R"
  params: []
- id: cds_pause
  label: Dock Pause Key
  kind: action
  command: "CDSPAUSE"
  params: []
- id: cds_play_pause
  label: Dock Play/Pause Key
  kind: action
  command: "CDSPLY/PAU"
  params: []
- id: cds_ff
  label: Dock FF Key
  kind: action
  command: "CDSFF"
  params: []
- id: cds_rew
  label: Dock FR Key
  kind: action
  command: "CDSREW"
  params: []
- id: cds_album_up
  label: Dock Album Up Key
  kind: action
  command: "CDSALBUM+"
  params: []
- id: cds_album_down
  label: Dock Album Down Key
  kind: action
  command: "CDSALBUM-"
  params: []
- id: cds_playlist_up
  label: Dock Playlist Up Key
  kind: action
  command: "CDSPLIST+"
  params: []
- id: cds_playlist_down
  label: Dock Playlist Down Key
  kind: action
  command: "CDSPLIST-"
  params: []
- id: cds_chapter_up
  label: Dock Chapter Up Key
  kind: action
  command: "CDSCHAPT+"
  params: []
- id: cds_chapter_down
  label: Dock Chapter Down Key
  kind: action
  command: "CDSCHAPT-"
  params: []
- id: cds_random
  label: Dock Shuffle Key
  kind: action
  command: "CDSRANDOM"
  params: []
- id: cds_repeat
  label: Dock Repeat Key
  kind: action
  command: "CDSREPEAT"
  params: []
- id: cds_mute
  label: Dock Mute Key
  kind: action
  command: "CDSMUTE"
  params: []
- id: cds_backlight
  label: Dock Backlight Key
  kind: action
  command: "CDSBLIGHT"
  params: []
- id: cds_menu
  label: Dock Menu Key
  kind: action
  command: "CDSMENU"
  params: []
- id: cds_enter
  label: Dock Select Key
  kind: action
  command: "CDSENTER"
  params: []
- id: cds_up
  label: Dock Cursor Up Key
  kind: action
  command: "CDSUP"
  params: []
- id: cds_down
  label: Dock Cursor Down Key
  kind: action
  command: "CDSDOWN"
  params: []
```

## Feedbacks
```yaml
# Receiver responds to commands with echo Status Message; query responses carry current value
- id: power_state
  type: enum
  values: [standby, on]
  # PWR00 / PWR01
- id: audio_muting_state
  type: enum
  values: [off, on]
  # AMT00 / AMT01
- id: master_volume_level
  type: string
  # MVL response, hex "00"-"64" (or "00"-"50" on 0-80 scale models)
- id: input_selector
  type: enum
  values: [video1, video2, video3, video4_aux1, video5_aux2, video6, video7, dvd, tape1, tape2, phono, cd, fm, am, tuner, music_server, internet_radio, usb_front, usb_rear, multi_ch, xm, sirius, universal_port]
  # SLI response codes per sli_set table
- id: listening_mode
  type: string
  # LMD response, hex code per lmd_set table
- id: zone2_power_state
  type: enum
  values: [standby, on]
- id: zone2_muting_state
  type: enum
  values: [off, on]
- id: zone2_volume_level
  type: string
- id: zone3_power_state
  type: enum
  values: [standby, on]
- id: zone3_muting_state
  type: enum
  values: [off, on]
- id: zone3_volume_level
  type: string
- id: zone4_power_state
  type: enum
  values: [standby, on]
- id: zone4_muting_state
  type: enum
  values: [off, on]
- id: zone4_volume_level
  type: string
- id: net_usb_play_status
  type: string
  # NST response "prs": p=S/P/p/F/R play state, r repeat state (-/R/F/1), s (3rd letter per source)
- id: net_usb_time_info
  type: string
  # NTM response "mm:ss/mm:ss" elapsed/track time
- id: net_usb_track_info
  type: string
  # NTR response "cccc/tttt" current/total track
- id: net_usb_artist_name
  type: string
  # NAT response, ASCII 64 chars max
- id: net_usb_album_name
  type: string
  # NAL response, ASCII 64 chars max
- id: net_usb_title_name
  type: string
  # NTI response, ASCII 64 chars max
- id: audio_info
  type: string
  # IFA response "nnnnn:nnnnn", ',' separator of info
- id: video_info
  type: string
  # IFV response "nnnnn:nnnnn"
- id: tuner_frequency
  type: string
  # TUN response
- id: preset_number
  type: string
  # PRS response
- id: hd_radio_tuner_status
  type: string
  # HTS response "mmnnoo": mm 00=not HD/01=HD, nn current program 01-08, oo receivable-program bitmask hex
```

## Events
```yaml
- id: status_change_notice
  description: >-
    Event Notice Communication - when system status changes, receiver sends the
    new current status unsolicited to the controller (e.g. "SLI03"). Connection
    must be held continuously for notices to be delivered.
```

## Variables
```yaml
- id: master_volume
  type: integer
  min: 0
  max: 100
  unit: level
  # MVL hex 00-64 (or 00-50 = 0-80 on some models)
- id: sleep_timer
  type: integer
  min: 1
  max: 90
  unit: minutes
  # SLP hex 01-5A
- id: dimmer_level
  type: enum
  values: [bright, dim, dark, shut_off, bright_led_off]
- id: zone2_volume
  type: integer
  min: 0
  max: 100
  unit: level
- id: zone3_volume
  type: integer
  min: 0
  max: 100
  unit: level
- id: zone4_volume
  type: integer
  min: 0
  max: 100
  unit: level
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source.
# Note (not a safety interlock): TGA/TGB/TGC 12V trigger commands only available
# when each 12V Trigger parameter is "OFF" in the Setup Menu.
```

## Notes
- ISCP message format: 3 fixed command characters + variable-length parameter (e.g. `PWR01`).
- RS-232 framing: `!` + `1` (destination unit = Receiver) + ISCP message + end char `[CR]`(0x0D) / `[LF]`(0x0A) / `[CR][LF]`. Device-to-controller messages end with `[EOF]`(0x1

## Provenance

```yaml
source_domains:
  - assets.integrahometheater.com
source_urls:
  - "https://assets.integrahometheater.com/product-firmware/Third-Party-Drivers/Crestron_Driver.zip?v=1776701789"
retrieved_at: 2026-09-12T04:03:15.153Z
last_checked_at: 2026-10-01T07:10:30.871Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T07:10:30.871Z
matched_actions: 551
action_count: 551
confidence: medium
summary: "All 551 spec action units map to ISCP commands documented in the source, transport params match. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a multi-model generic protocol document; exact command subset supported by 8500DSP Series not confirmed"
- "source file ends at the CDS dock-command table; table may be truncated mid-list"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
